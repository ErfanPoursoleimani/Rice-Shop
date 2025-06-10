'use client'
import { useParams } from "next/navigation";


const IsLTR = () => {
    const { lang } = useParams()
    return (
      (!(lang === 'fa' || lang === 'ar'))
    )
}

export default IsLTR
