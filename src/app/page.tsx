"use client"

import Image from "next/image";
// import StickyScenes from '@/components/StickyScenes'
import SceneSample from '@/components/sceneSample'
import SceneCube from '@/components/sceneCube'
import ScrollingTitle from '@/components/ScrollingTitle'
// import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
// import { motion } from 'framer-motion'

export default function Home() {
  // const [showCube, setShowCube] = useState(true)
  // const featureRef = useRef<HTMLElement>(null)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (featureRef.current) {
  //       const featureRect = featureRef.current.getBoundingClientRect()
  //       // 特徴セクションが上部に少し入ってきたら（-100px地点）3Dキューブを非表示
  //       setShowCube(featureRect.top > -100)
  //     }
  //   }
    
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <main className="relative">
      {/* <Header /> */}
      <div className="fixed top-0 right-0 w-full h-screen z-30">
        <SceneCube />
      </div>
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

      <section className="z-20 bg-white/10 py-20 md:py-32 rounded-3xl">
      {/* <section ref={featureRef} className="z-20 bg-white/10 py-20 md:py-32 rounded-3xl"> */}

        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-20 border-b border-white/7">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div className="flex space-x-4 mb-8">
                <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                  <h2 className="text-md font-thin">特徴</h2>
                </div>
                <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                  <h2 className="text-md font-thin">フレキシブルな対応</h2>
                </div>
              </div>
              <div className="rounded-lg max-w-[800px]">
                <p className="font-thin text-3xl md:text-6xl leading-tight mb-8">
                  少数精鋭だからこそ実現する、<br/>
                  幅広い経験と深い専門性。
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed">
                  フレキシブルなチーム編成で、幅広い経験と深い専門性を活かしたソリューションを提供します。設計・実装・検証・改善のサイクルで、ユーザー体験を進化させます。
                </p>
                <div className="mt-12">
                  <Link href="/feature">
                    <Button variant="outline" size="lg">
                      詳しく見る
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-20">
          <h2 className="text-3xl md:text-5xl font-thin mb-12">主な支援企業</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <Image src="/image2-1.png" alt="企業1" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
            <Image src="/image2-2.png" alt="企業2" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
            <Image src="/image2-3.png" alt="企業3" width={320} height={200} className="w-full max-w-[320px] mx-auto" />
          </div>
        </div>
      </section>

      <section className="z-20 py-20 md:py-32">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-20 border-b border-white/7">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div className="flex space-x-4 mb-8">
                <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                  <h2 className="text-md font-thin">仕事の進め方</h2>
                </div>
                <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                  <h2 className="text-md font-thin">一貫したプロセス</h2>
                </div>
              </div>
              <div className="rounded-lg max-w-[800px]">
                <p className="font-thin text-3xl md:text-6xl leading-tight mb-8">
                  上流から下流まで携わり、<br/>
                  お客様の負担を軽減。
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed mb-12">
                  上流から下流まで携わることで、認識のズレをなくし、お客さまの負担を軽減いたします。
                </p>
                <Image src="/image3-1.png" alt="仕事の進め方" width={560} height={350} className="w-full max-w-[560px] rounded-lg mb-8" />
                <div className="mt-8">
                  <Link href="/feature">
                    <Button variant="outline" size="lg">
                      詳しく見る
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-20">
          <h2 className="text-3xl md:text-5xl font-thin mb-12">Plasmismが提供する価値</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-thin mb-4 border-l-4 border-white/30 pl-4">
                1. 確かな基盤を築く
              </h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                ブランディングから開発の要件定義、クラウドインフラ、UI/UXデザインまで、プロジェクトの上流から下流までを一貫して支援します。真摯なデザインで、お客様のビジネスの基盤を安定させ、高品質なソリューションを提供します。
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-thin mb-4 border-l-4 border-white/30 pl-4">
                2. 柔軟に適応し、流れを生む
              </h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                市場の流れや変化に適応しながら、ただの感覚や流行に頼らず、ユーザーの行動分析に基づいたデザインを実現します。データに裏付けされた柔軟なアプローチにより、ビジネスの可能性を広げる最適なユーザー体験を生み出します。
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-thin mb-4 border-l-4 border-white/30 pl-4">
                3. 見えない価値を捉える
              </h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                定量的・定性的なデータを駆使し、目には見えにくい課題を発見し、本質的な価値へと変換します。ビジネスの成長に寄与するデザインやシステムの設計を通じて、お客様の提供価値を最大化します。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <div>
              <h3 className="text-xl md:text-2xl font-thin mb-4 border-l-4 border-white/30 pl-4">
                4. 次元を超えた融合
              </h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                デジタルとリアルを融合し、テクノロジーの力で新たな可能性を切り拓きます。既存の枠を超えた体験設計とシステム開発により、お客様が想像もしなかった豊かさを実現し、未来への進化を加速させます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="z-20 bg-white/10 py-20 md:py-32 rounded-3xl">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-20 border-b border-white/7">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div className="flex space-x-4 mb-8">
                <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                  <h2 className="text-md font-thin">プロダクト</h2>
                </div>
                <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                  <h2 className="text-md font-thin">自社開発サービス</h2>
                </div>
              </div>
              <div className="rounded-lg max-w-[800px]">
                <p className="font-thin text-3xl md:text-6xl leading-tight mb-8">
                  最先端の技術で<br/>
                  ユーザー体験を革新する。
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed mb-12">
                  プラズミズムは、最適解の設計・実装・検証・改善をコンピューターと情報表現でデザインする会社です。自社開発のプロダクトでも同じ品質をお届けします。
                </p>
                <Image src="/image3-1.png" alt="プロダクト概要" width={560} height={350} className="w-full max-w-[560px] rounded-lg mb-8" />
                <div className="mt-8">
                  <Link href="/product">
                    <Button variant="outline" size="lg">
                      詳しく見る
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white/4 p-8 rounded-lg border border-white/6">
              <h3 className="text-2xl font-thin mb-4">NAMINORI</h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-6">AI技術を活用したデザイン支援ツール。ユーザー体験を向上させるための直感的なインターフェースを提供します。</p>
              <Image src="/image4-1.png" alt="NAMINORI" width={320} height={200} className="w-full rounded-lg" />
            </div>
            <div className="bg-white/4 p-8 rounded-lg border border-white/6">
              <h3 className="text-2xl font-thin mb-4">Lean Designer</h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-6">デザイナーとエンジニアの協業をスムーズにするコラボレーションプラットフォーム。効率的なワークフローを実現します。</p>
              <Image src="/image4-1.png" alt="Lean Designer" width={320} height={200} className="w-full rounded-lg" />
            </div>
            <div className="bg-white/4 p-8 rounded-lg border border-white/6">
              <h3 className="text-2xl font-thin mb-4">Cloud Vision</h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-6">クラウドインフラの監視・最適化ツール。セキュリティとパフォーマンスを両立したシステム運用を支援します。</p>
              <Image src="/image4-1.png" alt="Cloud Vision" width={320} height={200} className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/20 z-20 py-20 md:py-32 mt-1 rounded-3xl">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div className="flex space-x-4 mb-8">
                <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                  <h2 className="text-md font-thin">採用</h2>
                </div>
                <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                  <h2 className="text-md font-thin">共に成長する仲間を募集</h2>
                </div>
              </div>
              <div className="rounded-lg max-w-[800px]">
                <p className="font-thin text-3xl md:text-6xl leading-tight mb-8">
                  あなたの専門性と情熱が<br/>
                  新たな価値を生み出す。
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed">
                  フレキシブルなチーム編成で、幅広い経験と深い専門性を活かしたソリューションを提供します。私たちと一緒に、クライアントの課題解決に取り組みましょう。
                </p>
                <div className="mt-12">
                  <Link href="/recruit">
                    <Button variant="outline" size="lg">
                      採用情報を見る
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="z-20 bg-white/20 py-20 md:py-32 rounded-3xl">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <div className="flex space-x-4 mb-8">
                <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                  <h2 className="text-md font-thin">お問い合わせ</h2>
                </div>
                <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                  <h2 className="text-md font-thin">ご相談・お見積り</h2>
                </div>
              </div>
              <div className="rounded-lg">
                <p className="font-thin text-2xl md:text-4xl leading-tight mb-6">
                  お客様の課題に<br/>
                  最適なソリューションを。
                </p>
                <p className="text-md md:text-lg font-light leading-relaxed mb-8">
                  UI/UXデザイン、ブランディング、クラウドインフラなど、あらゆるデジタル課題に対応。初回相談は無料で、お客様の状況に合わせた最適な提案をいたします。
                </p>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button variant="outline" size="lg">
                      お問い合わせ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="flex space-x-4 mb-8">
                <div className="border border-white/20 bg-white/10 rounded-full px-4 py-3">
                  <h2 className="text-md font-thin">資料ダウンロード</h2>
                </div>
                <div className="border border-white/10 rounded-full -ml-8 px-4 py-3">
                  <h2 className="text-md font-thin">会社概要・サービス内容</h2>
                </div>
              </div>
              <div className="rounded-lg">
                <p className="font-thin text-2xl md:text-4xl leading-tight mb-6">
                  当社の強みを<br/>
                  詳しくご紹介。
                </p>
                <p className="text-md md:text-lg font-light leading-relaxed mb-8">
                  サービス内容、実績事例、アプローチをまとめた資料をご用意。メールアドレスをご登録いただくだけで、すぐにダウンロードいただけます。
                </p>
                <div className="mt-8">
                  <Link href="/download">
                    <Button variant="outline" size="lg">
                      資料をダウンロード
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}
