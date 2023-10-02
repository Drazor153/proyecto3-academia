import { ThreeDots } from "react-loading-icons";
import { useAppSelector } from "../../../redux/hooks";
import { useGetTeacherLevelsQuery } from "../../../redux/services/teacherApi";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { TypeKind, DispatchProps } from "../selectedOption";

type LevelData = {
    level: string;
    years: {
        year: number;
        semesters: number[];
    }[];
};

function GetLevelsData() {
    const run = useAppSelector(state => state.userReducer.run);
    const { data: response } = useGetTeacherLevelsQuery({ run: run });
    if (!response) return null;

    const distinctLevels: string[] = Array.from(new Set(response.data.map(item => item.levelCode)));
    const newData: LevelData[] = [];

    distinctLevels.forEach(level => {
        const distinctYears: number[] = Array.from(new Set(response.data.filter(item => item.levelCode === level).map(item => item.year)));

        const yearsData = distinctYears.map(year => {
            const distinctSemesters: number[] = Array.from(new Set(response.data.filter(item => item.levelCode === level && item.year === year).map(item => item.semester)));
            return { year, semesters: distinctSemesters };
        });

        newData.push({ level, years: yearsData });
    });

    return newData;
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
                <select value={state.level} onChange={(e) => handleLevelChange(e.target.value)}>
                    <option hidden value=''>{t('level_select_input')}</option>
                    {levels.map((level, index) => (
                        <option key={index}>{level.level}</option>
                    ))}
                </select>
                <select value={state.year} onChange={(e) => handleYearChange(e.target.value)}>
                    <option hidden value=''>{t('year_select_input')}</option>
                    {state.level && levels.map((level) => (
                        level.level == state.level &&
                        level.years.map((year, index) => (
                            <option key={index}>{year.year}</option>))
                    ))}

                </select>
                <select value={state.semester} onChange={(e) => handleSemesterChange(e.target.value)}>
                    <option hidden value=''>{t('semester_select_input')}</option>
                    {state.level && levels.map((level) => (
                        level.level == state.level &&
                        level.years.map((year) => (
                            year.year == parseInt(state.year) &&
                            year.semesters.map((semester, index) => (
                                <option key={index}>{semester}</option>))
                        ))
                    ))}
                </select>
            </section>
        )
    }
}

export default OptionSelectTeacher;