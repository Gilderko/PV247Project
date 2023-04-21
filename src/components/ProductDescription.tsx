import { Box, Typography } from '@mui/material';
import { Furniture } from '../firebase';

type ProductDescriptionProps = {
	furniture: Furniture;
};

const ProductDescription = ({ furniture }: ProductDescriptionProps) => {
	return (
		<Box
			sx={{
				padding: '0rem 1rem 1rem 2rem',
				gap: '1.5rem',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Box>
				<Typography variant="h5">Description:</Typography>
				<Typography>{furniture.description}</Typography>
			</Box>
			<Box>
				<Typography variant="h5">Furniture type:</Typography>
				<Typography>{furniture.furnType}</Typography>
			</Box>
			<Box>
				<Typography variant="h5">Material type:</Typography>
				<Typography>{furniture.materialType}</Typography>
			</Box>
		</Box>
	);
};

export default ProductDescription;
