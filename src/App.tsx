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

import theme from './theme';
import useLoggedInUser from './hooks/useLoggedInUser';
import { signOut } from './firebase';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductInspect from './pages/ProductInspect';
import User from './pages/User';
import Login from './pages/Login';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import ButtonLink from './components/ButtonLink';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink to="/products">Play</ButtonLink>
							<ButtonLink to="/orders">About</ButtonLink>
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
					maxWidth="sm"
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						flexGrow: 1,
						gap: 2
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
	component: Home
});

const productsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/products',
	component: Products
});

const productsInspectRoute = new Route({
	getParentRoute: () => productsRoute,
	path: '$Id',
	component: ProductInspect
});

const userInspectRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/users/$Id',
	component: User
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
	productsRoute.addChildren([productsInspectRoute]),
	userInspectRoute,
	ordersRoute,
	loginRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => <RouterProvider router={router} />;

export default App;
