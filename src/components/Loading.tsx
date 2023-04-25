import { Box, Typography } from '@mui/material';

import logo from '../assets/loading.gif';

const Loading = () => (
	<Box sx={{ width: '100%', height: '100%' }}>
		<Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
			Loading
		</Typography>
		<img src={logo} style={{ width: '100%' }} alt="Loading preview" />
	</Box>
);

export default Loading;
