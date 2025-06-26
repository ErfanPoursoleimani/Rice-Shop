import { NextResponse, NextRequest } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
 
let locales = ['en', 'de', 'fa', 'ar']
 
// Get the preferred locale
function getLocale(request: NextRequest) { 
    let headers = { 'accept-language': request.headers.get('accept-language')! }
    let languages = new Negotiator({ headers }).languages()
    let defaultLocale = 'en'
    return match(languages, locales, defaultLocale);
}
 
export async function middleware(request: NextRequest) {

  // User authentication
/*   const router = useRouter()
  const cookieStore = await cookies()
  const auth = await axios.post('/api/auth', { jwt: cookieStore.get("jwt")?.value })
  const isAuthorized = auth.data.isAuthorized
  const userRole = auth.data.role
  isAuthorized ? userRole === "ADMIN" ? router.push(`/${getLocale(request)}/`) : router.push(`/${getLocale(request)}/`)
 */



  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if(pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}