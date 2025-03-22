"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
export default function About() {
  return (
    <main className="min-h-screen flex flex-col text-white md:py-24 pt-8 pb-24">
      <Header />
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="mb-8 border-b border-white/7">
          <p className="text-md mb-4">● About</p>
          <h1 className="text-5xl font-thin mb-6">私たちについて</h1>
          <p className="mb-8 font-extralight text-sm md:text-base">プラズミズムは、最適解の設計・実装・検証・改善をコンピューターと情報表現でデザインする会社です。</p>
        </div>
        
        <div className="space-y-12 mb-16 md:mx-16 mx-4 pt-10 ">
          <section className="border-b border-white/7 pb-10">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex space-x-4 mb-8">
                  <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                    <h2 className="text-md font-thin">ミッション</h2>
                  </div>
                  <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                    <h2 className="text-md font-thin">存在意義</h2>
                  </div>
                </div>
                <div className="rounded-lg">
                  <p className="font-thin text-3xl md:text-6xl leading-tight">
                    豊かな毎日を、<br/>
                    コンピューターと情報表現で、<br/>
                    真摯にデザインする。
                  </p>
                </div>
              </div>
              <div className="mt-8 md:mt-2 md:ml-2 w-full md:w-auto">
                <Image 
                  src="/sample1.png"
                  alt="Mission Image"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover aspect-square w-full md:w-[300px]"
                />
              </div>
            </div>
          </section>

          <section className="border-b border-white/7 pb-10">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex space-x-4 mb-8">
                  <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                    <h2 className="text-md font-thin">ビジョン</h2>
                  </div>
                  <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                    <h2 className="text-md font-thin">あるべき目指す世界</h2>
                  </div>
                </div>
                <div className="rounded-lg">
                  <p className="font-thin text-3xl md:text-6xl leading-tight">
                    想像もできなかった豊かさを、<br/>
                    いつどの瞬間であっても、<br/>
                    噛み締めて実感できる、<br/>
                    そんな世界。
                  </p>
                </div>
              </div>
              <div className="mt-8 md:mt-12 md:ml-2 w-full md:w-auto">
                <Image 
                  src="/sample1.png"
                  alt="Mission Image"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover aspect-square w-full md:w-[300px]"
                />
              </div>
            </div>
          </section>
          
          <section className="pb-20">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex space-x-4 mb-8">
                  <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                    <h2 className="text-md font-thin">バリュー</h2>
                  </div>
                  <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                    <h2 className="text-md font-thin">そのために大切にする価値観</h2>
                  </div>
                </div>
                <div className="rounded-lg">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="text-lg font-thin text-white/50 mr-4">01</div>
                      <p className="font-thin text-2xl md:text-5xl">過去にはどうしても戻れない</p>
                    </div>
                    <div className="border-t border-white/7 pt-6 flex items-center">
                      <div className="text-lg font-thin text-white/50 mr-4">02</div>
                      <p className="font-thin text-2xl md:text-5xl">どこにも敵はいない</p>
                    </div>
                    <div className="border-t border-white/7 pt-6 flex items-center">
                      <div className="text-lg font-thin text-white/50 mr-4">03</div>
                      <p className="font-thin text-2xl md:text-5xl">意志は盗まれない</p>
                    </div>
                    <div className="border-t border-white/7 pt-6 flex items-center">
                      <div className="text-lg font-thin text-white/50 mr-4">04</div>
                      <p className="font-thin text-2xl md:text-5xl">知識は裏切らない</p>
                    </div>
                    <div className="border-t border-white/7 pt-6 flex items-center">
                      <div className="text-lg font-thin text-white/50 mr-4">05</div>
                      <p className="font-thin text-2xl md:text-5xl">ほとんどが伝わらない</p>
                    </div>
                    <div className="border-t border-white/7 pt-6 flex items-center">
                      <div className="text-lg font-thin text-white/50 mr-4">06</div>
                      <p className="font-thin text-2xl md:text-5xl">良いものは多くない</p>
                    </div>
                    <div className="border-t border-white/7 pt-6 flex items-center">
                      <div className="text-lg font-thin text-white/50 mr-4">07</div>
                      <p className="font-thin text-2xl md:text-5xl">可能性は尽きない</p>
                    </div>
                  </div>
                
                </div>
              </div>
              <div className="mt-8 md:mt-2 md:ml-2 w-full md:w-auto">
                <Image 
                  src="/sample1.png"
                  alt="Values Image"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover aspect-square w-full md:w-[300px]"
                />
              </div>
            </div>
          </section>
          
          <section className="pb-10 bg-white/4 rounded-3xl md:p-20 p-6 border border-white/6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-full">
                <div className="flex flex-col">
                  <div className="mb-8 bg-white/4 rounded-xl p-6">
                    <h2 className="border-l-4 border-white/30 pl-4 text-xl font-thin text-white">ブランドアイデンティティ</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <div className="bg-white rounded-lg overflow-hidden mb-3">
                        <Image 
                          src="/sample2.png"
                          alt="企業ロゴ"
                          width={500}
                          height={300}
                          className="w-full md:h-[360px] h-[240px] object-cover"
                        />
                      </div>
                      <p className="text-md text-white/60">企業ロゴ</p>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="bg-white rounded-lg overflow-hidden mb-3">
                        <Image 
                          src="/sample2.png"
                          alt="書体"
                          width={500}
                          height={300}
                          className="w-full md:h-[360px] h-[240px] object-cover"
                        />
                      </div>
                      <p className="text-md text-white/60">書体</p>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="bg-white rounded-lg overflow-hidden mb-3">
                        <Image 
                          src="/sample2.png"
                          alt="ブランドカラー"
                          width={500}
                          height={300}
                          className="w-full md:h-[360px] h-[240px] object-cover"
                        />
                      </div>
                      <p className="text-md text-white/60">ブランドカラー</p>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="bg-white rounded-lg overflow-hidden mb-3">
                        <Image 
                          src="/sample2.png"
                          alt="リブランディングに込めた想い"
                          width={500}
                          height={300}
                          className="w-full md:h-[360px] h-[240px] object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-md text-white/60">リブランディングに込めた想い</p>
                        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl md:text-4xl font-thin mb-6">ボードメンバー</h2>
            <div className="p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <h3 className="text-xl font-light mb-2">代表取締役社長</h3>
                  <p className="text-gray-300 text-sm md:text-base">山田 太郎</p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    テクノロジー業界で20年以上の経験を持ち、複数のスタートアップを成功に導いた実績を持つ。
                    ビジョナリーリーダーとして知られ、常に新しい技術トレンドを追求している。
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-light mb-2">最高技術責任者</h3>
                  <p className="text-gray-300 text-sm md:text-base">佐藤 次郎</p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    AIとクラウドテクノロジーの専門家。複数の特許を取得しており、
                    業界をリードする技術イノベーションを数多く生み出している。
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-light mb-2">最高デザイン責任者</h3>
                  <p className="text-gray-300 text-sm md:text-base">鈴木 花子</p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    国際的に評価されたUXデザイナー。ユーザー中心設計の第一人者として、
                    複数の大手企業のデジタルトランスフォーメーションを成功させた。
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-light mb-2">最高財務責任者</h3>
                  <p className="text-gray-300 text-sm md:text-base">田中 三郎</p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    テクノロジー企業での財務管理の豊富な経験を持ち、
                    持続可能な成長戦略の策定と実行に強みを持つ。
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl md:text-4xl font-thin mb-6">会社概要</h2>
            <div className="p-6 rounded-lg">
              <table className="w-full text-gray-300 text-sm md:text-base">
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-medium w-1/3">会社名</td>
                    <td className="py-3">Plasmism株式会社</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-medium">設立</td>
                    <td className="py-3">2018年4月1日</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-medium">資本金</td>
                    <td className="py-3">1億円</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-medium">代表者</td>
                    <td className="py-3">代表取締役社長 山田 太郎</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-medium">所在地</td>
                    <td className="py-3">〒100-0001 東京都千代田区千代田1-1-1 プラズマビル</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-medium">事業内容</td>
                    <td className="py-3">
                      デジタルトランスフォーメーション支援<br />
                      AIソリューション開発<br />
                      クラウドインフラ構築・運用<br />
                      UI/UXデザイン<br />
                      ブランディングサービス
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-medium">従業員数</td>
                    <td className="py-3">180名（2024年1月現在）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 