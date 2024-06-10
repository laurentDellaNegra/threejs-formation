import { useKeyboardControls } from '@react-three/drei'
import useGame from './stores/useGame'
import { addEffect } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export default function Interface() {
    const time = useRef()

    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)
    const startTime = useGame((state) => state.startTime)
    const endTime = useGame((state) => state.endTime)

    const showRestart = phase === 'ended'

    useEffect(() => {
        const unsebscribeEffect = addEffect(() => {
            const state = useGame.getState()
            let elapsedTime = 0
            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime
            } else if (state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime
            }
            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if (time.current) time.current.textContent = elapsedTime
        })
        return () => {
            unsebscribeEffect()
        }
    }, [])

    return (
        <div className="interface">
            {/* Time */}
            <div ref={time} className="time"></div>
            {showRestart && (
                <div className="restart" onClick={restart}>
                    Restart
                </div>
            )}

            <div className="controls">
                <div className="raw">
                    <div className={`key ${forward && 'active'}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${leftward && 'active'}`}></div>
                    <div className={`key ${backward && 'active'}`}></div>
                    <div className={`key ${rightward && 'active'}`}></div>
                </div>
                <div className="raw">
                    <div className={`key large ${jump && 'active'}`}></div>
                </div>
            </div>
        </div>
    )
}
