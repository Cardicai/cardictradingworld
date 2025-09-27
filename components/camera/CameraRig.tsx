
'use client'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useCameraFocus } from './store'

export default function CameraRig(){
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0,0,0))
  const desired = useRef(new THREE.Vector3(0,0,8))
  const getTarget = useCameraFocus(s=>s.target)

  useFrame((_, dt)=>{
    const [x,y,z] = getTarget
    target.current.lerp(new THREE.Vector3(x,y,z), 0.08)
    // Keep camera at a fixed offset relative to target for a smooth zoom-in
    const offsetDir = new THREE.Vector3().subVectors(camera.position, target.current).normalize()
    const desiredDist = 5.5 // closer value = stronger zoom
    desired.current.copy(target.current).addScaledVector(offsetDir, desiredDist)
    camera.position.lerp(desired.current, 0.08)
    camera.lookAt(target.current)
  })

  return null
}
