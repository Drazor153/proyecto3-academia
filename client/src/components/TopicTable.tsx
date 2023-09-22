import { useAppSelector } from "../redux/hooks";

const grades = {
    Writing: [1, 1, 1],
    Reading: [3, 2, 1],
    Listening: [4, 5, 7],
    Speaking: [6, 2, 5]
}

const examstopics = {
    Writing: ['test 1', 'test 2', 'test 3'],
    Reading: ['test 1', 'test 2', 'test 3'],
    Listening: ['test 1', 'test 2', 'test 3'],
    Speaking: ['test 1', 'test 2', 'test 3']
}

function TableRowTeacher({ test }: { test: string }) {
    return (
        <tr>
            <td>{test}</td>
        </tr>
    );
}

function TableRowStudent({ test, score }: { test: string, score: number }) {
    return (
        <tr>
            <td>{test}</td>
            <td>{score}</td>
        </tr>
    );
}

function TopicTable({ topic }: { topic: string }) {
    const user = useAppSelector(state => state.userReducer)
    const tests = examstopics[topic as keyof typeof examstopics]
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
        <section>
            <h2>{topic}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Test Topics</th>
                        <th>{user.role == 'STUDENT' ? 'Score' : 'Action'}</th>
                    </tr>
                </thead>
                <tbody>
                    {tablerows}
                </tbody>
            </table>
        </section>
    );
}

export default TopicTable