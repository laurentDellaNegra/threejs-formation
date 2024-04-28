import {
    useMatcapTexture,
    Center,
    Text3D,
    OrbitControls,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react'
// import { useState } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
    const [matcapTexture] = useMatcapTexture('8B892C_D4E856_475E2D_47360A', 256)

    const refGroup = useRef([])

    useFrame((state, delta) => {
        for (const donut of refGroup.current) {
            donut.rotation.y += delta * 0.5
        }
    })

    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
            <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

            <Center>
                <Text3D
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    font={'./fonts/helvetiker_regular.typeface.json'}
                    material={material}
                >
                    Hello R3F
                </Text3D>

                {/* <group ref={refGroup}> */}
                {[...Array(100)].map((_value, i) => (
                    <mesh
                        key={i}
                        ref={(element) => (refGroup.current[i] = element)}
                        position={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                        ]}
                        scale={0.2 + Math.random() * 0.2}
                        rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            0,
                        ]}
                        geometry={torusGeometry}
                        material={material}
                    />
                ))}
                {/* </group> */}
            </Center>
        </>
    )
}
