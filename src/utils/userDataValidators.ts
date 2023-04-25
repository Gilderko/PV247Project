const emailRegex = new RegExp(
	'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
);

export const isValidImageType = (fileName: string): boolean => {
	const fileExtension = fileName.split('.').pop() ?? '';
	if (
		fileExtension !== 'jpg' &&
		fileExtension !== 'png' &&
		fileExtension !== 'jpeg'
	)
		return false;
	return true;
};

export const isValidEmail = (email: string): boolean => emailRegex.test(email);
