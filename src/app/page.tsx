"use client"

import Image from "next/image";
// import StickyScenes from '@/components/StickyScenes'
import SceneSample from '@/components/sceneSample'
import SceneCube from '@/components/sceneCube'
import ScrollingTitle from '@/components/ScrollingTitle'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useRef } from 'react'
// import { motion } from 'framer-motion'

export default function Home() {
  const [showCube, setShowCube] = useState(true)
  const featuresRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (featuresRef.current) {
        const featuresRect = featuresRef.current.getBoundingClientRect()
        // 特徴セクションが上部に少し入ってきたら（-100px地点）3Dキューブを非表示
        setShowCube(featuresRect.top > -100)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative">
      <Header />
      <section>
      {showCube && (
        <div className="fixed top-0 right-0 w-full h-screen z-10">
          <SceneCube />
        </div>
      )}
      <div className="relative z-0">
        <div className="h-screen w-full max-w-[1440px] mx-auto flex items-end pb-16 px-4 md:px-8">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0">
            <h2 className="text-white text-md md:text-xl font-extralight max-w-[600px] leading-relaxed">
            プラズミズムは
            （０００００００００）の
            ００００００会社です。
            </h2>
            {/* <div className="mt-8">
              <Button variant="outline" size="lg">
                詳しく見る
              </Button>
            </div> */}
            <p className="text-white text-base md:text-lg font-extralight md:mr-10">
            Scroll down ↓
            </p>
          </div>
        </div>
        <ScrollingTitle />
        <div className="sticky top-0">
          <SceneSample />
          <SceneSample />
          <SceneSample />
        </div>
      </div>

      <div className="relative z-0">
        <div className="h-screen w-full max-w-[1440px] mx-auto pb-16 px-4 md:px-8">
          <p>
            そんな会社。
          </p>
          <p>
          Being Intention
          </p>
          <p>
          最適解の設計・実装・検証・改善をコンピューターと情報表現でデザインします。
          </p>
                   <div className="mt-8">
              <Button variant="outline" size="lg">
                詳しく見る
              </Button>
            </div>
        </div>
      </div>
      </section>

      <section ref={featuresRef} className="z-20 bg-[#534A4A] py-20 md:py-32">
        <div className="w-full max-w-[1440px] mx-auto mb-32 px-4 md:px-8">
          <div className="max-w-[800px]">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              特徴
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed">
            フレキシブルなチーム編成で、幅広い経験と深い専門性を活かしたソリューションを提供します。
            </p>
            <div className="mt-12">
              <Button variant="outline" size="lg">
                詳しく見る
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-light mb-12">
              主な支援企業
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <Image src="/image2-1.png" alt="企業1" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
              <Image src="/image2-2.png" alt="企業2" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
              <Image src="/image2-3.png" alt="企業3" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="z-20 py-20 md:py-32">
        <div className="w-full max-w-[1440px] mx-auto mb-32 px-4 md:px-8">
          <div className="max-w-[800px]">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              仕事の進め方
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed">
            上流から下流まで携わることで、認識のズレをなくし、お客さまの負担を軽減いたします。
            </p>
            <Image src="/image3-1.png" alt="仕事の進め方" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
          </div>
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-light mb-12">
              Plasmismが提供する価値
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <h3>
              1.確かな基盤を築く
              </h3>
              <p>
              ブランディングから開発の要件定義、クラウドインフラ、UI/UXデザインまで、プロジェクトの上流から下流までを一貫して支援します。真摯なデザインで、お客様のビジネスの基盤を安定させ、高品質なソリューションを提供します。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <h3>
            2.柔軟に適応し、流れを生む
              </h3>
              <p>
              市場の流れや変化に適応しながら、ただの感覚や流行に頼らず、ユーザーの行動分析に基づいたデザインを実現します。データに裏付けされた柔軟なアプローチにより、ビジネスの可能性を広げる最適なユーザー体験を生み出します。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <h3>
              3.見えない価値を捉える
              </h3>
              <p>
              定量的・定性的なデータを駆使し、目には見えにくい課題を発見し、本質的な価値へと変換します。ビジネスの成長に寄与するデザインやシステムの設計を通じて、お客様の提供価値を最大化します。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <h3>
              3.次元を超えた融合
              </h3>
              <p>
              デジタルとリアルを融合し、テクノロジーの力で新たな可能性を切り拓きます。既存の枠を超えた体験設計とシステム開発により、お客様が想像もしなかった豊かさを実現し、未来への進化を加速させます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="z-20 bg-[#534A4A] py-20 md:py-32">
        <div className="w-full max-w-[1440px] mx-auto mb-32 px-4 md:px-8">
          <div className="max-w-[800px]">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              プロダクト
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed">
            プラズミズムは、最適解の設計・実装・検証・改善をコンピューターと情報表現でデザインする会社です。
            </p>
            <Image src="/image3-1.png" alt="仕事の進め方" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
          </div>
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">

        <div className="max-w-[800px]">
          <div>
            <h3>NAMINORI</h3>
            <p>説明が入ります説明が入ります説明が入ります説明が入ります。</p>
            <Image src="/image4-1.png" alt="Lean Designer" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
          </div>
          <div>
            <h3>NAMINORI</h3>
            <p>説明が入ります説明が入ります説明が入ります説明が入ります。</p>
            <Image src="/image4-1.png" alt="Lean Designer" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
          </div>
          <div>
          <div>
            <h3>NAMINORI</h3>
            <p>説明が入ります説明が入ります説明が入ります説明が入ります。</p>
            <Image src="/image4-1.png" alt="Lean Designer" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
          </div>
          </div>
          <div className="mt-12">
              <Button variant="outline" size="lg">
                詳しく見る
              </Button>
            </div>
  
          </div>
        </div>
      </section>


      <section ref={featuresRef} className="z-20 bg-[#534A4A] py-20 md:py-32">
      <div className="max-w-[800px]">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              採用
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed">
            フレキシブルなチーム編成で、幅広い経験と深い専門性を活かしたソリューションを提供します。
            </p>
            <div className="mt-12">
              <Button variant="outline" size="lg">
                詳しく見る
              </Button>
            </div>
          </div>
      </section>

      <section ref={featuresRef} className="z-20 bg-[#EA6130] py-20 md:py-32">
      <div className="max-w-[800px]">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              お問い合わせ・ご相談
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed">
            UI/UXデザイン、ブランディング、クラウドインフラなど、あらゆるデジタル課題に対応。初回相談は無料で、お客様の状況に合わせた最適な提案をいたします。
            </p>
            <div className="mt-12">
              <Button variant="outline" size="lg">
                お問い合わせ
              </Button>
            </div>
          </div>
          <div className="max-w-[800px]">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              会社資料ダウンロード
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed">
            サービス内容、実績事例、アプローチをまとめた資料をご用意。メールアドレスをご登録いただくだけで、すぐにダウンロードいただけます。
            </p>
            <div className="mt-12">
              <Button variant="outline" size="lg">
                ダウンロード
              </Button>
            </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
