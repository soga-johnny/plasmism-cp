'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 3Dシーンの読み込みが完了したらローディング画面を非表示にする
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // フェードアウトアニメーションの時間と同じ
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#2B2325] ${isFading ? 'fade-out' : ''}`}
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundRepeat: 'repeat'
      }}
    >
      <div className="relative w-48 h-48 fade-in">
        <Image
          src="/logo.svg"
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
} 