'use client'
import useDataStore from '@/stores/dataStore'
import { Product, User } from '@/types/types'
import { useParams } from 'next/navigation'

const UserCard = ({user}: {user: User}) => {

    const { lang } = useParams()
    const { isRTL, fetchAddresses } = useDataStore()

  return (
    <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""} border-1 border-neutral-200 text-neutral-700 w-full rounded-[6px] py-3 px-1 h-max`}>
        <span>{user.phoneNumber}</span>
        <span>{user.firstName}</span>
        <span>{user.lastName}</span>
        <span>{user.email}</span>
        <span>{user.nationalCode}</span>
        <span className={`flex items-center`}>
          {user.reviews.map((review) => (
            <span key={review.id} className={`flex flex-col justify-center items-stretch`}>
              <p>{review.message}</p>
              <p>{review.rating}</p>
            </span>
          ))}
        </span>
    </div>
  )
}

export default UserCard
