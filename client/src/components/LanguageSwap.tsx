import { useTranslation } from 'react-i18next';

function LanguageSwap() {
	const { i18n } = useTranslation();
	const languageFlag =
		i18n.language == 'es' ? '/images/es.png' : '/images/uk.jpg';
	const changeLanguageHandler = () => {
		const languageValue = i18n.language == 'es' ? 'en' : 'es';

		i18n.changeLanguage(languageValue);
		localStorage.setItem('language', languageValue);
	};

	return (
		<button
			className='button lang-swapper'
			onClick={changeLanguageHandler}
		>
			<img
				src={languageFlag}
				alt=''
			/>
			<span>{i18n.language == 'es' ? 'Español' : 'English'}</span>
		</button>
	);
}

export default LanguageSwap;
