import {
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography
} from '@mui/material';
import { Delete, Star, StarBorder } from '@mui/icons-material';

import { Review } from '../../firebase';
import useLoggedInUser from '../../hooks/useLoggedInUser';

type ReviewPreviewProps = {
	deleteCallback: () => Promise<void>;
	review: Review;
};

const ReviewPreview = ({
	review: { byEmail, stars, description },
	deleteCallback
}: ReviewPreviewProps) => {
	const user = useLoggedInUser();

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'left',
				minWidth: '15rem',
				maxWidth: '30rem',
				visibility: 'visible'
			}}
		>
			<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography sx={{ width: '100%' }} color="textSecondary">
					{byEmail}
				</Typography>
				<Box mb={2}>
					{[...Array(5).keys()].map(i =>
						i < stars ? (
							<Star key={i} color="primary" />
						) : (
							<StarBorder key={i} color="primary" />
						)
					)}
				</Box>
				{description && <Typography>{description}</Typography>}
			</CardContent>
			{user?.email === byEmail && (
				<CardActions>
					<IconButton color="error" title="Delete" onClick={deleteCallback}>
						<Delete />
					</IconButton>
				</CardActions>
			)}
		</Card>
	);
};

export default ReviewPreview;
