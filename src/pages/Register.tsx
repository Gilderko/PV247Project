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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setDoc } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import TextInput from '../components/TextInput';
import { useTranslation } from '../hooks/useTranslation';
import { signUp, userInfoDocument, userProfilePhotos } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

// const ImageComponent = () => {
// 	const user = useLoggedInUser();
// 	const storageRef = ref(userProfilePhotos, user?.uid);
// 	const [url, setUrl] = useState('');

// 	useEffect(() => {
// 		const getImage = async () => {
// 			const downloadUrl = await getDownloadURL(storageRef);
// 			setUrl(downloadUrl);
// 		};

// 		getImage();
// 	}, []);

// 	return <img src={url} alt="Firebase Storage" />;
// };

const Register = () => {
	usePageTitle('Login');
	const [submitError, setSubmitError] = useState<string>();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const loggedInUser = useLoggedInUser();

	const translation = useTranslation();
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
					{translation('register-user-title')}
				</Typography>
				<Form
					onSubmit={async values => {
						try {
							let fileExtension = '';
							if (selectedImage) {
								fileExtension = selectedImage.name.split('.').pop() ?? '';
								if (
									fileExtension !== 'jpg' &&
									fileExtension !== 'png' &&
									fileExtension !== 'jpeg'
								) {
									setSubmitError('Invalid file type for user image!');
									return;
								}
							}
							// register user with email and password
							const user = await signUp(values.email, values.password);

							// upload user image to firebase storage
							let downloadUrl = '';
							if (selectedImage) {
								const storageRef = ref(
									userProfilePhotos,
									`${user.user.uid}.${fileExtension}`
								);
								const result = await uploadBytes(storageRef, selectedImage);
								downloadUrl = await getDownloadURL(result.ref);
							}

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
							errors.password = translation(
								'register-user-passwordRepeat-error'
							);
						}

						const emailRegex = new RegExp(
							'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
						);
						if (!emailRegex.test(values.email)) {
							errors.email = translation('register-user-email-error');
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
							<TextInput
								id="firstName"
								label={translation('register-user-firstName-label')}
								required
								variant="standard"
							/>
							<TextInput
								id="lastName"
								label={translation('register-user-lastName-label')}
								required
								variant="standard"
							/>
							<TextInput
								id="birthDate"
								label={translation('register-user-birthDate-label')}
								required
								variant="standard"
							/>
							<TextInput
								id="email"
								label={translation('register-user-email-label')}
								required
								variant="standard"
							/>
							<Typography
								variant="h6"
								component="h3"
								textAlign="start"
								sx={{ mt: 2 }}
							>
								{translation('register-user-password-section')}
							</Typography>
							<TextInput
								id="password"
								label={translation('register-user-password-label')}
								required
								type="password"
								variant="standard"
							/>
							<TextInput
								id="passwordRepeat"
								label={translation('register-user-passwordRepeat-label')}
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
								{translation('register-user-profileImage-label')}
							</Typography>
							<input
								id="profileImage"
								type="file"
								name="profileImage"
								onChange={event => {
									if (!event.target.files) return;
									setSelectedImage(event.target.files[0]);
								}}
							/>
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
								{translation('register-user-submit-button')}
							</Button>
						</Box>
					)}
				/>
			</Container>
		</Paper>
	);
};

export default Register;
