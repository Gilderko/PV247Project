import { Box, Typography } from '@mui/material';

import ButtonLink from '../Utility/ButtonLink';

const UserNotFound = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '2rem'
		}}
	>
		<Typography variant="h3">
			You have to login/register to see your profile.
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

export default UserNotFound;
