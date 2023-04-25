import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { userProfilePhotos } from '../firebase';

export const saveUserProfileImage = async (
	image: File | null,
	userId: string
): Promise<string> => {
	if (!image) {
		return '';
	}

	const fileExtension = image.name.split('.').pop() ?? '';
	const storageRef = ref(userProfilePhotos, `${userId}.${fileExtension}`);
	const result = await uploadBytes(storageRef, image);
	const downloadUrl = await getDownloadURL(result.ref);
	return downloadUrl;
};
