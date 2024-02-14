import { Canvas } from "@react-three/fiber";
import { useState } from "react"
import './AppStyle.css'
import * as THREE from 'three'
import { OrbitControls, Text } from "@react-three/drei";
import { Suzanne } from "./Suzanne";

const HORIZONTAL_SPACE = 2

export const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [w, setW] = useState(1);

  const quaternion = new THREE.Quaternion(x, y, z, w).normalize();

  const examples = [
    new THREE.Quaternion(0, 0, 0, 1),
    new THREE.Quaternion(1, 0, 0, 0),
    new THREE.Quaternion(0, 1, 0, 0),
    new THREE.Quaternion(0, 0, 1, 0),
    new THREE.Quaternion(1, 1, 0, 0),
    new THREE.Quaternion(0, 1, 0, 1),
  ]

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

      <br />
      <button onClick={() => {
        setX(0);
        setY(0);
        setZ(0);
        setW(1);
      }}>Reset</button>

    </div>

    <div className="canvas-wrap">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <color attach="background" args={[0, 0, 0]} />

        <OrbitControls />

        {/* interactive mesh */}
        <Suzanne quaternion={quaternion} />

        {/* lights */}
        <ambientLight intensity={0.8} />
        <directionalLight intensity={2} position={[10, 10, 10]} />

        {/* helpers */}
        <axesHelper args={[5]} />

        <group position={[-examples.length - HORIZONTAL_SPACE * 0.5, 2, 0]}>
          {examples.map((example, i) => <group position={[HORIZONTAL_SPACE * (i + 1), 0, 0]}>
            <Text color="white" position-y={1} fontSize={0.2}>
              ({example.toArray().join(', ')})
            </Text>
            <Suzanne
              quaternion={example.clone().normalize()}
              onClick={() => {
                setX(example.x)
                setY(example.y)
                setZ(example.z)
                setW(example.w)
              }}
              scale={0.5}
            >
            </Suzanne>
          </group>)}
        </group>



      </Canvas>
    </div>
  </>
}