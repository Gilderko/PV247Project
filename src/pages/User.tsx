import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import UserFound from '../components/UserPage/UserFound';
import UserNotFound from '../components/UserPage/UserNotFound';
import { UserInfo, userInfoDocument } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

const User = () => {
	const user = useLoggedInUser();
	const [userInfo, setUserInfo] = useState<UserInfo>();

	useEffect(() => {
		const fetchUserInfo = async () => {
			if (user?.email !== null && user !== undefined) {
				const doc = await getDoc(userInfoDocument(user.uid));
				setUserInfo(doc.data());
			}
		};

		fetchUserInfo();
	}, [user]);

	if (!user || !userInfo) {
		return <UserNotFound />;
	}

	return <UserFound {...userInfo} />;
};

export default User;
