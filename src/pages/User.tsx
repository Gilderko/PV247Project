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
import { getDownloadURL, ref } from '@firebase/storage';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { UserInfo, userInfoDocument, userProfilePhotos } from '../firebase';
import ButtonLink from '../components/ButtonLink';

const User = () => {
	const user = useLoggedInUser();
	const [userInfo, setUserInfo] = useState<UserInfo>();

	useEffect(() => {
		const fetchUserInfo = async () => {
			if (user?.email !== null && user !== undefined) {
				const doc = await getDoc(userInfoDocument(user.uid));
				setUserInfo(doc.data());
			}
		};

		fetchUserInfo();
	}, [user]);

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
			<Avatar
				sx={{ height: 150, width: 150 }}
				src={userInfo?.profileImageURL}
			/>
			<Typography variant="h3">
				{userInfo?.firstName} {userInfo?.lastName}
			</Typography>
			<Box sx={{ display: 'flex' }}>
				<Typography sx={{ fontWeight: 'bold', marginRight: '0.8rem' }}>
					Email:{' '}
				</Typography>
				<Typography>{userInfo?.email}</Typography>
			</Box>

			<Box sx={{ display: 'flex' }}>
				<Typography sx={{ fontWeight: 'bold', marginRight: '0.8rem' }}>
					Birthdate:
				</Typography>
				<Typography>{userInfo?.birthDate.toString()}</Typography>
			</Box>
			<ButtonLink color="primary" variant="contained" to="/edituser">
				Edit profile
			</ButtonLink>
		</Box>
	);
};

export default User;
