import { Box, Button, Typography } from '@mui/material';

import { Furniture } from '../../firebase';

type ProductDescriptionProps = {
	setImagePreviewed: React.Dispatch<React.SetStateAction<string | undefined>>;
	furniture: Furniture;
};

const ProductDescription = ({
	furniture,
	setImagePreviewed
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
		<Box>
			{furniture.imagesDetail.map((furURL, i) => (
				<Button
					key={i}
					sx={{
						width: '7rem',
						height: '7rem'
					}}
					onClick={() => setImagePreviewed(furURL)}
				>
					<img
						style={{ width: '100%', height: '100%' }}
						src={furURL}
						alt="Detail preview option"
					/>
				</Button>
			))}
		</Box>
	</Box>
);

export default ProductDescription;
