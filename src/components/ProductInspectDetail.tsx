import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Typography,
	useMediaQuery
} from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { QueryDocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { Suspense, useEffect, useState } from 'react';
import { Furniture, Review, reviewsCollection } from '../firebase';
import { OrbitControls } from '../reactThreeDreiUtilities/OrbitControls';
import Furniture3DInspect from './Furniture3DInspect';
import Loading from './Loading';
import ProductDescription from './ProductDescription';
import ReviewPreview from './ReviewPreview';
import useLoggedInUser from '../hooks/useLoggedInUser';
import AddReview from './AddReview';

type ProductInspectDetailProps = {
	furnitureId: string;
	furniture: Furniture;
};

const ProductInspectDetail = ({
	furnitureId,
	furniture
}: ProductInspectDetailProps) => {
	const matches = useMediaQuery('(min-width:650px)');
	const [reviews, setReviews] = useState<QueryDocumentSnapshot<Review>[]>([]);
	const user = useLoggedInUser();

	useEffect(
		() =>
			onSnapshot(reviewsCollection(furnitureId), snapshot => {
				setReviews(snapshot.docs);
			}),
		[]
	);

	return (
		<>
			<Card
				sx={{ padding: '1rem 1rem 0rem 1rem', marginBottom: '1rem' }}
				elevation={2}
			>
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
								height: '20rem',
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
			{/* Add Review */}
			{!reviews.find(r => r.data().byEmail === user?.email) && (
				<AddReview furnitureId={furnitureId}>
					{open => (
						<Button
							onClick={open}
							variant="contained"
							sx={{ marginBottom: '1rem' }}
						>
							{'Add review'}
						</Button>
					)}
				</AddReview>
			)}
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
