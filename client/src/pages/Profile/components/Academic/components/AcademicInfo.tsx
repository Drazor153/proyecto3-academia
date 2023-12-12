import { useTranslation } from 'react-i18next';

export default function AcademicInfo() {
	const { t } = useTranslation();

	return (
		<section className='info'>
			<h2>{t('academic_info')}</h2>
			<h2>{t('academic_info')}</h2>
			<h2>{t('academic_info')}</h2>
			{/* <h2>{t('academic_info')}</h2> */}
			{/* <h2>{t('academic_info')}</h2> */}
			{/* <h2>{t('academic_info')}</h2> */}
		</section>
	);
}
