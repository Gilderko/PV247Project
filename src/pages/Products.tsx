import { QueryDocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Furniture, furnituresCollection } from '../firebase';
import { Box } from '@mui/material';
import FurniturePreview from '../components/FurniturePreview';
import { Outlet } from '@tanstack/react-router';

const Products = () => {
	const [furnitures, setFurnitures] = useState<
		QueryDocumentSnapshot<Furniture>[]
	>([]);

	// Fetch Furnitures
	useEffect(
		() =>
			onSnapshot(furnituresCollection, snapshot => {
				setFurnitures(snapshot.docs);
			}),
		[]
	);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
			{/* Filters */}
			<Box></Box>
			{/* Previews */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: '1rem'
				}}
			>
				{furnitures.map(doc => (
					<FurniturePreview
						key={doc.id}
						furniture={doc.data()}
						furnitutreId={doc.id}
					/>
				))}
			</Box>
			<Outlet />
		</Box>
	);
};

export default Products;
