import { t } from "i18next"
import { useTranslation } from "react-i18next"
import Select from "react-select"

const year = [{
    value: '2021',
    label: 'Año 2021'
}]

const semester = [{
    value: '1',
    label: 'Semestre 1'
}]

const quizzes = [{
    value: '1',
    label: 'Quiz 1'
},
{
    value: '2',
    label: 'Quiz 2'
}]

function ExamsByPeriod() {

    return (
        <>
            <div className="exams-by-period-container">
                <form action="" name="period-exams" id="period-exams" style={{ display: 'none' }} />
                <table>
                    <thead>
                        <tr>
                            <th>{t('topic')}</th>
                            <th>{t('date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Writing</td>
                            <td>
                                <input type="date" />
                            </td>
                        </tr>
                        <tr>
                            <td>Grammar</td>
                            <td>10/10/2021</td>
                        </tr>
                        <tr>
                            <td>Listening</td>
                            <td>10/10/2021</td>
                        </tr>
                        <tr>
                            <td>Speaking</td>
                            <td>10/10/2021</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default function ExamsCalendarManagement() {
    useTranslation()
    // const [selectedYear, setSelectedYear] = useState('');
    // const [selectedSemester, setSelectedSemester] = useState('');
    // const [selectedQuiz, setSelectedQuiz] = useState('');

    return (
        <>
            <h2>{t('exams_calendar_management')}</h2>

            <div className="exams-management-layout">
                <div className="period-select-container">
                    <h3>{t('period')}</h3>
                    <button>{t('create_edit_period')}</button>
                    <div className="select-container">
                        <Select
                            className='react-select-container'
                            classNamePrefix={'react-select'}
                            placeholder={t('year_select')}
                            options={year}
                            isClearable
                            isSearchable={false}
                        />
                        <Select
                            className='react-select-container'
                            classNamePrefix={'react-select'}
                            placeholder={t('semester_select')}
                            options={semester}
                            isClearable
                            isSearchable={false}
                        />
                    </div>

                </div>
                <div className="quizzes-select-container">
                    <h3>{t('quizzes')}</h3>

                    <div className="select-container">
                        <Select
                            className='react-select-container'
                            classNamePrefix={'react-select'}
                            placeholder={t('quizzes_select')}
                            options={quizzes}
                            isClearable
                            isSearchable={false}
                        />
                    </div>
                </div>
                <ExamsByPeriod />
                <button>{t('save')}</button>
            </div>
        </>
    )
}