/* eslint-disable react/no-unknown-property */
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

import { Furniture, Review, reviewsCollection } from '../../firebase';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { OrbitControls } from '../../reactThreeDreiUtilities/OrbitControls';

import AddReview from './AddReview';
import CreateOrder from './CreateOrder';
import Furniture3DInspect from './Furniture3DInspect';
import Loading from './Loading';
import ProductDescription from './ProductDescription';
import { Reviews } from './Reviews';

type ProductInspectDetailProps = {
	furnitureId: string;
	furniture: Furniture;
};

const ProductInspectDetail = ({
	furnitureId,
	furniture
}: ProductInspectDetailProps) => {
	const matches = !useMediaQuery('(min-width:650px)');
	const [reviews, setReviews] = useState<QueryDocumentSnapshot<Review>[]>([]);
	const [imagePreviewed, setImagePreviewed] = useState<string | undefined>(
		furniture.imageURL
	);
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
				sx={{
					padding: '1rem 1rem 0rem 1rem',
					marginBottom: '1rem',
					display: 'flex',
					flexDirection: 'column'
				}}
				elevation={2}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Typography variant="h3">{furniture.name}</Typography>
					<Box sx={{ flexGrow: 1 }} />
					{user && (
						<CreateOrder
							furnitureId={furnitureId}
							furnitureName={furniture.name}
						>
							{open => (
								<Button
									onClick={open}
									variant="contained"
									sx={{ maxWidth: '5rem', maxHeight: '2.5rem' }}
								>
									Order
								</Button>
							)}
						</CreateOrder>
					)}
				</Box>

				<Divider />
				<CardContent
					sx={{
						padding: '0rem',
						display: 'flex',
						flexDirection: matches ? 'column' : 'row',
						width: '100%'
					}}
				>
					{/* Description */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							minHeight: '15rem'
						}}
					>
						<Box
							sx={{
								paddingTop: '0.5rem',
								marginBottom: '1rem',
								height: '20rem',
								width: '20rem'
							}}
						>
							{!imagePreviewed && (
								<Suspense fallback={<Loading />}>
									<Canvas
										camera={{
											fov: 45,
											near: 0.1,
											far: 1000,
											position: [6, 8, 8]
										}}
									>
										<color args={[255, 255, 255]} attach="background" />
										<ambientLight />
										<directionalLight color="white" position={[0, 3, 5]} />
										<OrbitControls />
										<Furniture3DInspect furniture={furniture} />
									</Canvas>
								</Suspense>
							)}
							{imagePreviewed && (
								<img
									src={imagePreviewed}
									style={{
										width: '100%',
										maxHeight: '100%'
									}}
									alt="Furniture preview"
								/>
							)}
						</Box>
						<Button
							sx={{ font: 'black', maxWidth: '6rem' }}
							variant="contained"
							onClick={() => setImagePreviewed(undefined)}
						>
							3D View
						</Button>
					</Box>
					<Divider sx={{ marginBottom: '0.5rem', paddingTop: '1rem' }} />
					<ProductDescription
						furniture={furniture}
						setImagePreviewed={setImagePreviewed}
					/>
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
							Add review
						</Button>
					)}
				</AddReview>
			)}
			{/* Reviews */}
			<Reviews reviews={reviews} furnitureId={furnitureId} />
		</>
	);
};

export default ProductInspectDetail;
