"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Environment, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useScroll, motion } from 'framer-motion'
import { MeshPhysicalMaterial, Mesh, Color } from 'three'
import { useLoadingStore } from './LoadingScreen'
import { useProgress } from '@react-three/drei'
// import * as THREE from 'three'

function Cube() {
  const meshRef = useRef<Mesh>(null)
  const { scrollYProgress } = useScroll()
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [isMobileText, setIsMobileText] = useState(false)
  const textRef = useRef<any>(null)
  const textPositionRef = useRef({ y: 2.5, opacity: 1 })

  useEffect(() => {
    // モバイル状態が変更されたときにtextPositionRefを更新
    textPositionRef.current.y = isMobileText ? 2.0 : 2.5
  }, [isMobileText])

  // イージング関数
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
  }

  const easeOutBack = (x: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
  }

  // ビューポートサイズの取得
  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
      setIsMobileText(window.innerWidth <= 768)
    }
    
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  // 反射マテリアルの作成
  const reflectiveMaterial = new MeshPhysicalMaterial({
    color: 0xD3CCDD, 
    transmission: 1,
    roughness: 0.05,  // より滑らかに
    metalness: 1.0,
    ior: 1.0,  // 屈折率を上げてよりキラキラと
    thickness: 0.3,
    specularIntensity: 1,  // 鏡面反射を強く
    specularColor: 0xff3366,  // 赤みがかった反射色
    // clearcoat: 1.0,
    envMapIntensity: 4.5,  // 環境マップの強度を上げる
    reflectivity: 1,
    depthWrite: true,
    depthTest: true,
    sheen: 1.0,  // 絹のような光沢を追加
    sheenColor: 0x3366ff,  // 青みがかった光沢色
    attenuationColor: new Color(0xff9999),  // ピンク系の減衰色
    attenuationDistance: 0.5
  })

  useFrame((state, delta) => {
    if (meshRef.current) {
      const progress = scrollYProgress.get()
      const isMobile = viewport.width <= 768
      
      // 基本の回転速度（常に一定の回転を維持）
      const baseRotationSpeed = 0.3
      
      // スケールの制御（レスポンシブ対応）
      const initialScale = isMobile ? 1.5 : 1.7  // モバイルでは小さめの初期スケール
      const finalScale = isMobile ? 1 : 1.1    // モバイルでは小さめの最終スケール
      const scale = initialScale - (Math.min(progress * 7, 1) * (initialScale - finalScale))
      meshRef.current.scale.set(scale, scale, scale)
      
      // PCでのスケールに応じた右方向への移動
      if (!isMobile) {
        const rightShiftMultiplier = 5
        const rightShift = (initialScale - scale) * rightShiftMultiplier
        meshRef.current.position.x = rightShift
      } else {
        // モバイルではx軸を常に中央に
        meshRef.current.position.x = 0
      }
      
      // y軸の位置調整
      if (isMobile) {
        // モバイルでは初期状態から少し上寄り、スクロールに応じてさらに上に移動
        // progress値が0の時は0.5（少し上）、最大スクロール時に1.5（上寄り）
        const baseY = 0 // 初期位置を少し上に
        const yPosition = baseY + (Math.min(progress * 10, 1) * 1.0) // スクロールで1.0上に移動
        meshRef.current.position.y = yPosition
      } else {
        // PCでは従来通り
        meshRef.current.position.y = 0
      }
      
      // マテリアルの補間
      const material = meshRef.current.material as MeshPhysicalMaterial
      const t = Math.min(progress * 10, 1)
      
      // マテリアルのプロパティを補間
      material.color = new Color(0xD3CCDD).lerp(new Color(0xFFFFFF), t)  // 色を補間
      material.transmission = 0.4 + t
      material.metalness = 1 - t
      material.roughness = 0.05 * (1 - t) + 0.01 * t  // より滑らかな状態から開始
      material.opacity = 0.1 + (t * 0.05)
      material.envMapIntensity = 4.5 - (t * 2)  // より強い環境マップから開始
      material.reflectivity = 1 - (0.2 * t)
      material.ior = 2.0 + (t * 1)  // より高い屈折率から開始
      material.thickness = 0.2 + (t * 0.4)
      material.depthWrite = t > 0.1
      material.depthTest = t > 0.3
      material.side = t > 0.5 ? 2 : 0
      material.toneMapped = t > 0.5 ? false : true
      material.attenuationColor = new Color(0xff9999).lerp(new Color(0xffffff), t)
      material.attenuationDistance = 0.5 + (t * 0.2)
      material.specularIntensity = 1.5 + (t * 1)  // より強い鏡面反射効果
      material.emissive = new Color(0xffffff).multiplyScalar(t * 0.01)  // よりソフトな発光

      // スケールに応じた回転速度の変化（1.5倍の時は遅く、1.0倍の時は速く）
      const rotationMultiplier = 1.5 - (Math.min(progress * 10, 1) * 10)
      
      // 基本回転の更新（常に一定の回転を維持）
      meshRef.current.rotation.x += delta * baseRotationSpeed * 0.7 * rotationMultiplier
      meshRef.current.rotation.y += delta * baseRotationSpeed * rotationMultiplier
      meshRef.current.rotation.z += delta * baseRotationSpeed * 0.5 * rotationMultiplier

      // スクロールに応じた追加の回転（初回のみ）
      const initialProgress = Math.min(progress, 0.1) * 3  // 初回の10%のスクロールまでに制限
      const scrollRotationX = Math.sin(initialProgress * Math.PI / 2) * 0.2
      const scrollRotationY = initialProgress * Math.PI
      const scrollRotationZ = Math.sin(initialProgress * Math.PI) * 0.1

      // スクロール回転を適用
      meshRef.current.rotation.x += scrollRotationX * delta * 2
      meshRef.current.rotation.y += scrollRotationY * delta * 2
      meshRef.current.rotation.z += scrollRotationZ * delta * 2

      // テキストの位置とオパシティの目標値を計算
      const baseY = isMobileText ? 2.0 : 2.5
      const targetY = baseY + (easeOutBack(Math.min(progress * 2, 1)) * (isMobileText ? 30 : 40)) // モバイルでは移動距離を調整
      const targetOpacity = 1 - easeOutExpo(Math.min(progress * 3, 1))

      // 現在値を目標値に向けてスムーズに補間
      textPositionRef.current.y += (targetY - textPositionRef.current.y) * (delta * 3.5)
      textPositionRef.current.opacity += (targetOpacity - textPositionRef.current.opacity) * (delta * 4)

      // テキストに適用
      if (textRef.current) {
        textRef.current.position.y = textPositionRef.current.y
        textRef.current.material.opacity = textPositionRef.current.opacity
        textRef.current.material.blending = 2
      }
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={2} ref={meshRef}>
        <primitive object={reflectiveMaterial} attach="material" />
      </RoundedBox>
      <Suspense fallback={null}>
        <Text
          ref={textRef}
          position={[0, isMobileText ? 20 : 8, 0]}
          fontSize={isMobileText ? 0.9 : 0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/EBGaramond-Regular.ttf"
          // letterSpacing={0.01}
          lineHeight={1}
          material-toneMapped={false}
          material-transparent={true}
          material-blending={2}
        >
          {isMobileText ? "Being\nIntention" : "Being Intention"}
        </Text>
      </Suspense>
    </group>
  )
}

export default function CubeInteractive() {
  // カメラ位置の調整
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 8])
  const [cameraFov, setCameraFov] = useState(50)
  const [isMobile, setIsMobile] = useState(false)
  const { progress } = useProgress()
  const { setProgress } = useLoadingStore()

  // Three.jsのプログレスを LoadingStore に反映
  useEffect(() => {
    setProgress(progress)
  }, [progress, setProgress])

  useEffect(() => {
    const updateCamera = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      setCameraPosition([0, 0, mobile ? 9 : 8])
      setCameraFov(mobile ? 45 : 50)
    }
    
    updateCamera()
    window.addEventListener('resize', updateCamera)
    return () => window.removeEventListener('resize', updateCamera)
  }, [])

  return (
    <motion.div 
      className="fixed w-full h-screen top-0 left-0 z-30"
      initial={{ 
        opacity: 0,
      }}
      animate={{ 
        opacity: 1,
      }}
      transition={{ 
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5,
      }}
    >
      <Canvas 
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          // レンダリング設定の最適化
          gl.setClearColor(0x000000, 0)
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1))
        }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }} // キューブの後ろの要素とのインタラクションを可能にする
      >
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Environment files="/shanghai_bund_2k.exr" />
          <Cube />
          {!isMobile && <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />}
          <EffectComposer>
            <Bloom 
              intensity={0.1}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.4}
              mipmapBlur={true}
              radius={0.5}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </motion.div>
  )
} 