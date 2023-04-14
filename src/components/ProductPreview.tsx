import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Furniture } from '../firebase';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect } from 'react';
import { Mesh } from 'three';
import { Box, Typography } from '@mui/material';
import Furniture3DInspect from './Furniture3DInspect';
import { OrbitControls } from './OrbitControls';

type Product3DViewProps = {
	furniture: Furniture;
};

const Product3DView = ({ furniture }: Product3DViewProps) => {
	return (
		<Box>
			<Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
				{/* Description */}
				<Box>
					<Typography>{furniture.name}</Typography>
					<Box style={{ width: '25rem', height: '25rem' }}>
						{furniture && (
							<Suspense fallback={null}>
								<Canvas
									camera={{
										fov: 50,
										near: 0.1,
										far: 1000,
										position: [6, 8, 8]
									}}
								>
									<color args={[255, 255, 255]} attach="background" />
									<directionalLight color="white" position={[0, 3, 5]} />
									<OrbitControls />
									<Furniture3DInspect furniture={furniture} />
								</Canvas>
							</Suspense>
						)}
					</Box>
				</Box>
				<Box>
					<Typography>{furniture.description}</Typography>
					<Typography>{furniture.furnType}</Typography>
					<Typography>{furniture.materialType}</Typography>
				</Box>
			</Box>
			{/* Reviews */}
			<Box></Box>
		</Box>
	);
};

export default Product3DView;
