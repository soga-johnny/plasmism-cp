"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Text, useProgress, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import { Mesh, Vector3, DoubleSide, MeshBasicMaterial } from 'three'
import { useLoadingStore } from './LoadingScreen'
import * as THREE from 'three'
import { useSpring, a } from '@react-spring/three'

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

// スクロール位置に基づいて現在のセクションを計算する関数
function getCurrentSection(scrollProgress: number): number {
  const sectionCount = SECTIONS.length;
  const sectionSize = 0.6 / sectionCount;
  const sectionIndex = Math.min(
    Math.floor(scrollProgress / sectionSize),
    sectionCount - 1
  );
  return sectionIndex;
}

// ImagePlaneコンポーネント
function ImagePlane({ sectionId, position }: { sectionId: number, position: Vector3 }) {
  const texture = useTexture(SECTIONS[sectionId].imagePath || '/layer-1.webp')
  const meshRef = useRef<Mesh>(null)
  const animationRef = useRef({
    time: 0,
    baseY: 0,
    opacity: 0
  })
  
  // セクションごとの固定位置を定義
  const sectionPositions = {
    1: new Vector3(-3, 0, -2),
    2: new Vector3(3, -1, -2),
    3: new Vector3(-3, -1, -2)
  }
  
  useFrame(() => {
    if (!meshRef.current || sectionId === 0 || sectionId === 4) return
    
    const mesh = meshRef.current
    animationRef.current.time += 0.01
    
    // 現在のセクションの場合はフェードインし、それ以外はフェードアウト
    const targetOpacity = sectionId === SECTIONS[sectionId].id ? 0.8 : 0
    animationRef.current.opacity += (targetOpacity - animationRef.current.opacity) * 0.1
    
    if (meshRef.current.material instanceof MeshBasicMaterial) {
      meshRef.current.material.opacity = animationRef.current.opacity
    }
    
    // 浮遊アニメーション
    const floatY = Math.sin(animationRef.current.time * 2) * 0.1
    const rotationY = Math.sin(animationRef.current.time * 1.5) * 0.05
    
    // 目標位置を設定
    const targetPos = sectionPositions[sectionId as keyof typeof sectionPositions]
    if (targetPos) {
      mesh.position.lerp(targetPos, 0.1)
      mesh.position.y += floatY
      mesh.rotation.y = rotationY
      mesh.rotation.x = Math.sin(animationRef.current.time) * 0.02
    }
  })

  // セクション0と4では非表示
  if (sectionId === 0 || sectionId === 4) return null

  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      scale={[2.5, 2.5, 1]}
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

// セクションコンテンツを表示するコンポーネント
function SectionContent({ title, description, position, visible }: { title: string; description: string; position: [number, number, number]; visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const { opacity, positionY, rotationZ, scale } = useSpring({
    opacity: visible ? 1 : 0,
    positionY: visible ? position[1] : position[1] - 4,
    rotationZ: visible ? 0 : -0.2,
    scale: visible ? 1 : 0.8,
    config: { 
      mass: 1.5,
      tension: 170, 
      friction: 26,
      clamp: false
    }
  });
  
  return (
    <a.group 
      ref={groupRef} 
      position-x={position[0]}
      position-y={positionY as unknown as number}
      position-z={position[2]}
      rotation-z={rotationZ as unknown as number}
      visible={opacity.to(v => v > 0.01)}
      scale={scale.to(s => [s, s, s])}
    >
      <Text
        position={[0, 1, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity as unknown as number}
      >
        {title}
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        fillOpacity={opacity as unknown as number}
      >
        {description}
      </Text>
    </a.group>
  );
}

// カメラの制御を改善
function CameraController({ currentSectionIndex }: { currentSectionIndex: number }) {
  const { camera } = useThree()
  const targetRef = useRef({
    position: new Vector3(),
    rotation: new Vector3()
  })
  
  useFrame(() => {
    const section = SECTIONS[currentSectionIndex]
    if (!section) return
    
    // カメラの目標位置を設定
    targetRef.current.position.lerp(section.cameraPosition, 0.05)
    
    // カメラをスムーズに移動
    camera.position.lerp(targetRef.current.position, 0.1)
  })

  return null
}

// セクションインジケーターコンポーネント
function SectionIndicator({ currentSection }: { currentSection: number }) {
  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
      {SECTIONS.map((section, index) => {
        const isActive = currentSection === index;
        const isCompleted = currentSection > index;
        
        return (
          <div key={section.id} className="flex flex-col items-center">
            <div 
              className={`w-[3px] h-2 rounded-full flex items-center justify-center py-1 transition-all duration-500
                ${isActive || isCompleted ? 'bg-white' : 'border border-white/30'}
              `}
            >
              <span 
                className={`text-[10px] md:text-sm font-thin transition-all duration-500
                  ${isActive || isCompleted ? 'text-black' : 'text-white/50'}
                `}
              >
                {/* {index + 1} */}
              </span>
            </div>
            {index < SECTIONS.length - 1 && (
              <div 
                className={`h-3 md:h-4 w-[1px] my-1 md:my-2 transition-all duration-500
                  ${isCompleted ? 'bg-white' : 'bg-white/10'}
                `}
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
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const { progress } = useProgress()
  const { setProgress } = useLoadingStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // カメラの位置と回転を更新
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const newSectionIndex = getCurrentSection(latest)
      if (newSectionIndex !== currentSectionIndex) {
        setCurrentSectionIndex(newSectionIndex)
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, currentSectionIndex])

  // ローディング進捗の更新
  useEffect(() => {
    setProgress(progress)
  }, [progress, setProgress])

  // 現在のセクションに基づく背景色とパターン
  const currentSectionData = SECTIONS[currentSectionIndex]
  const backgroundColor = currentSectionData.backgroundColor || 'transparent'
  const backgroundGradient = currentSectionData.backgroundGradient || null
  const showBackgroundPattern = currentSectionIndex > 0 && currentSectionIndex < 4

  return (
    <div className="relative w-full h-screen">
      <SectionIndicator currentSection={currentSectionIndex} />
      
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          backgroundColor: backgroundColor,
          background: typeof backgroundGradient === 'string' ? backgroundGradient : undefined,
        }}
      >
        {showBackgroundPattern && (
          <div className="absolute inset-0 opacity-10">
            {/* パターン背景のコンポーネント */}
          </div>
        )}
      </div>

      <Canvas
        ref={canvasRef}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 8]
        }}
      >
        <Suspense fallback={null}>
          <CameraController currentSectionIndex={currentSectionIndex} />
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          
          {SECTIONS.map((section) => (
            <SectionContent
              key={section.id}
              title={section.title}
              description={section.description}
              position={[section.position.x, section.position.y, section.position.z - 4]}
              visible={currentSectionIndex === section.id}
            />
          ))}
          
          <ImagePlane 
            sectionId={currentSectionIndex} 
            position={currentSectionData.position} 
          />
          
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>
          
          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  )
} 