import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Timestamp, getDoc } from '@firebase/firestore';
import { deleteDoc } from 'firebase/firestore';

import {
	Furniture,
	Order,
	furnitureDocument,
	orderDocument
} from '../../firebase';

type OrderTableRowProps = {
	order: Order;
	orderId: string;
};

const daySeconds = 86400;

const disableDelete = (created: Timestamp): boolean => {
	//check if there is more than one day difference between date and today
	const today = Timestamp.now();
	const diff = today.seconds - created.seconds;
	if (diff > daySeconds) {
		return true;
	}
	return false;
};

const OrderTableRow = ({ order, orderId }: OrderTableRowProps) => {
	const [furnitureInfo, setFurnitureInfo] = useState<Furniture>();
	useEffect(() => {
		const fetchFurniture = async () => {
			const furniture = await getDoc(furnitureDocument(order.furnitureId));
			setFurnitureInfo(furniture.data());
		};
		fetchFurniture();
	}, [order]);
	const deleteDisabled = disableDelete(order.dateCreated);
	return (
		<TableRow
			key={order.userEmail}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell component="th" scope="row">
				{furnitureInfo?.name}
			</TableCell>
			<TableCell>{furnitureInfo?.priceDollars}$</TableCell>
			<TableCell>{order.dateCreated.toDate().toLocaleString()}</TableCell>
			<TableCell align="right">
				<Tooltip
					title={
						deleteDisabled
							? 'Cannot delete order older than one day.'
							: 'Delete order'
					}
				>
					<span>
						<IconButton
							onClick={() => deleteDoc(orderDocument(orderId))}
							disabled={deleteDisabled}
							color="error"
						>
							<Delete />
						</IconButton>
					</span>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
};

export default OrderTableRow;
