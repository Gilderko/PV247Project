import { Form, Formik, Field } from 'formik';
import * as React from 'react';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';

import {
	FurnType,
	MaterialType,
	furnitureTypes,
	materialTypes
} from '../../firebase';
import { MyTextField } from '../Utility/MyTextField';
import { MyCheckBoxField } from '../Utility/MyCheckBoxField';

export type FilterValues = {
	furnitureName: string;
	furnitureType: FurnType[];
	materialType: MaterialType[];
};

type Props = {
	onSubmit: (values: FilterValues) => void;
};

export const FilterForm: React.FC<Props> = ({ onSubmit }) => {
	const theme = useTheme();

	return (
		<Box sx={{ marginBottom: '1rem' }}>
			<Typography variant="h4">Filters</Typography>
			<Formik
				initialValues={{
					furnitureType: [],
					materialType: [],
					furnitureName: ''
				}}
				onSubmit={values => {
					console.log(values);
					onSubmit(values);
				}}
			>
				{() => (
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
						<Box
							sx={{
								padding: '1rem 1rem 0rem 1rem',
								display: 'flex',
								flexDirection: 'row'
							}}
						>
							<Box>
								<Typography sx={{ fontWeight: 'bold' }}>
									Furniture type
								</Typography>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap'
									}}
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
							</Box>
							<Divider
								sx={{ marginX: '1rem' }}
								orientation="vertical"
								flexItem
							/>
							<Box>
								<Typography sx={{ fontWeight: 'bold' }}>
									Material type
								</Typography>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap'
									}}
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
						</Box>
						<Button
							variant="contained"
							sx={{
								maxWidth: '8rem',
								color: theme.palette.secondary.main,
								marginTop: '0.5rem'
							}}
							type="submit"
						>
							Filter
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
