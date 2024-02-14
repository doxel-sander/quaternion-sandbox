import { Canvas } from "@react-three/fiber";
import { useState } from "react"
import './app.css'
import * as THREE from 'three'
import { OrbitControls } from "@react-three/drei";


export const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [w, setw] = useState(1);

  const quaternion = new THREE.Quaternion(x, y, z, w);


  // RENDER
  // ==================
  return <>
    <div className="controls">

    </div>

    <div className="canvas-wrap">
      <Canvas camera={{ position: [3, 2, 3] }}>
        <color attach="background" args={[0, 0, 0]} />

        <OrbitControls />

        {/* mesh */}
        <mesh quaternion={quaternion}>
          <coneGeometry args={[1, 1, 5]} />
          <meshStandardMaterial color="magenta" />
        </mesh>

        {/* lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} />

        {/* helpers */}
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  </>
}