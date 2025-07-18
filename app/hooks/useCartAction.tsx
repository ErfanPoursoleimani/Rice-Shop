import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Product } from '@prisma/client';
import useDataStore from '@/stores/dataStore';
import { CartProduct } from '@/types/types';
import { useAuthStore } from '@/stores/authStore';

type CartItem = CartProduct

interface CartActionReturn {
    handleAddToCart: () => Promise<void>;
    handleDeleteFromCart: () => Promise<void>;
    handleIncreaseQuantity: () => Promise<void>;
    handleDecreaseQuantity: () => Promise<void>;
    setQuantity: (quantity: number) => Promise<void>;
    isAddedToCart: boolean;
    isDeletingFromCart: boolean;
    isLoading: boolean;
    currentQuantity: number;
    error: string | null;
    canIncrease: boolean;
    canDecrease: boolean;
}

interface ApiError {
    message: string;
    status?: number;
}

// Custom hook for toast notifications (you can replace with your preferred toast library)
const useToast = () => {
    return {
        success: (message: string) => console.log('Success:', message),
        error: (message: string) => console.error('Error:', message),
        info: (message: string) => console.info('Info:', message)
    };
};

export function useCartAction(product: Product): CartActionReturn {
    const router = useRouter();
    const { user } = useAuthStore();
    const { cartProducts } = useDataStore();
    const toast = useToast();
    
    const [isDeletingFromCart, setIsDeletingFromCart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Refs for debouncing and preventing race conditions
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const mountedRef = useRef(true);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            mountedRef.current = false;
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Memoize cart item lookup for efficiency
    const cartItem = useMemo((): CartItem | null => {
        return cartProducts.find(item => item.productId === product.id) || null;
    }, [cartProducts, product.id]);

    const isAddedToCart = Boolean(cartItem);
    const currentQuantity = cartItem?.quantity || 1;

    // Stock validation
    const canIncrease = useMemo(() => {
        if (!product.stock) return false;
        return currentQuantity < product.stock;
    }, [currentQuantity, product.stock]);

    const canDecrease = currentQuantity > 1;

    // Enhanced error handling with user-friendly messages
    const handleError = useCallback((error: unknown, action: string) => {
        let errorMessage = `Failed to ${action}`;
        
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const serverMessage = error.response?.data?.message;
            
            switch (status) {
                case 401:
                    errorMessage = 'Please log in to continue';
                    break;
                case 403:
                    errorMessage = 'You don\'t have permission to perform this action';
                    break;
                case 404:
                    errorMessage = 'Product not found';
                    break;
                case 409:
                    errorMessage = 'This item is no longer available';
                    break;
                case 429:
                    errorMessage = 'Too many requests. Please try again later';
                    break;
                default:
                    errorMessage = serverMessage || errorMessage;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        setError(errorMessage);
        toast.error(errorMessage);
        console.error(`Cart action error (${action}):`, error);
    }, [toast]);

    // Generic API call handler with comprehensive error handling and optimistic updates
    const handleApiCall = useCallback(async (
        apiCall: (signal: AbortSignal) => Promise<any>,
        optimisticUpdate?: () => void,
        revertUpdate?: () => void,
        successMessage?: string
    ) => {
        if (!mountedRef.current) return;

        // Cancel any pending requests
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        setIsLoading(true);
        setError(null);
        
        // Apply optimistic update
        optimisticUpdate?.();

        try {
            await apiCall(signal);
            
            if (!mountedRef.current) return;
            
            // Refresh data
            router.refresh();
            
            if (successMessage) {
                toast.success(successMessage);
            }
        } catch (error) {
            if (!mountedRef.current) return;
            
            // Revert optimistic update on error
            revertUpdate?.();
            
            // Don't handle aborted requests as errors
            if (axios.isCancel(error) || (error as Error).name === 'AbortError') {
                return;
            }
            
            handleError(error, 'update cart');
        } finally {
            if (mountedRef.current) {
                setIsLoading(false);
            }
        }
    }, [router, toast, handleError]);

    // Debounced quantity update to prevent rapid API calls
    const debouncedQuantityUpdate = useCallback((newQuantity: number) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        
        debounceTimeoutRef.current = setTimeout(() => {
            if (cartItem && mountedRef.current) {
                handleApiCall(
                    (signal) => axios.patch('/api/cart/add', {
                        cartId: cartItem.cartId,
                        productId: cartItem.productId,
                        quantity: newQuantity
                    }, { signal }),
                    undefined,
                    undefined,
                    'Quantity updated'
                );
            }
        }, 300); // 300ms debounce
    }, [cartItem, handleApiCall]);

    // Validation helper
    const validateCartAction = useCallback((action: string): boolean => {
        if (!user) {
            toast.error('Please log in to manage your cart');
            return false;
        }
        
        if (!product) {
            toast.error('Product not found');
            return false;
        }
        
        if (action !== 'delete' && !product.stock) {
            toast.error('This product is out of stock');
            return false;
        }
        
        return true;
    }, [user, product, toast]);

    const handleIncreaseQuantity = useCallback(async () => {
        if (!validateCartAction('increase') || !cartItem || !canIncrease) return;
        
        const newQuantity = currentQuantity + 1;
        
        await handleApiCall(
            (signal) => axios.patch('/api/cart/add', {
                cartId: cartItem.cartId,
                productId: cartItem.productId,
                quantity: newQuantity
            }, { signal }),
            undefined,
            undefined,
            'Quantity increased'
        );
    }, [validateCartAction, cartItem, canIncrease, currentQuantity, handleApiCall]);

    const handleAddToCart = useCallback(async () => {
        if (!validateCartAction('add')) return;
        
        // If already in cart, just increase quantity
        if (isAddedToCart) {
            await handleIncreaseQuantity();
            return;
        }
        
        // Get user's cart ID (assuming you have a way to get this)
        const userCartId = user?.cartId; // Adjust based on your data structure
        
        if (!userCartId) {
            toast.error('Unable to find your cart. Please refresh and try again.');
            return;
        }
        
        await handleApiCall(
            (signal) => axios.post('/api/cart/add', {
                cartId: userCartId,
                productId: product.id,
                quantity: 1
            }, { signal }),
            undefined,
            undefined,
            'Added to cart'
        );
    }, [validateCartAction, isAddedToCart, handleIncreaseQuantity, user, product.id, handleApiCall, toast]);


    const handleDecreaseQuantity = useCallback(async () => {
        if (!validateCartAction('decrease') || !cartItem || !canDecrease) return;
        
        const newQuantity = currentQuantity - 1;
        
        await handleApiCall(
            (signal) => axios.patch('/api/cart/add', {
                cartId: cartItem.cartId,
                productId: cartItem.productId,
                quantity: newQuantity
            }, { signal }),
            undefined,
            undefined,
            'Quantity decreased'
        );
    }, [validateCartAction, cartItem, canDecrease, currentQuantity, handleApiCall]);

    const setQuantity = useCallback(async (quantity: number) => {
        if (!validateCartAction('update') || !cartItem) return;
        
        // Validate quantity
        if (quantity < 1) {
            toast.error('Quantity must be at least 1');
            return;
        }
        
        if (product.stock && quantity > product.stock) {
            toast.error(`Only ${product.stock} items available`);
            return;
        }
        
        debouncedQuantityUpdate(quantity);
    }, [validateCartAction, cartItem, product.stock, toast, debouncedQuantityUpdate]);

    const handleDeleteFromCart = useCallback(async () => {
        if (!validateCartAction('delete') || !cartItem) return;
        
        setIsDeletingFromCart(true);
        
        try {
            await axios.delete(`/api/cart/delete?cartId=${cartItem.cartId}&productId=${cartItem.productId}`);
            
            if (mountedRef.current) {
                router.refresh();
                toast.success('Removed from cart');
            }
        } catch (error) {
            if (mountedRef.current) {
                handleError(error, 'remove from cart');
            }
        } finally {
            if (mountedRef.current) {
                setIsDeletingFromCart(false);
            }
        }
    }, [validateCartAction, cartItem, router, toast, handleError]);

    // Clear error after some time
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                if (mountedRef.current) {
                    setError(null);
                }
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [error]);

    return {
        handleAddToCart,
        handleDeleteFromCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        setQuantity,
        isAddedToCart,
        isDeletingFromCart,
        isLoading,
        currentQuantity,
        error,
        canIncrease,
        canDecrease
    };
}