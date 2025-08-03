import React from 'react'
import CategoryDropdown from './CategoryDropdown'
import RegionDropdown from './RegionDropdown'
import useDataStore from '@/stores/dataStore'
import { useParams, usePathname } from 'next/navigation'
import { Link } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

const Footer = () => {

    const { isRTL } = useDataStore()
    const { role } = useAuthStore()
    const { lang } = useParams()
    const currentPath = usePathname()

  return (
    <footer 
        className={`lg:px-[10%] px-3 flex items-stretch gap-2 h-12`}
        style={{
          justifyContent: 
            isRTL ? 'justify-end' : 'justify-start',
          flexDirection:
            isRTL ? 'row-reverse' : 'row',

        }}
      >
        <CategoryDropdown />
        <RegionDropdown />
{/*         <Link href={`/${lang}/admin/dashboard`} className={`truncate border-1 border-neutral-200 text-neutral-600 p-2 rounded-[7px] flex items-center justify-center ${role === "ADMIN" ? "block" : "hidden"} ${currentPath.startsWith(`/${lang}/admin`) ? "hidden" : 'block'}`}>
          Admin
        </Link>
        <Link href={`/${lang}`} className={`truncate border-1 border-neutral-200 text-neutral-600 p-2 rounded-[7px] flex items-center justify-center ${role === "ADMIN" ? "block" : "hidden"} ${currentPath.startsWith(`/${lang}/admin`) ? "block" : 'hidden'}`}>
          User
        </Link> */}
      </footer>
  )
}

export default Footer
