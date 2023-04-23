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
import { addDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

import usePageTitle from '../hooks/usePageTitle';
import TextInput from '../components/TextInput';
import { useTranslation } from '../hooks/useTranslation';
import { signUp, userInfoDocument, userinfosCollection } from '../firebase';

const Register = () => {
	usePageTitle('Login');
	const [submitError, setSubmitError] = useState<string>();

	const translation = useTranslation();
	const theme = useTheme();

	const navigate = useNavigate();
	return (
		<Paper>
			<Container sx={{ py: 2, display: 'flex', flexDirection: 'column' }}>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					{translation('register-user-title')}
				</Typography>
				<Form
					onSubmit={async values => {
						try {
							const user = await signUp(values.email, values.password);

							await setDoc(userInfoDocument(user.user.uid), {
								firstName: values.firstName,
								lastName: values.lastName,
								birthDate: values.birthDate,
								email: values.email,
								profileImageURL: ''
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
							<Typography>TODO: add profile image upload</Typography>
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
