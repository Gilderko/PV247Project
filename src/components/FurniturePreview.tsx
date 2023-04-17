import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Furniture } from '../firebase';
import { Link, useNavigate } from '@tanstack/react-router';
import { Box, Divider, Paper, Typography, useTheme } from '@mui/material';

type FurnitureProps = {
	furniture: Furniture;
	furnitutreId: string;
};

const maxStringLenght = 50;

const FurniturePreview = ({ furniture, furnitutreId }: FurnitureProps) => {
	const theme = useTheme();
	const stringLen =
		maxStringLenght > furniture.description.length
			? furniture.description.length
			: maxStringLenght;

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
					alt="Furniture Image"
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
					<Box sx={{ flexGrow: 1 }}></Box>
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
