import { Box, Typography } from '@mui/material';

import { Furniture } from '../firebase';

type ProductDescriptionProps = {
	children?: React.ReactNode;
	furniture: Furniture;
};

const ProductDescription = ({
	furniture,
	children
}: ProductDescriptionProps) => (
	<Box
		sx={{
			padding: '0.5rem 0rem 1rem 0.5rem',
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
		{children}
	</Box>
);

export default ProductDescription;
