import { Canvas } from "@react-three/fiber";
import { useState } from "react"
import './app.css'
import * as THREE from 'three'
import { OrbitControls } from "@react-three/drei";


export const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [w, setW] = useState(1);

  const quaternion = new THREE.Quaternion(x, y, z, w).normalize();

  // RENDER
  // ==================
  return <>
    <div className="controls">
      <h2>Controls</h2>
      <label>X: {x} (actual: {quaternion.x})<br />
        <input type="range" min="-1" max="1" step="0.1" value={x} onChange={evt => setX(+evt.target.value)} />
      </label>
      <label>Y: {y} (actual: {quaternion.y})<br />
        <input type="range" min="-1" max="1" step="0.1" value={y} onChange={evt => setY(+evt.target.value)} />
      </label>

      <label>Z: {z} (actual: {quaternion.z})<br />
        <input type="range" min="-1" max="1" step="0.1" value={z} onChange={evt => setZ(+evt.target.value)} />
      </label>

      <label>W: {w} (actual: {quaternion.w})<br />
        <input type="range" min="-1" max="1" step="0.1" value={w} onChange={evt => setW(+evt.target.value)} />
      </label>

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