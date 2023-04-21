import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps } from 'formik';

export const MyTextField: React.FC<FieldProps & TextFieldProps> = ({
	placeholder,
	field
}) => {
	return <TextField placeholder={placeholder} {...field} />;
};
