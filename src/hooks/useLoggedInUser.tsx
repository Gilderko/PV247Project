import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../firebase';

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const [user, setUser] = useState<User>();

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Hook providing logged in user information
const useLoggedInUser = () => useContext(UserContext);

export default useLoggedInUser;
