import { useParams } from '@tanstack/react-router';
import { Furniture, furnitureDocument } from '../firebase';
import { useEffect, useState } from 'react';
import { DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import ProductInspectDetail from '../components/ProductInspectDetail';

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
		<>
			{furniture && furData && (
				<ProductInspectDetail furnitureId={furniture.id} furniture={furData} />
			)}
		</>
	);
};

export default ProductInspect;
