import { ThreeDots } from "react-loading-icons";
import { useGetExamsByYearSemesterLevelQuery, useGetGradesByExamIdQuery } from "../../../redux/services/teacherApi";
import { ExamTeacher, Quiz } from "../../../utils/types";
import Modal from "../../../components/Modal";
import { Dispatch, useReducer, useState } from "react";
import {formatRut, RutFormat} from '@fdograph/rut-utilities'
import { quizReducer, QuizActionsEnum, QuizActionType } from "../quizesReducer";

function TableRow({ exam, rowHandler }: { exam: ExamTeacher, rowHandler: (exam: ExamTeacher) => void }) {
    const handleGradeBtn = (exam: ExamTeacher) => {
        rowHandler(exam)
    }

    return (
        <tr>
            <td>Quiz {exam.quizNumber}</td>
            <td>
                <div className="btn-container">
                    <button onClick={() => handleGradeBtn(exam)}>Grade</button>
                </div>
            </td>
        </tr >
    );
}

function ExamsTableTeacher({year, semester, level, topic}: {year: number, semester: number, level: string, topic: string}) {
    const { data: response, isLoading, isFetching } = useGetExamsByYearSemesterLevelQuery({ year, semester, level })
    const [examModal, setExamModal] = useState<ExamTeacher|null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const showModal = (examTarget: ExamTeacher) => {
        setExamModal(examTarget);
        setIsModalOpen(true)
    }
    
    if (isLoading || isFetching) return (<ThreeDots fill='#2F4858' className="threeDots" />)
    if (!response) return (<p>No data</p>)

    const filteredExams: ExamTeacher[] = response.data.filter(exam => exam.topic === topic)
    
    const tableRows = filteredExams.map((exam, index) => {
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
            {(isModalOpen && examModal) && <ModalExam examTarget={examModal} setIsModalOpen={setIsModalOpen}/>}
        </>
    );
}

function QuizRow({run, name, first_surname, grade, dv, handlerDispatch}: Quiz & {handlerDispatch: Dispatch<QuizActionType>}){
    const runFormat = formatRut(`${run}-${dv}`, RutFormat.DOTS_DASH);
    const fullName = `${first_surname} ${name}`

    const [gradeInt, setGradeInt] = useState(grade)

    const handlerGrade = (newGrade: number) => {
        setGradeInt(newGrade)
    }
    const handlerBlur = (newGrade: number) => {
        const action = newGrade === grade ? QuizActionsEnum.DELETE: QuizActionsEnum.INSERT
        handlerDispatch({run: run, grade: newGrade, type: action})
    }
    return (
        <tr>
            <td>{runFormat}</td>
            <td>{fullName}</td>
            <td>
                <input type="number" value={gradeInt} onChange={(e) => handlerGrade(parseFloat(e.target.value))}
                onBlur={e => handlerBlur(parseFloat(e.target.value))}/>
            </td>
        </tr>
    )
}

function ModalExam({examTarget, setIsModalOpen}: {examTarget: ExamTeacher, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    // const [isModalOpen, setIsModalOpen] = useState(true)
    const {data: response, isLoading, isFetching} = useGetGradesByExamIdQuery({quizId: examTarget.quizId})
    const [stateQuizzes, dispatch] = useReducer(quizReducer, {
        quizzesEdited: []
    })
    
    if (isLoading || isFetching) return (<ThreeDots fill='#2F4858' className="threeDots" />)
    if(!response) return (<p></p>)

    const quizzesRow = response.data.map(quiz => (
        <QuizRow key={quiz.run} {...quiz} handlerDispatch={dispatch}/>
        ))
    
    const handleButton = () => {
        
    }

    const props = {
        title: `Quiz ${examTarget.quizNumber} ${examTarget.topic}`,
        setIsOpen: setIsModalOpen,
        footer: <button onClick={handleButton}>Save</button>
    }
    console.log(stateQuizzes);
    
    return (
        <Modal {...props}>
            <table>
                <thead>
                    <tr>
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

export default ExamsTableTeacher;