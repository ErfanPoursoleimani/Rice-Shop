'use client'
import { AddressPicker } from '@/app/[lang]/_components/AddressPicker'
import Loading from '@/app/[lang]/_components/Loading'
import { useAuthStore } from '@/stores/authStore'
import useDataStore from '@/stores/dataStore'
import { Address } from '@/types/types'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { RiEdit2Fill } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'

const AddressCard = ({address}: {address: Address}) => {

    const { lang } = useParams()
    const { isRTL, fetchAddresses } = useDataStore()
    const { user, userId } = useAuthStore()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)

    const handleAddressOption = async() => {
        
    }

    const handleDeleteAddress = async() => {
        try {
            await axios.delete(`/${lang}/api/addresses/${address.id}`)
            await fetchAddresses(lang as string, userId)
            setIsOptionsOpen(false)
        } catch (error) {
            throw error
        }
    }
    
    const handleEditAddress = async() => {
        try {
            await fetchAddresses(lang as string, userId)
            setIsOptionsOpen(false)
        } catch (error) {
            throw error
        }
    }

  return (
    <div className={`min-h-25 flex justify-stretch items-stretch ${isRTL ? "flex-row-reverse" : ""} border-1 border-[var(--theme)] text-neutral-500 w-full rounded-[6px] py-3 px-1 h-max`}>
        <span className={` w-15 flex justify-center`}>
            <SlLocationPin className='text-[var(--theme)] text-[22px]'/>
        </span>
        <div className={`flex-1 flex flex-col gap-1 justify-stretch ${isRTL ? "items-end" : ""}`}>
            <span className={`flex-1 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p className='text-[var(--theme)]'>
                {`${address.province}
                    ${address.city}
                    ${address.address}`}
                </p>
            </span>
            <span className={`flex-1 flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>PostalCode</p>
                <p>
                {`${address.postalCode}`}
                </p>
            </span>
            <span className={`flex-1 flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>Reciever</p>
                <p>
                {user?.firstName && user.lastName ? `${user?.firstName} ${user?.lastName} | ${user.phoneNumber}` : `${user?.phoneNumber}`}
                </p>
            </span>
        </div>
        <span className={`md:relative w-10 flex flex-col ${isRTL ? "justify-" : ""}`}>
            <HiDotsVertical onClick={() => setIsOptionsOpen(!isOptionsOpen)} className='text-[22px]'/>
            {isOptionsOpen &&
                <>
                    <ul className={`pb-6 pt-5 md:pb-0 md:pt-0 md:absolute fixed bottom-0 left-0 md:top-8 z-104 h-max min-w-full md:min-w-60 flex shadow-xl flex-col border-1 text-[0.8rem] md:text-[1rem] border-neutral-200 rounded-t-3xl md:rounded-[7px] bg-white ${isRTL ? "" : "right-0 md:-left-60"}`}>
                        <p className={`md:hidden px-4 py-5 text-[1rem] text-black`}>Address' settings</p>
                        <li onClick={handleDeleteAddress} className={`select-none w-full md:p-4 px-4 py-3 text-red-600 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""} md:border-b-1 border-neutral-200`}>
                            <FaRegTrashAlt className={`text-[1.1rem]`}/>
                            <p>Delete</p>
                        </li>
                        <li onClick={handleEditAddress} className={`select-none w-full flex items-center gap-3`}>
                            
                            <AddressPicker 
                                addressId={`${address.id}`} 
                                purpose={'patch'} 
                                buttonContent={
                                    loading 
                                    ? <Loading className='text-red-600'/> 
                                    : <><RiEdit2Fill className={`text-[1.1rem]`}/><p>Edit</p></>} 
                                className={`w-full h-full md:p-4 px-4 py-3 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}/>
                        </li>
                    </ul>
                </>
            }
        </span>
    </div>
  )
}

export default AddressCard
