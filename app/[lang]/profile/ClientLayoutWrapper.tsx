'use client';
import { ReactNode } from 'react';
import OrdersDefault from './_components/OrdersDefault';
import useDataStore from '@/stores/dataStore';
import { useParams, usePathname } from 'next/navigation';

interface Props {
  children: ReactNode,
  contentSeg: ReactNode,
  navSeg: ReactNode,
}

export default function ClientLayoutWrapper({ children, contentSeg, navSeg }: Props) {
  
    const { isRTL } = useDataStore()

  return (
    <div className={`max-w-300 w-full flex justify-stretch items-start gap-5 ${ isRTL ? "flex-row-reverse" : '' }`}>
        {children}
        {navSeg}
        {contentSeg}
    </div>
  );
}