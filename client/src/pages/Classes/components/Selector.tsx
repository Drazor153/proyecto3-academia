import { Dispatch } from "react";

import { t } from "i18next";

import { ActionType, TypeKind } from "../reducer/selectedOption";


import { Select } from "../types";

import { IoIosArrowDown } from "react-icons/io";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import { useGetLevelsByRoleRunQuery } from "../../../redux/services/levelsApi";


interface LevelProps {
    level: string,
    isLevelSelect: boolean,
    handlerClickLevel: ({ level }: { level: string }) => void,
    children?: React.ReactNode,
}

export function Level({ level, isLevelSelect, handlerClickLevel, children }: LevelProps) {
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


export function Year({ year, isYearSelect, handlerClickYear, children }: YearProps) {
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

export function Semester({ semester, isSemesterSelect, handlerClickSemester, children }: SemesterProps) {
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
    lesson: {
        id: number;
        lesson: string;
    };
    isLessonSelect: boolean;
    handlerClickLesson: ({ lesson }: {
        lesson: string;
    }) => void;
    children?: React.ReactNode;
}

export function Lesson({ lesson, isLessonSelect, handlerClickLesson, children }: LessonProps) {
    // const letter = ;
    return (
        <div
            className={`lesson ${isLessonSelect ? "active" : ""}`}
            onClick={() => handlerClickLesson({ lesson: `${lesson.id} ${lesson.lesson}` })}
        >
            {children}
        </div>
    )
}
interface SelectorProps {
    run: number;
    role: string;
    select: Select;
    setSelect: Dispatch<ActionType>;
}

export default function Selector({ role, run, select, setSelect }: SelectorProps) {

    const { data: levels, isLoading: isLoadingLevels } = useGetLevelsByRoleRunQuery({ role: role, run: run })

    const handlerClickYear = ({ year }: { year: number }) => {
        setSelect({ type: TypeKind.YEAR, payload: `${year}` });
    }

    const handlerClickSemester = ({ semester }: { semester: number }) => {
        setSelect({ type: TypeKind.SEMESTER, payload: `${semester}` });
    }

    const handlerClickLevel = ({ level }: { level: string }) => {
        setSelect({ type: TypeKind.LEVEL, payload: level });
    }
    const handlerClickLesson = ({ lesson }: { lesson: string }) => {
        setSelect({ type: TypeKind.LESSON, payload: lesson });
    }

    return (
        <>
            <h2>{t('level')}</h2>
            {isLoadingLevels && (<ThreeDots className="threeDots" fill='#2F4858' />)}
            {levels &&
                levels.data.map(({ year, semesters }) => {
                    const isYearSelect = year === select.year;
                    return (
                        <Year
                            key={year}
                            year={year}
                            isYearSelect={isYearSelect}
                            handlerClickYear={handlerClickYear}
                        >
                            {
                                semesters.map(({ semester, levels }) => {
                                    const isSemesterSelect = semester === select.semester;
                                    return (
                                        <Semester
                                            key={`${year}-${semester}`}
                                            semester={semester}
                                            isSemesterSelect={isSemesterSelect}
                                            handlerClickSemester={handlerClickSemester}
                                        >
                                            {
                                                levels.map(({ level, lessons }) => {
                                                    const isLevelSelect = level === select.level;
                                                    return (
                                                        <Level
                                                            key={`${year}-${semester}-${level}`}
                                                            level={level}
                                                            isLevelSelect={isLevelSelect}
                                                            handlerClickLevel={handlerClickLevel}
                                                        >
                                                            {
                                                                lessons.map(({ id, lesson: letter }) => {
                                                                    // const letter = lesson.split(' ')[1];
                                                                    const lesson = { id, lesson: letter }
                                                                    const isLessonSelect = lesson.id === select.lesson.id;
                                                                    return (
                                                                        <Lesson
                                                                            key={`${year}-${semester}-${level}-${letter}`}
                                                                            lesson={lesson}
                                                                            isLessonSelect={isLessonSelect}
                                                                            handlerClickLesson={handlerClickLesson}
                                                                        >
                                                                            {t('lesson')} {letter}
                                                                        </Lesson >
                                                                    )
                                                                })
                                                            }
                                                        </Level>
                                                    )
                                                })
                                            }
                                        </Semester>
                                    )
                                })
                            }
                        </Year>
                    )
                })
            }
        </>
    )
}