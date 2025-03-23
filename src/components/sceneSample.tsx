"use client"

import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import { useLoadingStore } from './LoadingScreen'
import Image from 'next/image'

export default function SceneSample(){
  const bgRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [windowSize, setWindowSize] = useState({
    width: 1920,
    height: 1080
  })
  
  // クライアントサイドでのみwindowSizeを更新
  const [isMounted, setIsMounted] = useState(false)
  const { incrementProgress } = useLoadingStore()

  // レスポンシブパラメータの計算
  const isMobile = windowSize.width <= 768

  useEffect(() => {
    setIsMounted(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isMounted) return;
    
    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
      // 逆方向に動くように負の値を設定
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${-latest * 500}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${-latest * 700}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${-latest * 18000}px)`;
      }
      if (bgRef.current) {
        const bgSize = isMobile ? 
          `auto ${100 + latest * 50}%` : 
          `${100 + latest * 50}%`;
        bgRef.current.style.backgroundSize = bgSize;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, isMobile, isMounted])

  // 画像の読み込みをトラッキング
  useEffect(() => {
    const imageElements = document.querySelectorAll('img')
    let loadedCount = 0
    
    const handleImageLoad = () => {
      loadedCount++
      // 各画像が読み込まれるたびに進捗を少し進める
      if (imageElements.length > 0) {
        incrementProgress(5 / imageElements.length)
      }
      
      // すべての画像が読み込まれたら
      if (loadedCount === imageElements.length) {
        incrementProgress(5) // ボーナス進捗
      }
    }
    
    imageElements.forEach(img => {
      if (img.complete) {
        handleImageLoad()
      } else {
        img.addEventListener('load', handleImageLoad)
      }
    })
    
    return () => {
      imageElements.forEach(img => {
        img.removeEventListener('load', handleImageLoad)
      })
    }
  }, [incrementProgress])

  // コンポーネントがマウントされたら進捗を加算
  useEffect(() => {
    incrementProgress(10)
  }, [incrementProgress])

  // モバイルとデスクトップのスタイル定義
  const mobileStyles = {
    layer1: {
      top: '40%',
      width: '100%',
      maxWidth: '800px',
    },
    layer2: {
      right: '5%',
      top: '60%',
      width: '100%',
      maxWidth: '800',
    },
    text: {
      left: '8%',
      top: '260%',
      fontSize: '36px',
      maxWidth: '780px',
    }
  };

  const desktopStyles = {
    layer1: {
      top: '60%',
      width: '100%',
      maxWidth: '1440px',
    },
    layer2: {
    //   right: '15%',
      top: '40%',
      width: '80%',
      maxWidth: '1440px',
    },
    text: {
      left: '20%',
      top: '200%',
      fontSize: '56px',
      maxWidth: '1000px',
    }
  };

  // 現在のスタイルを決定
  const currentStyles = isMobile ? mobileStyles : desktopStyles;

  return (
    <div className="w-full md:h-[2200px] h-[2200px] relative sticky top-0 rounded-4xl overflow-hidden">
      <div 
        ref={bgRef}
        className="relative w-full h-screen"
        style={{
          backgroundImage: `url(/image1-bg.jpg)`,
          backgroundSize: isMobile ? 'auto 100%' : '100%', 
          backgroundPosition: 'center',
          transition: 'background-size 0.1s ease-out',
        }}
      >
        <div className="w-full h-full relative sticky top-0 inset-0 z-0">
          {/* パララックス層 */}
          <div className="absolute inset-0 z-10 overflow-hidden">
            {/* パララックス画像1 */}
            <div 
              ref={layer1Ref}
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                top: currentStyles.layer1.top,
                width: currentStyles.layer1.width,
                maxWidth: currentStyles.layer1.maxWidth,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <Image
                src="/image1-1.png" 
                alt="Layer 1"
                width={1000}
                height={600}
                className="w-full h-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* パララックス画像2 */}
            <div 
              ref={layer2Ref}
              className="absolute"
              style={{
                // right: currentStyles.layer2.right,
                top: currentStyles.layer2.top,
                width: currentStyles.layer2.width,
                maxWidth: currentStyles.layer2.maxWidth,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <Image
                src="/layer-2.webp" 
                alt="Layer 2"
                width={1000}
                height={600}
                className="w-full h-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* パララックステキスト */}
            <div 
              ref={textRef}
              className="absolute text-white"
              style={{
                left: currentStyles.text.left,
                top: currentStyles.text.top,
                fontSize: currentStyles.text.fontSize,
                fontWeight: 200,
                lineHeight: 1.2,
                maxWidth: currentStyles.text.maxWidth,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div className="mb-4 text-sm">■ Vision</div>
              <div>
                {isMobile ? (
                  <>
                    想像も<br/>
                    できなかった<br/>
                    豊かさを、
                  </>
                ) : (
                  <>
                    想像も
                    できなかった<br/>
                    豊かさを、
                  </>
                )}
              </div>
              <div className="mt-4 text-xs">
                A richness that could not be imagined,
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 