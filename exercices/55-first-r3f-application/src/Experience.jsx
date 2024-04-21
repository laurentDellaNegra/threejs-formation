import { extend, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CustomObject from './CustomObject'

export default function Experience() {
    extend({ OrbitControls })

    const cubeRef = useRef()
    const groupRef = useRef()
    const { camera, gl } = useThree()
    useFrame((state, delta, xrFrame) => {
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
        cubeRef.current.rotation.y += delta
    })

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <group ref={groupRef}>
                <mesh rotation-y={Math.PI * 0.25} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" wireframe={false} />
                </mesh>
                <mesh
                    ref={cubeRef}
                    rotation-y={Math.PI * 0.25}
                    position-x={2}
                    scale={1.5}
                >
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </group>
            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            <CustomObject />
        </>
    )
}
