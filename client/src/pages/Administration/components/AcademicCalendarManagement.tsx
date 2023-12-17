import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSolidPlusSquare } from 'react-icons/bi';
import Select, { SingleValue } from 'react-select';

type Option = SingleValue<{
	value: string | number;
	label: string;
}>;

interface AcademicCalendar {
	year?: Option;
	semester?: Option;
	startDate?: Option;
	endDate?: Option;
}

const initialState: AcademicCalendar = {
	year: undefined,
	semester: undefined,
	startDate: undefined,
	endDate: undefined,
};

const { years, semesters, startDates, endDates } = {
	years: [
		{ value: 2021, label: '2021' },
		{ value: 2022, label: '2022' },
		{ value: 2023, label: '2023' },
	],
	semesters: [
		{ value: 1, label: 'semester 1' },
		{ value: 2, label: 'semester 2' },
	],
	startDates: [
		{ value: 1, label: '2021-03-01' },
		{ value: 2, label: '2021-08-01' },
	],
	endDates: [
		{ value: 1, label: '2021-12-15' },
		{ value: 2, label: '2021-07-15' },
	],
};

export default function AcademicCalendarManagement() {
	useTranslation();

	const [{ year, semester, startDate, endDate }, setAcademicCalendar] =
		useState<AcademicCalendar>(initialState);

	useEffect(() => {
		console.log({ year, semester, startDate, endDate });
	}, [year, semester, startDate, endDate]);

	return (
		<>
			<h2>{t('academic_calendar_management')}</h2>
			<section className='academic-calendar-actions'>
				<section className='year-section'>
					<h3>{t('year')}</h3>
					<Select
						className='react-select-container'
						classNamePrefix={'react-select'}
						placeholder={t('year_select')}
						options={years}
						onChange={year => {
							const semester =
								year?.value === 2021 ? semesters[0] : semesters[1];
							return setAcademicCalendar({
								year,
								semester,
								startDate: undefined,
								endDate: undefined,
							});
						}}
						isClearable
						isSearchable={false}
					/>
				</section>
				<section className={`semester-section ${!year ? 'disabled' : ''}`}>
					<h3>{t('semester')}</h3>
					<Select
						className='react-select-container'
						classNamePrefix={'react-select'}
						isDisabled={!year}
						placeholder={t('semester_select')}
						options={semesters}
						onChange={semester => {
							const startDate =
								semester?.value === 1 ? startDates[0] : startDates[1];
							const endDate = semester?.value === 1 ? endDates[0] : endDates[1];
							return setAcademicCalendar(prev => ({
								...prev,
								semester,
								startDate,
								endDate,
							}));
						}}
						isClearable
						isSearchable={false}
					/>
				</section>
				<section
					className={`start-date-section ${
						!year || !semester ? 'disabled' : ''
					}`}
				>
					<h3>{t('start_date')}</h3>
					<div className='date-picker-container'>
						<input
							type='date'
							className='datepicker-input'
							readOnly={true}
							defaultValue={startDate?.label}
						/>
					</div>
				</section>
				<section
					className={`end-date-section ${!year || !semester ? 'disabled' : ''}`}
				>
					<h3>{t('end_date')}</h3>
					<div className='date-picker-container'>
						<input
							type='date'
							className='datepicker-input'
							defaultValue={endDate?.label}
							readOnly={true}
						/>
					</div>
				</section>
				<button>
					<span>
						<BiSolidPlusSquare className='biSolidPlusSquare' />
					</span>
				</button>
			</section>
		</>
	);
}
