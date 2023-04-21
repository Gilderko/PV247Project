import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Furniture, Review, reviewsCollection } from '../firebase';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect, useState } from 'react';
import { Mesh } from 'three';
import {
	Box,
	Card,
	CardContent,
	Divider,
	Paper,
	Typography,
	useMediaQuery
} from '@mui/material';
import Furniture3DInspect from './Furniture3DInspect';
import { OrbitControls } from '../reactThreeDreiUtilities/OrbitControls';
import ProductDescription from './ProductDescription';
import Loading from './Loading';
import { QueryDocumentSnapshot, onSnapshot } from 'firebase/firestore';
import FurniturePreview from './FurniturePreview';
import ReviewPreview from './ReviewPreview';

type ProductInspectDetailProps = {
	furnitureId: string;
	furniture: Furniture;
};

const ProductInspectDetail = ({
	furnitureId,
	furniture
}: ProductInspectDetailProps) => {
	const matches = useMediaQuery('(min-width:600px)');
	const [reviews, setReviews] = useState<QueryDocumentSnapshot<Review>[]>([]);

	useEffect(
		() =>
			onSnapshot(reviewsCollection(furnitureId), snapshot => {
				setReviews(snapshot.docs);
			}),
		[]
	);

	return (
		<>
			<Card sx={{ padding: '1rem', marginBottom: '1rem' }} elevation={2}>
				<Typography variant="h3">{furniture.name}</Typography>
				<Divider />
				<CardContent
					style={{
						display: 'flex',
						flexDirection: matches ? 'row' : 'column',
						width: '100%'
					}}
				>
					{/* Description */}

					<Box>
						<Box
							sx={{
								maxWidth: '25rem',
								height: '25rem',
								diplay: 'flex'
							}}
						>
							{furniture && (
								<Suspense fallback={<Loading />}>
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
					<ProductDescription furniture={furniture} />
				</CardContent>
			</Card>
			{/* Reviews */}
			{reviews.length !== 0 && (
				<Card>
					<CardContent sx={{ padding: '1rem' }}>
						<Typography sx={{ marginBottom: '1rem' }} variant="h5">
							Reviews
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 1 }}>
							{reviews.map(fur => (
								<ReviewPreview
									review={{ ...fur.data() }}
									reviewId={fur.id}
									key={fur.id}
								/>
							))}
						</Box>
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default ProductInspectDetail;
