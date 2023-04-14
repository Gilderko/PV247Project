import { useNavigate, useParams } from '@tanstack/react-router';
import {
	Furniture,
	furnitureDocument,
	furnituresCollection,
	reviewsDocument
} from '../firebase';
import { Suspense, useEffect, useState } from 'react';
import { getDoc, onSnapshot } from 'firebase/firestore';
import { Box, Typography } from '@mui/material';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Product3DView from '../components/ProductPreview';

const ProductInspect = () => {
	const params = useParams();
	console.log('Product inpesct');
	const furnitureId = params.Id;

	const [furniture, setFurniture] = useState<Furniture>();

	useEffect(
		() =>
			onSnapshot(furnitureDocument(furnitureId ?? ''), snapshot => {
				setFurniture(snapshot.data());
			}),
		[]
	);

	// Here do the 3D Stuff
	return <>{furniture && <Product3DView furniture={furniture} />}</>;
};

export default ProductInspect;
