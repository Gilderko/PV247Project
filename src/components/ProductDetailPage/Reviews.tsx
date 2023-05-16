import {
	Box,
	Card,
	CardContent,
	Typography,
	useMediaQuery
} from '@mui/material';
import { QueryDocumentSnapshot, deleteDoc } from 'firebase/firestore';

import { mediumScreenMediaQuery } from '../../constants';
import { Review, reviewsDocument } from '../../firebase';

import ReviewPreview from './ReviewPreview';

type ReviewsProps = {
	reviews: QueryDocumentSnapshot<Review>[];
	furnitureId: string;
};

export const Reviews = ({ reviews, furnitureId }: ReviewsProps) => {
	const match = useMediaQuery(mediumScreenMediaQuery);

	return (
		<Card>
			<CardContent sx={{ padding: '1rem' }}>
				<Typography sx={{ marginBottom: '1rem' }} variant="h5">
					Reviews
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: match ? 'row' : 'column',
						flexWrap: 1,
						gap: '1rem'
					}}
				>
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
	);
};
