import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translation/en/translation.json';
import translationES from './translation/es/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

//i18N Initialization

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') ?? 'en', //default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
