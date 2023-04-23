import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';

import localization from '../localization';

import useLocalStorage from './useLocalStorage';

type Languages = keyof typeof localization;
type LocalizationKeys = keyof (typeof localization)[Languages];
type LanguageState = [Languages, Dispatch<SetStateAction<Languages>>];

const LanguageContext = createContext<LanguageState>(undefined as never);

// Wrapped context provider
export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
	const [storedLanguage, setStoredLanguage] = useLocalStorage('language');
	// We can improve this by saving and loading the initial state from local storage
	const [language, setLanguage] = useState<Languages>(
		(storedLanguage as Languages) ?? 'en'
	);

	useEffect(() => {
		setStoredLanguage(language);
	}, [language]);

	return (
		<LanguageContext.Provider value={[language, setLanguage]}>
			{children}
		</LanguageContext.Provider>
	);
};

// Only used by language switch
export const useLanguage = () => useContext(LanguageContext);

// Convenience hook for localizing translations
export const useTranslation = () => {
	const [language] = useContext(LanguageContext);
	return (key: LocalizationKeys) => localization[language][key];
};
