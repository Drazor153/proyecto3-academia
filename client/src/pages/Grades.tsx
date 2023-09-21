import '../scss/grades.scss'
import '../scss/buttons.scss'
import { useState } from "react"
import { FaPen, FaBookOpenReader, FaEarListen, FaCommentDots } from "react-icons/fa6"

const topics = [
    {
        name: "Writing",
        icon: <FaPen />
    },
    {
        name: "Reading",
        icon: <FaBookOpenReader />
    },
    {
        name: "Listening",
        icon: <FaEarListen />
    },
    {
        name: "Speaking",
        icon: <FaCommentDots />
    }
]

// TEMPORAL VALUES
const years = ['2023', '2022', '2021']
const grades = {
    "Writing": [1, 1, 1],
    "Reading": [3, 2, 1],
    "Listening": [4, 5, 7],
    "Speaking": [6, 2, 5]
}

const examstopics = {
    Writing: ['test 1', 'test 2', 'test 3'],
    Reading: ['test 1', 'test 2', 'test 3'],
    Listening: ['test 1', 'test 2', 'test 3'],
    Speaking: ['test 1', 'test 2', 'test 3']
}


function GradesByTopic({ topics, year }: { topics: string[], year: string }) {
    if (!topics || !year) return null
    return (
        <div className='grades'>
            {topics.map((topic, index) => (
                <section key={index}>
                    <h2>{topic}</h2>
                    <table>
                        <tr>
                            <th>Test Topics</th>
                            <th>Score</th>
                        </tr>
                        <tr>
                        </tr>
                    </table>
                </section>

            ))}
        </div>)
}


function Grades() {
    const [selectedTopic, setSelectedTopic] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState(years[0]);

    const handleBtnClick = (name: string) => {
        if (selectedTopic.includes(name))
            setSelectedTopic(selectedTopic.filter((topic) => topic !== name))
        else
            setSelectedTopic([...selectedTopic, name]);
    }

    return (
        <>
            <h1>Grades</h1>
            <main className='grades-layout'>
                <section className="topics-selector">
                    <h2>Topics</h2>
                    <div className="buttons-container">
                        {topics.map((topic, index) => (
                            <button
                                onClick={() => handleBtnClick(topic.name)}
                                key={index}
                                className={selectedTopic.includes(topic.name) ? 'selected' : ''}
                            >
                                {topic.icon}
                                <span>{topic.name}</span>
                            </button>
                        ))}
                    </div>
                </section>
                <section className='options-selector'>
                    <h2>Options</h2>
                    <select name="selectedYear" onChange={(e) => setSelectedYear(e.target.value)} className='year-select'>
                        {years.map((year, index) => (
                            <option value={year} key={index}>{year}</option>
                        ))}
                    </select>
                </section>
                <GradesByTopic topics={selectedTopic} year={selectedYear} />

            </main>
        </>
    )
}

export default Grades