import {
	Button,
	Paper,
	Typography,
	TextField,
	Box,
	Grid,
	useTheme
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { signIn } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Login = () => {
	usePageTitle('Login');
	const loggedInUser = useLoggedInUser();
	const theme = useTheme();

	const navigate = useNavigate();

	const email = useField('email', true);
	const password = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	useEffect(() => {
		if (loggedInUser) {
			navigate({ to: '/' });
		}
	}, [loggedInUser, navigate]);

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					await signIn(email.value, password.value);
					navigate({ to: '/' });
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Unknown error occurred'
					);
				}
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" component="h2" textAlign="center" mb={3}>
				Sign in
			</Typography>
			<TextField label="Email" {...email.props} type="email" />
			<TextField label="Password" {...password.props} type="password" />
			<Grid
				container
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Grid item>
					<Typography variant="caption" textAlign="right">
						Don&apos;t have an account yet?
					</Typography>
					<Typography>
						<Button
							variant="text"
							onClick={() => navigate({ to: '/register' })}
							sx={{ textTransform: 'none', p: 0, color: '' }}
						>
							Create one
						</Button>
					</Typography>
				</Grid>
				<Grid item>
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							alignItems: 'center',
							alignSelf: 'flex-end'
						}}
					>
						{submitError && (
							<Typography
								variant="caption"
								textAlign="right"
								sx={{ color: 'error.main' }}
							>
								{submitError}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							sx={{ color: theme.palette.secondary.main }}
						>
							SignIn
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Login;
