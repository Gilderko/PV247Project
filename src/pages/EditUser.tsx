import { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { useNavigate } from '@tanstack/react-router';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { UserInfo, userInfoDocument } from '../firebase';
import ButtonLink from '../components/ButtonLink';
import TextInput from '../components/TextInput';

const EditUser = () => {
	const user = useLoggedInUser();
	const navigate = useNavigate();
	// const [userInfo, setUserInfo] = useState<UserInfo>();

	// useEffect(() => {
	// 	const userInfo = async () => {
	// 		if (user?.email !== null && user !== undefined) {
	// 			const doc = await getDoc(userInfoDocument(user.email));
	// 			setUserInfo(doc.data());
	// 		}
	// 	};
	// }, [user]);

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '2rem'
			}}
		>
			{/* <Typography variant="h3">John Doe</Typography>
			<Box sx={{ display: 'flex' }}>
				<Typography sx={{ fontWeight: 'bold', marginRight: '0.8rem' }}>
					Email:{' '}
				</Typography>
				<Typography>johndoe@example.com</Typography>
			</Box>

			<Box sx={{ display: 'flex' }}>
				<Typography sx={{ fontWeight: 'bold', marginRight: '0.8rem' }}>
					Birthdate:
				</Typography>
				<Typography>12.05.2000</Typography>
			</Box> */}
			<Form
				initialValues={{
					name: 'John Doe',
					email: 'johndoe@example.com'
				}}
				onSubmit={values => {
					console.log('submit');
					navigate({ to: '/user' });
				}}
				render={({ handleSubmit }) => (
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
							width: '30%'
						}}
					>
						<Avatar sx={{ height: 150, width: 150 }} />

						<TextInput
							id="name"
							label="Name"
							required
							fullWidth
							variant="standard"
						/>
						<TextInput
							id="email"
							label="Email"
							fullWidth
							required
							variant="standard"
						/>
						<Button type="submit">Save</Button>
					</Box>
				)}
			/>
		</Box>
	);
};

export default EditUser;
