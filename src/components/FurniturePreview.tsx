import { Link } from '@tanstack/react-router';
import { Box, Divider, Paper, Typography, useTheme } from '@mui/material';

import { Furniture } from '../firebase';

type FurnitureProps = {
	furniture: Furniture;
	furnitutreId: string;
};

const FurniturePreview = ({ furniture, furnitutreId }: FurnitureProps) => {
	const theme = useTheme();

	return (
		<Link
			to="/products/$Id"
			params={{ Id: furnitutreId }}
			style={{ textDecoration: 'none', marginBottom: '1rem' }}
		>
			<Paper
				elevation={1}
				sx={{
					maxWidth: '15rem',
					height: '25rem',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<Typography
					sx={{
						padding: '0.3rem',
						textAlign: 'center',
						fontSize: '1.3rem',
						backgroundColor: theme.palette.primary.main,
						fontWeight: 'bold'
					}}
				>
					{furniture.name}
				</Typography>
				<img
					style={{ width: '100%' }}
					src={furniture.imageURL}
					alt="Furniture preview"
				/>
				<Divider sx={{ marginBottom: '0.1rem' }} />
				<Box
					sx={{
						padding: '0.3rem',
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Typography
						sx={{ fontSize: '0.8rem' }}
					>{`Type: ${furniture.furnType}`}</Typography>
					<Typography
						sx={{ fontSize: '0.8rem' }}
					>{`Material: ${furniture.materialType}`}</Typography>
					<Divider sx={{ marginBottom: '0.1rem' }} />
					<Box sx={{ flexGrow: 1 }} />
				</Box>
				<Typography
					sx={{
						backgroundColor: theme.palette.primary.contrastText,
						fontWeight: 'bold',
						textAlign: 'center'
					}}
				>{`Price: ${furniture.priceDollars}$`}</Typography>
			</Paper>
		</Link>
	);
};

export default FurniturePreview;
