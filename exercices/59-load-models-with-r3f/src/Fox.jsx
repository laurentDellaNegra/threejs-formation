import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useControls } from 'leva'

export default function Fox() {
    const model = useGLTF('./Fox/glTF/Fox.gltf')

    const animations = useAnimations(model.animations, model.scene)

    const { animationName } = useControls({
        animationName: { options: animations.names },
    })

    useEffect(() => {
        const action = animations.actions[animationName]
        action.reset().fadeIn(0.5).play()
        // animations.actions.Run.play()
        // setTimeout(() => {
        //     animations.actions.Walk.play()
        //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
        // }, 2000)
        return () => {
            action.fadeOut(0.5)
        }
    }, [animationName])

    return (
        <primitive
            object={model.scene}
            position={[-2.5, 0, 2.5]}
            rotation-y={0.3}
            scale={0.02}
        />
    )
}
