import { Star, StarBorder } from '@mui/icons-material';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { Timestamp, setDoc } from 'firebase/firestore';

import useField from '../hooks/useField';
import { reviewsDocument } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	furnitureId: string;
	children: (open: () => void) => ReactNode;
};

const AddReview = ({ furnitureId, children }: Props) => {
	const user = useLoggedInUser();

	// Open state
	const [open, setOpen] = useState(false);

	// Fields
	const [stars, setStars] = useState(1);
	const description = useField('description');

	const [submitError, setSubmitError] = useState<string>();

	// Close and reset handler
	const closeDialog = () => {
		setOpen(false);
		setStars(0);
		description.props.onChange({ target: { value: '' } } as never);
		setSubmitError(undefined);
	};

	// Submit handler
	const handleSubmit = async () => {
		if (!user?.email) {
			setSubmitError('Not signed in');
			return;
		}
		try {
			await setDoc(reviewsDocument(furnitureId, user.email), {
				byEmail: user?.email ?? 'anon',
				stars,
				description: description.value,
				createdAt: Timestamp.now()
			});
			closeDialog();
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : 'unknown_error');
		}
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>Add review</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minWidth: 500
					}}
				>
					{/* Stars select */}
					<Box>
						{[...Array(5).keys()].map(i => (
							<IconButton
								key={i}
								color="primary"
								component="span"
								onClick={() => setStars(i + 1)}
							>
								{i < stars ? <Star /> : <StarBorder />}
							</IconButton>
						))}
					</Box>
					<TextField label={'Description'} fullWidth {...description.props} />
				</DialogContent>
				<DialogActions>
					{submitError && (
						<Typography
							variant="subtitle2"
							align="left"
							color="error"
							paragraph
							sx={{ mb: 0, mr: 2 }}
						>
							{submitError}
						</Typography>
					)}
					<Button onClick={closeDialog} variant="outlined">
						{'Cancel'}
					</Button>
					<Button onClick={handleSubmit} variant="contained">
						{'Submit'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddReview;
