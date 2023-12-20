// import Modal from '@/components/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCaretRight } from 'react-icons/fa';
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

function TopicTable() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div
				className='toggle-container'
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className='caret-container'>
					<FaCaretRight className={`caret${isOpen ? ' active' : ''}`} />
				</div>
				<h3>{t('Beginner')}</h3>
			</div>
			{isOpen && (
				<table className='table'>
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
			)}
		</>
	);
}

function ExamsByPeriod({}: // year,
// semester,
// quiz,
{
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
				<div>
					<TopicTable />
				</div>
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
	// const [showModal, setShowModal] = useState(false);

	// const isEditing = () => {
	// 	if (selectedYear) return true;
	// 	return false;
	// };

	const getQuizzesByPeriod = async () => {
		const data = [
			{ value: '1', label: 'Quiz 1' },
			{ value: '2', label: 'Quiz 2' },
			{ value: '3', label: 'Quiz 3' },
		];
		setQuizzesOptions(data);
		console.log(quizzesOptions);
		
	};

	useEffect(() => {
		if (!selectedYear || !selectedSemester) return;
		getQuizzesByPeriod();
	}, [selectedYear, selectedSemester]);

	return (
		<>
			<h2>{t('exams_calendar_management')}</h2>

			<div className='exams-management-layout'>
				<div className='exams-options-container'>
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
								isDisabled={!selectedYear}
							/>
						</div>
					</div>

					<AnimatePresence>
						{selectedYear && selectedSemester && (
							<motion.div
								animate={{ width: '25%' }}
								exit={{ width: '0%', overflow: 'hidden' }}
								transition={{ duration: 0.25 }}
							>
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
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<AnimatePresence>
					{selectedYear && selectedSemester && selectedQuiz && (
						<>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<ExamsByPeriod
									year={selectedYear}
									semester={selectedSemester}
									quiz={selectedQuiz}
								/>
							</motion.div>
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{t('save')}
							</motion.button>
						</>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
