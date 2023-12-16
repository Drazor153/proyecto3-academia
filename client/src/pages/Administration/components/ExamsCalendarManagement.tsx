import Modal from '@/components/Modal';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const year = [
	{
		value: '2021',
		label: 'Año 2021',
	},
];

const semester = [
	{
		value: '1',
		label: 'Semestre 1',
	},
];

const quizzes = [
	{
		value: '1',
		label: 'Quiz 1',
	},
	{
		value: '2',
		label: 'Quiz 2',
	},
];

function ExamsByPeriod({
	year,
	semester,
	quiz,
}: {
	year: string;
	semester: string;
	quiz: string;
}) {
	return (
		<>
			<div className='exams-by-period-container'>
				<form
					action=''
					name='period-exams'
					id='period-exams'
					style={{ display: 'none' }}
				/>
				<table>
					<thead>
						<tr>
							<th>{t('topic')}</th>
							<th>{t('date')}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Writing</td>
							<td>
								<input
									type='date'
									className='datepicker-input'
									min={year + '-01-01'}
									max={year + '-12-31'}
								/>
							</td>
						</tr>
						<tr>
							<td>Grammar</td>
							<td>10/10/2021</td>
						</tr>
						<tr>
							<td>Listening</td>
							<td>10/10/2021</td>
						</tr>
						<tr>
							<td>Speaking</td>
							<td>10/10/2021</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}

export default function ExamsCalendarManagement() {
	useTranslation();
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedSemester, setSelectedSemester] = useState('');
	const [selectedQuiz, setSelectedQuiz] = useState('');
	const [quizzesOptions, setQuizzesOptions] = useState<
		{ value: string; label: string }[]
	>([]);
	const [showModal, setShowModal] = useState(false);

	const isEditing = () => {
		if (selectedYear) return true;
		return false;
	};

	const getQuizzesByPeriod = async () => {
		const data = [
			{ value: '1', label: 'Quiz 1' },
			{ value: '2', label: 'Quiz 2' },
			{ value: '3', label: 'Quiz 3' },
		];
		setQuizzesOptions(data);
	};

	useEffect(() => {
		if (!selectedYear || !selectedSemester) return;
		getQuizzesByPeriod();
	}, [selectedYear, selectedSemester]);

	return (
		<>
			<h2>{t('exams_calendar_management')}</h2>

			<div className='exams-management-layout'>
				<div className='period-select-container'>
					<h3>{t('period')}</h3>
					{/* <button onClick={() => setShowModal(true)}>
						{t('create_edit_period')}
					</button> */}
					<div className='select-container'>
						<Select
							className='react-select-container'
							classNamePrefix={'react-select'}
							placeholder={t('year_select')}
							options={year}
							onChange={e => setSelectedYear(e?.value ?? '')}
							isClearable
							isSearchable={false}
						/>
						<Select
							className='react-select-container'
							classNamePrefix={'react-select'}
							placeholder={t('semester_select')}
							options={semester}
							onChange={e => setSelectedSemester(e?.value ?? '')}
							isClearable
							isSearchable={false}
						/>
					</div>
				</div>
				{selectedYear && selectedSemester && (
					<div className='quizzes-select-container'>
						<h3>{t('quizzes')}</h3>

						<div className='select-container'>
							<Select
								className='react-select-container'
								classNamePrefix={'react-select'}
								placeholder={t('quizzes_select')}
								options={quizzes}
								onChange={e => setSelectedQuiz(e?.value ?? '')}
								isClearable
								isSearchable={false}
							/>
						</div>
					</div>
				)}
				{selectedYear && selectedSemester && selectedQuiz && (
					<>
						<ExamsByPeriod
							year={selectedYear}
							semester={selectedSemester}
							quiz={selectedQuiz}
						/>

						<button>{t('save')}</button>
					</>
				)}
			</div>
			{/* <Modal
				footer={
					<>
						<button>{t('save')}</button>
					</>
				}
				title={isEditing() ? t('editing') : t('creating')}
				isOpen={() => showModal}
				onClick={() => setShowModal(false)}
			>
				<form action=''>
					<div className='input-container'>
						<label htmlFor='year'>{t('year')}</label>
						<input
							type='text'
							name='year'
							id='year'
						/>
					</div>
					<div className='input-container'>
						<label htmlFor='semester'>{t('semester')}</label>
						<input
							type='text'
							name='semester'
							id='semester'
						/>
					</div>
				</form>
			</Modal> */}
		</>
	);
}
