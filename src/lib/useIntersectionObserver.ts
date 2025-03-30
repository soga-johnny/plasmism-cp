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

    const element = elementRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting];
} 