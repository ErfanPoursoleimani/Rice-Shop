import { Address, CartProduct, Dict, Product, Review, Notification ,Tag, User } from '@/types/types';
import { Cart, Image, Order } from '@prisma/client';
import axios from 'axios';
import { create } from 'zustand';

// Add these interfaces if they don't exist in your types


interface DataStore {
    // State
    users: User[];
    carts: Cart[];
    products: Product[];
    tags: Tag[];
    cartProducts: CartProduct[];
    orders: Order[];
    images: Image[];
    notifications: Notification[];
    addresses: Address[];
    reviews: Review[];
    dict: Dict;
    isRTL: boolean;
    error: string;
    loading: boolean;
    
    // Configuration
    lang: string;
    cartId: number | null;
    isAuthenticated: boolean
    
    // Actions
    setUsers: (users: User[]) => void;
    setCarts: (carts: Cart[]) => void;
    setProducts: (products: Product[]) => void;
    setTags: (tags: Tag[]) => void;
    setCartProducts: (lang: string, cartProducts: CartProduct[], productId: number, cartId: number | null) => void;
    setOrders: (orders: Order[]) => void;
    setImages: (images: Image[]) => void;
    setNotifications: (notifications: Notification[]) => void;
    setAddresses: (addresses: Address[]) => void;
    setReviews: (reviews: Review[]) => void;
    setDict: (dict: Dict) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
    setLang: (lang: string) => void;
    setCartId: (cartId: number | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void
    
    // API Actions
    fetchTags: (lang: string) => Promise<void>;
    fetchUsers: (lang: string) => Promise<void>;
    fetchCarts: (lang: string) => Promise<void>;
    fetchProducts: (lang: string) => Promise<void>;
    fetchOrders: (lang: string) => Promise<void>;
    fetchImages: (lang: string) => Promise<void>;
    fetchNotifications: (lang: string, userId?: number | null) => Promise<void>;
    fetchAddresses: (lang: string, userId?: number | null) => Promise<void>;
    fetchReviews: (lang: string, userId?: number | null) => Promise<void>;
    fetchCartProducts: (lang: string, isAuthenticated: boolean, cartId?: number | null) => Promise<void>;
    fetchDict: (lang: string) => Promise<void>;
    
    // Utility Actions
    initializeStore: (lang: string, isAuthenticated: boolean, cartId?: number | null, userId?: number | null) => Promise<void>;
    clearError: () => void;
    getProduct: (productId: number) => Product | null;
    reset: () => void;
}

const initialDict: Dict = {
    logo: "SoleimaniRice",
    logoPt1: "Soleimani",
    logoPt2: "Rice",
    search: "Search",
    in: "in",
    enterEmailOrPhone: "Please enter your email or phone number",
    selectYourRegion: "Select your region",
    otherProducts: "Other Products",
    seeAllProducts: "All Products", 
    region: "Region",
    unitedArabEmirates: "United Arab Emirates",
    iran: "Iran",
    addresses: "Addresses",
    notifications: "Notifications",
    accountDetails: "Account Details",
    logout: "Logout",
    ordersHistory: "Orders History",
    myOrders: "My Orders",
    inProgress: "In Progress",
    canceled: "Canceled",
    sent: "Sent",
    description: "Description",
    no: "No",
    reviews: "Reviews",
    similarProducts: "Similar Products",
    recommendations: "Recommendations",
    orders: "Orders",
    activitySummary: "Activity Summary",
    ERROR_MESSAGES: {
        PHONE_NUMBER: "Please enter a valid phone number",
        PHONE_NUMBER_AND_EMAIL: "Please enter a valid phone number or email",
        POSTAL_CODE: "Postal code must be 10 digits",
        FIRST_NAME: "First name must be 3-20 characters",
        LAST_NAME: "Last name must be 3-25 characters",
        EMAIL: "Please enter a valid email address",
        URL: "Must be a valid URL starting with http or https",
        REQUIRED: "Dont leave this section empty"
    },
    links: {
        about: "About Us",
        contact: "Contact",
        products: "Products",
        home: "Home",
        users: "Users"
    },
    account: {
        register: "Register",
        login: "Login",
        logout: "LogOut",
        profile: "Profile",
        history: "History"
    },
    content: {
        homepage: {
            seeOurProducts: "our products",
            description: {
                first: {
                    title: "Unique aroma",
                    body: "Feel the pleasant smell of the northern rice fields in your home with every cooking."
                },
                second: {
                    title: "Exceptional taste",
                    body: "Each grain of taremi is tender and delicious, the pleasure of every bite is complete with this rice."
                },
                third: {
                    title: "Premium quality",
                    body: "From our best farms, straight to your table. Fresh and healthy, as it should be."
                }
            }
        }
    },
    shoppingCart: {
        continue: "continue"
    },
    product:{
        addToCart: "Add to Cart",
        deleteFromCart: "Delete from Cart",
        price: "Price",
        perkg: "per kg",
        currency: "$",
        label: "Label",
        massUnit: "Kg",
        products: {
            برنج_کشت_دوم: "Second Crop Rice",
            برنج_قهوه_ای: "Brown Rice",
            برنج_طارم_عطری: "Tarom Atri Rice",
            برنج_طارم_فجر: "Tarom Fajr Rice",
            برنج_بسمتی: "Basmati Rice",
            روغن_زیتون: "Olive Oil",
            روغن_کنجد: "Sesame Oil",
            روغن_نارگیل: "Coconut Oil",
            آرد_برنج: "Rice Flour",
            برنجک: "Rice Snack",
            لوبیا_چیتی: "Chickpeas",
            عدس: "Lentils",
            میوه_خشک: "Dried Fruits"
        },
        categories: {
            برنج_و_غلات: "Rice and Grains",
            روغن_ها: "Oils",
            حبوبات: "Legumes",
            محصولات_برنجی: "Rice Products",
            خشکبار: "Dried Goods"
        }
    }
};

// Define initial state as a constant to reuse in reset function
const initialState = {
    users: [],
    carts: [],
    products: [],
    tags: [],
    cartProducts: [],
    orders: [],
    images: [],
    notifications: [],
    addresses: [],
    reviews: [],
    dict: initialDict,
    isRTL: false,
    error: '',
    loading: false,
    lang: 'en',
    cartId: null,
    isAuthenticated: false,
};

// SSR-safe cookie manager (only for cookies, no localStorage)
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
    delete: (name: string, path: string = '/', domain?: string) => {
        if (typeof window === 'undefined') return;
        try {
            // Set the cookie with an expired date to delete it
            let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
            
            // Add domain if specified
            if (domain) {
                cookieString += ` domain=${domain};`;
            }
            
            document.cookie = cookieString;
        } catch (error) {
            console.error('Error deleting cookie:', error);
        }
    },
};

export const useDataStore = create<DataStore>()((set, get) => ({
    // Initial State
    ...initialState,

    // Basic Setters
    setUsers: (users) => set({ users }),
    setCarts: (carts) => set({ carts }),
    setProducts: (products) => set({ products }),
    setTags: (tags) => set({ tags }),
    setCartProducts: async(lang, cartProducts, productId ,cartId) => {
        set({loading: true})
        /* const updatedCartProducts: CartProduct[] = []
        if(get().cartId) {
            try {
                {cartProducts.map(async(cartProduct)=> {
                    const { data: updatedCartProduct } = await axios.post(`/${lang}/api/carts?cartId${cartId}&productId=${productId}`, cartProduct)
                    updatedCartProducts.push(updatedCartProduct)
                })}
            } catch (error) {
                set({error: "Error POST cartProducts"})
            }
        }
        set({ cartProducts: get().cartId ? updatedCartProducts : cartProducts }) */
        set({ cartProducts: [...cartProducts] })
        set({loading: false})
    },
    setOrders: (orders) => set({ orders }),
    setImages: (images) => set({ images }),
    setNotifications: (notifications) => set({ notifications }),
    setAddresses: (addresses) => set({ addresses }),
    setReviews: (reviews) => set({ reviews }),
    setDict: (dict) => set({ dict }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),
    setLang: (lang) => {
        set({ lang, isRTL: lang === 'fa' || lang === 'ar' });
        get().fetchDict(lang);
    },
    setCartId: (cartId) => set({ cartId }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

    // API Actions
    fetchTags: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/tags`);
            set({ tags: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchUsers: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/users`);
            set({ users: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchCarts: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/carts`);
            set({ carts: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchProducts: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/products`);
            set({ products: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchOrders: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/orders`);
            set({ orders: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchImages: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/images`);
            set({ images: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchNotifications: async (lang: string, userId?: number | null) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/notifications?userId=${userId}`);
            set({ notifications: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchAddresses: async (lang: string, userId?: number | null) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/addresses?userId=${userId}`);
            set({ addresses: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchReviews: async (lang: string, userId?: number | null) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/reviews?userId=${userId}`);
            set({ reviews: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchCartProducts: async (lang: string, isAuthenticated, cartId?: number | null) => {
        try {
            set({ loading: true });
            if (isAuthenticated) {
                if (cookieManager.get('cartProducts')) {
                    const parsedCookieCartProducts = cookieManager.get('cartProducts');
                    const cookieProducts: CartProduct[] = JSON.parse(parsedCookieCartProducts!);
                    for (const cartProduct of cookieProducts) {
                        await axios.post(`/${lang}/api/cartProducts?cartId=${cartId}&productId=${cartProduct.productId}`, cartProduct);
                    }
                    cookieManager.delete('cartProducts');
                }
                const { data } = await axios.get(`/${lang}/api/cartProducts?cartId=${cartId}`);
                set({ cartProducts: [...(data.cartProducts || [])] });
            } else {
                const cookieData = cookieManager.get('cartProducts');
                const cartProducts = cookieData ? JSON.parse(cookieData) : [];
                set({ cartProducts: [...cartProducts] });
            }
        } catch (err) {
            set({ error: err as string });
        } finally {
            set({ loading: false })
        }
    },

    fetchDict: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/dictionary?locale=${lang}`);
            set({ dict: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    // Initialize Store (replaces your useEffect logic)
    initializeStore: async (lang: string, isAuthenticated ,cartId?: number | null, userId?: number | null) => {
        set({ lang, cartId, isRTL: lang === 'fa' || lang === 'ar' });
        
        // Fetch all data in parallel
        const promises = [
            get().fetchTags(lang),
            get().fetchUsers(lang),
            get().fetchCarts(lang),
            get().fetchProducts(lang),
            get().fetchOrders(lang),
            get().fetchImages(lang),
            get().fetchNotifications(lang, userId),
            get().fetchAddresses(lang, userId),
            get().fetchReviews(lang, userId),
            get().fetchDict(lang),
            get().fetchCartProducts(lang, isAuthenticated, cartId),
        ];

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error initializing store:', error);
            set({ error: 'Failed to initialize store', loading: false });
        }
    },

    // Utility Actions
    clearError: () => set({ error: '' }),

    getProduct: (productId: number) => {
        const { products } = get();
        return products.find(p => p.id === productId) || null;
    },

    // Reset function - restores all state to initial values (no localStorage clearing)
    reset: () => {
        set(initialState);
        // Only clear cookies related to cart
        cookieManager.delete('cartProducts');
    }
}));

// Export individual selectors for better performance
export const selectProducts = (state: DataStore) => state.products;
export const selectCartProducts = (state: DataStore) => state.cartProducts;
export const selectNotifications = (state: DataStore) => state.notifications;
export const selectAddresses = (state: DataStore) => state.addresses;
export const selectReviews = (state: DataStore) => state.reviews;
export const selectDict = (state: DataStore) => state.dict;
export const selectIsRTL = (state: DataStore) => state.isRTL;
export const selectError = (state: DataStore) => state.error;
export const selectLoading = (state: DataStore) => state.loading;

export default useDataStore;