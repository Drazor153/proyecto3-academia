import { ThreeDots } from "react-loading-icons";
import { useAppSelector } from "../../../redux/hooks";
import { useGetStudentsGradesQuery } from "../../../redux/services/studentsApi";
import { GenericExam, Exams } from "../../../utils/types";

const getAverage = (exams: GenericExam[]) => {
    const sum = exams.reduce((accumulator, exam) => accumulator + exam.studentGrade, 0)
    return (sum / exams.length)
}

const isApproved = (average: number) => {
    return average >= 4
}

const getStatus = (exams: GenericExam[]) => {
    const average = getAverage(exams)
    for (const exam of exams) {
        if (exam.studentGrade == 0) return 'pending'
    }
    if (isApproved(average)) return 'approved'
    return 'failed'
}

function TableRow({ test }: { test: GenericExam }) {
    return (
        <tr>
            <td>Quiz {test.quizNumber}</td>
            <td>{test.studentGrade == 0 ? 'pending' : test.studentGrade}</td>
        </tr>
    );
}

function ExamsTable({ topic, year, semester, level }: { topic: string, year: number, semester: number, level: string }) {
    const run = useAppSelector(state => state.userReducer.run)

    const { data: response,
        isLoading,
        isFetching, isError } = useGetStudentsGradesQuery({ year, semester, level, run })

    if (isLoading || isFetching)
        return (<ThreeDots fill='#2F4858' className="threeDots" />)
    
    if (isError || !response) return (<p>No data</p>)
    
    const filteredExams: Exams = response.data.filter(exam => exam.topic === topic)[0]

    console.log(filteredExams);
    

    const tablerows: JSX.Element[] = filteredExams.quizzes.map((exam, index) => (<TableRow key={index} test={exam} />))

    return (
        <>
            <table className="grades-table">
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {tablerows.length > 0 ? tablerows : <tr><td colSpan={2}>There is not quizzes available yet</td></tr>}
                </tbody>
            </table>
            <div className="more-info">
                <div className="average-container">
                    <h3>Average</h3>
                    <p>{getAverage(filteredExams.quizzes)}</p>
                </div>
                <div className="status-container">
                    <h3>Status</h3>
                    <p>{getStatus(filteredExams.quizzes)}</p>
                </div>
            </div> 
            
        </>
    );
}

export default ExamsTable