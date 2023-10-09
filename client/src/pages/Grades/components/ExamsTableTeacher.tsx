import { ThreeDots } from "react-loading-icons";
import { useGetExamsByYearSemesterLevelQuery, useGetGradesByExamIdQuery, useUploadGradesMutation } from "../../../redux/services/teacherApi";
import { Exams, GenericExam, Quiz } from "../../../utils/types";
import Modal from "../../../components/Modal";
import { Dispatch, useReducer, useState } from "react";
import {formatRut, RutFormat} from '@fdograph/rut-utilities'
import { quizReducer, QuizActionsEnum, QuizActionType } from "../quizesReducer";
import { countDecimals } from "../../../utils/functions";
import { t } from "i18next";

function TableRow({ exam, rowHandler }: { exam: GenericExam, rowHandler: (exam: GenericExam) => void }) {
    const handleGradeBtn = (exam: GenericExam) => {
        rowHandler(exam)
    }

    return (
        <tr>
            <td>Quiz {exam.quizNumber}</td>
            <td>
                <div className="btn-container">
                    <button onClick={() => handleGradeBtn(exam)}>{t('grades')}</button>
                </div>
            </td>
        </tr >
    );
}

function ExamsTableTeacher({year, semester, level, topic}: {year: number, semester: number, level: string, topic: string}) {
    const { data: response, isLoading, isFetching } = useGetExamsByYearSemesterLevelQuery({ year, semester, level })
    const [examModal, setExamModal] = useState<GenericExam|null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
        

    const showModal = (examTarget: GenericExam) => {
        setExamModal(examTarget);
        setIsModalOpen(true)
    }
    
    if (isLoading || isFetching) return (<ThreeDots fill='#2F4858' className="threeDots" />)
    if (!response) return (<p>No data</p>)

    const filteredExams: Exams = response.data.filter(exam => exam.topic === topic)[0]
    const tableRows = filteredExams.quizzes.map((exam, index) => {
        return <TableRow key={index} exam={exam} rowHandler={showModal}/>
    })

    return (
        <>
            <table className="grades-table">
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
            {(isModalOpen && examModal) && <ModalExam examTarget={examModal} setIsModalOpen={setIsModalOpen} topic={topic}/>}
        </>
    );
}

function ModalExam({examTarget, setIsModalOpen, topic}: {examTarget: GenericExam, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, topic: string}){
    // const [isModalOpen, setIsModalOpen] = useState(true)
    const {data: response, isLoading, isFetching} = useGetGradesByExamIdQuery({quizId: examTarget.quizId})
    const [uploadGrades] = useUploadGradesMutation();
    
    const [stateQuizzes, dispatch] = useReducer(quizReducer, {
        quizzesEdited: []
    })
    
    if (isLoading || isFetching) return (<ThreeDots fill='#2F4858' className="threeDots" />)
    if(!response) return (<p></p>)

    const quizzesRow = response.data.map((quiz, i) => (
        <QuizRow key={quiz.run} {...quiz} n={i+1} handlerDispatch={dispatch}/>
        ))
    
    
    const HandleMutatorButton = () => {
        const data  = {
            quizId: examTarget.quizId,
            grades: [...stateQuizzes.quizzesEdited]
        }
        console.log(data);
        

        uploadGrades(data).unwrap().then((response) => {
            if(response.status === 200){
                setIsModalOpen(false)
            }
        })
    }

    const props = {
        title: `Quiz ${examTarget.quizNumber} ${t(topic)}`,
        setIsOpen: setIsModalOpen,
        footer: <button onClick={HandleMutatorButton}>Save</button>
    }
    console.log(stateQuizzes);
    
    return (
        <Modal {...props}>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>RUN</th>
                        <th>NAME</th>
                        <th>GRADE</th>
                    </tr>
                </thead>
                <tbody>{quizzesRow}</tbody>
            </table>
        </Modal>
    )
}
function QuizRow({run, name, first_surname, grade, dv, n, handlerDispatch}: Quiz & {handlerDispatch: Dispatch<QuizActionType>, n: number}){
    const runFormat = formatRut(`${run}-${dv}`, RutFormat.DOTS_DASH);
    const fullName = `${first_surname} ${name}`

    const [gradeInt, setGradeInt] = useState(grade)

    const handlerGrade = (newGrade: number) => {
        if(newGrade < 0 || newGrade > 7) return
        if(countDecimals(newGrade) > 1) return
        setGradeInt(newGrade)
    }
    const handlerBlur = (newGrade: number) => {
        const action = newGrade === grade ? QuizActionsEnum.DELETE: QuizActionsEnum.INSERT
        handlerDispatch({run: run, grade: newGrade, type: action})
    }
    return (
        <tr>
            <th>{n}</th>
            <td>{runFormat}</td>
            <td>{fullName}</td>
            <td>
                <input type="number" value={gradeInt} onChange={(e) => handlerGrade(parseFloat(e.target.value))}
                onBlur={e => handlerBlur(parseFloat(e.target.value))}/>
            </td>
        </tr>
    )
}

export default ExamsTableTeacher;