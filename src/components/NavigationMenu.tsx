import { Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { User } from 'firebase/auth';
import { useState } from 'react';

import { smallScreenMediaQuery } from '../constants';
import theme from '../theme';

import ButtonLink from './Utility/ButtonLink';

type MenuProps = {
	user?: User;
};

const NavigationMenu = ({ user }: MenuProps) => {
	const matches = useMediaQuery(smallScreenMediaQuery);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return matches ? (
		<>
			<ButtonLink to="/">Products</ButtonLink>
			{user && <ButtonLink to="/orders">My Orders</ButtonLink>}
			{user && <ButtonLink to="/user">My Profile</ButtonLink>}
		</>
	) : (
		<>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				variant="outlined"
				sx={{
					color: theme.palette.secondary.main
				}}
			>
				Navigation
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				<MenuItem onClick={handleClose}>
					<ButtonLink to="/">Products</ButtonLink>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					{user && <ButtonLink to="/orders">My Orders</ButtonLink>}
				</MenuItem>
				<MenuItem onClick={handleClose}>
					{user && <ButtonLink to="/user">My Profile</ButtonLink>}
				</MenuItem>
			</Menu>
		</>
	);
};

export default NavigationMenu;
