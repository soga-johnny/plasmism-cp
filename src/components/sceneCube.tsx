/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useProgress, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'
import { Mesh, Vector3, DoubleSide, MeshBasicMaterial } from 'three'
import { useLoadingStore } from './LoadingScreen'

// 3Dシーン内の各セクションを管理する型
interface SceneSection {
  id: number;
  position: Vector3;
  cameraPosition: Vector3;
  title: string;
  description: string;
  imagePath?: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  backgroundGradient?: boolean | string;
  showImage: boolean;
}

// セクション定義
const SECTIONS: SceneSection[] = [
  {
    id: 0,
    position: new Vector3(0, 0, 0),
    cameraPosition: new Vector3(0, 0, 8),
    title: "",
    description: "",
    backgroundColor: "",
    backgroundOpacity: 0,
    backgroundGradient: false,
    showImage: false,
  },
  {
    id: 1,
    position: new Vector3(2, 1, 0),
    cameraPosition: new Vector3(1, 0.5, 7),
    title: "Designing the Unimaginable",
    description: "想像もできなかった豊かさを、",
    imagePath: "",
    backgroundColor: "#1d2033",
    backgroundOpacity: 0.95,
    backgroundGradient: "linear-gradient(135deg, #1d2033 0%, #1a2535 100%)",
    showImage: true,
  },
  {
    id: 2,
    position: new Vector3(-2, -1, 0),
    cameraPosition: new Vector3(-1, -0.5, 7),
    title: "Savoring the Moment",
    description: "いつどの瞬間であっても、",
    imagePath: "",
    backgroundColor: "#2a1b3a",
    backgroundOpacity: 0.95,
    backgroundGradient: "linear-gradient(135deg, #2a1b3a 0%, #31204a 100%)",
    showImage: true,
  },
  {
    id: 3,
    position: new Vector3(3, -1.5, 0),
    cameraPosition: new Vector3(1.5, -0.7, 7),
    title: "Sensing Presence",
    description: "噛み締めて実感できる、",
    imagePath: "",
    backgroundColor: "#3f1b2d",
    backgroundOpacity: 0.95,
    backgroundGradient: "linear-gradient(135deg, #3f1b2d 0%, #4a2030 100%)",
    showImage: true,
  },
  {
    id: 4,
    position: new Vector3(-1, 2, 0),
    cameraPosition: new Vector3(-0.5, 1, 7),
    title: "Being Intention",
    description: "そんな会社。",
    imagePath: "",
    backgroundColor: "#251E1F",
    backgroundOpacity: 0,
    backgroundGradient: true,
    showImage: false,
  }
];

// 進捗度に基づいてセクション間の補間係数を計算する関数
function getInterpolationFactor(scrollProgress: number): {section: number, nextSection: number, factor: number} {
  const sectionCount = SECTIONS.length;
  const sectionSize = 0.6 / sectionCount;
  const totalProgress = scrollProgress / sectionSize;
  const currentSection = Math.min(Math.floor(totalProgress), sectionCount - 1);
  const nextSection = Math.min(currentSection + 1, sectionCount - 1);
  const factor = totalProgress - currentSection; // 0〜1の間の小数

  return {
    section: currentSection,
    nextSection: nextSection,
    factor: factor
  };
}

function ImagePlane({ sectionId, position, interpolationFactor, isNextSection }: { sectionId: number, position: Vector3, interpolationFactor: number, isNextSection?: boolean }) {
  const texture = useTexture(SECTIONS[sectionId].imagePath || '/layer-1.webp')
  const meshRef = useRef<Mesh>(null)
  const animationRef = useRef({
    time: 0,
    baseY: 0,
    opacity: 0
  })
  
  // セクションごとの固定位置を定義（セクションIDごとに固有の位置）
  const sectionPositions = {
    1: new Vector3(-3, 0, -2),
    2: new Vector3(3, -1, -2),
    3: new Vector3(-3, -1, -2)
  }
  
  useFrame(() => {
    if (!meshRef.current || sectionId === 0 || sectionId === 4) return
    
    const mesh = meshRef.current
    animationRef.current.time += 0.005 // アニメーション速度を遅く
    
    // 透明度の計算を見直し、明確な閾値を設定して切り替える
    let targetOpacity = 0
    
    if (isNextSection) {
      // 次のセクションの場合、閾値（0.5）を超えたら表示を開始
      targetOpacity = interpolationFactor > 0.5 ? 
        (interpolationFactor - 0.5) * 2 * 0.9 : 0
    } else {
      // 現在のセクションの場合、閾値（0.5）までは表示、それ以降はフェードアウト
      targetOpacity = interpolationFactor < 0.5 ? 
        (1 - interpolationFactor * 2) * 0.9 : 0
    }
    
    // より急速に目標の透明度に近づける
    animationRef.current.opacity += (targetOpacity - animationRef.current.opacity) * 0.2
    
    if (meshRef.current.material instanceof MeshBasicMaterial) {
      meshRef.current.material.opacity = animationRef.current.opacity
    }
    
    // 固定位置の適用（浮遊アニメーションはさらに削減）
    const targetPos = sectionPositions[sectionId as keyof typeof sectionPositions]
    if (targetPos) {
      // 位置をより確実に維持
      mesh.position.lerp(targetPos, 0.1)
      
      // 最小限のアニメーション（ほぼ静止に近い動き）
      const floatY = Math.sin(animationRef.current.time) * 0.03 // さらに浮遊を少なく
      mesh.position.y += floatY
      mesh.rotation.y = Math.sin(animationRef.current.time * 0.3) * 0.01 // さらに回転を少なく
      mesh.rotation.x = Math.sin(animationRef.current.time * 0.2) * 0.005 // X軸回転もほぼなし
    }
  })

  // セクション0と4では非表示、または表示対象外の場合も非表示
  if (sectionId === 0 || sectionId === 4) return null

  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      scale={[4, 4, 1]} // サイズをさらに大きく
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0}
        side={DoubleSide}
        depthTest={true}
        depthWrite={true}
      />
    </mesh>
  )
}

// セクションコンテンツを表示するコンポーネント（テキスト部分を廃止）

// カメラの制御を改善
function CameraController({ currentSectionIndex, interpolationFactor }: { currentSectionIndex: number, interpolationFactor: number }) {
  const { camera } = useThree()
  const targetRef = useRef({
    position: new Vector3(),
    rotation: new Vector3()
  })
  
  useFrame(() => {
    const section = SECTIONS[currentSectionIndex]
    if (!section) return
    
    // 次のセクションを取得（最後のセクションなら現在のセクションを使用）
    const nextSectionIndex = Math.min(currentSectionIndex + 1, SECTIONS.length - 1)
    const nextSection = SECTIONS[nextSectionIndex]
    
    // 現在のセクションと次のセクションの間を補間
    const targetPosition = new Vector3().lerpVectors(
      section.cameraPosition,
      nextSection.cameraPosition,
      interpolationFactor
    )
    
    // カメラの目標位置を設定
    targetRef.current.position.lerp(targetPosition, 0.05)
    
    // カメラをスムーズに移動
    camera.position.lerp(targetRef.current.position, 0.1)
    
    // カメラの回転も滑らかに変更
    const targetRotationY = section.id * 0.1 + (nextSection.id - section.id) * 0.1 * interpolationFactor
    camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.1
    
    if ('fov' in camera) {
      const currentFov = 50 + (section.id === 0 ? 0 : -5)
      const nextFov = 50 + (nextSection.id === 0 ? 0 : -5)
      const targetFov = currentFov + (nextFov - currentFov) * interpolationFactor
      camera.fov += (targetFov - camera.fov) * 0.1
      camera.updateProjectionMatrix()
    }
  })
  
  return null
}

// セクションインジケーターコンポーネント
function SectionIndicator({ currentSection, progress }: { currentSection: number, progress: number }) {
  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
      {SECTIONS.map((section, index) => {
        const isActive = currentSection === index;
        const isCompleted = currentSection > index;
        const isNext = currentSection + 1 === index && progress > 0;
        
        // 進行中の現在セクションのプログレスバー
        let progressIndicator = null;
        if (isActive) {
          progressIndicator = (
            <div 
              className="absolute bottom-0 left-0 bg-white/80 h-full transition-all duration-100 rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          );
        }
        
        return (
          <div key={section.id} className="flex flex-col items-center">
            <div 
              className={`w-[3px] h-2 rounded-full flex items-center justify-center py-1 transition-all duration-300 relative overflow-hidden
                ${isActive || isCompleted || isNext ? 'bg-white' : 'border border-white/30'}
                ${isNext ? 'opacity-70' : ''}
              `}
            >
              {progressIndicator}
              <span 
                className={`text-[10px] md:text-sm font-thin transition-all duration-300 relative z-10
                  ${isActive || isCompleted ? 'text-black' : 'text-white/50'}
                `}
              >
                {/* {index + 1} */}
              </span>
            </div>
            {index < SECTIONS.length - 1 && (
              <div 
                className={`h-3 md:h-4 w-[1px] my-1 md:my-2 transition-all duration-300
                  ${isCompleted ? 'bg-white' : isActive ? `bg-gradient-to-b from-white to-white/10` : 'bg-white/10'}
                `}
                style={
                  isActive ? { 
                    background: `linear-gradient(to bottom, white ${progress * 100}%, rgba(255,255,255,0.1) ${progress * 100}%)` 
                  } : {}
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// メインの3Dシーン全体を管理するコンポーネント
export default function IntegratedScene3D() {
  const { scrollYProgress } = useScroll()
  const { progress } = useProgress()
  const { setProgress, setLoading } = useLoadingStore()
  const [scrollOffset, setScrollOffset] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [cameraFov, setCameraFov] = useState(50)
  const [targetCameraPosition, setTargetCameraPosition] = useState<Vector3>(new Vector3(0, 0, 7))
  const [currentSection, setCurrentSection] = useState(0)
  const [currentSectionData, setCurrentSectionData] = useState<SceneSection>(SECTIONS[0])
  const [nextSectionData, setNextSectionData] = useState<SceneSection>(SECTIONS[Math.min(1, SECTIONS.length - 1)])
  const [interpolationValue, setInterpolationValue] = useState({ factor: 0, section: 0, nextSection: 1 })
  
  // SSRで実行されないようにするためのフラグ
  const [isBrowser, setIsBrowser] = useState(false)
  
  useEffect(() => {
    setIsBrowser(true) 
    
    // ブラウザ環境でのみ実行される処理
    if (typeof window !== 'undefined') {
      // モバイル判定
      setIsMobile(window.innerWidth < 768)
      
      // リサイズハンドラ
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
        updateCamera()
      }
      
      // スクロールハンドラ
      const handleScroll = () => {
        if (typeof window !== 'undefined') {
          setScrollOffset(window.scrollY)
        }
      }
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // カメラの設定更新（ブラウザ環境でのみ実行）
  const updateCamera = () => {
    if (typeof window === 'undefined') return
    
    const mobile = window.innerWidth < 768
    setCameraFov(mobile ? 60 : 50)
  }

  // リソース読み込み完了時の処理
  const handleResourcesReady = () => {
    if (typeof window === 'undefined') return
    
    setIsInitializing(false)
    setTimeout(() => {
      setIsInitialized(true)
      setLoading(false)
    }, 1000)
  }

  // Three.jsのプログレスを監視
  useEffect(() => {
    if (progress === 100) {
      handleResourcesReady()
    }
    setProgress(progress)
  }, [progress, setProgress, handleResourcesReady])

  // セクション位置の計算
  useEffect(() => {
    if (!isBrowser) return
    
    // スクロール位置からセクション情報を計算
    const interpolation = getInterpolationFactor(scrollYProgress.get())
    
    // アップデートが必要な場合のみステート更新
    if (
      interpolation.section !== interpolationValue.section ||
      interpolation.nextSection !== interpolationValue.nextSection ||
      Math.abs(interpolation.factor - interpolationValue.factor) > 0.01
    ) {
      setInterpolationValue(interpolation)
      setCurrentSection(interpolation.section)
      setCurrentSectionData(SECTIONS[interpolation.section])
      setNextSectionData(SECTIONS[interpolation.nextSection])
    }
  }, [scrollYProgress, interpolationValue, isBrowser])

  // スクロールに応じたセクション切り替え
  useEffect(() => {
    if (!isBrowser) return
    
    // スクロール位置の変化を監視
    const unsubscribe = scrollYProgress.onChange((value) => {
      const interpolation = getInterpolationFactor(value)
      
      // アップデートが必要な場合のみステート更新
      if (
        interpolation.section !== interpolationValue.section ||
        interpolation.nextSection !== interpolationValue.nextSection ||
        Math.abs(interpolation.factor - interpolationValue.factor) > 0.01
      ) {
        setInterpolationValue(interpolation)
        setCurrentSection(interpolation.section)
        setCurrentSectionData(SECTIONS[interpolation.section])
        setNextSectionData(SECTIONS[interpolation.nextSection])
      }
    })
    
    return () => unsubscribe()
  }, [scrollYProgress, interpolationValue, isBrowser])

  // ブラウザ環境でない場合は何も表示しない
  if (!isBrowser) {
    return null
  }

  return (
    <div className="relative w-full h-screen">
      {/* セクションインジケーター */}
      <SectionIndicator currentSection={currentSection} progress={interpolationValue.factor} />
      
      {/* セクション背景色 */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-0 transition-all duration-300"
        style={{
          background: typeof currentSectionData.backgroundGradient === 'string' 
            ? currentSectionData.backgroundGradient
            : currentSectionData.backgroundColor,
          opacity: 1
        }}
      />
      
      {/* 次のセクションの背景 - トランジション用 */}
      {interpolationValue.factor > 0 && currentSection < SECTIONS.length - 1 && (
        <div
          className="fixed top-0 left-0 w-full h-screen z-0"
          style={{
            background: typeof nextSectionData.backgroundGradient === 'string'
              ? nextSectionData.backgroundGradient
              : nextSectionData.backgroundColor,
            opacity: interpolationValue.factor * 0.9,
            transition: 'opacity 300ms ease-out'
          }}
        />
      )}
      
      {/* 背景パターン */}
      {currentSection > 0 && currentSection < 4 && (
        <div
          className="fixed top-0 left-0 w-full h-screen z-[1]"
          style={{
            backgroundImage: 'url("/background.png")',
            backgroundRepeat: 'repeat',
            opacity: currentSection === 0 ? interpolationValue.factor : 1 - interpolationValue.factor
          }}
        />
      )}
      
      {/* オーロラ背景（セクション5用） */}
      {currentSection === 4 && (
        <div
          className="fixed top-0 left-0 w-full h-screen z-[1] bg-gradient-to-br from-purple-900/30 via-pink-700/20 to-red-800/30"
          style={{
            animation: 'aurora 15s linear infinite',
            transition: 'opacity 600ms ease-in-out',
            opacity: interpolationValue.factor > 0.5 ? 1 : Math.max(0, (interpolationValue.factor - 0.5) * 2)
          }}
        />
      )}
      
      {/* メインの3Dシーン */}
      <motion.div 
        className="fixed w-full h-screen top-0 left-0 z-10"
        initial={{ 
          opacity: 0,
          y: -20,
          scale: 0.95
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          scale: 1
        }}
        style={{ opacity: 1 }}
        transition={{ 
          duration: 1.8,
          ease: "easeOut",
          delay: 0.5,
        }}
      >
        <Canvas 
          camera={{ 
            position: [0, 0, 8],
            fov: cameraFov,
          }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          dpr={[1, 2]}
        >
          <CanvasContent 
            currentSection={currentSection}
            currentSectionData={currentSectionData}
            targetCameraPosition={targetCameraPosition}
            cameraFov={cameraFov}
            isMobile={isMobile}
            interpolationFactor={interpolationValue.factor}
            nextSectionData={nextSectionData}
          />
        </Canvas>
      </motion.div>
      
      {/* スクロールガイド */}
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/70 text-md font-light transition-all duration-1000 ${scrollOffset >= 0.6 ? 'opacity-0 translate-y-4' : 'opacity-100 animate-pulse hover:translate-y-[-4px]'} before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-white/30 before:bottom-[-4px] before:left-0 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100`}
      >
        Vision ↓
      </div>
      
      {/* セクションのコンテンツ（左側のテキスト）*/}
      <div 
        className="fixed top-0 left-0 w-full h-screen z-20 pointer-events-none"
      >
        <div className="w-full max-w-[1440px] h-full mx-auto flex flex-col justify-center px-8">
          <div className="max-w-md relative">
            {/* 現在のセクション */}
            <motion.div
              key={`section-${currentSection}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: interpolationValue.factor < 0.5 ? 1 : 1 - ((interpolationValue.factor - 0.5) * 2), 
                x: -20 * (interpolationValue.factor > 0.5 ? interpolationValue.factor : 0)
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-white absolute w-full"
            >
              <h3 className="text-sm font-light mb-4">{currentSectionData.title}</h3>
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                {currentSectionData.description}
              </h2>
            </motion.div>
            
            {/* 次のセクション (トランジション用) - 閾値を超えた場合のみ表示 */}
            {currentSection < SECTIONS.length - 1 && interpolationValue.factor > 0.5 && (
              <motion.div
                key={`section-next-${nextSectionData.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: (interpolationValue.factor - 0.5) * 2,
                  x: 20 - 40 * (interpolationValue.factor - 0.5)
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-white absolute w-full"
              >
                <h3 className="text-sm font-light mb-4">{nextSectionData.title}</h3>
                <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                  {nextSectionData.description}
                </h2>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* スタイル定義 */}
      <style jsx global>{`
        @keyframes aurora {
          0% { filter: hue-rotate(0deg); background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { filter: hue-rotate(360deg); background-position: 0% 0%; }
        }
      `}</style>
    </div>
  )
}

// Canvasの内部コンテンツを管理するコンポーネント
function CanvasContent({ 
  currentSection, 
  currentSectionData,
  nextSectionData,
  targetCameraPosition,
  cameraFov,
  isMobile,
  interpolationFactor
}: { 
  currentSection: number;
  currentSectionData: SceneSection;
  nextSectionData: SceneSection;
  targetCameraPosition: Vector3;
  cameraFov: number;
  isMobile: boolean;
  interpolationFactor: number;
}) {
  const { camera } = useThree()
  
  // カメラアニメーションのためのスプリング値
  const cameraAnimationRef = useRef({
    position: new Vector3(targetCameraPosition.x, targetCameraPosition.y, targetCameraPosition.z),
    rotation: new Vector3(0, currentSection * 0.1, 0),
    fov: cameraFov + (currentSection === 0 ? 0 : -5)
  });

  // カメラの位置を更新
  useFrame(() => {
    const targetPosition = SECTIONS[currentSection].cameraPosition
    camera.position.lerp(targetPosition, 0.1)
    camera.lookAt(0, 0, 0)
  })
  
  useFrame(() => {
    // 位置の更新
    const targetPos = new Vector3(
      targetCameraPosition.x,
      targetCameraPosition.y,
      targetCameraPosition.z
    );
    cameraAnimationRef.current.position.lerp(targetPos, 0.05);
    camera.position.copy(cameraAnimationRef.current.position);

    // 回転の更新
    const targetRot = new Vector3(0, currentSection * 0.1, 0);
    cameraAnimationRef.current.rotation.lerp(targetRot, 0.05);
    camera.rotation.setFromVector3(cameraAnimationRef.current.rotation);

    // FOVの更新
    const targetFov = cameraFov + (currentSection === 0 ? 0 : -5);
    cameraAnimationRef.current.fov += (targetFov - cameraAnimationRef.current.fov) * 0.05;
    if ('fov' in camera) {
      camera.fov = cameraAnimationRef.current.fov;
      camera.updateProjectionMatrix();
    }
  });
  
  // 次のセクションのインデックス
  const nextSectionIndex = Math.min(currentSection + 1, SECTIONS.length - 1);
  
  // 次のセクションが表示可能かどうか判断（特定の閾値を超えた場合のみ）
  const showNextSection = interpolationFactor > 0.5 && currentSection < SECTIONS.length - 1 && nextSectionData.showImage;
  
  // 現在のセクションの表示を閾値を下回った場合のみ表示
  const showCurrentSection = currentSectionData.showImage && (interpolationFactor < 0.5 || currentSection === SECTIONS.length - 1);
  
  return (
    <Suspense fallback={null}>
      <CameraController 
        currentSectionIndex={currentSection} 
        interpolationFactor={interpolationFactor} 
      />
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={1.5} castShadow penumbra={1} distance={50} />
      <hemisphereLight intensity={0.5} groundColor="black" />
      <Environment background={false} />
      
      {/* 現在のセクションの画像 - 閾値を下回った場合のみ表示 */}
      {showCurrentSection && (
        <ImagePlane 
          sectionId={currentSection} 
          position={currentSectionData.position}
          interpolationFactor={interpolationFactor}
        />
      )}
      
      {/* 次のセクションの画像 - 閾値を超えた場合のみ表示 */}
      {showNextSection && (
        <ImagePlane 
          sectionId={nextSectionIndex} 
          position={nextSectionData.position}
          interpolationFactor={interpolationFactor}
          isNextSection={true}
        />
      )}
      
      {!isMobile && <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />}
      <EffectComposer>
        <Bloom 
          intensity={0.1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.4}
          mipmapBlur={true}
          radius={0.7}
        />
      </EffectComposer>
    </Suspense>
  );
} 