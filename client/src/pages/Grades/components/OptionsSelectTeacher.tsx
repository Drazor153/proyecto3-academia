import { ThreeDots } from "react-loading-icons";
import { useAppSelector } from "../../../redux/hooks";
import { useGetTeacherLevelsQuery } from "../../../redux/services/teacherApi";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { TypeKind, DispatchProps } from "../selectedOption";

function GetLevelsData() {
    const user = useAppSelector(state => state.userReducer);
    console.log(user);
    
    const { data: response } = useGetTeacherLevelsQuery({ run: user.run });
    if (!response) return null;

    return response.data;
}

function OptionSelectTeacher({state, dispatch}: DispatchProps) {
    useTranslation();

    const handleLevelChange = (level: string) => {
        dispatch({type: TypeKind.LEVEL, payload: level})
    }

    const handleYearChange = (year: string) => {
        dispatch({type: TypeKind.YEAR, payload: year})

    }

    const handleSemesterChange = (semester: string) => {
        dispatch({type: TypeKind.SEMESTER, payload: semester})
    }

    const levels = GetLevelsData();
    
    if (!levels) return (<ThreeDots fill='#2F4858' />);
    else {
        return (
            <section className='options-container'>
                <h2>{t('options')}</h2>
                <select value={state.year} onChange={(e) => handleYearChange(e.target.value)}>
                    <option hidden value="">{t('year_select_input')}</option>
                    {levels.map((year, i) => (
                        <option key={i} value={year.year}>{year.year}</option>
                    ))}
                </select>
                <select value={state.semester} onChange={(e) => handleSemesterChange(e.target.value)}>
                    <option hidden value=''>{t('semester_select_input')}</option>
                    {state.year && levels.map((year) => (
                        year.year == parseInt(state.year) &&
                        year.semesters.map((semester, i) => (
                            <option key={i}>{semester.semester}</option>))
                    ))}
                </select>
                <select value={state.level} onChange={(e) => handleLevelChange(e.target.value)}>
                    <option hidden value=''>{t('level_select_input')}</option>
                    {state.year && levels.map((year) => (
                        year.year == parseInt(state.year) &&
                        year.semesters.map((semester) => (
                            semester.semester == parseInt(state.semester) &&
                            semester.levels.map((level, i) => (
                                <option key={i}>{level.code}</option>))
                            ))
                    ))}
                </select>
            </section>
        )
    }
}

export default OptionSelectTeacher;