'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// パンくずリストの設定
const breadcrumbMap: { [key: string]: { label: string; parent?: string } } = {
  '/': { label: 'トップ' },
  '/privacy': { label: 'プライバシーポリシー', parent: '/' },
  '/about': { label: '私たちについて', parent: '/' },
  '/feature': { label: '特徴', parent: '/' },
  '/products': { label: 'プロダクト', parent: '/' },
  '/service': { label: 'サービス', parent: '/' },
  '/achievements': { label: '実績', parent: '/' },
  '/recruit': { label: '採用', parent: '/' },
  '/company': { label: '会社案内', parent: '/' },
  '/contact': { label: 'お問い合わせ', parent: '/' },
  '/download': { label: '資料ダウンロード', parent: '/' }
}

export default function Footer() {
  const pathname = usePathname()
  
  // パンくずリストを生成する関数
  const generateBreadcrumbs = () => {
    const breadcrumbs: {path: string; label: string}[] = []
    let currentPath = pathname
    
    while (currentPath && breadcrumbMap[currentPath]) {
      breadcrumbs.unshift({
        path: currentPath,
        label: breadcrumbMap[currentPath].label
      })
      
      currentPath = breadcrumbMap[currentPath].parent || ''
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  // お問い合わせと資料請求セクションの表示制御
  const isContactPage = pathname === '/contact' || pathname.startsWith('/contact/')
  const isDownloadPage = pathname === '/download' || pathname.startsWith('/download/')
  const shouldShowContactSection = !isContactPage && !isDownloadPage
  
  // 開発環境でのデバッグ用
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Current pathname:', pathname)
      console.log('Is contact page:', isContactPage)
      console.log('Is download page:', isDownloadPage)
      console.log('Should show contact section:', shouldShowContactSection)
    }
  }, [pathname, isContactPage, isDownloadPage, shouldShowContactSection])
  
  return (
    <footer className="text-white font-extralight py-12">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        {/* パンくずリスト */}
        <div className="border-y border-white/7 py-6 my-8">
          <div className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.path} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-white">{breadcrumb.label}</span>
                ) : (
                  <Link href={breadcrumb.path} className="hover:text-white transition-colors">
                    {breadcrumb.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="flex flex-col mb-8 md:mb-0">
            {/* パンくずは上部に移動したので、ここは削除 */}
          </div>
          
          {shouldShowContactSection && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="bg-white/4 rounded-3xl md:p-20 p-12 border border-white/6">
                  <h3 className="text-4xl mb-6 font-thin text-center border-b border-white pb-1">お問い合わせ・ご相談</h3>
                <p className="text-sm mb-6 text-gray-300">
                  UI/UXデザイン、ブランディング、クラウドインフラなど、あらゆるデジタル課題に対応。
                  初回相談は無料で、お客様の状況に合わせた最適な提案をいたします。
                </p>
                <div className="flex justify-center">
                  <Link href="/contact" className="inline-block">
                    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/4 rounded-3xl md:p-20 p-12 border border-white/6">
                <h3 className="text-4xl mb-6 font-thin text-center border-b border-white pb-1">会社資料ダウンロード</h3>
                <p className="text-sm mb-6 text-gray-300">
                  サービス内容、実績事例、アプローチをまとめた資料をご用意。
                  メールアドレスをご登録いただくだけで、すぐにダウンロードいただけます。
                </p>
                <div className="flex justify-center">
                  <Link href="/download" className="inline-block">
                    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 gap-6 mb-16">
          <div>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-gray-300 transition-colors text-lg">私たちについて</Link></li>
              <li><Link href="/feature" className="hover:text-gray-300 transition-colors text-lg">特徴</Link></li>
              <li><Link href="/products" className="hover:text-gray-300 transition-colors text-lg">プロダクト</Link></li>
              <li><Link href="/services" className="hover:text-gray-300 transition-colors text-lg">サービス</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              <li><Link href="/achievements" className="hover:text-gray-300 transition-colors text-lg">実績</Link></li>
              <li><Link href="/recruit" className="hover:text-gray-300 transition-colors text-lg">採用</Link></li>
              <li><Link href="/company" className="hover:text-gray-300 transition-colors text-lg">会社案内</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-12">
          <p className="mb-6 md:text-3xl text-md font-thin">
            想像もできなかった豊かさを、いつどの瞬間であっても、噛み締めて実感できる、そんな会社。
          </p>
          <div className="mb-20">
            <Link
              href="/"
              className="mr-4"
            >
              <Image 
                src="/logo.svg" 
                alt="Plasmism" 
                width={100}
                height={20}
                className="h-auto w-full"
              />
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs font-extralight">
              <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
            </div>
            <div className="text-xs font-thin text-white/50">©2024 Plasmism Inc.</div>
          </div>
        </div>
      </div>
    </footer>
  )
} 