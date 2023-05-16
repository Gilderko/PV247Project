import { Box, Avatar, Typography } from '@mui/material';

import ButtonLink from '../Utility/ButtonLink';
import { UserInfo } from '../../firebase';

const UserFound = (userInfo: UserInfo) => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: 2,
			marginTop: '2rem'
		}}
	>
		<Avatar sx={{ height: 150, width: 150 }} src={userInfo?.profileImageURL} />
		<Typography variant="h3" textAlign="center">
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

export default UserFound;
