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

// クライアントサイド専用のストア
export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  progress: 0,
  loadStartTime: typeof window !== 'undefined' ? Date.now() : undefined,
  setLoading: (isLoading) => set({ isLoading }),
  setProgress: (progress) => set({ progress: Math.min(Math.max(progress, 0), 100) }),
  incrementProgress: (amount) => set((state) => ({ 
    progress: Math.min(Math.max(state.progress + amount, 0), 100) 
  })),
}));

export default function LoadingScreen() {
  const { isLoading, progress, setLoading } = useLoadingStore();
  const [isFading, setIsFading] = useState(false);
  const [canHide, setCanHide] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // クライアントサイドでのみ実行するためのマウントチェック
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // コンポーネントがマウントされてから2.5秒後にcanHideをtrueに設定
  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      setCanHide(true);
    }, 2000); // 2秒

    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    // 進捗率が100%に達し、かつ最低表示時間を経過したらフェードアウトを開始
    if (progress >= 100 && !isFading && canHide) {
      // まず「Ready」表示に切り替え
      setShowReady(true);
      
      // 「Ready」表示後、少し待ってからフェードアウト
      setTimeout(() => {
        setIsFading(true);
        
        setTimeout(() => {
          setLoading(false);
        }, 800); // フェードアウトアニメーションの時間
      }, 900); // 「Ready」表示時間
    }
  }, [progress, isFading, setLoading, canHide, isMounted]);
  
  // 初期ロード時に最低2秒間はローディング画面を表示する（UX向上のため）
  useEffect(() => {
    if (!isMounted) return;

    const minLoadingTimer = setTimeout(() => {
      // 最低表示時間が経過しても進捗が100%未満なら80%まで自動で進める
      useLoadingStore.getState().setProgress(Math.max(useLoadingStore.getState().progress, 80));
    }, 2000);

    return () => clearTimeout(minLoadingTimer);
  }, [isMounted]);

  // サーバーサイドレンダリング時には何も表示しない
  if (!isMounted) return null;
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
          style={{}}
          priority
        />
      </div>
      
      {/* プログレスバーの追加 */}
      <div className="w-24 h-0.5 bg-white/20 rounded-full overflow-hidden fade-in">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-white/60 text-xs fade-in">
        {showReady ? 
          <span className="text-[#00E7A2] font-medium animate-pulse">Ready</span> : 
          `Starting... ${Math.floor(progress)}%`
        }
      </div>
    </div>
  );
} 