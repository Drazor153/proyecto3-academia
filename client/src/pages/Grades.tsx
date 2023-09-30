import { useState } from "react"
import { FaPen, FaEarListen, FaCommentDots, FaSpellCheck } from "react-icons/fa6"
import TopicTable from '../components/TopicTable'

const topics = [
    {
        name: "Writing",
        icon: <FaPen />
    },
    {
        name: "Grammar",
        icon: <FaSpellCheck />
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


function GradesByTopics({ topic, year }: { topic: string, year: string }) {
    if (!topic || !year) return null;

    return (
        <section className='grades'>
            <TopicTable
                topic={topic}
            />
        </section>
    );
}



function Grades() {
    const [selectedTopic, setSelectedTopic] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState(years[0]);

    const handleBtnClick = (name: string) => {
        setSelectedTopic(name)
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
                                className={selectedTopic == topic.name ? 'selected' : ''}
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
                <GradesByTopics topic={selectedTopic} year={selectedYear} />

            </main>
        </>
    )
}

export default Grades