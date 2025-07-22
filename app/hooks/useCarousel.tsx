import { useState, useEffect, useCallback, useRef } from 'react'

interface UseCarouselOptions {
  itemCount: number
  autoPlay?: boolean
  autoPlayDelay?: number
  loop?: boolean
  startIndex?: number
  onSlideChange?: (index: number) => void
}

interface UseCarouselReturn {
  currentIndex: number
  isPlaying: boolean
  goToSlide: (index: number) => void
  goToNext: () => void
  goToPrevious: () => void
  play: () => void
  pause: () => void
  toggle: () => void
  getSliderProps: () => {
    onMouseEnter: () => void
    onMouseLeave: () => void
    onTouchStart: () => void
    onTouchEnd: () => void
    className: string
  }
  getSlidesContainerProps: () => {
    style: {
      transform: string
      transition: string
    }
    className: string
  }
  getSlideProps: (index: number) => {
    key: number
    className: string
    'data-active': boolean
  }
  getDotProps: (index: number) => {
    key: number
    onClick: () => void
    className: string
    'aria-label': string
    'data-active': boolean
  }
  getArrowProps: (direction: 'prev' | 'next') => {
    onClick: () => void
    disabled: boolean
    className: string
    'aria-label': string
  }
  progress: number
}

export function useCarousel({
  itemCount,
  autoPlay = true,
  autoPlayDelay = 3000,
  loop = true,
  startIndex = 0,
  onSlideChange
}: UseCarouselOptions): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>(null!)
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrentIndex(index)
      onSlideChange?.(index)
      progressRef.current = 0
      setProgress(0)
    }
  }, [itemCount, onSlideChange])

  const goToNext = useCallback(() => {
    if (loop) {
      const nextIndex = (currentIndex + 1) % itemCount
      goToSlide(nextIndex)
    } else if (currentIndex < itemCount - 1) {
      goToSlide(currentIndex + 1)
    }
  }, [currentIndex, itemCount, loop, goToSlide])

  const goToPrevious = useCallback(() => {
    if (loop) {
      const prevIndex = currentIndex === 0 ? itemCount - 1 : currentIndex - 1
      goToSlide(prevIndex)
    } else if (currentIndex > 0) {
      goToSlide(currentIndex - 1)
    }
  }, [currentIndex, itemCount, loop, goToSlide])

  const play = useCallback(() => {
    setIsPlaying(true)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
    setIsPaused(true)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  // Auto-play logic with progress tracking
  useEffect(() => {
    if (isPlaying && !isPaused && itemCount > 1) {
      const progressInterval = setInterval(() => {
        progressRef.current += 50 // Update every 50ms
        setProgress((progressRef.current / autoPlayDelay) * 100)
        
        if (progressRef.current >= autoPlayDelay) {
          goToNext()
        }
      }, 50)

      return () => clearInterval(progressInterval)
    }
  }, [isPlaying, isPaused, autoPlayDelay, goToNext, itemCount])

  // Pause on hover/touch
  const handleMouseEnter = useCallback(() => {
    if (isPlaying) setIsPaused(true)
  }, [isPlaying])

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) setIsPaused(false)
  }, [isPlaying])

  const handleTouchStart = useCallback(() => {
    if (isPlaying) setIsPaused(true)
  }, [isPlaying])

  const handleTouchEnd = useCallback(() => {
    if (isPlaying) {
      setTimeout(() => setIsPaused(false), 2000) // Resume after 2s
    }
  }, [isPlaying])

  const getSliderProps = useCallback(() => ({
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    className: 'relative overflow-hidden group'
  }), [handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchEnd])

  const getSlidesContainerProps = useCallback(() => ({
    style: {
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: 'transform 0.5s ease-in-out'
    },
    className: 'flex w-full h-full'
  }), [currentIndex])

  const getSlideProps = useCallback((index: number) => ({
    key: index,
    className: 'w-full h-full flex-shrink-0',
    'data-active': index === currentIndex
  }), [currentIndex])

  const getDotProps = useCallback((index: number) => ({
    key: index,
    onClick: () => goToSlide(index),
    className: `w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
      index === currentIndex 
        ? 'bg-white scale-110' 
        : 'bg-white/50 hover:bg-white/75'
    }`,
    'aria-label': `Go to slide ${index + 1}`,
    'data-active': index === currentIndex
  }), [currentIndex, goToSlide])

  const getArrowProps = useCallback((direction: 'prev' | 'next') => {
    const isNext = direction === 'next'
    const canMove = loop || (isNext ? currentIndex < itemCount - 1 : currentIndex > 0)
    
    return {
      onClick: isNext ? goToNext : goToPrevious,
      disabled: !canMove,
      className: `absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 text-white 
        hover:bg-black/40 transition-all duration-200 backdrop-blur-sm
        ${isNext ? 'right-4' : 'left-4'} 
        ${canMove ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
        opacity-0 group-hover:opacity-100`,
      'aria-label': isNext ? 'Next slide' : 'Previous slide'
    }
  }, [currentIndex, itemCount, loop, goToNext, goToPrevious])

  return {
    currentIndex,
    isPlaying: isPlaying && !isPaused,
    goToSlide,
    goToNext,
    goToPrevious,
    play,
    pause,
    toggle,
    getSliderProps,
    getSlidesContainerProps,
    getSlideProps,
    getDotProps,
    getArrowProps,
    progress
  }
}