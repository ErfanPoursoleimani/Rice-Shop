import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import useDataStore from '@/stores/dataStore';
import { CartProduct, Product } from '@/types/types';
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

// Cookie manager for non-authenticated users
const cookieManager = {
    get: (name: string) => {
        if (typeof window === 'undefined') return null;
        try {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [key, value] = cookie.trim().split('=');
                if (key === name) return decodeURIComponent(value);
            }
            return null;
        } catch (error) {
            console.error('Error reading cookie:', error);
            return null;
        }
    },
    set: (name: string, value: string, days = 30) => {
        if (typeof window === 'undefined') return;
        try {
            const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
        } catch (error) {
            console.error('Error setting cookie:', error);
        }
    },
    remove: (name: string) => {
        if (typeof window === 'undefined') return;
        try {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        } catch (error) {
            console.error('Error removing cookie:', error);
        }
    }
};

// Custom hook for toast notifications (you can replace with your preferred toast library)
const useToast = () => {
    return {
        success: (message: string) => console.log('Success:', message),
        error: (message: string) => console.error('Error:', message),
        info: (message: string) => console.info('Info:', message)
    };
};

const modifyCartProducts = () => {

} 

export function useCartAction(product: Product): CartActionReturn {
    const router = useRouter();
    const { userId } = useAuthStore();
    const { cartProducts, setCartProducts, cartId, lang } = useDataStore();
    const toast = useToast();
    
    const [isDeletingFromCart, setIsDeletingFromCart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = Boolean(userId);

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

    // Update cart products in store and cookies for non-authenticated users
    const updateCartState = useCallback((newCartProducts: CartProduct[]) => {
        setCartProducts(newCartProducts);
        if (!isAuthenticated) {
            cookieManager.set('cartProducts', JSON.stringify(newCartProducts));
        }
    }, [setCartProducts, isAuthenticated]);

    // Handle cookie cart operations for non-authenticated users
    const handleCookieCart = useCallback((operation: 'add' | 'update' | 'delete', quantity?: number) => {
        const existingItem = cartProducts.find(cp => cp.productId === product.id);
        let newCartProducts: CartProduct[];
        
        switch (operation) {
            case 'add':
                if (existingItem) {
                    newCartProducts = cartProducts.map(cp => 
                        cp.productId === product.id 
                            ? { ...cp, quantity: cp.quantity + 1 }
                            : cp
                    );
                } else {
                    newCartProducts = [...cartProducts, { 
                        id: Date.now(), // temporary ID for cookie cart
                        cartId: null,
                        productId: product.id,
                        quantity: 1,
                        product: product
                    }];
                }
                break;
            case 'update':
                if (existingItem && quantity !== undefined) {
                    newCartProducts = cartProducts.map(cp => 
                        cp.productId === product.id 
                            ? { ...cp, quantity }
                            : cp
                    );
                } else {
                    return;
                }
                break;
            case 'delete':
                newCartProducts = cartProducts.filter(cp => cp.productId !== product.id);
                break;
            default:
                return;
        }
        
        updateCartState(newCartProducts);
    }, [cartProducts, product, updateCartState]);

    // Generic API call handler for authenticated users
    const handleApiCall = useCallback(async (
        apiCall: () => Promise<any>,
        successMessage?: string
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            await apiCall();
            
            // Refresh data for authenticated users
            if (isAuthenticated) {
                router.refresh();
            }
            
            if (successMessage) {
                toast.success(successMessage);
            }
        } catch (error) {
            handleError(error, 'update cart');
        } finally {
            setIsLoading(false);
        }
    }, [router, toast, handleError, isAuthenticated]);

    // Validation helper
    const validateCartAction = useCallback((action: string): boolean => {
        if (!product) {
            toast.error('Product not found');
            return false;
        }
        
        if (action !== 'delete' && !product.stock) {
            toast.error('This product is out of stock');
            return false;
        }
        
        return true;
    }, [product, toast]);

    const handleIncreaseQuantity = useCallback(async () => {
        if (!validateCartAction('increase') || !cartItem || !canIncrease) return;
        
        const newQuantity = currentQuantity + 1;
        
        if (isAuthenticated && cartId) {
            await handleApiCall(
                () => axios.post(`/${lang}/api/cartProducts`, {
                    cartId: cartId,
                    productId: cartItem.productId,
                    quantity: newQuantity
                }),
                'Quantity increased'
            );
        } else {
            handleCookieCart('update', newQuantity);
            toast.success('Quantity increased');
        }
    }, [validateCartAction, cartItem, canIncrease, currentQuantity, isAuthenticated, cartId, lang, handleApiCall, handleCookieCart, toast]);

    const handleAddToCart = useCallback(async () => {
        if (!validateCartAction('add')) return;
        
        // If already in cart, just increase quantity
        if (isAddedToCart) {
            await handleIncreaseQuantity();
            return;
        }
        
        if (isAuthenticated && cartId) {
            await handleApiCall(
                () => axios.post(`/${lang}/api/cartProducts`, {
                    cartId: cartId,
                    productId: product.id,
                    quantity: 1
                }),
                'Added to cart'
            );
        } else {
            handleCookieCart('add');
            toast.success('Added to cart');
        }
    }, [validateCartAction, isAddedToCart, handleIncreaseQuantity, isAuthenticated, cartId, lang, product.id, handleApiCall, handleCookieCart, toast]);

    const handleDecreaseQuantity = useCallback(async () => {
        if (!validateCartAction('decrease') || !cartItem || !canDecrease) return;
        
        const newQuantity = currentQuantity - 1;
        
        if (isAuthenticated && cartId) {
            await handleApiCall(
                () => axios.post(`/${lang}/api/cartProducts`, {
                    cartId: cartId,
                    productId: cartItem.productId,
                    quantity: newQuantity
                }),
                'Quantity decreased'
            );
        } else {
            handleCookieCart('update', newQuantity);
            toast.success('Quantity decreased');
        }
    }, [validateCartAction, cartItem, canDecrease, currentQuantity, isAuthenticated, cartId, lang, handleApiCall, handleCookieCart, toast]);

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
        
        if (isAuthenticated && cartId) {
            await handleApiCall(
                () => axios.post(`/${lang}/api/cartProducts`, {
                    cartId: cartId,
                    productId: cartItem.productId,
                    quantity: quantity
                }),
                'Quantity updated'
            );
        } else {
            handleCookieCart('update', quantity);
            toast.success('Quantity updated');
        }
    }, [validateCartAction, cartItem, product.stock, toast, isAuthenticated, cartId, lang, handleApiCall, handleCookieCart]);

    const handleDeleteFromCart = useCallback(async () => {
        if (!validateCartAction('delete') || !cartItem) return;
        
        setIsDeletingFromCart(true);
        
        try {
            if (isAuthenticated && cartId) {
                await axios.delete(`/${lang}/api/cartProducts?cartId=${cartId}&productId=${cartItem.productId}`);
                router.refresh();
            } else {
                handleCookieCart('delete');
            }
            
            toast.success('Removed from cart');
        } catch (error) {
            handleError(error, 'remove from cart');
        } finally {
            setIsDeletingFromCart(false);
        }
    }, [validateCartAction, cartItem, isAuthenticated, cartId, lang, router, handleCookieCart, toast, handleError]);

    // Load cart products from cookie on mount for non-authenticated users
    useEffect(() => {
        if (!isAuthenticated && cartProducts.length === 0) {
            const cookieData = cookieManager.get('cartProducts');
            if (cookieData) {
                try {
                    const parsedData = JSON.parse(cookieData);
                    setCartProducts(parsedData);
                } catch (error) {
                    console.error('Error parsing cart cookie:', error);
                }
            }
        }
    }, [isAuthenticated, cartProducts.length, setCartProducts]);

    // Clear error after some time
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
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