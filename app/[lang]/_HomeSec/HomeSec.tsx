'use client'
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import HomeSecProducts from './components/HomeSecProducts';
import HomeSecText from './components/HomeSecText';
import useDataStore from '@/stores/dataStore';

const HomeSec = () => {

    const { lang } = useParams()
    const { isRTL } = useDataStore()

  return (
    <div className={classNames({
        "text-end flex-row-reverse": isRTL,
        "md:min-h-[calc(100vh-80px)] w-[100%] md:px-15 flex flex-wrap items-center justify-center gap-[15vh] 1484:gap-[5vw] text-[var(--light-text)]": true,
    })}>
        <HomeSecText />
        <HomeSecProducts />
    </div>
  )
}

export default HomeSec
