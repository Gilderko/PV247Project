import { useEffect, useState } from 'react';
import { getDoc, updateDoc } from 'firebase/firestore';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { useNavigate } from '@tanstack/react-router';
import { updateEmail } from 'firebase/auth';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { UserInfo, userInfoDocument } from '../firebase';
import ButtonLink from '../components/ButtonLink';
import theme from '../theme';
import { isValidEmail, isValidImageType } from '../utils/userDataValidators';
import { saveUserProfileImage } from '../utils/saveUserProfileImage';
import UserInfoFields from '../components/UserInfoFields';

const EditUser = () => {
	const user = useLoggedInUser();
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState<UserInfo>();
	const [submitError, setSubmitError] = useState<string>();
	const [newUserPhoto, setNewUserPhoto] = useState<File | null>(null);

	useEffect(() => {
		const fetchUserInfo = async () => {
			if (user?.email !== null && user !== undefined) {
				const doc = await getDoc(userInfoDocument(user.uid));
				setUserInfo(doc.data());
			}
		};
		fetchUserInfo();
	}, [user]);

	if (!user) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '2rem'
				}}
			>
				<Typography variant="h3">
					You have to login/register to edit your profile.
				</Typography>
				<ButtonLink
					sx={{ marginTop: '1rem' }}
					color="primary"
					variant="contained"
					to="/login"
				>
					Login to app
				</ButtonLink>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '2rem'
			}}
		>
			<Form
				initialValues={{
					firstName: userInfo?.firstName,
					lastName: userInfo?.lastName,
					email: userInfo?.email,
					birthDate: userInfo?.birthDate
				}}
				onSubmit={async values => {
					try {
						if (newUserPhoto && !isValidImageType(newUserPhoto.name)) {
							setSubmitError('Invalid file type for user image!');
							return;
						}

						// upload user image to firebase storage
						const downloadUrl = await saveUserProfileImage(
							newUserPhoto,
							user.uid
						);
						await updateEmail(user, values.email);
						// save user info to firestore
						await updateDoc(userInfoDocument(user.uid), {
							firstName: values.firstName,
							lastName: values.lastName,
							birthDate: values.birthDate,
							email: values.email,
							profileImageURL:
								downloadUrl.length === 0
									? userInfo?.profileImageURL
									: downloadUrl
						});
					} catch (err) {
						setSubmitError(
							(err as { message?: string })?.message ?? 'Unknown error occurred'
						);
					}
					navigate({ to: '/user' });
				}}
				validate={values => {
					const errors: Record<string, string> = {};

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
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
							gap: 2,
							width: '30%'
						}}
					>
						<Avatar
							sx={{ height: 150, width: 150, alignSelf: 'center' }}
							src={
								newUserPhoto
									? URL.createObjectURL(newUserPhoto)
									: userInfo?.profileImageURL
							}
						/>

						<Button
							sx={{
								marginBottom: '1rem',
								alignSelf: 'center',
								color: theme.palette.secondary.main,
								textTransform: 'none'
							}}
							variant="contained"
							component="label"
						>
							<Typography variant="body2">New profile picture</Typography>
							<input
								id="profileImage"
								type="file"
								hidden
								name="profileImage"
								onChange={event => {
									if (!event.target.files) return;
									setNewUserPhoto(event.target.files[0]);
								}}
							/>
						</Button>
						<UserInfoFields />
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
							sx={{ alignSelf: 'center' }}
							variant="contained"
							type="submit"
						>
							Save changes
						</Button>
					</Box>
				)}
			/>
		</Box>
	);
};

export default EditUser;
