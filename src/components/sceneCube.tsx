"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useEffect, useRef } from 'react'
import { useScroll, motion } from 'framer-motion'
import { MeshPhysicalMaterial, Mesh, Vector3, CubeTextureLoader, Color } from 'three'

function Cube() {
  const meshRef = useRef<Mesh>(null)
  const { scrollYProgress } = useScroll()

  // 反射マテリアルの作成
  const reflectiveMaterial = new MeshPhysicalMaterial({
    color: 0x413236,  // ベースカラーを茶色に設定
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
      
      // 基本の回転速度（常に一定の回転を維持）
      const baseRotationSpeed = 0.3

      // スケールの制御（1.5から1.0に変化）
      const scale = 1.5 - (Math.min(progress * 10, 1) * 0.5)
      meshRef.current.scale.set(scale, scale, scale)

      // マテリアルの補間
      const material = meshRef.current.material as MeshPhysicalMaterial
      const t = Math.min(progress * 10, 1)
      
      // マテリアルのプロパティを補間
      material.color = new Color(0x413236).lerp(new Color(0xFFFFFF), t)  // 色を補間
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
  return (
    <motion.div 
      className="w-full h-screen absolute top-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 4, 
        ease: "easeOut",
        delay: 2.2
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={3} />
          <Environment preset="city" />
          <Cube />
          <OrbitControls enableZoom={false} />
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