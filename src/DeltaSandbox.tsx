import { ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react";
import * as THREE from 'three';

const scratchV3 = new THREE.Vector3();
const NORTH_POLE = scratchV3.clone().set(0, 1, 0);
const scratchQ = new THREE.Quaternion();

interface Props {
    onCameraPositionChange?: (position: THREE.Vector3) => void,
}

export const DeltaSandbox = ({
    onCameraPositionChange
}: Props) => {
    const three = useThree();
    const [cameraPosition, setCameraPosition] = useState<THREE.Vector3Tuple>([0, 0, 0]);

    useFrame(() => {
        setCameraPosition(three.camera.position.clone().normalize().toArray());
    });
    useEffect(() => {
        onCameraPositionChange?.(scratchV3.clone().set(...cameraPosition));
    }, [cameraPosition]);

    // Deltas to maintain
    const [deltas, setDeltas] = useState<[THREE.Vector3, THREE.Vector3][]>([])
    const onMeshClick = (evt: ThreeEvent<MouseEvent>) => {
        // const a = 

        // const c1 = 


        // https://www.movable-type.co.uk/scripts/latlong-vectors.html#bearing
        const from = scratchV3.clone().set(...cameraPosition).normalize();
        const to = evt.point.clone().normalize();

        // get angular distance





        // // rotation plane
        // const axis = from.clone().cross(to)
        // const angle = from.angleTo(to);
        // const q = scratchQ.clone().setFromUnitVectors(from, to).normalize();
        // const e = new THREE.Euler().setFromQuaternion(q);
        // const dot = from.clone().dot(to.clone());
        // if (dot > 0.999999) {
        //     return scratchQ.clone().identity();
        // } else if (dot < -0.999999) {
        //     return scratchQ.clone().set(0, 1, 0, 0);
        // }

        // const cross = from.clone().cross(to.clone());
        // const w = Math.sqrt(Math.pow(from.length(), 2) * Math.pow(to.length(), 2)) + dot;
        // const output = scratchQ.clone().set(...cross.toArray(), w).normalize();
        // const s = new THREE.Spherical().setFromVector3(evt.point)
        // console.log(evt.point, s)
        // const delta = scratchV3.clone().set(
        //     evt.point.x - cameraPosition[0],
        //     evt.point.y - cameraPosition[1],
        //     evt.point.z - cameraPosition[2]
        // );
        // console.log(delta)
        // const from = scratchQ.clone().setFromUnitVectors(
        //     scratchV3.clone().set(...cameraPosition).normalize(),
        //     scratchV3.clone().set(0, 0, 1)
        // );
        // const to = scratchQ.clone().setFromUnitVectors(
        //     // scratchV3.clone().set(0, 0, 1),
        //     scratchV3.clone().set(...cameraPosition).normalize(),
        //     evt.point.clone().normalize()
        // ).normalize();

        setDeltas([...deltas, [from, to]]);
    }

    // RENDER
    // ==================
    return <group>
        {/* Camera */}
        <mesh scale={0.05} position={[...cameraPosition]} >
            <sphereGeometry />
            <meshBasicMaterial color="blue" />
        </mesh>

        {/* Deltas */}
        {deltas.map(([from, to], i) => {
            // get bearing
            const c1 = from.clone().cross(to.clone());
            const c2 = from.clone().cross(NORTH_POLE);
            const sinTheta = c1.clone().cross(c2).length() * Math.sign(c1.clone().cross(c2).dot(from));
            const cosTheta = c1.clone().dot(c2);
            const bearing = Math.atan2(sinTheta, cosTheta);

            // get angular distance
            const distance = from.angleTo(to);

            // https://www.movable-type.co.uk/scripts/latlong-vectors.html#destination
            const camera = scratchV3.clone().set(...cameraPosition).normalize();
            const dirEast = NORTH_POLE.clone().cross(camera.clone()).normalize();
            const dirNorth = camera.clone().cross(dirEast).normalize();
            const dir = dirNorth.clone().multiplyScalar(Math.cos(bearing)).add(dirEast.clone().multiplyScalar(Math.sin(bearing))).normalize();
            const result = camera.clone().multiplyScalar(Math.cos(distance)).add(dir.clone().multiplyScalar(Math.sin(distance))).normalize();

            return <mesh position={result} key={i} scale={0.05}>
                <sphereGeometry />
                <meshBasicMaterial color="magenta" />
            </mesh>
        })}

        {/* Reference mesh */}
        <mesh>
            <icosahedronGeometry args={[1, 6]} />
            <meshBasicMaterial color="black" wireframe />
            <mesh scale={0.99} onClick={onMeshClick}>
                <icosahedronGeometry args={[1, 6]} />
                <meshStandardMaterial />
            </mesh>
        </mesh>
    </group>

}