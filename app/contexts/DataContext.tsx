'use client'
import axios from "axios"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product, CartProduct, User, Cart, Order, Image, Tag } from "@prisma/client"
import { useCookies } from "next-client-cookies"

interface Dict {
    logo: string,
    logoPt1: string,
    logoPt2: string,
    search: string,
    in: string,
    selectYourRegion: string,
    otherProducts: string,
    seeAllProducts: string,
    ERROR_MESSAGES: {
        PHONE_NUMBER: string,
        PHONE_NUMBER_AND_EMAIL: string, 
        POSTAL_CODE: string ,
        FIRST_NAME: string ,
        LAST_NAME: string ,
        EMAIL: string ,
        URL: string ,
        REQUIRED: string 
    },
    links: {
        about: string,
        contact: string,
        products: string,
        home: string,
        orders: string,
        users: string
    },
    account: {
        register: string,
        login: string,
        logout: string,
        profile: string,
        history: string
    },
    content: {
        homepage: {
            seeOurProducts: string,
            description: {
                first: {
                    title: string,
                    body: string
                },
                second: {
                    title: string,
                    body: string
                },
                third: {
                    title: string,
                    body: string
                }
            }
        }
    },
    shoppingCart: {
        continue: string
    },
    product:{
        addToCart: string,
        deleteFromCart: string,
        price: string,
        perkg: string,
        currency: string,
        label: string,
        massUnit: string,
        products: {
            برنج_کشت_دوم: string,
            برنج_قهوه_ای: string,
            برنج_طارم_عطری: string,
            برنج_طارم_فجر: string,
            برنج_بسمتی: string,
            روغن_زیتون: string,
            روغن_کنجد: string,
            روغن_نارگیل: string,
            آرد_برنج: string,
            برنجک: string,
            لوبیا_چیتی: string,
            عدس: string,
            میوه_خشک: string
        },
        categories: {
            برنج_و_غلات: string,
            روغن_ها: string,
            حبوبات: string,
            محصولات_برنجی: string,
            خشکبار: string
        }
    }
}

interface DataContextType {
    user: User | null,
    users: User[],
    carts: Cart[],
    products: ({images: Image[]} & Product)[],
    // getProduct: (productId: number) => ({images: Image[]} & Product) | null,
    tags: ({products: ({images: Image[]} & Product)[]} & Tag)[],
    cartProducts: ({product: {images: Image[]} & Product} & CartProduct)[],
    orders: Order[],
    images: Image[],
    dict: Dict,
    isRTL: boolean,
    error: string
}

interface Props { 
    children: ReactNode, 
    lang: string, 
    cartId?: number | null, 
    userId?: number | null 
}

const initialDict: Dict = {
    logo: "SoleimaniRice",
    logoPt1: "Soleimani",
    logoPt2: "Rice",
    search: "Search",
    in: "in",
    selectYourRegion: "Select your region",
    otherProducts: "Other Products",
    seeAllProducts: "All Products", 
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
        orders: "Orders",
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
}

const DataContext = createContext<DataContextType | undefined>(undefined)
export const DataProvider = ({ children, lang, cartId, userId }: Props) => {

    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [carts, setCarts] = useState([])
    const [products, setProducts] = useState<({images: Image[]} & Product)[]>([])
    const [tags, setTags] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [images, setImages] = useState([])
    const [dict, setDict] = useState(initialDict)
    const [error, setError] = useState<string>('')
    const [isRTL, setIsRTL] = useState(false)
    
    useEffect(() => {
        
        const fetchTags = async () => {
            try {
                const data = await (await axios.get('/api/tags')).data
                setTags(data)
            } catch(err) {
                setError(err as string)
            }
        }
        const fetchUsers = async () => {
            try {
                const data = await (await axios.get('/api/users')).data
                setUsers(data)
            } catch(err) {
                setError(err as string)
            }
        }
        const fetchCarts = async () => {
            try {
                const data = await (await axios.get('/api/carts')).data
                setCarts(data)
            } catch(err) {
                setError(err as string)
            }
        }
        const fetchProducts = async () => {
            try {
                const data = await (await axios.get('/api/products')).data
                setProducts(data)
            } catch(err) {
                setError(err as string)
            }
        }
        const fetchOrders = async () => {
            try {
                const data = await (await axios.get('/api/orders')).data
                setOrders(data)
            } catch(err) {
                setError(err as string)
            }
        }
        const fetchImages = async () => {
            try {
                const data = await (await axios.get('/api/images')).data
                setImages(data)
            } catch(err) {
                setError(err as string)
            }
        }
        
        
        fetchTags()
        fetchUsers()
        fetchCarts()
        fetchProducts()
        fetchOrders()
        fetchImages()
    }, [])


    const cookies = useCookies()
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                if(cartId){
                    const data = (await axios.get(`/api/cartProducts?cartId=${cartId}`)).data
                    setCartProducts(data)
                } else {
                    setCartProducts(JSON.parse(cookies.get("cartProducts")!))
                }
            } catch (err) {
                setError(err as string)
            }
        }
        fetchCartProducts()
    }, [, cookies.get('cartProducts')])
    
    useEffect(() => {
        if(userId){
            cookies.remove('cartProducts')
            const fetchUser = async () => {
                try {
                    const data = await (await axios.get(`/api/users/${userId}`)).data
                    setUser(data)
                } catch(err) {
                    setError(err as string)
                }
            }
            fetchUser()
        } else {
            cookies.set('cartProducts', "[]")
        }
    }, [, userId])

    useEffect(() => {
        (async function fetchDict () {
            try {
                const res = await axios.get(`/api/dictionary?locale=${lang}`)
                const data = await res.data
                setDict(data)
            } catch(err) {
                setError(err as string)
            }
        })()

        lang === 'fa' || lang === 'ar' ? setIsRTL(true) : setIsRTL(false)
        
    }, [ lang ])

    return (
        <DataContext.Provider value={{user, users, carts, products, tags, cartProducts, orders, images, dict, isRTL, error }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(DataContext)
    if(!context) throw new Error("useData must be used within a DataProvider")
    return context
}