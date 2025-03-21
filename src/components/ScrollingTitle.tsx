'use client'

import { useRef, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// パフォーマンスを向上させるためにコンポーネントをメモ化
export default memo(function ScrollingTitle() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // スクロール検出設定の最適化
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // トランスフォームの計算を最適化
  const x = useTransform(scrollYProgress, [0, 1], ["60%", "10%"], {
    // 補間方法の最適化
    clamp: true // 値の範囲を制限して不要な計算を防止
  })

  return (
    <div ref={containerRef} className="h-[150px] relative overflow-hidden">
      <motion.h1 
        style={{ x }}
        className="absolute whitespace-nowrap text-7xl text-white/80 font-[100] font-inter tracking-wider"
      >
       OUR VISION
      </motion.h1>
    </div>
  )
}) 