import { 
    Product as PrismaProduct, 
    CartProduct as PrismaCartProduct, 
    Review as PrismaReview, 
    Image as PrismaImage, 
    Tag as PrismaTag,
    Order as PrismaOrder,
    Address as PrismaAddress,
    Notification as PrismaNotification,
    User as PrismaUser,
    Cart as PrismaCart,
} from "@prisma/client"

interface CartProductCartIdNullable{
    id: number;
    cartId: number | null;
    quantity: number;
    productId: number;
}
export type Product = ({images: PrismaImage[]} & {reviews: PrismaReview[]} & PrismaProduct)
export type Tag = ({products: ({images: PrismaImage[]} & {reviews: PrismaReview[]} & PrismaProduct)[]} & PrismaTag)
export type CartProduct = ({product: {images: PrismaImage[]} & {reviews: PrismaReview[]} & PrismaProduct} & CartProductCartIdNullable)
export type User = ({orders: PrismaOrder[]} & {addresses: PrismaAddress[]} & {notifications: PrismaNotification[]} & {reviews: PrismaReview[]} & PrismaUser)
export type Cart = ({products: PrismaProduct[]} & PrismaCart)



export interface Dict {
    logo: string,
    logoPt1: string,
    logoPt2: string,
    search: string,
    in: string,
    enterEmailOrPhone: string,
    selectYourRegion: string,
    otherProducts: string,
    seeAllProducts: string,
    region: string,
    unitedArabEmirates: string,
    iran: string,

    addresses: string,
    notifications: string,
    accountDetails: string,
    logout: string,

    ordersHistory: string,
    myOrders: string,

    inProgress: string,
    canceled: string,
    sent: string,

    description: string,
    no: string,
    reviews: string,
    similarProducts: string,
    recommendations: string,
    orders: string,
    activitySummary: string,

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