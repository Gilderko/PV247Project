import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { QueryDocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import {
	FilterForm,
	FilterValues
} from '../components/ProductsListPage/FilterForm';
import FurniturePreview from '../components/ProductsListPage/FurniturePreview';
import { Furniture, furnituresCollection } from '../firebase';

const filterProducts = (
	document: QueryDocumentSnapshot<Furniture>,
	filterFurniture: FilterValues
) => {
	let shouldReturn = true;
	const docData = document.data();
	if (filterFurniture.furnitureName) {
		shouldReturn &&= docData.name
			.toLowerCase()
			.includes(filterFurniture.furnitureName.toLowerCase());
	}
	if (
		filterFurniture.furnitureType &&
		filterFurniture.furnitureType.length > 0
	) {
		shouldReturn &&= filterFurniture.furnitureType.includes(docData.furnType);
	}
	if (filterFurniture.materialType && filterFurniture.materialType.length > 0) {
		shouldReturn &&= filterFurniture.materialType.includes(
			docData.materialType
		);
	}
	return shouldReturn;
};

const Products = () => {
	const [furnitures, setFurnitures] = useState<
		QueryDocumentSnapshot<Furniture>[]
	>([]);

	// Filter by name, field, furn and mat type
	const [filterValues, setFilterValues] = useState<FilterValues>({
		furnitureName: '',
		furnitureType: [],
		materialType: []
	});

	// Fetch Furnitures
	useEffect(
		() =>
			onSnapshot(furnituresCollection, snapshot => {
				setFurnitures(snapshot.docs);
			}),
		[]
	);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			{/* Filters */}
			<FilterForm onSubmit={filter => setFilterValues(filter)} />
			{/* Previews */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: '2rem'
				}}
			>
				{furnitures
					.filter(doc => filterProducts(doc, filterValues))
					.map(doc => (
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
