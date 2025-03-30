'use client';

import { ReactNode } from 'react';
import useIntersectionObserver from '@/lib/useIntersectionObserver';

interface SmoothScrollItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function SmoothScrollItem({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  direction = 'up'
}: SmoothScrollItemProps) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '0px'
  });

  // 方向に基づいた初期スタイルを決定
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 30px, 0)';
      case 'down':
        return 'translate3d(0, -30px, 0)';
      case 'left':
        return 'translate3d(30px, 0, 0)';
      case 'right':
        return 'translate3d(-30px, 0, 0)';
      case 'none':
        return 'translate3d(0, 0, 0)';
      default:
        return 'translate3d(0, 30px, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'translate3d(0, 0, 0)' : getInitialTransform(),
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
} 