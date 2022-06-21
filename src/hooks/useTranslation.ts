import { useTranslation } from 'react-i18next';

const useTranslationHook = () => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language;

	return { t, i18n, lang };
};

export default useTranslationHook;
