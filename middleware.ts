import { NextRequest } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
 

// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {

})