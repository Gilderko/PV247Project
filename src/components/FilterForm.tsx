import { Form, Formik, Field } from 'formik';
import * as React from 'react';
import { MyTextField } from './MyTextField';
import { Box, Button, RadioGroup, Typography } from '@mui/material';
import {
	FurnType,
	MaterialType,
	furnitureTypes,
	materialTypes
} from '../firebase';
import { MyCheckBoxField } from './MyCheckBoxField';

export type FilterValues = {
	furnitureName: string;
	furnitureType: FurnType[];
	materialType: MaterialType[];
};

type Props = {
	onSubmit: (values: FilterValues) => void;
};

export const FilterForm: React.FC<Props> = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={{ furnitureType: [], materialType: [], furnitureName: '' }}
			onSubmit={values => {
				console.log(values);
				onSubmit(values);
			}}
		>
			{({ errors }) => (
				<Form
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginBottom: '1rem'
					}}
				>
					<Field
						name="furnitureName"
						placeholder="Furniture name"
						component={MyTextField}
					/>
					<Box sx={{ padding: '1rem 1rem 0rem 1rem' }}>
						<Typography sx={{ fontWeight: 'bold' }}>Furniture type</Typography>
						<Box
							sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
						>
							{furnitureTypes.map(furnType => (
								<MyCheckBoxField
									key={furnType.toString()}
									name="furnitureType"
									type="checkbox"
									value={furnType}
									label={furnType.toString()}
								/>
							))}
						</Box>
						<Typography sx={{ fontWeight: 'bold' }}>Material type</Typography>
						<Box
							sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
						>
							{materialTypes.map(matType => (
								<MyCheckBoxField
									key={matType.toString()}
									name="materialType"
									type="checkbox"
									value={matType}
									label={matType.toString()}
								/>
							))}
						</Box>
					</Box>
					<Button
						color="secondary"
						variant="outlined"
						sx={{ maxWidth: '8rem' }}
						type="submit"
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};
