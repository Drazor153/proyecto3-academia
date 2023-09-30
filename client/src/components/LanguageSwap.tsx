import { useTranslation } from "react-i18next";

function LanguageSwap() {
    const { i18n } = useTranslation();
    const changeLanguageHandler = () => {
        const languageValue = i18n.language == 'es' ? 'en' : 'es'

        i18n.changeLanguage(languageValue);
        localStorage.setItem('language', languageValue);
    }

    return (
        <button className="lang-swapper" onClick={changeLanguageHandler}>
            <img src={`../../src/assets/${i18n.language}.png`} alt="" />
            <span>{i18n.language == 'es' ? 'Español' : 'English'}</span>
        </button>
    )
}

export default LanguageSwap