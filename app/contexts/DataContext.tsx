'use client'
import axios from "axios"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product, CartProduct, User, Cart, Order, Image } from "@prisma/client"
import { useCookies } from "next-client-cookies"

interface Dict {
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
            logo: string,
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
            برنج_طارم_فجر: string
        }
    }
}

interface DataContextType {
    user: User | null,
    users: User[],
    carts: Cart[],
    products: Product[],
    cartProducts: ({product: Product} & CartProduct)[],
    orders: Order[],
    images: Image[],
    dict: Dict,
    error: string
}

interface Props { 
    children: ReactNode, 
    lang: string, 
    cartId?: number | null, 
    userId?: number | null 
}

const DataContext = createContext<DataContextType | undefined>(undefined)
export const DataProvider = ({ children, lang, cartId, userId }: Props) => {

    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [carts, setCarts] = useState([])
    const [products, setProducts] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [images, setImages] = useState([])
    const initialDict = {
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
                logo: "SoleimaniRice",
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
                برنج_طارم_فجر: "Tarom Fajr Rice"
            }
        }
    }

    const [dict, setDict] = useState(initialDict)
    
    const [error, setError] = useState<string>('')
    
    useEffect(() => {
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
    }, [, lang, cookies.get('cartProducts')])
    
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
    }, [, lang])

    return (
        <DataContext.Provider value={{user, users, carts, products, cartProducts, orders, images, dict, error }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(DataContext)
    if(!context) throw new Error("useData must be used within a DataProvider")
    return context
}