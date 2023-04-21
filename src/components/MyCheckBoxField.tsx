import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel, Radio } from '@mui/material';
import { Field, FieldAttributes, useField } from 'formik';

type MyRadioProps = { label: string } & FieldAttributes<{}>;

export const MyCheckBoxField: React.FC<MyRadioProps> = ({
	label,
	...props
}) => {
	const [field] = useField(props);
	return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};
