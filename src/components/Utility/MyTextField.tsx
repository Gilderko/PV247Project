import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps } from 'formik';

export const MyTextField: React.FC<FieldProps & TextFieldProps> = ({
	placeholder,
	field
}) => <TextField placeholder={placeholder} {...field} />;
