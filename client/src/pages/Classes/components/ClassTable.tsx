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
import {
	useAddClassMutation,
	useDeleteClassMutation,
	useGetClassesByLessonIdQuery,
	useGetStudentsByLessonQuery,
	useUpdateClassMutation,
} from '../../../redux/services/classesApi';
import { Select } from '../types';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';
import { toast } from 'react-toastify';
import { getYYYYMMDD } from '@/utils/functions';

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
			{isLoadingClasses && <div>Loading...</div>}
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
				className='table-class-list'
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
									<td>{getYYYYMMDD(date.toString())}</td>
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

	const handlerClickNewClass = () => {
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

	const handlerClickViewClass = ({ id }: { id: number }) => {
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

	const handlerClickDelete = ({ id }: { id: number }) => {
		setSelectedClass({
			...selectedClass,
			id,
		});
		setShowModalDeleteClass(!showModalDeleteClass);
	};

	return (
		<>
			{isLoadingStudents && <div>Loading...</div>}
			{students && (
				<>
					<table
						className='table-class-list'
						user-role={'teachers'}
					>
						<thead>
							<tr data-title>
								<th colSpan={4}>
									<p>{t('class_list')}</p>
									<BiSolidPlusSquare
										className='biSolidPlusSquare'
										onClick={handlerClickNewClass}
									/>
								</th>
							</tr>
							<tr className='grid'>
								<th>{t('date')}</th>
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
									return (
										<tr
											key={date.toLocaleString()}
											className='grid'
										>
											<td>{date.toLocaleString()}</td>
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
															onClick={() => handlerClickViewClass({ id: id })}
															className='imEyePlus'
														/>
													</>
												)}
												{showModalViewClass && selectedClass.id === id && (
													<ImEyeMinus className='imEyeMinus' />
												)}
												<MdOutlineDeleteForever
													onClick={() => handlerClickDelete({ id })}
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
						setShowModalViewClass={setShowModalViewClass}
						showModalViewClass={showModalViewClass}
						select={select}
						selectedClass={selectedClass}
						setSelectedClass={setSelectedClass}
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
	setShowModalViewClass: Dispatch<SetStateAction<boolean>>;
	showModalViewClass: boolean;
	select: Select;
	selectedClass: SelectedClass;
	setSelectedClass: Dispatch<SetStateAction<SelectedClass>>;
}

function ModalClassList({
	showModalViewClass,
	selectedClass,
	setSelectedClass,
	setShowModalViewClass,
}: ModalClassListProps) {
	const [addClass] = useAddClassMutation();
	const [updateClass] = useUpdateClassMutation();
	const labelRef = useRef<HTMLLabelElement>(null);

	const handlerChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedClass({ ...selectedClass, contents: e.target.value });
	};

	const setPositionTable = () => {
		const table = document.querySelector(
			'.table-attendance-list',
		) as HTMLTableElement;
		table.children[1].scrollTop = 0;
	};

	const handlerClickConfirm = () => {
		console.log(selectedClass.id);
		const body: PostClass = {
			lessonId: selectedClass.lesson.id,
			date: selectedClass.date,
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
			const { lessonId, date, ...rest } = body;

			updateClass({ id: selectedClass.id, body: rest })
				.unwrap()
				.then(res => {
					console.log(res.msg);
					setShowModalViewClass(!showModalViewClass);
					setPositionTable();
				});
		} else {
			addClass({ body })
				.unwrap()
				.then(res => {
					console.log(res.msg);
					setShowModalViewClass(!showModalViewClass);
					setPositionTable();
				});
		}
	};

	const handlerClickCloseModal = () => {
		setSelectedClass({
			...selectedClass,
			contents: '',
			id: -1,
		});
		setShowModalViewClass(!showModalViewClass);
		setPositionTable();
	};

	const handlerOnChangeAttendance = (
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

	const handlerLabelKeyDown = (
		e: React.KeyboardEvent<HTMLLabelElement>,
		student: {
			run: string;
			name: string;
			first_surname: string;
		},
	) => {
		if (e.key === ' ' || e.key === 'Enter') {
			const cb = document.getElementById(
				`attendance ${student.name}`,
			) as HTMLInputElement;
			cb.checked = !cb.checked;
			handlerOnChangeAttendance(
				{ target: { checked: cb.checked } } as ChangeEvent<HTMLInputElement>,
				student,
			);
		}
	};

	useEffect(() => {
		labelRef.current?.focus();
	}, [selectedClass.attendanceList]);

	return (
		<>
			<div
				className={`background ${
					showModalViewClass ? 'showModalViewClass' : ''
				}`}
			/>
			<div
				className={`attendance ${
					showModalViewClass ? 'showModalViewClass' : ''
				}`}
			>
				<h2>
					{t('date')} {selectedClass.date.toLocaleString()}
				</h2>
				<IoIosClose
					className='ioClose'
					onClick={handlerClickCloseModal}
				/>
				<div className='body'>
					<div className='content'>
						<p>{t('content')}</p>
						<input
							type={'text'}
							name='content'
							id='content'
							value={selectedClass.contents}
							onChange={handlerChangeContent}
						/>
					</div>
					<table className='table-attendance-list'>
						<thead>
							<tr data-title>
								<th colSpan={4}>
									<p>{t('attendance_list')}</p>
								</th>
							</tr>
							<tr>
								<th>Nº</th>
								<th>Run</th>
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
														// console.log(e);
														handlerOnChangeAttendance(e, student);
													}}
												/>
												<label
													tabIndex={0}
													className='label-attendance'
													htmlFor={`attendance ${student.run}`}
													onKeyDown={e => handlerLabelKeyDown(e, student)}
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
						className='confirm'
						onClick={handlerClickConfirm}
					>
						{t('confirm')}
					</button>
					<button
						className='cancel'
						onClick={handlerClickCloseModal}
					>
						{t('cancel')}
					</button>
				</div>
			</div>
		</>
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

	const handlerClickConfirm = () => {
		deleteClasses({ id: selectedClass.id })
			.unwrap()
			.then(res => {
				console.log(res);
				setShowModalDeleteClass(!showModalDeleteClass);
			});
	};

	return (
		<>
			<div
				className={`background ${
					showModalDeleteClass ? 'showModalDeleteClass' : ''
				}`}
			/>
			<div
				className={`delete-modal ${
					showModalDeleteClass ? 'showModalDeleteClass' : ''
				}`}
			>
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
						className='confirm'
						onClick={handlerClickConfirm}
					>
						{t('confirm')}
					</button>
					<button
						className='cancel'
						onClick={() => setShowModalDeleteClass(!showModalDeleteClass)}
					>
						{t('cancel')}
					</button>
				</div>
			</div>
		</>
	);
}

export default ClassesTable;
