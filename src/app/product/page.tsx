"use client"

import Footer from '@/components/Footer'
import PageTitle from '@/components/PageTitle'
import Image from 'next/image'
import Link from 'next/link'

export default function Product() {
  return (
    <main className="min-h-screen flex flex-col text-white md:py-24 pt-8 pb-24">
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <PageTitle 
          titleEn="Product" 
          titleJa="プロダクト" 
          description="プラズミズムが提供するプロダクトについてご紹介します。" 
        />
        
        <div className="mb-16 md:mx-16 mx-4">
          <p className="text-white/80 mb-10 font-light">プラズミズムは、企業のデジタルトランスフォーメーションを支援する3つの主要プロダクトを提供しています。</p>
          
          <div className="space-y-4">
            <a href="#design-system" className="flex items-center group border-b border-white/10 pb-4 hover:opacity-80 transition-opacity">
              <div className="w-12 md:w-16 text-right pr-4 md:pr-6">
                <span className="text-lg md:text-2xl font-thin">01</span>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-thin">デザインシステム</h3>
                  <p className="text-white/60 text-sm md:text-base font-light">一貫性のあるUI/UXを実現する設計システム</p>
                </div>
                <div className="ml-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </a>
            
            <a href="#analytics" className="flex items-center group border-b border-white/10 pb-4 hover:opacity-80 transition-opacity">
              <div className="w-12 md:w-16 text-right pr-4 md:pr-6">
                <span className="text-lg md:text-2xl font-thin">02</span>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-thin">アナリティクス</h3>
                  <p className="text-white/60 text-sm md:text-base font-light">データに基づく意思決定を支援</p>
                </div>
                <div className="ml-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </a>
            
            <a href="#automation" className="flex items-center group border-b border-white/10 pb-4 hover:opacity-80 transition-opacity">
              <div className="w-12 md:w-16 text-right pr-4 md:pr-6">
                <span className="text-lg md:text-2xl font-thin">03</span>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-thin">オートメーション</h3>
                  <p className="text-white/60 text-sm md:text-base font-light">業務効率化を実現する自動化ツール</p>
                </div>
                <div className="ml-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
        
        <div className="space-y-24 mb-16 md:mx-16 mx-4 pt-10">
          {/* デザインシステム */}
          <section id="design-system" className="pb-20 border-b border-white/7">
            <h2 className="text-4xl font-thin mb-10">デザインシステム</h2>
            
            {/* こんな課題はありませんか？ */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">こんな課題はありませんか？</h3>
              <div className="bg-white/5 rounded-lg border border-white/6">
                <div className="space-y-0">
                  <div className="flex items-start p-4 border-b border-white/6">
                    <div className="flex items-center justify-center w-6 h-6 mt-0.5 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base font-light">デザインの一貫性が保てていない</p>
                  </div>
                  <div className="flex items-start p-4 border-b border-white/6">
                    <div className="flex items-center justify-center w-6 h-6 mt-0.5 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base font-light">UIコンポーネントの再利用ができていない</p>
                  </div>
                  <div className="flex items-start p-4 border-b border-white/6">
                    <div className="flex items-center justify-center w-6 h-6 mt-0.5 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base font-light">デザインと開発の連携に時間がかかる</p>
                  </div>
                  <div className="flex items-start p-4 border-b border-white/6">
                    <div className="flex items-center justify-center w-6 h-6 mt-0.5 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base font-light">ブランドガイドラインの管理が煩雑</p>
                  </div>
                  <div className="flex items-start p-4">
                    <div className="flex items-center justify-center w-6 h-6 mt-0.5 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base font-light">デザインの変更管理が難しい</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* プラズミズムが提供するソリューション */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">プラズミズムが提供するソリューション</h3>
              <p className="text-white/80 mb-8 font-light text-sm md:text-base">プラズミズムのデザインシステムは、デザインと開発の効率を最大化し、一貫性のあるユーザー体験を実現します。</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white/5 p-6 rounded-lg border border-white/6">
                  <div className="text-center mb-3">
                    <span className="text-white/50 font-thin text-xl">01</span>
                  </div>
                  <h4 className="text-center text-lg font-thin mb-4">コンポーネント<br />ライブラリ</h4>
                  <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed">
                    再利用可能なUIコンポーネントを提供。React、Vue、Angularなど主要なフレームワークに対応しています。
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/6">
                  <div className="text-center mb-3">
                    <span className="text-white/50 font-thin text-xl">02</span>
                  </div>
                  <h4 className="text-center text-lg font-thin mb-4">デザイン<br />トークン</h4>
                  <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed">
                    カラー、タイポグラフィ、スペーシングなどのデザイン要素を一元管理。一貫性のあるデザインを実現します。
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/6">
                  <div className="text-center mb-3">
                    <span className="text-white/50 font-thin text-xl">03</span>
                  </div>
                  <h4 className="text-center text-lg font-thin mb-4">ドキュメント<br />管理</h4>
                  <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed">
                    コンポーネントの使用方法やガイドラインを包括的にドキュメント化。チーム間の知識共有を促進します。
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/6">
                  <div className="text-center mb-3">
                    <span className="text-white/50 font-thin text-xl">04</span>
                  </div>
                  <h4 className="text-center text-lg font-thin mb-4">バージョン<br />管理</h4>
                  <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed">
                    デザインシステムの変更履歴を管理し、チーム全体で最新の状態を共有。スムーズな更新を実現します。
                  </p>
                </div>
              </div>
            </div>
            
            {/* なぜプラズミズムを選ぶべきか */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">なぜプラズミズムを選ぶべきか</h3>
              <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                <ul className="list-disc pl-6 space-y-4 text-sm md:text-base font-light">
                  <li>デザインと開発の効率を最大限に高める設計</li>
                  <li>主要なフレームワークに対応した柔軟な実装</li>
                  <li>直感的な操作性と充実したドキュメント</li>
                  <li>継続的なアップデートとサポート体制</li>
                </ul>
              </div>
            </div>
            
            {/* 実績 */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">実績</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-lg border border-white/6 overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/sample1.png"
                      alt="デザインシステム実績"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-thin mb-2">NAMINORI</h4>
                    <p className="text-white/80 text-sm font-light mb-4">デザインシステム構築</p>
                    <Link href="/achievements/achievement-1" className="text-white/60 hover:text-white text-sm">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg border border-white/6 overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/sample1.png"
                      alt="デザインシステム実績"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-thin mb-2">NAMINORI</h4>
                    <p className="text-white/80 text-sm font-light mb-4">デザインシステム構築</p>
                    <Link href="/achievements/achievement-2" className="text-white/60 hover:text-white text-sm">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/achievements" className="inline-block text-white/60 hover:text-white text-sm border border-white/20 rounded-full px-6 py-2">
                  実績一覧を見る
                </Link>
              </div>
            </div>
            
            {/* よくあるご質問 */}
            <div>
              <h3 className="text-2xl font-thin mb-6">デザインシステムに関するよくある質問</h3>
              <div className="border-t border-white/7">
                <div className="border-b border-white/7 py-8">
                  <h4 className="text-xl font-thin mb-4">Q. デザインシステムの導入にはどのくらいの期間がかかりますか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    プロジェクトの規模や既存のデザイン資産の状況によって異なりますが、基本的な導入には1〜2ヶ月程度かかります。段階的な導入も可能で、優先度の高いコンポーネントから順次展開していくことができます。
                  </p>
                </div>
                
                <div className="border-b border-white/7 py-8">
                  <h4 className="text-xl font-thin mb-4">Q. 既存のデザイン資産は活用できますか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    はい、既存のデザイン資産を分析し、デザインシステムに統合することができます。また、必要に応じて既存のデザインを改善しながら、段階的に移行することも可能です。
                  </p>
                </div>
                
                <div className="py-8">
                  <h4 className="text-xl font-thin mb-4">Q. 開発チームとの連携はどのように行われますか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    デザインシステムは開発チームのワークフローに合わせて設計されています。コンポーネントの実装例やAPIドキュメントを提供し、スムーズな開発をサポートします。また、必要に応じて開発チーム向けのトレーニングも実施しています。
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* アナリティクス */}
          <section id="analytics" className="pb-20 border-b border-white/7">
            <h2 className="text-4xl font-thin mb-10">アナリティクス</h2>
            
            {/* こんな課題はありませんか？ */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">こんな課題はありませんか？</h3>
              <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                <ul className="list-disc pl-6 space-y-4 text-sm md:text-base font-light">
                  <li>データはあるが、有効な分析ができていない</li>
                  <li>意思決定に必要な情報が不足している</li>
                  <li>複数のデータソースの統合ができていない</li>
                  <li>リアルタイムな分析ができない</li>
                </ul>
              </div>
            </div>
            
            {/* プラズミズムが提供するソリューション */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">プラズミズムが提供するソリューション</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                  <h4 className="text-xl font-thin mb-4">データ統合プラットフォーム</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    複数のデータソースを統合し、リアルタイムな分析を可能にするプラットフォームを提供。ビジネスインテリジェンスを強化します。
                  </p>
                </div>
                <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                  <h4 className="text-xl font-thin mb-4">予測分析ツール</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    機械学習を活用した予測分析により、将来のトレンドやパターンを把握。データに基づく意思決定をサポートします。
                  </p>
                </div>
              </div>
            </div>
            
            {/* なぜプラズミズムを選ぶべきか */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">なぜプラズミズムを選ぶべきか</h3>
              <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                <ul className="list-disc pl-6 space-y-4 text-sm md:text-base font-light">
                  <li>直感的な操作性と充実した可視化機能</li>
                  <li>カスタマイズ可能な分析ダッシュボード</li>
                  <li>高度なセキュリティとデータ保護</li>
                  <li>専門家によるサポートとトレーニング</li>
                </ul>
              </div>
            </div>
            
            {/* 実績 */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">実績</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-lg border border-white/6 overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/sample1.png"
                      alt="アナリティクス実績"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-thin mb-2">NAMINORI</h4>
                    <p className="text-white/80 text-sm font-light mb-4">データ分析基盤構築</p>
                    <Link href="/achievements/achievement-2" className="text-white/60 hover:text-white text-sm">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg border border-white/6 overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/sample1.png"
                      alt="アナリティクス実績"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-thin mb-2">NAMINORI</h4>
                    <p className="text-white/80 text-sm font-light mb-4">データ分析基盤構築</p>
                    <Link href="/achievements/achievement-3" className="text-white/60 hover:text-white text-sm">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/achievements" className="inline-block text-white/60 hover:text-white text-sm border border-white/20 rounded-full px-6 py-2">
                  実績一覧を見る
                </Link>
              </div>
            </div>
            
            {/* よくあるご質問 */}
            <div>
              <h3 className="text-2xl font-thin mb-6">アナリティクスに関するよくある質問</h3>
              <div className="border-t border-white/7">
                <div className="border-b border-white/7 py-8">
                  <h4 className="text-xl font-thin mb-4">Q. データのセキュリティはどのように確保されていますか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    データの暗号化、アクセス制御、監査ログなど、多層的なセキュリティ対策を実装しています。また、GDPRやCCPAなどのプライバシー規制にも準拠しています。
                  </p>
                </div>
                
                <div className="py-8">
                  <h4 className="text-xl font-thin mb-4">Q. カスタマイズはどの程度可能ですか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    分析ダッシュボードやレポートは、お客様のニーズに合わせて柔軟にカスタマイズ可能です。また、APIを通じて外部システムとの連携も実現できます。
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* オートメーション */}
          <section id="automation" className="pb-20">
            <h2 className="text-4xl font-thin mb-10">オートメーション</h2>
            
            {/* こんな課題はありませんか？ */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">こんな課題はありませんか？</h3>
              <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                <ul className="list-disc pl-6 space-y-4 text-sm md:text-base font-light">
                  <li>定型業務に時間が取られている</li>
                  <li>人的ミスが発生している</li>
                  <li>業務プロセスの標準化ができていない</li>
                  <li>システム間の連携ができていない</li>
                </ul>
              </div>
            </div>
            
            {/* プラズミズムが提供するソリューション */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">プラズミズムが提供するソリューション</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                  <h4 className="text-xl font-thin mb-4">RPAツール</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    定型業務を自動化し、業務効率を大幅に向上。人的ミスを削減し、コストを最適化します。
                  </p>
                </div>
                <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                  <h4 className="text-xl font-thin mb-4">ワークフロー自動化</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    複雑な業務プロセスを自動化し、効率的なワークフローを実現。システム間の連携も強化します。
                  </p>
                </div>
              </div>
            </div>
            
            {/* なぜプラズミズムを選ぶべきか */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">なぜプラズミズムを選ぶべきか</h3>
              <div className="bg-white/5 p-8 rounded-lg border border-white/6">
                <ul className="list-disc pl-6 space-y-4 text-sm md:text-base font-light">
                  <li>直感的な操作性と柔軟なカスタマイズ</li>
                  <li>既存システムとのスムーズな連携</li>
                  <li>24時間365日の安定した運用</li>
                  <li>専門家によるサポート体制</li>
                </ul>
              </div>
            </div>
            
            {/* 実績 */}
            <div className="mb-16">
              <h3 className="text-2xl font-thin mb-6">実績</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-lg border border-white/6 overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/sample1.png"
                      alt="オートメーション実績"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-thin mb-2">NAMINORI</h4>
                    <p className="text-white/80 text-sm font-light mb-4">業務自動化導入</p>
                    <Link href="/achievements/achievement-3" className="text-white/60 hover:text-white text-sm">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg border border-white/6 overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/sample1.png"
                      alt="オートメーション実績"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-thin mb-2">NAMINORI</h4>
                    <p className="text-white/80 text-sm font-light mb-4">業務自動化導入</p>
                    <Link href="/achievements/achievement-1" className="text-white/60 hover:text-white text-sm">
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/achievements" className="inline-block text-white/60 hover:text-white text-sm border border-white/20 rounded-full px-6 py-2">
                  実績一覧を見る
                </Link>
              </div>
            </div>
            
            {/* よくあるご質問 */}
            <div>
              <h3 className="text-2xl font-thin mb-6">オートメーションに関するよくある質問</h3>
              <div className="border-t border-white/7">
                <div className="border-b border-white/7 py-8">
                  <h4 className="text-xl font-thin mb-4">Q. 導入にはどのくらいの期間がかかりますか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    業務の複雑さや自動化の範囲によって異なりますが、基本的な導入には1〜2ヶ月程度かかります。段階的な導入も可能で、優先度の高い業務から順次展開していくことができます。
                  </p>
                </div>
                
                <div className="border-b border-white/7 py-8">
                  <h4 className="text-xl font-thin mb-4">Q. 既存のシステムとの連携は可能ですか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    はい、主要な業務システムとの連携に対応しています。APIやデータベース連携など、お客様の環境に合わせた最適な連携方法を提案します。
                  </p>
                </div>
                
                <div className="py-8">
                  <h4 className="text-xl font-thin mb-4">Q. 運用サポートはどのように行われますか？</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                    24時間365日の監視体制と、専門家によるサポート体制を整えています。また、定期的なメンテナンスやアップデートも提供しています。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 