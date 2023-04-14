import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Furniture } from '../firebase';

type Product3DViewProps = {
	furniture: Furniture;
};

const Furniture3DInspect = ({ furniture }: Product3DViewProps) => {
	const gltfModel = useLoader(GLTFLoader, furniture.modelURL);
	console.log('Inpect 3D');
	useEffect(() => {
		gltfModel.scene.scale.set(
			furniture.scale[0],
			furniture.scale[1],
			furniture.scale[2]
		);
		gltfModel.scene.position.set(
			furniture.position[0],
			furniture.position[1],
			furniture.position[2]
		);
		gltfModel.scene.rotation.set(
			furniture.rotation[0],
			furniture.rotation[1],
			furniture.rotation[2]
		);
		gltfModel.scene.traverse(object => {
			if (object instanceof Mesh) {
				object.castShadow = true;
			}
		});
	}, [gltfModel]);

	useFrame((state, delta) => {
		let t = state.clock.getElapsedTime();

		let group = gltfModel.scene;
		group.rotation.y = t * 0.5;
	});

	return <primitive object={gltfModel.scene} />;
};

export default Furniture3DInspect;
