// import Image from "next/image";
// import StickyScenes from '@/components/StickyScenes'
import SceneSample from '@/components/sceneSample'
import SceneCube from '@/components/sceneCube'
import ScrollingTitle from '@/components/ScrollingTitle'
import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="relative">
      <div className="fixed top-0 right-0 w-1/2 h-screen z-10">
        <SceneCube />
      </div>
      <div className="relative z-0">
        <div className="h-screen w-full max-w-[1080px] mx-auto flex justify-center items-center">
          <div className="w-full">
            <h2 className="text-white text-2xl">
              プラズミズムは<br/>
              （０００００００００）の<br/>
              ００００００会社です。
            </h2>
            <div className="mt-8">
              <Button variant="outline" size="lg">
                詳しく見る
              </Button>
            </div>
          </div>
        </div>
        <ScrollingTitle />
        <div className="sticky top-0">
          <SceneSample />
          <SceneSample />
          <SceneSample />
        </div>
      </div>
    </main>
  );
}
