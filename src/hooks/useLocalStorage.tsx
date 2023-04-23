import { useEffect, useState } from 'react';

const useLocalStorage = (key: string) => {
	const [value, setValue] = useState(localStorage.getItem(key));

	// Register `storage` listener that updates the state
	useEffect(() => {
		const updateState = () => setValue(localStorage.getItem(key));
		addEventListener('storage', updateState);
		return () => {
			removeEventListener('storage', updateState);
		};
	}, []);

	return [
		value,
		// Inside setter, instead of directly setting react state, change the value in localStorage and dispatch an event
		(newVal: string | null) => {
			newVal ? localStorage.setItem(key, newVal) : localStorage.removeItem(key);
			dispatchEvent(new Event('storage'));
		}
	] as const;
};

export default useLocalStorage;
