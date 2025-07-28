'use client'
import useDataStore from '@/stores/dataStore';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import LargeLogo from '../_components/LargeLogo';
import MainView from './components/MainView';
import ProductsSection from './components/ProductsSection';

const HomeSec = () => {

    const { lang } = useParams()
    const { isRTL } = useDataStore()

  return (
    <div className='flex flex-col'>
      <MainView />
      <div className={classNames({
        "text-end flex-row-reverse": isRTL,
        "w-[100%] md:px-[4vw] md:py-10 flex items-center justify-evenly xl:gap-[4.3rem] text-[var(--light-text)]": true,
      })}>
          <LargeLogo />
          <ProductsSection />
      </div>
    </div>
  )
}

export default HomeSec
