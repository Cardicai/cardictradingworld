"use client";
import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useCameraFocus } from './store'

export default function CameraRig(){
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0,0,0))
  const desired = useRef(new THREE.Vector3(0,0,12))
  const getTarget = useCameraFocus(s=>s.target)

  useFrame((_, dt)=>{
    const [x,y,z] = getTarget
    target.current.lerp(new THREE.Vector3(x,y,z), 0.08)
    // keep a comfortable distance from target (slightly farther than before)
    const offsetDir = new THREE.Vector3().subVectors(camera.position, target.current).normalize()
    const desiredDist = 7.2   // was 5.5 → gives more breathing room
    desired.current.copy(target.current).addScaledVector(offsetDir, desiredDist)
    camera.position.lerp(desired.current, 0.085)
    camera.lookAt(target.current)
  })
  return null
}
