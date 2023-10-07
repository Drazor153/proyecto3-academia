import { t } from "i18next";
import { IoIosArrowDown } from "react-icons/io";

interface LevelProps {
    level: string,
    isLevelSelect: boolean,
    handlerClickLevel: ({ level }: { level: string }) => void,
    children?: React.ReactNode,
}

function Level({ level, isLevelSelect, handlerClickLevel, children }: LevelProps) {
    return (
        <div className={`dropdown ${isLevelSelect ? "expand" : ""}`}
        >
            <div
                className={`flex ${isLevelSelect ? "active" : ""}`}
                onClick={() => handlerClickLevel({ level: level })}
            >
                <p>{t(level)}</p>
                <IoIosArrowDown className={`ioIosArrowDown ${isLevelSelect ? 'rotate' : ''}`} />
            </div>
            {children}
        </div>
    )
}
interface YearProps {
    year: number,
    isYearSelect: boolean,
    handlerClickYear: ({ year }: { year: number }) => void,
    children?: React.ReactNode,
}


function Year({ year, isYearSelect, handlerClickYear, children }: YearProps) {
    return (
        <div className={`dropdown ${isYearSelect ? "expand" : ""}`}>
            <div
                className={`flex ${isYearSelect ? "active" : ""}`}
                onClick={() => handlerClickYear({ year: year })}
            >
                <p>{year}</p>
                <IoIosArrowDown className={`ioIosArrowDown ${isYearSelect ? 'rotate' : ''}`} />
            </div>
            {children}
        </div>
    )
}

interface SemesterProps {
    semester: number,
    isSemesterSelect: boolean,
    handlerClickSemester: ({ semester }: { semester: number }) => void,
    children?: React.ReactNode,
}

function Semester({ semester, isSemesterSelect, handlerClickSemester, children }: SemesterProps) {
    return (
        <div
            // key={`${level}-${year}-${semester}`}
            className={`dropdown ${isSemesterSelect ? "expand" : ""}`}>
            <div
                className={`flex ${isSemesterSelect ? "active" : ""}`}
                onClick={() => handlerClickSemester({ semester: semester })}
            >
                <p>{t('semester')} {semester}</p>
                <IoIosArrowDown className={`ioIosArrowDown ${isSemesterSelect ? 'rotate' : ''}`} />
            </div>
            {children}
        </div>
    )
}

interface LessonProps {
    lesson: string;
    isLessonSelect: boolean;
    handlerClickLesson: ({ lesson }: {
        lesson: string;
    }) => void;
    children?: React.ReactNode;
}

function Lesson({ lesson, isLessonSelect, handlerClickLesson, children }: LessonProps) {
    return (
        <div
            className={`lesson ${isLessonSelect ? "active" : ""}`}
            onClick={() => handlerClickLesson({ lesson: lesson })}
        >
            {children}
        </div>
    )
}

export { Level, Year, Semester, Lesson };