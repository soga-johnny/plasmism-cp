"use client"

import { Canvas } from '@react-three/fiber'
// import { OrbitControls, Image, Text, RoundedBox } from '@react-three/drei'
import { OrbitControls, Image, Text } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'
// import { MeshPhysicalMaterial, Mesh } from 'three'
import { Mesh, MultiplyBlending, MeshBasicMaterial } from 'three'

// interface SceneProps {
//   backgroundImage: string
//   text: string
// }

export default function SceneSample(){
//   const meshRef = useRef<Mesh>(null)
  const image1Ref = useRef<Mesh>(null)
  const image2Ref = useRef<Mesh>(null)
  const textRef = useRef<Mesh>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    let animationFrameId: number;
    // let baseRotationSpeed = 0.005;

    const animate = () => {
      // if (meshRef.current) {
      //   meshRef.current.rotation.x += baseRotationSpeed * (1 + scrollYProgress.get());
      //   meshRef.current.rotation.y += baseRotationSpeed * 1.2 * (1 + scrollYProgress.get());
      //   meshRef.current.rotation.z += baseRotationSpeed * 0.8 * (1 + scrollYProgress.get());
      // }
      animationFrameId = requestAnimationFrame(animate);
    };

    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
      if (image1Ref.current) {
        image1Ref.current.position.y = -2 + latest * 10;
      }
      if (image2Ref.current) {
        image2Ref.current.position.y = -6 + latest * 10;
      }
      if (textRef.current) {
        textRef.current.position.y = -10 + latest * 50;
      }
      if (bgRef.current) {
        bgRef.current.style.backgroundSize = `${100 + latest * 50}%`;
      }
    });

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      unsubscribe();
    };
  }, [scrollYProgress])

  // const glassMaterial = new MeshPhysicalMaterial({
  //   color: 0xffffff,
  //   transmission: 1,
  //   roughness: 0,
  //   metalness: 0,
  //   ior: 1.5,
  //   thickness: 0.5,
  //   specularIntensity: 1,
  //   specularColor: 0xffffff,
  //   clearcoat: 1.0,
  //   clearcoatRoughness: 0.1,
  //   transparent: true,
  //   opacity: 0.5,
  //   envMapIntensity: 1,
  //   reflectivity: 0.5,
  //   attenuationColor: 0xffffff,
  //   attenuationDistance: 1,
  //   depthWrite: false,
  //   depthTest: false,
  // })

  return (
    <div className="w-full h-[3500px] relative sticky top-0 rounded-4xl overflow-hidden">
   
      <div 
        ref={bgRef}
        className="relative w-full h-screen"
        style={{
          backgroundImage: `url(/image1-bg.jpg)`,
          backgroundSize: '100%',
          backgroundPosition: 'center',
          transition: 'background-size 0.1s ease-out',
        }}
      >
             <div className="w-full h-full relative sticky top-0 inset-0 z-0">
      <div className="absolute inset-0 z-10">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 5]} intensity={3} />
            
            {/* パララックス画像1 */}
            <group scale={[1.8, 0.55, 1]} position={[0, -2, -1]}>
              <Image
                ref={image1Ref}
                url="/image1-1.png"
                scale={7}
                transparent
                opacity={1}
                material-transparent
                material-blending={6}
                material={new MeshBasicMaterial({ 
                  transparent: true,
                  blending: MultiplyBlending
                })}
              />
            </group>

            {/* パララックス画像2 */}
            <group scale={[0.6, 0.8, 1]} position={[3, -6, -1]}>
              <Image
                ref={image2Ref}
                url="/layer-2.webp"
                scale={6}
                transparent
                opacity={1}
                material={new MeshBasicMaterial({ 
                  transparent: true,
                  blending: MultiplyBlending
                })}
              />
            </group>

            {/* パララックステキスト */}
            <Text
              ref={textRef}
              position={[-4, -10, 1]}
              fontSize={0.3}
              color="white"
              anchorX="left"
              anchorY="middle"
              maxWidth={10}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign="left"
              fontWeight={200}
            >
              <Text
                fontSize={0.1}
                color="white"
                anchorX="left"
                anchorY="middle"
                position={[0, 0.6, 0]}
              >
                ■ Vision
              </Text>
            想像も
            できなかった{'\n'}
            豊かさを、{'\n'}
              <meshStandardMaterial attach="material" color="white" />
              <Text
                fontSize={0.08}
                color="white"
                anchorX="left"
                anchorY="middle"
                position={[0, -0.7, 0]}
              >
                A richness that could not be imagined,
              </Text>
            </Text>

            {/* ガラスボックスを最前面に配置 */}
            {/* <group position={[0, 0, 0]}>
              <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={2} ref={meshRef}>
                <primitive object={glassMaterial} attach="material" />
              </RoundedBox>
            </group> */}

            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      </div>
      </div>
    </div>
  )
} 