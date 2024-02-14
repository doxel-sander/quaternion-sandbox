import { Gltf } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

interface SuzanneProps extends GroupProps {

}

export const Suzanne = ({ ...groupProps }: SuzanneProps) => {
    return <group {...groupProps}>
        <group rotation-x={Math.PI * -0.5}>
            <Gltf src="/suzanne.glb" >
            </Gltf>
        </group>
    </group>
}