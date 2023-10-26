import { ThreeDots } from 'react-loading-icons';
import {
	useGetExamsByYearSemesterLevelQuery,
	useLazyGetGradesByExamIdQuery,
	useUploadGradesMutation,
} from '../../../redux/services/teacherApi';
import { Exams, GenericExam, Quiz } from '../../../utils/types';
import Modal from '../../../components/Modal';
import { Dispatch, useEffect, useReducer, useState } from 'react';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { quizReducer, QuizActionsEnum, QuizActionType } from '../quizesReducer';
import { countDecimals } from '../../../utils/functions';
import { t } from 'i18next';

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
				<div className="btn-container">
					<button onClick={() => handleGradeBtn(exam)}>{t('grades')}</button>
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

	if (isLoading || isFetching)
		return (
			<ThreeDots
				fill="#2F4858"
				className="threeDots"
			/>
		);
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
			<table className="grades-table">
				<thead>
					<tr>
						<th>Test</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
			<ModalExam
				examTarget={examModal}
				setIsModalOpen={setIsModalOpen}
				topic={topic}
				isModalOpen={isModalOpen}
			/>
		</>
	);
}

function ModalExam({
	examTarget,
	setIsModalOpen,
	isModalOpen,
	topic,
}: {
	examTarget: GenericExam;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	topic: string;
}) {
	const [getGradesByExamId, result] = useLazyGetGradesByExamIdQuery();

	const [uploadGrades] = useUploadGradesMutation();

	const [stateQuizzes, dispatch] = useReducer(quizReducer, {
		quizzesEdited: [],
	});
	const quizzesRow = result.data?.data.map((quiz, i) => (
		<QuizRow
			key={quiz.run}
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

		uploadGrades(data)
			.unwrap()
			.then(response => {
				if (response.status === 200) {
					setIsModalOpen(false);
				}
			});
	};

	const props = {
		isOpen: () => isModalOpen,
		title: `Quiz ${examTarget.quizNumber} ${t(topic)}`,
		onClick: () => {
			console.log(isModalOpen);
			setIsModalOpen(false);
		},
		footer: <button onClick={HandleMutatorButton}>{t('save')}</button>,
	};

	useEffect(() => {
		if (examTarget.quizId !== -1)
			getGradesByExamId({ quizId: examTarget.quizId }).then(res => {
				if (res.isLoading)
					return (
						<ThreeDots
							fill="#2F4858"
							className="threeDots"
						/>
					);
				if (!res) return <p></p>;
			});
	}, [examTarget]);

	return (
		<Modal {...props}>
			<table className="grades-input-table">
				<thead>
					{/* <tr></tr> */}
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
	const runFormat = formatRut(`${run}-${dv}`, RutFormat.DOTS_DASH);
	const fullName = `${first_surname}, ${name}`;

	const [gradeInt, setGradeInt] = useState(grade);

	const handlerGrade = (newGrade: number) => {
		if (newGrade < 0 || newGrade > 7) return;
		if (countDecimals(newGrade) > 1) return;
		setGradeInt(newGrade);
	};
	const handlerBlur = (newGrade: number) => {
		const action =
			newGrade === grade ? QuizActionsEnum.DELETE : QuizActionsEnum.INSERT;
		handlerDispatch({ run: run, grade: newGrade, type: action });
	};
	return (
		<tr>
			<td>{n}</td>
			<td>{runFormat}</td>
			<td data-type="student name">
				<p>{fullName.toLowerCase()}</p>
			</td>
			<td>
				<input
					type="number"
					value={gradeInt}
					onChange={e => handlerGrade(parseFloat(e.target.value))}
					onBlur={e => handlerBlur(parseFloat(e.target.value))}
				/>
			</td>
		</tr>
	);
}

export default ExamsTableTeacher;
