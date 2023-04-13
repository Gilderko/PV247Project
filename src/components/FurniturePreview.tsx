import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Furniture } from '../firebase';
import { Link, useNavigate } from '@tanstack/react-router';
import { Box, Paper, Typography } from '@mui/material';

type FurnitureProps = {
	furniture: Furniture;
	furnitutreId: string;
};

const maxStringLenght = 50;

const FurniturePreview = ({ furniture, furnitutreId }: FurnitureProps) => {
	const navigate = useNavigate();

	const stringLen =
		maxStringLenght > furniture.description.length
			? furniture.description.length
			: maxStringLenght;

	return (
		<Link to="/products/$Id" params={{ Id: furnitutreId }}>
			<Paper sx={{ maxWidth: '15rem', maxHeight: '20rem' }}>
				<Typography> {furniture.name}</Typography>
				<img src={furniture.imageURL} alt="Furniture Image" />
				<Typography>
					{`${furniture.description.slice(0, stringLen)}...`}
				</Typography>
			</Paper>
		</Link>
	);
};

export default FurniturePreview;
