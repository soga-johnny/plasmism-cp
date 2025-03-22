'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollingTitle() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["220%", "120%"])

  return (
    <div ref={containerRef} className="h-[60px] relative overflow-hidden">
      <motion.p 
        style={{ x }}
        className="absolute whitespace-nowrap text-4xl text-white/80 font-thin font-inter tracking-wider"
      >
       ●Vision
      </motion.p>
    </div>
  )
} 