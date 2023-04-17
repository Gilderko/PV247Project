import { Box, Typography } from '@mui/material';
import logo from '../assets/loading.gif';

const Loading = () => {
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Typography sx={{ textAlign: 'center' }}>Loading</Typography>
			<img src={logo} style={{ width: '100%' }} />
		</Box>
	);
};

export default Loading;
