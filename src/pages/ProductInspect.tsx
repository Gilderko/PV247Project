<<<<<<< HEAD
import { useNavigate, useParams } from '@tanstack/react-router';
import { Suspense, useEffect, useState } from 'react';
import { getDoc, onSnapshot } from 'firebase/firestore';
import { Box, Typography } from '@mui/material';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import {
	Furniture,
	furnitureDocument,
	furnituresCollection,
	reviewsDocument
} from '../firebase';
import Product3DView from '../components/ProductPreview';
=======
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { Box } from '@mui/material';

import { Furniture, furnitureDocument } from '../firebase';
import ProductInspectDetail from '../components/ProductInspectDetail';
>>>>>>> main

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
