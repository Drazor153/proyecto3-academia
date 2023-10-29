import { t } from 'i18next';
import { Mesh } from './components';

export default function Academic() {
  return (
    <>
      <h2>{t('academic_information')}</h2>
      <Mesh />
    </>
  );
}
