'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 5,
    scale: 0.99,
    filter: 'blur(40px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      // 各プロパティの個別タイミング調整
      opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      y: { duration: 1, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
      filter: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
    }
  },
  exit: {
    opacity: 0,
    scale: 1,
    filter: 'blur(100px)',
    transition: {
      duration: 0.2, // 短縮
      ease: [0.22, 1, 0.36, 1],
      // 各プロパティの個別タイミング調整（短縮）
      opacity: { duration: 0.1, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
      filter: { duration: 0.15, ease: [0.22, 1, 0.36, 1] }
    }
  }
};

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showDigitalEffect, setShowDigitalEffect] = useState(false);
  const [isPreviousPageExiting, setIsPreviousPageExiting] = useState(false);
  const prevPathRef = useRef(pathname);
  
  // ページ遷移時のデジタルエフェクト
  useEffect(() => {
    // パスが変わった時だけ処理（初回ロード時は無視）
    if (prevPathRef.current !== pathname && prevPathRef.current !== null) {
      // ページ遷移を検知したら即座に前のページが終了中の状態にする
      setIsPreviousPageExiting(true);
      setShowDigitalEffect(true);
      
      // 次のフレームで状態をリセット（遷移アニメーションには影響しない）
      const resetTimer = setTimeout(() => {
        setIsPreviousPageExiting(false);
      }, 50);
      
      // エフェクト表示時間の調整
      const effectTimer = setTimeout(() => {
        setShowDigitalEffect(false);
      }, 800);
      
      return () => {
        clearTimeout(effectTimer);
        clearTimeout(resetTimer);
      };
    }
    
    // 現在のパスを保存
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <div className="page-content-wrapper relative">
      {/* 即時フェードアウト用のオーバーレイ */}
      {isPreviousPageExiting && (
        <div className="fixed inset-0 bg-[#2B2325] opacity-0 z-20 quick-fade-out pointer-events-none" />
      )}
      
      <AnimatePresence 
        mode="sync"
        onExitComplete={() => window.scrollTo(0, 0)}
        initial={false}
      >
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="min-h-screen flex flex-col relative z-10"
        >
          {children}
          {showDigitalEffect && (
            <div className="digital-transition absolute inset-0 z-30 pointer-events-none" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 