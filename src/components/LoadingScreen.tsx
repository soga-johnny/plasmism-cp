'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { create } from 'zustand';

// ローディング状態を管理するグローバルストア
interface LoadingState {
  isLoading: boolean;
  progress: number;
  loadStartTime?: number;
  setLoading: (isLoading: boolean) => void;
  setProgress: (progress: number) => void;
  incrementProgress: (amount: number) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  progress: 0,
  loadStartTime: Date.now(),
  setLoading: (isLoading) => set({ isLoading }),
  setProgress: (progress) => set({ progress: Math.min(Math.max(progress, 0), 100) }),
  incrementProgress: (amount) => set((state) => ({ 
    progress: Math.min(Math.max(state.progress + amount, 0), 100) 
  })),
}));

export default function LoadingScreen() {
  const { isLoading, progress, setLoading } = useLoadingStore();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 進捗率が100%に達したらフェードアウトを開始
    if (progress >= 100 && !isFading) {
      setIsFading(true);
      
      // 最低1.5秒はローディング画面を表示する
      const minDisplayTime = 3000; // 3秒
      const loadStartTime = useLoadingStore.getState().loadStartTime || Date.now();
      const elapsedTime = Date.now() - loadStartTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      setTimeout(() => {
        setLoading(false);
      }, remainingTime + 500); // 残り時間 + フェードアウトアニメーションの時間
    }
  }, [progress, isFading, setLoading]);

  // 初期ロード時に最低2秒間はローディング画面を表示する（UX向上のため）
  useEffect(() => {
    const minLoadingTimer = setTimeout(() => {
      // 最低表示時間が経過しても進捗が100%未満なら80%まで自動で進める
      useLoadingStore.getState().setProgress(Math.max(useLoadingStore.getState().progress, 80));
    }, 2000);

    return () => clearTimeout(minLoadingTimer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2B2325] ${isFading ? 'fade-out' : ''}`}
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundRepeat: 'repeat'
      }}
    >
      <div className="relative w-32 h-32 md:w-48 md:h-48 fade-in mb-8">
        <Image
          src="/logo.svg"
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {/* プログレスバーの追加 */}
      <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden fade-in">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-white/60 text-xs fade-in">
        {progress < 100 ? `読み込み中... ${Math.floor(progress)}%` : '完了'}
      </div>
    </div>
  );
} 