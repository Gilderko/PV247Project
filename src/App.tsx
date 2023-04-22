import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	ThemeProvider,
	CssBaseline
} from '@mui/material';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route
} from '@tanstack/react-router';
import { z } from 'zod';
import { useEffect } from 'react';
import { addDoc, setDoc } from 'firebase/firestore';

import theme from './theme';
import useLoggedInUser, { UserProvider } from './hooks/useLoggedInUser';
import { furnitureDocument, furnituresCollection, signOut } from './firebase';
import Products from './pages/Products';
import ProductInspect from './pages/ProductInspect';
import User from './pages/User';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import ButtonLink from './components/ButtonLink';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();

		/*const submit = async () => {
			await addDoc(furnituresCollection, {
				name: 'Table Ikea',
				description: 'Very strong',
				furnType: 'table',
				materialType: 'wood',
				priceDollars: 150,
				imageURL:
					'https://th.bing.com/th/id/R.f4b328f7f9f7b8f0397eab35b2781b0b?rik=r9TptUqWWQhr5g&pid=ImgRaw&r=0',
				modelURL: 'https://gilderko.github.io/staticmodels/table/scene.gltf',
				scale: [1, 1, 1],
				position: [0, 0, 0],
				rotation: [0, 0, 0]
			});
		};

		useEffect(() => {
			submit();
		}, []);*/

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">Products</ButtonLink>
							<ButtonLink to="/orders">My Orders</ButtonLink>
							{user && <ButtonLink to="/user">My Profile</ButtonLink>}
							<Box sx={{ flexGrow: 1 }} />
							{!user ? (
								<ButtonLink to="/login">Login</ButtonLink>
							) : (
								<Button onClick={signOut}>Logout</Button>
							)}
						</Toolbar>
					</Container>
				</AppBar>

				<Container
					component="main"
					sx={{
						marginTop: '5rem'
					}}
				>
					<Outlet />
				</Container>
			</ThemeProvider>
		);
	}
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Products
});

const productsInspectRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/products/$Id',
	component: ProductInspect
});

const userInspectRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/user',
	component: User
});

const userEditRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/edituser',
	component: EditUser
});

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login
});

const ordersRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/orders',
	component: Orders
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	productsInspectRoute,
	userInspectRoute,
	ordersRoute,
	loginRoute,
	userEditRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => (
	<UserProvider>
		<RouterProvider router={router} />
	</UserProvider>
);

export default App;
