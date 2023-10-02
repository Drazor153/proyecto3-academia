import { useReducer } from "react"
import { FaPen, FaEarListen, FaCommentDots, FaSpellCheck } from "react-icons/fa6"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../redux/hooks"
import OptionSelectStudent from "./components/OptionsSelectStudent"
import { TypeKind, reducer } from "./selectedOption"
import OptionSelectTeacher from "./components/OptionsSelectTeacher"
import ExamsTableTeacher from "./components/ExamsTableTeacher"
import ExamsTableStudent from "./components/ExamsTableStudent"
import { t } from "i18next"

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

function Grades() {
    useTranslation();
    const role = useAppSelector(state => state.userReducer.role)

    const [state, dispatch] = useReducer(reducer, {
        topic: '',
        level: '',
        year: '',
        semester: ''
    })

    const optionByRole = () => {
        if (role == 'STUDENT') {
            return <OptionSelectStudent state={state} dispatch={dispatch} />
        } else {
            return <OptionSelectTeacher state={state} dispatch={dispatch} />
        }
    }

    const examsByRole = () => {
        if (role == 'STUDENT') {
            if (!state.topic) return null

            return <ExamsTableStudent 
                year={parseInt(state.year)} 
                semester={parseInt(state.semester)} 
                level={state.level} 
                topic={state.topic}/>
        } else {
            if (!state.topic || !state.year || !state.semester || !state.level ) return null

            return (<ExamsTableTeacher 
                year={parseInt(state.year)} 
                semester={parseInt(state.semester)} 
                level={state.level}
                topic={state.topic}/>)
        }
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
                                onClick={() => dispatch({type: TypeKind.TOPIC, payload: topic.name})}
                                key={index}
                                className={state.topic == topic.name ? 'selected' : ''}
                            >
                                {topic.icon}
                                <span>{topic.name}</span>
                            </button>
                        ))}
                    </div>
                </section>
                {optionByRole()}
                <section className='grades'>
                    {
                        state.topic ? <h2>{state.topic}</h2> : <p>{t('topic_select_input')}</p>}
                    {examsByRole()}
                </section>
            </main>
        </>
    )
}

export default Grades