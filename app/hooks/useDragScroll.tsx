import { useRef, useCallback, MouseEvent } from 'react';

interface DragProps {
    ref: React.RefObject<HTMLDivElement | null>;
    onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: () => void;
    onMouseUp: () => void;
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
}

interface DragScrollReturn {
    dragProps: DragProps
}

export function useDragScroll(): DragScrollReturn {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    
    isDown.current = true;
    scrollRef.current.style.cursor = 'grabbing';
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!scrollRef.current) return;
    isDown.current = false;
    scrollRef.current.style.cursor = 'grab';
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!scrollRef.current) return;
    isDown.current = false;
    scrollRef.current.style.cursor = 'grab';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const dragProps: DragProps = {
    ref: scrollRef,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove,
  };

  return { dragProps };
}