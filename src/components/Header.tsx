'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const pathname = usePathname()
  
  // メニューを開閉する関数
  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)
  
  // パス変更時にメニューを閉じる
  useEffect(() => {
    closeMenu()
  }, [pathname])
  
  // クライアントサイドのみで実行する処理
  useEffect(() => {
    setMounted(true)
    
    // 画面サイズの検出
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // 日時の更新処理
    const updateDateTime = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      
      setCurrentDate(`${year}.${month}.${day}`)
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }
    
    // 初期化
    checkIfMobile()
    updateDateTime()
    
    // イベントリスナー設定
    window.addEventListener('resize', checkIfMobile)
    const interval = setInterval(updateDateTime, 1000)
    
    // メニュー開閉時のスクロール制御
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', checkIfMobile)
      clearInterval(interval)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])
  
  // ハイドレーション前は何も表示しない
  if (!mounted) {
    return null
  }
  
  // PCヘッダー
  if (!isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 text-white py-4 z-40">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/logo.svg" 
                alt="Plasmism" 
                width={100}
                height={20}
                className="h-5 w-auto hover:opacity-70 transition-all duration-300" 
              />
            </Link>
          </div>
          <div className="flex items-center">
            <nav>
              <ul className="flex space-x-6 text-sm font-extralight mr-12">
                <li><Link href="/" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/' ? 'line-through font-normal' : ''}`}>トップ</Link></li>
                <li><Link href="/about" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/about' ? 'line-through font-normal' : ''}`}>私たちについて</Link></li>
                <li><Link href="/feature" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/feature' ? 'line-through font-normal' : ''}`}>特徴</Link></li>
                <li><Link href="/product" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/product' ? 'line-through font-normal' : ''}`}>プロダクト</Link></li>
                <li><Link href="/service" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/service' ? 'line-through font-normal' : ''}`}>サービス</Link></li>
                <li><Link href="/achievements" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/achievements' ? 'line-through font-normal' : ''}`}>実績</Link></li>
                <li><Link href="/recruit" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/recruit' ? 'line-through font-normal' : ''}`}>採用</Link></li>
                <li><Link href="/company" className={`hover:opacity-70 hover:translate-y-[-2px] transition-all duration-300 ${pathname === '/company' ? 'line-through font-normal' : ''}`}>会社案内</Link></li>
              </ul>
            </nav>
            <div className="mr-2 text-right border-r border-gray-500 pr-4">
              <div className="text-sm font-extralight">{currentDate}</div>
              <div className="text-md font-extralight">{currentTime}</div>
            </div>
            <Link href="/contact" className="bg-[#ffffff] hover:bg-[#BC2611] hover:scale-105 hover:text-[#ffffff] transition-all duration-300 text-[#251E1F] rounded-md py-3 px-4 mx-2 flex items-center text-sm">
              お問い合わせ <span className="ml-2 border-l border-[#251E1F] pl-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link href="/download" className="bg-[#ffffff] hover:bg-[#BC2611] hover:scale-105 hover:text-[#ffffff] transition-all duration-300 text-[#251E1F] rounded-md py-3 px-4 flex items-center text-sm">
              資料DL <span className="ml-2 border-l border-[#251E1F] pl-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </header>
    )
  }
  
  // SPヘッダー
  return (
    <>
      {/* 下部固定メニュー */}
      <header className="fixed bottom-3 w-2/3 right-2 z-[50] flex bg-white overflow-hidden rounded-lg rounded-tr-lg">
        <button 
          className="flex-1 flex flex-col items-center justify-center py-2 bg-white text-black border-r border-gray-200"
          onClick={toggleMenu}
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-0.5 bg-black my-1"></div>
            <div className="w-12 h-0.5 bg-black mb-1"></div>
          </div>
          <span className="text-xs">メニュー</span>
        </button>
        <Link 
          href="/contact" 
          className="flex-1 flex items-center justify-center gap-2 py-1 bg-[#c22626] text-white"
        >
          <span className="text-xs">お問合わせ</span>
        </Link>
      </header>
      
      {/* モバイルメニュー - AnimatePresenceをクライアントサイドでのみレンダリング */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            
            <motion.div
              className="fixed inset-x-4 bottom-0 h-[97vh] bg-[#1C1819] rounded-t-lg overflow-hidden z-[70]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ロゴ */}
              <div className="px-8 pt-4">
                <Link href="/" onClick={closeMenu}>
                  <Image 
                    src="/logo.svg" 
                    alt="Plasmism" 
                    width={100}
                    height={20}
                    className="h-3 w-auto" 
                  />
                </Link>
              </div>
              
              {/* メニュー項目 */}
              <nav className="flex-1 flex flex-col justify-start mt-4">
                <ul className="text-left space-y-0 border-t border-white/10">
                  <li className="border-b border-white/10">
                    <Link 
                      href="/" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      トップ
                    </Link>
                  </li>
                  <li className="border-b border-white/10">
                    <Link 
                      href="/about" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/about' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      私たちについて
                    </Link>
                  </li>
                  <li className="border-b border-white/10">
                    <Link 
                      href="/feature" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/feature' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      特徴
                    </Link>
                  </li>
                  <li className="border-b border-white/10">
                    <Link 
                      href="/product" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/product' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      プロダクト
                    </Link>
                  </li>
                  <li className="border-b border-white/10">
                    <Link 
                      href="/service" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/service' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      サービス
                    </Link>
                  </li>
                  <li className="border-b border-white/10">
                    <Link 
                      href="/achievements" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/achievements' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      実績
                    </Link>
                  </li>
                  <li className="border-b border-white/10">
                    <Link 
                      href="/recruit" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/recruit' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      採用
                    </Link>
                  </li>
                  <li className="border-b border-white/10">
                    <Link 
                      href="/company" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/company' ? 'line-through font-normal' : ''}`}
                      onClick={closeMenu}
                    >
                      会社案内
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-6 px-8 space-y-4">
                  <Link 
                    href="/download" 
                    className="flex items-center text-md font-extralight hover:opacity-70 transition-opacity"
                    onClick={closeMenu}
                  >
                    <span className="mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
                      </svg>
                    </span>
                    資料ダウンロード
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="flex items-center text-md font-extralight hover:opacity-70 transition-opacity"
                    onClick={closeMenu}
                  >
                    <span className="mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                      </svg>
                    </span>
                    お問い合わせ
                  </Link>
                </div>
                
                <div className="mt-auto mb-4 px-8 py-4">
                  <Link 
                    href="/privacy" 
                    className="text-sm font-extralight hover:opacity-70 transition-opacity"
                    onClick={closeMenu}
                  >
                    プライバシーポリシー
                  </Link>
                </div>
              </nav>
              
              {/* 閉じるボタン */}
              <div className="p-4 absolute bottom-2 left-2 right-2">
                <button 
                  className="flex items-center justify-center w-full py-4 text-white bg-white/5 border border-white/10 rounded-md transition-colors duration-300 hover:bg-white hover:text-black font-extralight"
                  onClick={closeMenu}
                >
                  <span className="mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                    </svg>
                  </span>
                  閉じる
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 