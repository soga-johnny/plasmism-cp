"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useScroll, motion } from 'framer-motion'
import { MeshPhysicalMaterial, Mesh, Color } from 'three'
import { useLoadingStore } from './LoadingScreen'
import { useProgress } from '@react-three/drei'

function Cube() {
  const meshRef = useRef<Mesh>(null)
  const { scrollYProgress } = useScroll()
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  // ビューポートサイズの取得
  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  // 反射マテリアルの作成
  const reflectiveMaterial = new MeshPhysicalMaterial({
    color: 0xC0BFD2,  // ベースカラーを茶色に設定
    transmission: 1,
    roughness: 0.05,  // より滑らかに
    metalness: 1.0,
    ior: 2.0,  // 屈折率を上げてよりキラキラと
    thickness: 0.3,
    specularIntensity: 1.5,  // 鏡面反射を強く
    specularColor: 0xff3366,  // 赤みがかった反射色
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 4.5,  // 環境マップの強度を上げる
    reflectivity: 1,
    depthWrite: true,
    depthTest: true,
    sheen: 1.0,  // 絹のような光沢を追加
    sheenRoughness: 0.3,
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
      const initialScale = isMobile ? 1.3 : 1.6  // モバイルでは小さめの初期スケール
      const finalScale = isMobile ? 0.8 : 1.0    // モバイルでは小さめの最終スケール
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
        const baseY = 0.5 // 初期位置を少し上に
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
      material.color = new Color(0xC0BFD2).lerp(new Color(0xFFFFFF), t)  // 色を補間
      material.transmission = 0.4 + t
      material.metalness = 1 - t
      material.roughness = 0.05 * (1 - t) + 0.01 * t  // より滑らかな状態から開始
      material.opacity = 0.1 * t
      material.envMapIntensity = 4.5 - (t * 2)  // より強い環境マップから開始
      material.reflectivity = 1 - (0.2 * t)
      material.ior = 2.0 + (t * 1)  // より高い屈折率から開始
      material.thickness = 0.2 + (t * 0.4)
      material.depthWrite = t > 0.1
      material.depthTest = t > 0.3
      material.side = t > 0.5 ? 2 : 0
      material.toneMapped = t > 0.5 ? false : true
      material.attenuationColor = new Color(0xff9999).lerp(new Color(0xffffff), t)
      material.attenuationDistance = 0.5 + (t * 0.5)
      material.specularIntensity = 1.5 + (t * 1.5)  // より強い鏡面反射効果
      material.emissive = new Color(0xffffff).multiplyScalar(t * 0.01)  // よりソフトな発光

      // スケールに応じた回転速度の変化（1.5倍の時は遅く、1.0倍の時は速く）
      const rotationMultiplier = 1.5 - (Math.min(progress * 10, 1) * 0.5)
      
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
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={2} ref={meshRef}>
        <primitive object={reflectiveMaterial} attach="material" />
      </RoundedBox>
    </group>
  )
}

export default function SceneCube() {
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

  // 3Dシーンの初期化完了時
  useEffect(() => {
    // リソース読み込み完了時の処理
    const handleResourcesReady = () => {
      // フルロードを示す
      setTimeout(() => {
        setProgress(100)
      }, 500)
    }

    // ウィンドウロード完了時にリソース準備完了とみなす
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleResourcesReady()
      } else {
        window.addEventListener('load', handleResourcesReady)
        return () => window.removeEventListener('load', handleResourcesReady)
      }
    }
  }, [setProgress])

  return (
    <motion.div 
      className="w-full h-screen absolute top-0 z-10"
      initial={{ 
        opacity: 0,
        y: -2000 
      }}
      animate={{ 
        opacity: 1,
        y: 0
      }}
      transition={{ 
        duration: 3,
        ease: "easeOut",
        delay: 3,
        opacity: {
          duration: 3,
          ease: "easeOut",
        },
        y: {
          duration: 2,
          ease: "easeOut",
        }
      }}
    >
      <Canvas 
        camera={{ position: cameraPosition, fov: cameraFov }}
        style={{ background: 'transparent' }}
        onCreated={({ /* gl */ }) => {
          // Canvasの初期化完了時に進捗を更新
          useLoadingStore.getState().incrementProgress(30)
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={3} />
          <Environment preset="city" />
          <Cube />
          {!isMobile && <OrbitControls enableZoom={false} />}
          <EffectComposer>
            <Bloom 
              intensity={0.4}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              mipmapBlur={true}
              radius={0.5}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </motion.div>
  )
} 