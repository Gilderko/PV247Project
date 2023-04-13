import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Fur3D`;
	}, [title]);
};

export default usePageTitle;
