import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

import { t } from 'i18next';

import {
	ClassesStudent,
	ClassesTeacher,
	Data,
	PostClass,
} from '../../../utils/types';

import { BiSolidPlusSquare } from 'react-icons/bi';
import { ImEyeMinus, ImEyePlus } from 'react-icons/im';
import { IoIosClose } from 'react-icons/io';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loading-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

import {
	useAddClassMutation,
	useDeleteClassMutation,
	useGetClassesByLessonIdQuery,
	useGetStudentsByLessonQuery,
	useUpdateClassMutation,
} from '../../../redux/services/classesApi';
import { Select } from '../types';

// TODO: ver el date de to

type AttendanceList = {
	student: { run: string; name: string; first_surname: string };
	attendance: string;
};

type SelectedClass = {
	attendanceList: AttendanceList[];
	contents: string;
	id: number;
	lesson: {
		id: number;
		lesson: string;
	};
	date: Date;
};

interface ClassTableProps {
	role: string;
	select: Select;
}

function ClassesTable({ role, select }: ClassTableProps) {
	const {
		data: classes,
		isLoading: isLoadingClasses,
		isError: isErrorClasses,
	} = useGetClassesByLessonIdQuery({ lesson: select.lesson.id });

	if (isErrorClasses)
		toast.error(t('error_getting_classes'), {
			toastId: 'error_getting_classes',
		});

	return (
		<>
			{isLoadingClasses && <ThreeDots />}
			{isErrorClasses && <div>{t('error_getting_classes')}</div>}
			{classes && (
				<>
					{role === 'teachers' && (
						<TableTeacher
							classes={classes}
							select={select}
						/>
					)}
					{role === 'students' && <TableStudent classes={classes} />}
				</>
			)}
		</>
	);
}

interface TableProps {
	classes: Data<ClassesStudent[] | ClassesTeacher[]>;
}

function TableStudent({ classes }: TableProps) {
	return (
		<>
			<table
				className='table table-class-list'
				user-role={'students'}
			>
				<thead>
					<tr>
						<th colSpan={5}>{t('class_list')}</th>
					</tr>
					<tr className='grid'>
						<th>{t('date')}</th>
						<th>{t('content')}</th>
						<th>{t('teacher')}</th>
						<th>{t('attendance')}</th>
					</tr>
				</thead>
				<tbody>
					{(classes.data as ClassesStudent[]).map(
						({ attendance, contents, teacher, date }) => {
							const { name, first_surname } = teacher;
							const contentsList = contents.split(',');
							return (
								<tr
									key={date.toLocaleString()}
									className='grid'
								>
									<td>{new Date(date).toLocaleString()}</td>
									<td datatype='content'>
										{contentsList.map(content => (
											<p key={content.trim()}>{content.trim()}</p>
										))}
									</td>
									<td datatype='teacher'>
										{name} {first_surname}
									</td>
									<td>{t(attendance ? 'present' : 'absent')}</td>
								</tr>
							);
						},
					)}
				</tbody>
			</table>
		</>
	);
}

function TableTeacher({ classes, select }: TableProps & { select: Select }) {
	const [showModalViewClass, setShowModalViewClass] = useState<boolean>(false);
	const [showModalDeleteClass, setShowModalDeleteClass] =
		useState<boolean>(false);

	const { data: students, isLoading: isLoadingStudents } =
		useGetStudentsByLessonQuery({ lesson: select.lesson.id });

	const [selectedClass, setSelectedClass] = useState<SelectedClass>({
		attendanceList: [],
		contents: '',
		lesson: select.lesson,
		date: new Date(),
		id: -1,
	});

	const handleClickNewClass = () => {
		if (students) {
			const attendanceList: AttendanceList[] = [];
			students.data.map(({ run, dv, name, first_surname }) => {
				attendanceList.push({
					student: {
						run: formatRut(`${run}-${dv}`, RutFormat.DOTS_DASH),
						name,
						first_surname,
					},
					attendance: 'absent',
				});
			});
			const date = new Date();
			setSelectedClass({
				...selectedClass,
				attendanceList,
				lesson: select.lesson,
				date,
				contents: '',
				id: -1,
			});
			setShowModalViewClass(!showModalViewClass);
		}
	};

	const handleClickViewClass = ({ id }: { id: number }) => {
		const attendanceList: AttendanceList[] = [];

		const { attendance, contents, date } = (
			classes!.data as ClassesTeacher[]
		).find(({ id: _id }) => _id === id)!;

		attendance.map(({ run, dv, name, attended, first_surname }) => {
			attendanceList.push({
				student: {
					run: formatRut(`${run}-${dv}`, RutFormat.DOTS_DASH),
					name,
					first_surname,
				},
				attendance: attended ? 'present' : 'absent',
			});
		});

		setSelectedClass({
			...selectedClass,
			attendanceList,
			contents,
			id,
			date,
		});

		setShowModalViewClass(!showModalViewClass);
	};

	const handleClickDelete = ({ id }: { id: number }) => {
		setSelectedClass({
			...selectedClass,
			id,
		});
		setShowModalDeleteClass(!showModalDeleteClass);
	};

	return (
		<>
			{isLoadingStudents && <ThreeDots />}
			{students && (
				<>
					<table
						className='table table-class-list'
						user-role={'teachers'}
					>
						<thead>
							<tr data-title>
								<th colSpan={4}>
									<p>{t('class_list')}</p>
									<BiSolidPlusSquare
										className='biSolidPlusSquare'
										onClick={handleClickNewClass}
									/>
								</th>
							</tr>
							<tr className='grid'>
								<th>{t('date')}</th>
								<th>{t('time')}</th>
								<th>{t('content')}</th>
								<th>{t('attendance')}</th>
								<th>{t('actions')}</th>
							</tr>
						</thead>
						<tbody>
							{(classes.data as ClassesTeacher[]).map(
								({ id, attendance, contents, date }) => {
									const contentsList = contents.split(',');
									const presents = attendance.filter(
										({ attended }) => attended,
									).length;
									const total = attendance.length;

									const _date = new Date(date).toLocaleDateString('es-CL', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									});
									const _time = new Date(date).toLocaleTimeString('es-CL', {
										hour: '2-digit',
										minute: '2-digit',
										hour12: true,
									});

									return (
										<tr
											key={`${_date}-${_time}`}
											className='grid'
										>
											<td>{_date}</td>
											<td>{_time}</td>
											<td datatype='content'>
												{contentsList.map(content => (
													<p key={content.trim()}>{content.trim()}</p>
												))}
											</td>
											<td>
												{`${presents} / ${total} (${Math.round(
													(presents / total) * 100,
												)}%)`}
											</td>
											<td>
												{(!showModalViewClass || selectedClass.id !== id) && (
													<>
														<ImEyePlus
															onClick={() => handleClickViewClass({ id: id })}
															className='imEyePlus'
														/>
													</>
												)}
												{showModalViewClass && selectedClass.id === id && (
													<ImEyeMinus className='imEyeMinus' />
												)}
												<MdOutlineDeleteForever
													onClick={() => handleClickDelete({ id })}
													className='mdOutlineDeleteForever'
												/>
											</td>
										</tr>
									);
								},
							)}
						</tbody>
					</table>
					<ModalClassList
						closeModal={() => setShowModalViewClass(false)}
						selectedClass={selectedClass}
						setSelectedClass={setSelectedClass}
						showModalViewClass={showModalViewClass}
					/>
					<ModalDeleteClass
						selectedClass={selectedClass}
						showModalDeleteClass={showModalDeleteClass}
						setShowModalDeleteClass={setShowModalDeleteClass}
					/>
				</>
			)}
		</>
	);
}

interface ModalClassListProps {
	closeModal: () => void;
	selectedClass: SelectedClass;
	setSelectedClass: Dispatch<SetStateAction<SelectedClass>>;
	showModalViewClass: boolean;
}

function ModalClassList({
	closeModal,
	selectedClass,
	setSelectedClass,
	showModalViewClass,
}: ModalClassListProps) {
	const [{ date, time }, setDateTime] = useState<{
		date: string;
		time: string;
	}>({ date: '', time: '' });

	const [addClass] = useAddClassMutation();
	const [updateClass] = useUpdateClassMutation();
	const labelRef = useRef<HTMLLabelElement>(null);

	const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setSelectedClass({ ...selectedClass, contents: e.target.value });
	};

	const setPositionTable = () => {
		const table = document.querySelector(
			'.table-attendance-list',
		) as HTMLTableElement;
		table.children[1].scrollTop = 0;
	};

	const handleClickConfirm = () => {
		const body: PostClass = {
			lessonId: selectedClass.lesson.id,
			date: new Date(`${date} ${time}`),
			contents: selectedClass.contents,
			attendance: selectedClass.attendanceList.map(
				({ attendance, student }) => {
					const { digits } = deconstructRut(student.run);
					return {
						studentRun: parseInt(digits),
						attended: attendance === 'present',
					};
				},
			),
		};

		if (selectedClass.id > -1) {
			const updatingClass = toast.loading(t('updating_class'));
			const { lessonId, ...rest } = body;

			updateClass({ id: selectedClass.id, body: rest })
				.unwrap()
				.then(res => {
					toast.update(updatingClass, {
						render: t(res.msg),
						type: 'success',
						isLoading: false,
						autoClose: 1000,
					});
					closeModal();
					setPositionTable();
				})
				.catch(err => {
					toast.update(updatingClass, {
						render: t(err.data.msg),
						type: 'error',
						isLoading: false,
						autoClose: 1000,
					});
				});
		} else {
			const creatingClass = toast.loading(t('creating_class'));

			addClass({ body })
				.unwrap()
				.then(res => {
					toast.update(creatingClass, {
						render: t(res.msg),
						type: 'success',
						isLoading: false,
						autoClose: 1000,
					});
					closeModal();
					setPositionTable();
				})
				.catch(err => {
					toast.update(creatingClass, {
						render: t(err.data.msg),
						type: 'error',
						isLoading: false,
						autoClose: 1000,
					});
				});
		}
	};

	const handleClickCloseModal = () => {
		setSelectedClass({
			...selectedClass,
			contents: '',
			id: -1,
		});
		closeModal();
		setPositionTable();
	};

	const handleOnChangeAttendance = (
		e: ChangeEvent<HTMLInputElement>,
		student: {
			run: string;
			name: string;
			first_surname: string;
		},
	) => {
		const attendanceList = [...selectedClass.attendanceList];
		const index = attendanceList.findIndex(({ student: s }) => {
			return s === student;
		});
		attendanceList[index].attendance = e.target.checked ? 'present' : 'absent';

		setSelectedClass({
			...selectedClass,
			attendanceList: attendanceList,
		});
	};

	const handleLabelKeyDown = (
		e: React.KeyboardEvent<HTMLLabelElement>,
		student: {
			run: string;
			name: string;
			first_surname: string;
		},
	) => {
		if (e.key === ' ' || e.key === 'Enter') {
			const cb = document.getElementById(
				`attendance ${student.run}`,
			) as HTMLInputElement;
			cb.checked = !cb.checked;
			handleOnChangeAttendance(
				{ target: { checked: cb.checked } } as ChangeEvent<HTMLInputElement>,
				student,
			);
		}
	};

	useEffect(() => {
		labelRef.current?.focus();
	}, [selectedClass.attendanceList]);

	useEffect(() => {
		setDateTime({
			date: new Date(selectedClass.date).toDateString(),
			time: new Date(selectedClass.date).toTimeString(),
		});
	}, [selectedClass.date]);

	useEffect(() => {
		if (showModalViewClass) {
			setPositionTable();
		}
	}, [showModalViewClass]);

	return (
		<AnimatePresence>
			{showModalViewClass && (
				<motion.section
					style={{
						margin: 0,
						padding: 0,
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className='attendance'>
						<h2>{t(selectedClass.id !== -1 ? 'class' : 'new_class')}</h2>
						<IoIosClose
							className='ioClose'
							onClick={handleClickCloseModal}
						/>
						<div className='body'>
							<div className='left'>
								<label htmlFor='content'>
									<h2>{t('content')}</h2>
								</label>
								<textarea
									name='content'
									id='content'
									value={selectedClass.contents}
									onChange={handleChangeContent}
								/>

								<label>
									<h2>{t('date')}</h2>
								</label>
								<DatePicker
									size='large'
									disabledDate={current => {
										return current && current > dayjs().endOf('day');
									}}
									value={dayjs(date)}
									className='date-picker'
									format={'DD-MM-YYYY'}
									onChange={date => {
										setDateTime(prev => ({
											...prev,
											date: date!.toDate().toDateString(),
										}));
									}}
								/>
								<label>
									<h2>{t('time')}</h2>
								</label>
								<TimePicker
									size='large'
									value={dayjs(time, 'HH:mm')}
									format={'HH:mm'}
									use12Hours
									onChange={time => {
										// console.log(time);
										setDateTime(prev => ({
											...prev,
											time: time!.format('HH:mm'),
										}));
									}}
								/>
							</div>
							<table className='table table-attendance-list'>
								<thead>
									<tr data-title>
										<th colSpan={4}>
											<p>{t('attendance_list')}</p>
										</th>
									</tr>
									<tr>
										<th>Nº</th>
										<th>{t('run')}</th>
										<th>
											<p>{t('students')}</p>
										</th>
										<th>
											<p>{t('attendance')}</p>
										</th>
									</tr>
								</thead>
								<tbody
									onKeyDown={e => {
										if (e.key === ' ') e.preventDefault();
									}}
								>
									{selectedClass.attendanceList.map(
										({ attendance, student }, index) => {
											return (
												<tr
													key={`${student.run} ${attendance}`}
													className='student'
												>
													<td>
														<p>{index + 1}</p>
													</td>
													<td>
														<p>{student.run}</p>
													</td>
													<td data-student-name>
														<p>
															{`${student.first_surname.toLowerCase()}, ${student.name.toLowerCase()}`}
														</p>
													</td>
													<td>
														<p>{t('present')}</p>
														<input
															type='checkbox'
															name={`attendance ${student.run}`}
															id={`attendance ${student.run}`}
															checked={attendance === 'present'}
															onChange={e => {
																handleOnChangeAttendance(e, student);
															}}
														/>
														<label
															tabIndex={0}
															className='label-attendance'
															htmlFor={`attendance ${student.run}`}
															onKeyDown={e => handleLabelKeyDown(e, student)}
															ref={labelRef}
														></label>
													</td>
												</tr>
											);
										},
									)}
								</tbody>
							</table>
						</div>
						<div className='footer'>
							<button
								className='button cancel'
								onClick={handleClickCloseModal}
							>
								{t('cancel')}
							</button>
							<button
								className='button confirm'
								onClick={handleClickConfirm}
							>
								{t('confirm')}
							</button>
						</div>
					</div>
				</motion.section>
			)}
		</AnimatePresence>
	);
}

interface ModalDeleteClassProps {
	selectedClass: SelectedClass;
	showModalDeleteClass: boolean;
	setShowModalDeleteClass: Dispatch<SetStateAction<boolean>>;
}

function ModalDeleteClass({
	selectedClass,
	showModalDeleteClass,
	setShowModalDeleteClass,
}: ModalDeleteClassProps) {
	const [deleteClasses] = useDeleteClassMutation();

	const handleClickConfirm = () => {
		const deletingClass = toast.loading(t('deleting_class'));
		deleteClasses({ id: selectedClass.id })
			.unwrap()
			.then(res => {
				toast.update(deletingClass, {
					render: t(res.msg),
					type: 'success',
					isLoading: false,
					autoClose: 1000,
				});
				setShowModalDeleteClass(!showModalDeleteClass);
			})
			.catch(err => {
				console.log(err);
				toast.update(deletingClass, {
					render: t(err.data.message),
					type: 'error',
					isLoading: false,
				});
			});
	};

	return (
		<AnimatePresence>
			{showModalDeleteClass && (
				<motion.section
					style={{
						margin: 0,
						padding: 0,
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className='delete-modal'>
						<h2>{t('delete_class')}</h2>
						<IoIosClose
							className='ioClose'
							onClick={() => setShowModalDeleteClass(!showModalDeleteClass)}
						/>
						<div className='body'>
							<p>{t('delete_class_message')}</p>
						</div>
						<div className='footer'>
							<button
								className='button confirm'
								onClick={handleClickConfirm}
							>
								{t('confirm')}
							</button>
							<button
								className='button cancel'
								onClick={() => setShowModalDeleteClass(!showModalDeleteClass)}
							>
								{t('cancel')}
							</button>
						</div>
					</div>
				</motion.section>
			)}
		</AnimatePresence>
	);
}

export default ClassesTable;
