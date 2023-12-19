import { t } from 'i18next';
import {
	useChangeStudentInfoMutation,
	useGetStudentCareerByRunQuery,
	useLazyGetStudentsQuery,
} from '@/redux/services/studentsApi';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';

import { Fragment, useEffect, useRef, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { useGetLevelsQuery } from '@/redux/services/levelsApi';

import Select from 'react-select';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { Student } from '@/utils/types';
import { IoMdSchool } from 'react-icons/io';
import Modal from '@/components/Modal';
import { useTranslation } from 'react-i18next';
import { handleRUNChange, useDebounce } from '@/utils/functions';
import { HiPencil } from 'react-icons/hi2';
import FloatLabelInput from '@/components/FloatLabelInput';
import { useResetPasswordMutation } from '@/redux/services/userApi';
import { toast } from 'react-toastify';
import { MdLockReset } from 'react-icons/md';

function EditStudent({
	studentInfo,
	formRef,
}: {
	studentInfo: Student;
	formRef: React.RefObject<HTMLFormElement>;
}) {
	// const { data: levels, isLoading: isLevelsLoading } = useGetLevelsQuery(null);

	const [resetPassword] = useResetPasswordMutation();

	const handleResetPasswordBtn = () => {
		toast.loading(t('resetting_password'), { toastId: 'reset-password' });

		resetPassword({
			run: studentInfo.run as number,
		})
			.unwrap()
			.then(payload =>
				toast.update('reset-password', {
					type: 'success',
					render: t(payload.msg),
					autoClose: 2000,
					isLoading: false,
				}),
			)
			.catch(error =>
				toast.update('reset-password', {
					type: 'error',
					render: t(error.message),
					autoClose: 2000,
					isLoading: false,
				}),
			);
	};

	return (
		<form
			className='student-edit'
			ref={formRef}
		>
			<div className='input-section'>
				<h3>{t('student_info')}</h3>
				<div className='name-input-container'>
					<FloatLabelInput
						name='name'
						type='text'
						autocomplete='off'
						defaultValue={studentInfo.name}
					/>
					<FloatLabelInput
						name='first_surname'
						type='text'
						autocomplete='off'
						defaultValue={studentInfo.first_surname}
					/>
					{/* <fieldset className='float-label-field float focus'>
						<label htmlFor='level'>{t('level')}</label>
						<Select
							name='level'
							className='react-select-container'
							classNamePrefix={'react-select'}
							placeholder={t('level_select')}
							onChange={option =>
								setStudentInfo({
									...studentInfo,
									level: option?.value ? option.value : '',
								})
							}
							options={
								levels &&
								levels.data.map(({ code, name }) => ({
									value: code,
									label: t(name),
								}))
								// : []
							}
							defaultValue={{
								value: studentInfo.level,
								label: t(
									levels?.data.find(level => level.code == studentInfo.level)
										?.name || '',
								),
							}}
							isSearchable={false}
							isLoading={isLevelsLoading}
						/>
					</fieldset> */}
					<fieldset className='payment-checkbox'>
						<input
							type='checkbox'
							id='payment'
							name='paid'
							defaultChecked={studentInfo.paid}
						/>
						<label htmlFor='payment'>
							{t('paid_enrollment')}
							<span>({t('last_semester')})</span>
						</label>
					</fieldset>
				</div>
			</div>
			<div className='btn-section'>
				<button
					type='button'
					onClick={handleResetPasswordBtn}
				>
					<MdLockReset className='icon' />
					{t('reset_password')}
				</button>
			</div>
		</form>
	);
}

function ShowStudentCareer({ run }: { run: number }) {
	const { data, isLoading, isFetching, isError } =
		useGetStudentCareerByRunQuery({ run });

	if (isLoading || isFetching) return <ThreeDots />;
	if (!data || isError) return <p>{t('no_results')}</p>;

	const career = data.data;

	return (
		<div className='student-career-container'>
			<table>
				<thead>
					<tr>
						<th>{t('year')}</th>
						<th>{t('semester')}</th>
						<th>{t('level')}</th>
						<th>{t('status')}</th>
						<th>{t('enrollment')}</th>
					</tr>
				</thead>
				<tbody>
					{career.map(({ year, semesters, level, status }) => (
						<tr key={year}>
							<td className='year'>{year}</td>
							{semesters.map(({ semester: number, paid }) => {
								return (
									<Fragment key={year + number}>
										<td>
											{t('semester')} {number}
										</td>
										<td>{t(level)}</td>
										<td>{t(status)}</td>
										<td>{paid ? t('paid') : t('free')}</td>
									</Fragment>
								);
							})}
							{/* Add empty row if semester 1 or 2 doesn't exist */}
							{semesters.length < 2 && (
								<>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function SearchStudent() {
	useTranslation();

	const [page, setPage] = useState(1);
	const [run, setRun] = useState('');
	const [name, setName] = useState('');
	const [level, setLevel] = useState('');
	const [paid, setPaid] = useState<boolean>();
	const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [submitEditStudent] = useChangeStudentInfoMutation();
	const editStudentForm = useRef<HTMLFormElement>(null);
	const debouncedRun = useDebounce<string>(run, 1000);
	const debouncedName = useDebounce<string>(name, 1000);
	const size = 10;

	const loadingInput = () => {
		if (run != debouncedRun || name != debouncedName) return true;
		return false;
	};

	const handleEditStudentBtn = () => {
		if (!selectedStudent) return;

		const data = new FormData(editStudentForm.current as HTMLFormElement);
		const name = data.get('name') as string;
		const first_surname = data.get('first_surname') as string;
		const paid = data.get('paid') == 'on' ? true : false;

		if (name == '' || first_surname == '') {
			toast.error(t('empty_fields'));
			return;
		}

		toast.loading(t('saving'), { toastId: 'edit-student' });
		submitEditStudent({
			run: selectedStudent.run as number,
			name: data.get('name') as string,
			first_surname: data.get('first_surname') as string,
			level: selectedStudent.level,
			paid: data.get('paid') == 'on' ? true : false,
		})
			.unwrap()
			.then(payload => {
				toast.update('edit-student', {
					type: 'success',
					render: t(payload.msg),
					autoClose: 2000,
					isLoading: false,
				});
				setIsEditing(false);
				setSelectedStudent(null);
			})
			.catch(error =>
				toast.update('edit-student', {
					type: 'error',
					render: t(error.message),
					autoClose: 2000,
					isLoading: false,
				}),
			);
	};

	const [getStudents, result] = useLazyGetStudentsQuery();

	const { data: levels, isLoading: isLevelsLoading } = useGetLevelsQuery(null);
	const enrollmentTypes = [
		{ value: true, label: t('paid') },
		{ value: false, label: t('free') },
	];

	const runWithoutDv = (run: string) => {
		const { digits } = deconstructRut(run);
		if (!digits) return run;
		return digits;
	};

	useEffect(() => {
		const run: string = runWithoutDv(debouncedRun);
		setPage(1);
		getStudents({
			page: 1,
			size,
			run,
			level,
			name: debouncedName,
			paid,
		});
	}, [debouncedRun, level, debouncedName, paid]);

	useEffect(() => {
		const run: string = runWithoutDv(debouncedRun);
		getStudents({ page, size, run, level, name, paid });
	}, [page]);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (result.isSuccess) {
			let nextPage = page;
			const { name } = event.target as HTMLButtonElement;

			switch (name) {
				case 'next': {
					if (result.data.next) {
						nextPage++;
					}
					break;
				}
				case 'previous': {
					if (result.data.previous) {
						nextPage--;
					}
					break;
				}
			}
			setPage(nextPage);
		}
	};

	return (
		<>
			<h2>{t('search')}</h2>
			<div className='filters-container'>
				<h3>{t('filters')}</h3>
				<div className='search-student-container'>
					<div className='search-container'>
						<label htmlFor='run-search'>{t('search_run')}</label>
						<div className='input-container'>
							<fieldset className='float-label-field'>
								<input
									id='run-search'
									type='text'
									onChange={e => handleRUNChange(e, setRun)}
									value={run}
								/>
							</fieldset>
						</div>
					</div>
					<div className='search-container'>
						<label htmlFor='name-search'>{t('search_name')}</label>
						<div className='input-container'>
							<fieldset className='float-label-field'>
								<input
									id='name-search'
									type='text'
									onChange={e => setName(e.target.value)}
								/>
							</fieldset>
						</div>
					</div>
					<div className='search-container'>
						<label htmlFor='enrolment-type-search'>
							{t('enrolment-type-search')}
						</label>
						<div className='input-container'>
							<Select
								className='react-select-container'
								classNamePrefix={'react-select'}
								placeholder={t('enrolment-type-select')}
								onChange={option => setPaid(option?.value)}
								options={enrollmentTypes}
								isClearable
								isSearchable={false}
							/>
						</div>
					</div>
					<div className='search-container'>
						<label>{t('search_level')}</label>
						<div className='input-container'>
							<Select
								className='react-select-container'
								classNamePrefix={'react-select'}
								placeholder={t('level_select')}
								onChange={option => setLevel(option?.value ? option.value : '')}
								options={
									levels && levels.data.length > 0
										? levels.data.map(({ code, name }) => ({
												value: code,
												label: t(name),
										  }))
										: []
								}
								isClearable
								isSearchable={false}
								isLoading={isLevelsLoading}
							/>
						</div>
					</div>
				</div>
			</div>
			<table className='students-table search'>
				<thead>
					<tr>
						<th>{t('run')}</th>
						<th>{t('name')}</th>
						<th>{t('level')}</th>
						<th>{t('enrollment')}</th>
						<th>{t('actions')}</th>
					</tr>
				</thead>
				<tbody>
					{loadingInput() && (
						<tr className='loading'>
							<td>
								<ThreeDots />
							</td>
						</tr>
					)}
					{result.isSuccess &&
						!loadingInput() &&
						!result.isLoading &&
						// !result.isFetching &&
						(result.data.data.length == 0 ? (
							<tr>
								<td className='no-results'>{t('no_results')}</td>
							</tr>
						) : (
							result.data.data.map((student: Student) => (
								<tr key={student.run}>
									<td>
										{formatRut(
											`${student.run}-${student.dv}`,
											RutFormat.DOTS_DASH,
										)}
									</td>
									<td data-student-name>
										{student.first_surname.toLowerCase()},{' '}
										{student.name.toLowerCase()}
									</td>
									<td>{student.level}</td>
									<td>{student.paid ? t('paid') : t('free')}</td>
									<td>
										<div className='action-buttons'>
											<button onClick={() => setSelectedStudent(student)}>
												<IoMdSchool className='icon' />
												<span>{t('career')}</span>
											</button>
											<button
												onClick={() => {
													setIsEditing(true);
													setSelectedStudent(student);
												}}
											>
												<HiPencil className='icon' />
												<span>{t('edit')}</span>
											</button>
										</div>
									</td>
								</tr>
							))
						))}
				</tbody>
			</table>
			<div className='pagination-container'>
				<p>
					{t('page')} {page}
				</p>
				<div className='pagination-btn-container'>
					<button
						disabled={page == 1}
						name={'previous'}
						onClick={handleChangePage}
					>
						<AiOutlineDoubleLeft />
					</button>
					<button
						disabled={!result.data?.next}
						name={'next'}
						onClick={handleChangePage}
					>
						<AiOutlineDoubleRight />
					</button>
				</div>
			</div>
			<Modal
				title={`${t('career_of')} ${selectedStudent?.name} ${
					selectedStudent?.first_surname
				}`}
				isOpen={() => selectedStudent !== null && !isEditing}
				onClick={() => setSelectedStudent(null)}
				footer={
					<button onClick={() => setSelectedStudent(null)}>{t('close')}</button>
				}
				className='student-modal'
			>
				{selectedStudent && <ShowStudentCareer run={+selectedStudent.run} />}
			</Modal>
			<Modal
				title={`${t('editing')} ${selectedStudent?.name} ${
					selectedStudent?.first_surname
				}`}
				isOpen={() => selectedStudent !== null && isEditing}
				onClick={() => {
					setIsEditing(false);
					setSelectedStudent(null);
				}}
				footer={
					<>
						<button
							onClick={() => {
								setIsEditing(false);
								setSelectedStudent(null);
							}}
						>
							{t('close')}
						</button>
						<button onClick={() => handleEditStudentBtn()}>{t('save')}</button>
					</>
				}
				className='student-modal'
			>
				{selectedStudent && (
					<EditStudent
						studentInfo={selectedStudent}
						formRef={editStudentForm}
					/>
				)}
			</Modal>
		</>
	);
}

export default SearchStudent;
