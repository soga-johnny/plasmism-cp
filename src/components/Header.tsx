'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
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
    <header className="fixed top-0 left-0 right-0 text-white py-4 z-50">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" >
            <img src="/logo.svg" alt="Plasmism" className="h-5" />
          </Link>
        </div>
        <div className="flex items-center">
        <nav>
            <ul className="flex space-x-6 text-sm font-extralight mr-16">
              <li><Link href="/" className="hover:opacity-70 transition-opacity">トップ</Link></li>
              <li><Link href="/about" className="hover:opacity-70 transition-opacity">私たちについて</Link></li>
              <li><Link href="/features" className="hover:opacity-70 transition-opacity">特徴</Link></li>
              <li><Link href="/products" className="hover:opacity-70 transition-opacity">プロダクト</Link></li>
              <li><Link href="/services" className="hover:opacity-70 transition-opacity">サービス</Link></li>
              <li><Link href="/achievements" className="hover:opacity-70 transition-opacity">実績</Link></li>
              <li><Link href="/recruit" className="hover:opacity-70 transition-opacity">採用</Link></li>
              <li><Link href="/company" className="hover:opacity-70 transition-opacity">会社案内</Link></li>
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
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* 背景 */}
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        {/* メニューコンテンツ - アニメーション付き */}
        <div 
          className={`absolute right-4 left-4 top-4 bottom-4 bg-[#1C1819] rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}
        >
          {/* ロゴ */}
          <div className="px-8 pt-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img src="/logo.svg" alt="Plasmism" className="h-5" />
            </Link>
          </div>
          
          {/* メニュー項目 */}
          <nav className="flex-1 flex flex-col justify-start mt-16">
            <ul className="text-left space-y-0 border-t border-gray-700">
              <li className="border-b border-gray-700">
                <Link 
                  href="/" 
                  className="block py-4 px-8 text-lg font-light hover:bg-gray-900 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ホーム
                </Link>
              </li>
              <li className="border-b border-gray-700 flex justify-between items-center">
                <Link 
                  href="/services" 
                  className="block py-4 px-8 text-lg font-light w-full hover:bg-gray-900 transition-colors duration-200 flex justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  サービス
                  <span className="text-xl">+</span>
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <Link 
                  href="/products" 
                  className="block py-4 px-8 text-lg font-light hover:bg-gray-900 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  プロダクト
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <Link 
                  href="/achievements" 
                  className="block py-4 px-8 text-lg font-light hover:bg-gray-900 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  事例紹介
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <Link 
                  href="/blog" 
                  className="block py-4 px-8 text-lg font-light hover:bg-gray-900 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ブログ
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <Link 
                  href="/events" 
                  className="block py-4 px-8 text-lg font-light hover:bg-gray-900 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  イベント
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <Link 
                  href="/company" 
                  className="block py-4 px-8 text-lg font-light hover:bg-gray-900 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  会社概要
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <Link 
                  href="/recruit" 
                  className="block py-4 px-8 text-lg font-light hover:bg-gray-900 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  採用情報
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 px-8 space-y-4">
              <Link 
                href="/news" 
                className="flex items-center text-lg font-light hover:opacity-70 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19L19 12L12 5V19Z" fill="currentColor"/>
                  </svg>
                </span>
                お知らせ
              </Link>
              
              <Link 
                href="/download" 
                className="flex items-center text-lg font-light hover:opacity-70 transition-opacity"
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
                className="flex items-center text-lg font-light hover:opacity-70 transition-opacity"
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
                className="text-sm font-light hover:opacity-70 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                プライバシーポリシー
              </Link>
            </div>
          </nav>
          
          {/* 閉じるボタン */}
          <div className="p-4 fixed bottom-4 left-4 right-4">
            <button 
              className="flex items-center justify-center w-full py-4 text-white bg-transparent border border-white rounded-md transition-colors duration-300 hover:bg-white hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                </svg>
              </span>
              Close
            </button>
          </div>
        </div>
      </div>
      
      {/* 下部固定メニュー */}
      <header className="fixed bottom-0 w-2/3 right-2 z-40 flex bg-white overflow-hidden rounded-tl-lg rounded-tr-lg">
        <button 
          className="flex-1 flex flex-col items-center justify-center py-1 bg-white text-black border-r border-gray-200"
          onClick={() => setIsMenuOpen(true)}
        >
          <div className="mb-2 flex flex-col items-center">
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
          </div>
          <span className="text-[0.8rem]">メニュー</span>
        </button>
        <Link 
          href="/contact" 
          className="flex-1 flex flex-col items-center justify-center py-1 bg-[#c22626] text-white"
        >
          <div className="mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
            </svg>
          </div>
          <span className="text-[0.8rem]">お問合せ</span>
        </Link>
      </header>
    </>
  )

  return isMobile ? <MobileHeader /> : <DesktopHeader />
} 