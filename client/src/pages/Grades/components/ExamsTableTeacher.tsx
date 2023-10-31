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
  if (!isSuccess) return <p>error</p>;

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
      setIsModalOpen(false);
    },
    footer: <button onClick={HandleMutatorButton}>{t('save')}</button>,
  };

  if (isLoading) return <ThreeDots />;

  if (isSuccess) {
    return (
      <Modal {...props}>
        <table className="grades-input-table">
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

  const handleGrade = (newGrade: number) => {
    const floatGrade = newGrade / 10 >= 1 ? newGrade / 10 : newGrade;
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
          type="number"
          value={gradeInt}
          onChange={e => handleGrade(parseFloat(e.target.value))}
          onBlur={e => handleBlur(parseFloat(e.target.value))}
        />
      </td>
    </tr>
  );
}

export default ExamsTableTeacher;
