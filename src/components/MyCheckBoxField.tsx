import { Checkbox, FormControlLabel } from '@mui/material';
import { FieldAttributes, useField } from 'formik';

type MyRadioProps = { label: string } & FieldAttributes<{}>;

export const MyCheckBoxField: React.FC<MyRadioProps> = ({
	label,
	...props
}) => {
	const [field] = useField(props);
	return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};
