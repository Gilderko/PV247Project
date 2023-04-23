import { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';
import {
	Avatar,
	Box,
	Paper,
	Typography,
	TextField,
	Button
} from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { UserInfo, userInfoDocument } from '../firebase';
import ButtonLink from '../components/ButtonLink';

const User = () => {
	const user = useLoggedInUser();
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
				flexDirection: 'column',
				alignItems: 'center',
				gap: 2,
				marginTop: '2rem'
			}}
		>
			<Avatar sx={{ height: 150, width: 150 }} />
			<Typography variant="h3">John Doe</Typography>
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
			</Box>
			<ButtonLink color="primary" variant="contained" to="/edituser">
				Edit profile
			</ButtonLink>
		</Box>
	);
};

export default User;
