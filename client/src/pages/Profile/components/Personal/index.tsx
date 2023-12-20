import { FaUser } from 'react-icons/fa';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/redux/hooks';

export default function Personal() {
	useTranslation();

	const { run, dv, name, first_surname, email } = useAppSelector(
		state => state.userReducer,
	);
	return (
		<section className='profile-personal-info'>
			<h2>{t('personal_info')}</h2>
			<FaUser className='faUser' />
			<div className='info'>
				<div className='info-item'>
					<span className='info-item-label'>{t('run')}</span>
					<span className='info-item-value'>{`${run}-${dv}`}</span>
				</div>
				<div className='info-item'>
					<span className='info-item-label'>{t('name')}</span>
					<span className='info-item-value'>{name}</span>
				</div>
				<div className='info-item'>
					<span className='info-item-label'>{t('first_surname')}</span>
					<span className='info-item-value'>{first_surname}</span>
				</div>
				<div className='info-item'>
					<span className='info-item-label'>{t('email')}</span>
					<span className='info-item-value'>
						{email ?? t('no_information')}
					</span>
				</div>
			</div>
		</section>
	);
}
