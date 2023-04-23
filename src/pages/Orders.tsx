import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { QueryDocumentSnapshot, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Delete } from '@mui/icons-material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	Furniture,
	Order,
	furnitureDocument,
	getOrdersByUserEmail
} from '../firebase';
import ButtonLink from '../components/ButtonLink';
import OrderTableRow from '../components/OrderTableRow';

const Orders = () => {
	const user = useLoggedInUser();
	const [orders, setOrders] = useState<Order[]>([]);
	useEffect(() => {
		if (!user?.email) return;

		const fetchOrders = async () => {
			const userOrders = await getDocs(
				getOrdersByUserEmail(user.email ?? 'unknown')
			);
			setOrders(userOrders.docs.map(doc => doc.data()));
		};
		fetchOrders();
	}, [orders, user]);

	return (
		<>
			{orders.length === 0 && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						marginTop: '2rem'
					}}
				>
					<Typography variant="h3">No orders yet.</Typography>
					<ButtonLink
						sx={{ marginTop: '1rem' }}
						color="primary"
						variant="contained"
						to="/"
					>
						Make your first order
					</ButtonLink>
				</Box>
			)}
			{orders.length !== 0 && (
				<Box>
					<Typography variant="h3">My orders</Typography>
					<TableContainer sx={{ marginTop: '1rem' }} component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: '600' }}>
										Furniture name
									</TableCell>
									<TableCell sx={{ fontWeight: '600' }}>Price</TableCell>
									<TableCell sx={{ fontWeight: '600' }}>Date</TableCell>
									<TableCell sx={{ fontWeight: '600' }} align="right">
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map((order, index) => (
									<OrderTableRow key={index} order={order} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}
		</>
	);
};

export default Orders;
