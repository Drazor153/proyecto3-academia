import { useTranslation } from "react-i18next";
import enFlag from '../assets/en.png';
import esFlag from '../assets/es.png';

function LanguageSwap() {
    const { i18n } = useTranslation();
    const languageFlag = i18n.language == 'es' ? esFlag : enFlag
    const changeLanguageHandler = () => {
        const languageValue = i18n.language == 'es' ? 'en' : 'es'

        i18n.changeLanguage(languageValue);
        localStorage.setItem('language', languageValue);
    }

    return (
        <button className="lang-swapper" onClick={changeLanguageHandler}>
            <img src={languageFlag} alt="" />
            <span>{i18n.language == 'es' ? 'Español' : 'English'}</span>
        </button>
    )
}

export default LanguageSwap