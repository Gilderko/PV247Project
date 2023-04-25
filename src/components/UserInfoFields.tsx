import TextInput from './TextInput';

const UserInfoFields = () => (
	<>
		<TextInput
			id="firstName"
			label="First Name"
			required
			fullWidth
			variant="standard"
		/>
		<TextInput
			id="lastName"
			label="Last Name"
			required
			fullWidth
			variant="standard"
		/>
		<TextInput
			id="birthDate"
			label="Birth Date"
			fullWidth
			required
			variant="standard"
		/>
		<TextInput id="email" label="Email" fullWidth required variant="standard" />
	</>
);

export default UserInfoFields;
