import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { Box } from '@mui/material';

import { Furniture, furnitureDocument } from '../firebase';
import ProductInspectDetail from '../components/ProductDetailPage/ProductInspectDetail';

const ProductInspect = () => {
	const params = useParams();
	const furId = params.Id;

	const [furniture, setFurniture] = useState<DocumentSnapshot<Furniture>>();
	const furData = furniture?.data();
	useEffect(
		() =>
			onSnapshot(furnitureDocument(furId ?? ''), snapshot => {
				setFurniture(snapshot);
			}),
		[]
	);

	// Here do the 3D Stuff
	return (
		<Box>
			{furniture && furData ? (
				<ProductInspectDetail furnitureId={furniture.id} furniture={furData} />
			) : (
				<Box />
			)}
		</Box>
	);
};

export default ProductInspect;
