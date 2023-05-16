/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, type ButtonProps } from '@mui/material';
import { Link, LinkPropsOptions } from '@tanstack/react-router';

type Props = ButtonProps & LinkPropsOptions;

const ButtonLink = (props: Props) => (
	<Button color="secondary" component={Link} {...(props as any)} />
);

export default ButtonLink;
