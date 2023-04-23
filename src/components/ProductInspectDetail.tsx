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
import {
	QueryDocumentSnapshot,
	deleteDoc,
	onSnapshot
} from 'firebase/firestore';
import { Suspense, useEffect, useState } from 'react';

import {
	Furniture,
	Review,
	reviewsCollection,
	reviewsDocument
} from '../firebase';
import { OrbitControls } from '../reactThreeDreiUtilities/OrbitControls';
import useLoggedInUser from '../hooks/useLoggedInUser';

import Furniture3DInspect from './Furniture3DInspect';
import Loading from './Loading';
import ProductDescription from './ProductDescription';
import ReviewPreview from './ReviewPreview';
import AddReview from './AddReview';
import CreateOrder from './CreateOrder';

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
	const [imagePreviewed, _setImagePreviewed] = useState<string>();
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

					<Box
						sx={{
							maxWidth: '25rem',
							height: '20rem',
							diplay: 'flex'
						}}
					>
						{!imagePreviewed && (
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
						{imagePreviewed && (
							<img
								src={imagePreviewed}
								style={{ width: '100%', maxHeight: '100%' }}
								alt="Furniture preview"
							/>
						)}
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<ProductDescription furniture={furniture} />
						{user && (
							<CreateOrder
								furnitureId={furnitureId}
								furnitureName={furniture.name}
							>
								{open => (
									<Button
										onClick={open}
										variant="contained"
										sx={{ alignSelf: 'center', marginTop: '1rem' }}
									>
										Order
									</Button>
								)}
							</CreateOrder>
						)}
					</Box>
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
			{reviews.length !== 0 && (
				<Card>
					<CardContent sx={{ padding: '1rem' }}>
						<Typography sx={{ marginBottom: '1rem' }} variant="h5">
							Reviews
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 1 }}>
							{reviews.map(rev => (
								<ReviewPreview
									review={{ ...rev.data() }}
									deleteCallback={() =>
										deleteDoc(reviewsDocument(furnitureId, rev.id))
									}
									key={rev.id}
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
