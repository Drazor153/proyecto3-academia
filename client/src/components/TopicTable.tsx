import { useAppSelector } from "../redux/hooks";

const grades = {
    Writing: [1, 1, 1],
    Grammar: [3, 2, 1],
    Listening: [4, 5, 7],
    Speaking: [6, 2, 5]
}

const exams = {
    Writing: [{ theme: 'test 1', date: 'dd/mm/aa' },
    { theme: 'test 2', date: 'dd/mm/aa' },
    { theme: 'test 3', date: 'dd/mm/aa' }],
    Grammar: [{ theme: 'test 1', date: 'dd/mm/aa' },
    { theme: 'test 2', date: 'dd/mm/aa' },
    { theme: 'test 3', date: 'dd/mm/aa' }],
    Listening: [{ theme: 'test 1', date: 'dd/mm/aa' },
    { theme: 'test 2', date: 'dd/mm/aa' },
    { theme: 'test 3', date: 'dd/mm/aa' }],
    Speaking: [{ theme: 'test 1', date: 'dd/mm/aa' },
    { theme: 'test 2', date: 'dd/mm/aa' },
    { theme: 'test 3', date: 'dd/mm/aa' }]
}

type exam = {
    theme: string;
    date: string;
}

function TableRowTeacher({ test }: { test: exam }) {
    console.log(typeof test);

    return (
        <tr>
            <td>{test.theme}</td>
            <td>{test.date}</td>
        </tr>
    );
}

function TableRowStudent({ test, score }: { test: exam, score: number }) {
    return (
        <tr>
            <td>{test.theme}</td>
            <td>{test.date}</td>
            <td>{score}</td>
        </tr>
    );
}

function TopicTable({ topic }: { topic: string }) {
    const user = useAppSelector(state => state.userReducer)
    const tests = exams[topic as keyof typeof exams]
    const tablerows: React.ReactNode[] = []
    if (user.role == 'STUDENT') {
        const scores = grades[topic as keyof typeof grades]
        tests.map((test, index) => (
            tablerows.push(<TableRowStudent key={index} test={test} score={scores[index]} />)
        ))
    } else {
        tests.map((test, index) => (
            tablerows.push(<TableRowTeacher key={index} test={test} />)
        ))
    }

    return (
        <div className="topic-grades">
            <h2>{topic}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Test Topics</th>
                        <th>Date</th>
                        <th>{user.role == 'STUDENT' ? 'Score' : 'Action'}</th>
                    </tr>
                </thead>
                <tbody>
                    {tablerows}
                </tbody>
            </table>
        </div>
    );
}

export default TopicTable