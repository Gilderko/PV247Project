import { Box, Typography } from '@mui/material';
import { QueryDocumentSnapshot, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { Order, getOrdersByUserEmail } from '../firebase';
import ButtonLink from '../components/ButtonLink';

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
	}, []);

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
			<Box />
		</>
	);
};

export default Orders;
