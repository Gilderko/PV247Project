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

import theme from './theme';
import useLoggedInUser, { UserProvider } from './hooks/useLoggedInUser';
import { signOut } from './firebase';
import Products from './pages/Products';
import ProductInspect from './pages/ProductInspect';
import User from './pages/User';
import Login from './pages/Login';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import ButtonLink from './components/ButtonLink';
import logo from './assets/websiteImage.png';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar>
					<Container
						sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
					></Container>
					<Container>
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">Products</ButtonLink>
							<ButtonLink to="/orders">My Orders</ButtonLink>
							<Box sx={{ flexGrow: 1 }} />
							<img style={{ height: '3rem' }} src={logo} />

							{!user ? (
								<ButtonLink to="/login">Login</ButtonLink>
							) : (
								<>
									<Button onClick={signOut}>Logout</Button>
								</>
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
	productsInspectRoute,
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

const App = () => (
	<UserProvider>
		<RouterProvider router={router} />
	</UserProvider>
);

export default App;
