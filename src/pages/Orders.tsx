import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { QueryDocumentSnapshot, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { Order, getOrdersByUserEmail } from '../firebase';
import ButtonLink from '../components/ButtonLink';
import OrderTableRow from '../components/OrderTableRow';

const Orders = () => {
	const user = useLoggedInUser();
	const [orders, setOrders] = useState<QueryDocumentSnapshot<Order>[]>([]);
	useEffect(() => {
		if (!user?.email) return;

		const fetchOrders = async () => {
			const userOrders = await getDocs(
				getOrdersByUserEmail(user.email ?? 'unknown')
			);
			setOrders(userOrders.docs);
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
									<TableCell sx={{ fontWeight: '600' }} align="right" />
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map(order => (
									<OrderTableRow
										key={order.id}
										order={order.data()}
										orderId={order.id}
									/>
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
