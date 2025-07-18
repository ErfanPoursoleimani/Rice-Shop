'use client'
import { Product } from '@/types/types';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import PricingAndButton from './components/PricingAndButton';
import classNames from 'classnames';
import useDataStore from '@/stores/dataStore';
import Link from 'next/link';



const ProductCard =  ({ product }: { product: Product} ) => {

  const router = useRouter()
  const { lang } = useParams()
  const { dict, isRTL } = useDataStore()
  const { id, description, label } = product
  const { products } = dict.product
  
  // Hovering effects on the card
  const [scale, setScale] = useState('')
  const handleHoverOverCard = (mode: string) => {
    setScale(mode === "enter" ? 'scale-103' : '')
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true)
    handleHoverOverCard('enter')
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    handleHoverOverCard("leave")
  };


  
  return (
      <Link href={`/${lang}/products/${id}`}>
        <div
        ref={cardRef}
        className={classNames({
          'text-left': !(isRTL),
          'text-right': isRTL,
          'hover:cursor-pointer md:min-w-50 md:min-h-70 min-h-60 min-w-45 bg-cover text-[var(--light-text)] relative flex justify-center items-center overflow-clip select-none': true})}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isHovered
              ? `rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg) translateZ(20px)`
              : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
            backgroundImage: `url(${product.images[0].url})`,
            transition: isHovered ? 'none' : 'transform 2s ease-out'
          }}
        >
          <div className='absolute w-full h-[500px] bg-[#00000011] z-2'></div>
          <div className='md:p-4 p-3 z-3 w-full h-[50%] rounded-b-[7px] fixed bottom-0 flex flex-col justify-between bg-[#00000034] backdrop-blur-[4px] text-[var(--light-text)]'>
            <h2 className="truncate md:text-[22px] text-[17px]">{products[label as keyof typeof products]}</h2>
            <div
              className={`
                w-full flex justify-between items-end
                ${isRTL ? "flex-row-reverse" : "flex-row"}
              `}
            >
              <PricingAndButton product={product}/>
            </div>
          </div>
        </div>
      </Link>
  )
}

export default ProductCard
