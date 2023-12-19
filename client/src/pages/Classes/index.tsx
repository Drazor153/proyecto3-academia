import { useReducer } from 'react';

import { t } from 'i18next';

import { useAppSelector } from '../../redux/hooks';

import ClassTable from './components/ClassTable';
import { reducer } from './reducer/selectedOption';
import Selector from './components/Selector';
import { useTranslation } from 'react-i18next';
import { ThreeDots } from 'react-loading-icons';

function Classes() {
	useTranslation();

	var role = `${useAppSelector(
		state => state.userReducer,
	).role.toLowerCase()}s`;

	role = role === 'admins' ? 'teachers' : 'students';

	const [select, setSelect] = useReducer(reducer, {
		year: 0,
		semester: 0,
		level: '',
		lesson: { id: -1, lesson: '' },
	});

	return (
		<>
			{role === 's' && <ThreeDots />}
			{role !== 's' && (
				<>
					<h1>{t('classes')}</h1>
					<main className='classes-layout'>
						<section className='options-selector'>
							<Selector
								role={role}
								select={select}
								setSelect={setSelect}
							/>
						</section>
						{select.lesson.id !== -1 && (
							<section className='class-list'>
								{select.lesson.lesson !== '' && (
									<ClassTable
										role={role}
										select={select}
									/>
								)}
								{select.lesson.lesson === '' && (
									<div className='empty-list'>
										<p style={{ textAlign: 'center' }}>
											{t('select_a_lesson')}
										</p>
									</div>
								)}
							</section>
						)}
					</main>
				</>
			)}
		</>
	);
}

export default Classes;
