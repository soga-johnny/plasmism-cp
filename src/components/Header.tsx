'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // 現在の日時を表示する
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  
  useEffect(() => {
    // 画面サイズの検出
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // 初回レンダリング時とリサイズ時にチェック
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    // 日時の設定
    const updateDateTime = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      
      setCurrentDate(`${year}.${month}.${day}`)
      setCurrentTime(`${hours}:${minutes}`)
    }
    
    // 初回と1分ごとに更新
    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)
    
    // メニュー開閉時にbodyのスクロールを制御
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
      clearInterval(interval)
    }
  }, [isMenuOpen])
  
  // PCヘッダー
  const DesktopHeader = () => (
    <header className="fixed top-0 left-0 right-0 text-white py-4 z-40">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" >
            <Image 
              src="/logo.svg" 
              alt="Plasmism" 
              width={100}
              height={20}
              className="h-5 w-auto" 
            />
          </Link>
        </div>
        <div className="flex items-center">
        <nav>
            <ul className="flex space-x-6 text-sm font-extralight mr-16">
              <li><Link href="/" className={`hover:opacity-70 transition-opacity ${pathname === '/' ? 'line-through font-normal' : ''}`}>トップ</Link></li>
              <li><Link href="/about" className={`hover:opacity-70 transition-opacity ${pathname === '/about' ? 'line-through font-normal' : ''}`}>私たちについて</Link></li>
              <li><Link href="/feature" className={`hover:opacity-70 transition-opacity ${pathname === '/feature' ? 'line-through font-normal' : ''}`}>特徴</Link></li>
              <li><Link href="/products" className={`hover:opacity-70 transition-opacity ${pathname === '/products' ? 'line-through font-normal' : ''}`}>プロダクト</Link></li>
              <li><Link href="/services" className={`hover:opacity-70 transition-opacity ${pathname === '/services' ? 'line-through font-normal' : ''}`}>サービス</Link></li>
              <li><Link href="/achievements" className={`hover:opacity-70 transition-opacity ${pathname === '/achievements' ? 'line-through font-normal' : ''}`}>実績</Link></li>
              <li><Link href="/recruit" className={`hover:opacity-70 transition-opacity ${pathname === '/recruit' ? 'line-through font-normal' : ''}`}>採用</Link></li>
              <li><Link href="/company" className={`hover:opacity-70 transition-opacity ${pathname === '/company' ? 'line-through font-normal' : ''}`}>会社案内</Link></li>
            </ul>
          </nav>
          <div className="mr-6 text-right border-r border-gray-500 pr-6">
            <div className="text-sm font-extralight">{currentDate}</div>
            <div className="text-2xl font-extralight">{currentTime}</div>
          </div>
          <Link href="/contact" className="bg-[#BC2611] hover:bg-[#a01f1f] transition-colors text-white rounded-md py-4 px-4 mx-2 flex items-center text-sm">
            お問い合わせ <span className="ml-2 border-l border-red-400 pl-2">→</span>
          </Link>
          <Link href="/download" className="bg-[#BC2611] hover:bg-[#a01f1f] transition-colors text-white rounded-md py-4 px-4 flex items-center text-sm">
            資料DL <span className="ml-2 border-l border-red-400 pl-2">→</span>
          </Link>
        </div>
      </div>
    </header>
  )
  
  // SPヘッダー
  const MobileHeader = () => (
    <>
      {/* モバイルメニュー - アニメーション付き */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 背景 */}
            <motion.div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* メニューコンテンツ - アニメーション付き */}
            <motion.div 
              className="absolute right-4 left-4 bottom-0 h-[97vh] top-auto bottom-0 bg-[#1C1819] rounded-t-lg overflow-hidden"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                duration: 0.5
              }}
            >
              {/* ロゴ */}
              <div className="px-8 pt-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
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
                <ul className="text-left space-y-0 border-t border-white/7">
                  <li className="border-b border-white/7">
                    <Link 
                      href="/" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      トップ
                    </Link>
                  </li>
                  <li className="border-b border-white/7">
                    <Link 
                      href="/about" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/about' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      私たちについて
                    </Link>
                  </li>
                  <li className="border-b border-white/7">
                    <Link 
                      href="/feature" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/feature' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      特徴
                    </Link>
                  </li>
                  <li className="border-b border-white/7">
                    <Link 
                      href="/products" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/products' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      プロダクト
                    </Link>
                  </li>
                  <li className="border-b border-white/7">
                    <Link 
                      href="/services" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/services' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      サービス
                    </Link>
                  </li>
                  <li className="border-b border-white/7">
                    <Link 
                      href="/achievements" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/achievements' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      実績
                    </Link>
                  </li>
                  <li className="border-b border-white/7">
                    <Link 
                      href="/recruit" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/recruit' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      採用
                    </Link>
                  </li>
                  <li className="border-b border-white/7">
                    <Link 
                      href="/company" 
                      className={`block py-3 px-8 text-md font-extralight hover:bg-gray-900 transition-colors duration-200 ${pathname === '/company' ? 'line-through font-normal' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      会社案内
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-6 px-8 space-y-4">
                  {/* <Link 
                    href="/news" 
                    className="flex items-center text-lg font-extralight hover:opacity-70 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19L19 12L12 5V19Z" fill="currentColor"/>
                      </svg>
                    </span>
                    お知らせ
                  </Link>
                   */}
                  <Link 
                    href="/download" 
                    className="flex items-center text-md font-extralight hover:opacity-70 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
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
                    onClick={() => setIsMenuOpen(false)}
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
                    onClick={() => setIsMenuOpen(false)}
                  >
                    プライバシーポリシー
                  </Link>
                </div>
              </nav>
              
              {/* 閉じるボタン */}
              <div className="p-4 fixed bottom-1 left-1 right-1">
                <button 
                  className="flex items-center justify-center w-full py-4 text-white bg-white/2 border w-full border-white/9 rounded-md transition-colors duration-300 hover:bg-white hover:text-black font-extralight"
                  onClick={() => setIsMenuOpen(false)}
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
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 下部固定メニュー */}
      <header className="fixed bottom-0 w-2/3 right-2 z-40 flex bg-white overflow-hidden rounded-tl-lg rounded-tr-lg">
        <button 
          className="flex-1 flex flex-col items-center justify-center py-3 bg-white text-black border-r border-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-12 h-0.5 bg-black my-1"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                translateY: isMenuOpen ? 8 : 0
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div 
              className="w-12 h-0.5 bg-black mb-1"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                width: isMenuOpen ? 0 : '3rem'
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div 
              className="w-12 h-0.5 bg-black mb-1"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                translateY: isMenuOpen ? -8 : 0
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
          <span className="text-xs">メニュー</span>
        </button>
        <Link 
          href="/contact" 
          className="flex-1 flex items-center justify-center gap-2 py-1 bg-[#c22626] text-white "
        >
                    <span className="text-xs">お問合わせ</span>
          <div className="mb-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
            </svg>
          </div>
        </Link>
      </header>
    </>
  )

  return isMobile ? <MobileHeader /> : <DesktopHeader />
} 