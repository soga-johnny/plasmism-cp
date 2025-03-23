'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoadingStore } from './LoadingScreen';

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setLoading, setProgress } = useLoadingStore();

  useEffect(() => {
    // ページ遷移時にローディング状態をリセット
    // const handleRouteChangeStart = () => {
    //   setLoading(true);
    //   setProgress(0);
    // };

    // ページ遷移完了時の処理
    const handleRouteChangeComplete = () => {
      // ページ遷移が完了したら80%まで進める（残りは各ページのコンテンツロードで進める）
      setProgress(80);
      
      // 特殊なページでなければ、すぐに100%にして完了させる
      if (!pathname.includes('/3d') && pathname !== '/') {
        setTimeout(() => {
          setProgress(100);
        }, 300);
      }
    };

    // 現在のURLでの初期化
    handleRouteChangeComplete();

    // Next.jsのナビゲーションイベントは直接アクセスできないため
    // パスやクエリパラメータの変更を監視
    return () => {
      // クリーンアップ処理（必要に応じて）
    };
  }, [pathname, searchParams, setLoading, setProgress]);

  return null;
} 