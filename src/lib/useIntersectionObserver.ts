'use client';

import { useState, useEffect, useRef, MutableRefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export default function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  }
): [MutableRefObject<T | null>, boolean] {
  const elementRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting];
} 