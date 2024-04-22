import {
    MeshReflectorMaterial,
    Float,
    Text,
    Html,
    OrbitControls,
    PivotControls,
    TransformControls,
} from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
    const cubeRef = useRef()
    const sphereRef = useRef()
    return (
        <>
            <OrbitControls makeDefault enableDamping={true} />

            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <PivotControls
                depthTest={false}
                anchor={[0, 0, 0]}
                lineWidth={4}
                axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
                scale={1}
                // fixed
            >
                <mesh ref={sphereRef} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        distanceFactor={8}
                        center
                        wrapperClass="label"
                        position={[1, 1, 0]}
                        occlude={[sphereRef, cubeRef]}
                    >
                        So cool
                    </Html>
                </mesh>
            </PivotControls>

            <mesh ref={cubeRef} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={cubeRef} mode="translate" />

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                {/* <meshStandardMaterial color="greenyellow" /> */}
                <MeshReflectorMaterial
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={0.75}
                    color="greenyellow"
                />
            </mesh>

            <Float speed={5} floatIntensity={2}>
                <Text
                    color="salmon"
                    font="./bangers-v20-latin-regular.woff"
                    position-y={2}
                    maxWidth={2}
                    textAlign="center"
                >
                    I love R3F
                    <meshNormalMaterial />
                </Text>
            </Float>
        </>
    )
}
