import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { Timestamp, addDoc } from 'firebase/firestore';
import { ReactNode, useState } from 'react';
import { Form } from 'react-final-form';

import { ordersCollection } from '../../firebase';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import TextInput from '../Utility/TextInput';

type Props = {
	furnitureId: string;
	furnitureName: string;
	children: (open: () => void) => ReactNode;
};

const CreateOrder = ({ furnitureId, furnitureName, children }: Props) => {
	const user = useLoggedInUser();
	const navigate = useNavigate();
	// Open state
	const [open, setOpen] = useState(false);

	const [submitError, setSubmitError] = useState<string>();

	// Close and reset handler
	const closeDialog = () => {
		setOpen(false);
		setSubmitError(undefined);
	};

	// Submit handler
	const handleSubmit = async (
		country: string,
		city: string,
		street: string,
		streetNumber: number
	) => {
		if (!user?.email) {
			setSubmitError('Not signed in');
			return;
		}
		try {
			await addDoc(ordersCollection, {
				country,
				city,
				street,
				streetNumber,
				furnitureId,
				userEmail: user.email,
				dateCreated: Timestamp.now()
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
				<DialogTitle>Create order for: {furnitureName}</DialogTitle>
				<Form
					onSubmit={values => {
						handleSubmit(
							values.country,
							values.city,
							values.street,
							values.streetNumber
						);
						navigate({ to: '/orders' });
					}}
					render={({ handleSubmit }) => (
						<Box component="form" onSubmit={handleSubmit}>
							<DialogContent sx={{ minWidth: '600px' }}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 2
									}}
								>
									<TextInput
										id="country"
										label="Country"
										required
										fullWidth
										variant="standard"
									/>
									<TextInput
										id="city"
										label="City"
										fullWidth
										required
										variant="standard"
									/>
									<TextInput
										id="street"
										label="Street"
										required
										fullWidth
										variant="standard"
									/>
									<TextInput
										id="streetNumber"
										label="Street number"
										required
										fullWidth
										type="number"
										variant="standard"
									/>
								</Box>
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
									Cancel
								</Button>
								<Button type="submit" variant="contained">
									Order
								</Button>
							</DialogActions>
						</Box>
					)}
				/>
			</Dialog>
		</>
	);
};

export default CreateOrder;
