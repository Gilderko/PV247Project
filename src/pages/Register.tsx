import { useNavigate } from '@tanstack/react-router';
import {
	Box,
	Button,
	Container,
	Paper,
	Typography,
	useTheme
} from '@mui/material';
import { Form } from 'react-final-form';
import { useEffect, useState } from 'react';
import { setDoc } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import TextInput from '../components/Utility/TextInput';
import { signUp, userInfoDocument } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { isValidEmail, isValidImageType } from '../utils/userDataValidators';
import { saveUserProfileImage } from '../utils/saveUserProfileImage';
import UserInfoFields from '../components/UserInfoFields';

const Register = () => {
	usePageTitle('Login');
	const [submitError, setSubmitError] = useState<string>();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const loggedInUser = useLoggedInUser();

	const theme = useTheme();

	const navigate = useNavigate();

	useEffect(() => {
		if (loggedInUser) {
			navigate({ to: '/' });
		}
	}, [loggedInUser, navigate]);

	return (
		<Paper>
			<Container sx={{ py: 2, display: 'flex', flexDirection: 'column' }}>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					Join Us
				</Typography>
				<Form
					onSubmit={async values => {
						try {
							if (selectedImage && !isValidImageType(selectedImage.name)) {
								setSubmitError('Invalid file type for user image!');
								return;
							}
							// register user with email and password
							const user = await signUp(values.email, values.password);

							// upload user image to firebase storage
							const downloadUrl = await saveUserProfileImage(
								selectedImage,
								user.user.uid
							);
							// save user info to firestore
							await setDoc(userInfoDocument(user.user.uid), {
								firstName: values.firstName,
								lastName: values.lastName,
								birthDate: values.birthDate,
								email: values.email,
								profileImageURL: downloadUrl
							});
						} catch (err) {
							setSubmitError(
								(err as { message?: string })?.message ??
									'Unknown error occurred'
							);
						}
					}}
					validate={values => {
						const errors: Record<string, string> = {};

						if (values.password !== values.passwordRepeat) {
							errors.password = 'Passwords do not match';
						}

						if (!isValidEmail(values.email)) {
							errors.email = 'Email is not in the correct format';
						}

						return errors;
					}}
					render={({ handleSubmit }) => (
						<Box
							component="form"
							onSubmit={handleSubmit}
							sx={{
								maxWidth: 400,
								display: 'flex',
								flexDirection: 'column',
								alignSelf: 'center',
								gap: 2,
								width: '100%'
							}}
						>
							<UserInfoFields />
							<Typography
								variant="h6"
								component="h3"
								textAlign="start"
								sx={{ mt: 2 }}
							>
								Password
							</Typography>
							<TextInput
								id="password"
								label="Password"
								required
								type="password"
								variant="standard"
							/>
							<TextInput
								id="passwordRepeat"
								label="Repeat Password"
								required
								type="password"
								variant="standard"
							/>
							<Typography
								variant="h6"
								component="h3"
								textAlign="start"
								sx={{ mt: 2 }}
							>
								Profile Image
							</Typography>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignSelf: 'start',
									alignItems: 'center',
									marginBottom: '1rem'
								}}
							>
								<Button
									sx={{
										color: theme.palette.primary.contrastText,
										textTransform: 'none'
									}}
									variant="contained"
									component="label"
								>
									<Typography variant="body2">
										Choose profile picture
									</Typography>
									<input
										id="profileImage"
										type="file"
										hidden
										name="profileImage"
										onChange={event => {
											if (!event.target.files) return;
											setSelectedImage(event.target.files[0]);
										}}
									/>
								</Button>
								<Typography sx={{ marginLeft: '1rem' }} variant="body1">
									{selectedImage ? selectedImage.name : ''}
								</Typography>
							</Box>
							{submitError && (
								<Typography
									variant="caption"
									textAlign="center"
									fontSize={14}
									sx={{ color: 'error.main' }}
								>
									{submitError}
								</Typography>
							)}
							<Button
								type="submit"
								variant="contained"
								sx={{ color: theme.palette.secondary.main }}
							>
								Register
							</Button>
						</Box>
					)}
				/>
			</Container>
		</Paper>
	);
};

export default Register;
