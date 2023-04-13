import { QueryDocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Furniture, furnituresCollection } from '../firebase';
import { Box } from '@mui/material';
import FurniturePreview from '../components/FurniturePreview';

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
		<Box sx={{ display: 'flex', direction: 'row', width: '100%' }}>
			{/* Filters */}
			<Box></Box>
			{/* Previews */}
			<Box sx={{ display: 'flex', direction: 'row', flexWrap: 'wrap' }}>
				{furnitures.map(doc => (
					<FurniturePreview
						key={doc.id}
						furniture={doc.data()}
						furnitutreId={doc.id}
					/>
				))}
			</Box>
		</Box>
	);
};

export default Products;
