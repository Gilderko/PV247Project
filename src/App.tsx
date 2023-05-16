import {
	AppBar,
	Box,
	Container,
	CssBaseline,
	ThemeProvider,
	Toolbar
} from '@mui/material';
import {
	Outlet,
	RootRoute,
	Route,
	Router,
	RouterProvider
} from '@tanstack/react-router';

import logo from './assets/websiteImage.png';
import NavigationMenu from './components/NavigationMenu';
import ButtonLink from './components/Utility/ButtonLink';
import { signOut } from './firebase';
import useLoggedInUser, { UserProvider } from './hooks/useLoggedInUser';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import ProductInspect from './pages/ProductInspect';
import Products from './pages/Products';
import Register from './pages/Register';
import User from './pages/User';
import theme from './theme';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar sx={{ border: 'solid black 1px' }}>
					<Container>
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<NavigationMenu user={user} />
							<Box sx={{ flexGrow: 1 }} />
							<img style={{ height: '3rem' }} src={logo} alt="Logo" />

							{!user ? (
								<ButtonLink to="/login">Sign In</ButtonLink>
							) : (
								<ButtonLink to="/" onClick={signOut}>
									Sign Out
								</ButtonLink>
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

const registerRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/register',
	component: Register
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
	registerRoute,
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
