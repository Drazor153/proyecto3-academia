import { ThreeDots } from 'react-loading-icons';
import {
	useGetExamsByYearSemesterLevelQuery,
	useGetGradesByExamIdQuery,
	useUploadGradesMutation,
} from '../../../redux/services/teacherApi';
import { Exams, GenericExam, Quiz } from '../../../utils/types';
import Modal from '../../../components/Modal';
import { Dispatch, useMemo, useReducer, useState } from 'react';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { quizReducer, QuizActionsEnum, QuizActionType } from '../quizesReducer';
import { countDecimals } from '../../../utils/functions';
import { t } from 'i18next';
import { toast } from 'react-toastify';

function TableRow({
	exam,
	rowHandler,
}: {
	exam: GenericExam;
	rowHandler: (exam: GenericExam) => void;
}) {
	const handleGradeBtn = (exam: GenericExam) => {
		rowHandler(exam);
	};

	return (
		<tr>
			<td>Quiz {exam.quizNumber}</td>
			<td>
				<div className='btn-container'>
					<button
						className='button'
						onClick={() => handleGradeBtn(exam)}
					>
						{t('grades')}
					</button>
				</div>
			</td>
		</tr>
	);
}

function ExamsTableTeacher({
	year,
	semester,
	level,
	topic,
}: {
	year: number;
	semester: number;
	level: string;
	topic: string;
}) {
	const {
		data: response,
		isLoading,
		isFetching,
	} = useGetExamsByYearSemesterLevelQuery({ year, semester, level });
	const [examModal, setExamModal] = useState<GenericExam>({
		quizId: -1,
		quizNumber: -1,
		studentGrade: -1,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = (examTarget: GenericExam) => {
		setExamModal(examTarget);
		setIsModalOpen(true);
	};

	if (isLoading || isFetching) return <ThreeDots />;
	if (!response) return <p>No data</p>;

	const filteredExams: Exams = response.data.filter(
		exam => exam.topic === topic,
	)[0];
	const tableRows = filteredExams.quizzes.map((exam, index) => {
		return (
			<TableRow
				key={index}
				exam={exam}
				rowHandler={showModal}
			/>
		);
	});

	return (
		<>
			<table className='table grades-table'>
				<thead>
					<tr>
						<th>{t('quiz')}</th>
						<th>{t('action')}</th>
					</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
			{examModal.quizId !== -1 && (
				<ModalExam
					examTarget={examModal}
					setExamTarget={setExamModal}
					setIsModalOpen={setIsModalOpen}
					topic={topic}
					isModalOpen={isModalOpen}
				/>
			)}
		</>
	);
}

function ModalExam({
	examTarget,
	setExamTarget,
	setIsModalOpen,
	isModalOpen,
	topic,
}: {
	examTarget: GenericExam;
	setExamTarget: React.Dispatch<React.SetStateAction<GenericExam>>;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	topic: string;
}) {
	const {
		data: result,
		isSuccess,
		isLoading,
		isFetching,
	} = useGetGradesByExamIdQuery({
		quizId: examTarget.quizId,
	});

	const [uploadGrades] = useUploadGradesMutation();

	const [stateQuizzes, dispatch] = useReducer(quizReducer, {
		quizzesEdited: [],
	});

	if (isLoading || isFetching) return <ThreeDots />;
	if (!isSuccess) {
		toast.error(t('error'), { toastId: 'error' });
		return <></>;
	}

	const quizzesRow = result.data.map((quiz, i) => (
		<QuizRow
			key={`${examTarget.quizId}-${quiz.run}`}
			{...quiz}
			n={i + 1}
			handlerDispatch={dispatch}
		/>
	));

	const HandleMutatorButton = () => {
		const data = {
			quizId: examTarget.quizId,
			grades: [...stateQuizzes.quizzesEdited],
		};

		toast.loading(t('changing_grades'), { toastId: 'changing_grades' });

		uploadGrades(data)
			.unwrap()
			.then(() => {
				setIsModalOpen(false);
				toast.update('changing_grades', {
					render: t('grades_changed'),
					type: 'success',
					isLoading: false,
					autoClose: 1000,
				});
			})
			.catch(error => {
				toast.update('changing_grades', {
					render: t(error.data.message),
					type: 'success',
					isLoading: false,
					autoClose: 1000,
				});
			});
	};

	const props = {
		isOpen: () => isModalOpen,
		title: `Quiz ${examTarget.quizNumber} ${t(topic)}`,
		onClick: () => {
			setIsModalOpen(false);
			setExamTarget({ quizId: -1, quizNumber: -1, studentGrade: -1 });
		},
		footer: (
			<button
				className='button'
				onClick={HandleMutatorButton}
			>
				{t('save')}
			</button>
		),
	};

	if (isLoading) return <ThreeDots />;

	return (
		<Modal {...props}>
			<table className='table grades-input-table'>
				<thead>
					<tr>
						<th>#</th>
						<th>{t('run')}</th>
						<th>{t('name')}</th>
						<th>{t('grade')}</th>
					</tr>
				</thead>
				<tbody>{quizzesRow}</tbody>
			</table>
		</Modal>
	);
}

function QuizRow({
	run,
	name,
	first_surname,
	grade,
	dv,
	n,
	handlerDispatch,
}: Quiz & { handlerDispatch: Dispatch<QuizActionType>; n: number }) {
	// const runFormat = formatRut(`${run}-${dv}`, RutFormat.DOTS_DASH);
	// const fullName = `${first_surname}, ${name}`;

	const { runFormat, fullName } = useMemo(
		() => ({
			runFormat: formatRut(`${run}-${dv}`, RutFormat.DOTS_DASH),
			fullName: `${first_surname}, ${name}`,
		}),
		[run, dv, name, first_surname],
	);

	const [gradeInt, setGradeInt] = useState<number>(grade);

	const handleGrade = (newGrade: string) => {
		// setGradeInt(parseFloat(newGrade));
		const isValidInput = /^[0-9.,]+$/.test(newGrade);
		if (!isValidInput) {
			return;
		}
		const floatGrade =
			parseFloat(newGrade) / 10 >= 1
				? parseFloat(newGrade) / 10
				: parseFloat(newGrade);
		if (floatGrade < 0 || floatGrade > 7) return;
		if (countDecimals(floatGrade) > 1) return;
		setGradeInt(floatGrade);
	};
	const handleBlur = (newGrade: number) => {
		const action =
			newGrade === grade ? QuizActionsEnum.DELETE : QuizActionsEnum.INSERT;
		handlerDispatch({ run: run, grade: newGrade, type: action });
	};
	return (
		<tr>
			<td>{n}</td>
			<td>{runFormat}</td>
			<td data-student-name>
				<p>{fullName.toLowerCase()}</p>
			</td>
			<td>
				<input
					type='number'
					value={gradeInt}
					// onChange={e => handleGrade(parseFloat(e.target.value))}
					onFocus={e => {
						if (e.target.value === '0') {
							e.target.value = '';
						}
					}}
					onChange={e => handleGrade(e.target.value)}
					onBlur={e => handleBlur(parseFloat(e.target.value))}
				/>
			</td>
		</tr>
	);
}

export default ExamsTableTeacher;
