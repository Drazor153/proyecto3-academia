import { ChangeEvent, useEffect, useState } from "react";
import { ClassesStudent, ClassesTeacher } from "../../../utils/types"
import { t } from "i18next";
import { BiSolidPlusSquare } from "react-icons/bi";
import { ImEyeMinus, ImEyePlus } from "react-icons/im";
import { IoIosClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteClasses, pushClasses, updateClasses } from "../../../redux/features/classesSlice";
import { MdOutlineDeleteForever } from "react-icons/md";

type Select = { level: string, year: number, semester: number, lesson: string };

interface ClassTableProps {
    role: string;
    select: Select;
}

function ClassTable({ role, select }: ClassTableProps) {
    const classes = useAppSelector(state => state.classesReducer) as ClassesStudent[] | ClassesTeacher[];
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false)
    const [weekSelect, setWeekSelect] = useState<number>(0)

    const handlerClickEye = ({ open, week }: { open: boolean, week: number }) => {
        if (open) {
            setWeekSelect(week)
        } else {
            setWeekSelect(0)
        }
        setOpen(open)
    }

    const handlerClickDelete = ({ index }: { index: number; }) => {
        dispatch(deleteClasses(index));
        //TODO deleteQueryDB
    }

    return (
        <>
            <table
                className="table-class-list"
                user-role={role}
            >
                <thead>
                    <tr>
                        <td colSpan={5}>
                            {t('class_list')}
                            {
                                role === "SUPERUSER" &&
                                <BiSolidPlusSquare className="biSolidPlusSquare"
                                    onClick={() => handlerClickEye({ open: true, week: classes.length + 1 })}
                                />
                            }
                        </td>
                    </tr>
                    <tr className="grid">
                        <td>{t('week')}</td>
                        <td>{t('content')}</td>
                        {role === 'STUDENT' &&
                            <td>{t('teacher')}</td>
                        }
                        <td>{t('attendance')}</td>
                        {role === "SUPERUSER" &&
                            <td>{t('actions')}</td>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        role === 'STUDENT' && (classes as ClassesStudent[]).map(({ attendance, contents, teacher, week, lesson: lesson }) => {
                            if (select.lesson.split(' ')[1] === lesson) {
                                const contentsList = contents.split(',')
                                return (
                                    <tr key={week} className="grid">
                                        <td>{week}</td>
                                        <td datatype="content">{
                                            contentsList.map((content) => (
                                                <p key={content.trim()}>
                                                    {content.trim()}
                                                </p>
                                            ))}</td>
                                        <td datatype="teacher">{teacher}</td>
                                        <td>
                                            {attendance}
                                        </td>
                                    </tr>
                                );
                            }
                        }
                        )
                    }
                    {
                        role === 'SUPERUSER' && (classes as ClassesTeacher[]).map(({ absent, attendees, contents, week, lesson: lesson }, index) => {
                            if (select.lesson.split(' ')[1] === lesson) {
                                const contentsList = contents.split(',')
                                return (
                                    <tr key={week} className="grid">
                                        <td>{week}</td>
                                        <td datatype="content">
                                            {contentsList.map((content) => (
                                                <p key={content.trim()}>
                                                    {content.trim()}
                                                </p>
                                            ))}
                                        </td>
                                        <td>
                                            {`${attendees.length.toString().padStart(2, "0")} / ${absent.length + attendees.length} (${Math.round(attendees.length / (absent.length + attendees.length) * 100)}%)`}
                                        </td>
                                        <td>
                                            {(!open || weekSelect !== week) && (
                                                <>
                                                    <ImEyePlus onClick={() => handlerClickEye({ open: true, week: week })} className="imEyePlus" />
                                                </>
                                            )}
                                            {
                                                open && weekSelect === week && (<ImEyeMinus onClick={() => handlerClickEye({ open: false, week: week })} className="imEyeMinus" />)
                                            }
                                            <MdOutlineDeleteForever onClick={() => handlerClickDelete({ index: index })} className="mdOutlineDeleteForever" />
                                        </td>
                                    </tr>
                                );
                            }
                        }
                        )
                    }
                </tbody>
            </table >
            {
                role === 'SUPERUSER' &&
                <ModalClassList
                    open={open}
                    weekSelect={weekSelect}
                    handlerClickEye={handlerClickEye}
                    select={select}
                />
            }
        </>
    )
}

type ModalClassListProps = {
    open: boolean,
    weekSelect: number,
    handlerClickEye: ({ open, week }: { open: boolean, week: number }) => void,
    select: Select,
}

type AttendanceList = { student: string, attendance: string }[];

type DataType = {
    attendanceList: AttendanceList,
    contents: string,
    lesson: string,
}

function ModalClassList({ open, weekSelect, handlerClickEye, select }: ModalClassListProps) {

    const classes = useAppSelector(state => state.classesReducer) as ClassesTeacher[];
    const dispatch = useAppDispatch();

    const [data, setData] = useState<DataType>({
        attendanceList: [],
        contents: "",
        lesson: "",
    });

    const handlerChangeAttendance = (student: string, attendance: string) => {
        setData((prev) => {
            const attendanceList = [...prev.attendanceList];
            const index = attendanceList.findIndex(({ student: s }) => s === student);
            attendanceList[index].attendance = attendance;
            return {
                ...prev,
                attendanceList: attendanceList,
            };
        })
    }

    const handlerClickConfirm = () => {

        const index = classes.findIndex(({ week, year, semester, lesson, level }) => {
            const isLevelSelect = level === select.level;
            const isYearSelect = year === select.year;
            const isSemesterSelect = semester === select.semester;
            const isLessonSelect = lesson === select.lesson.split(' ')[1];
            const isWeekSelect = week === weekSelect;
            return isLevelSelect && isYearSelect && isSemesterSelect && isLessonSelect && isWeekSelect;
        });
        if (index !== -1) {
            dispatch(updateClasses({
                index: index,
                class: {
                    ...classes[index],
                    contents: data.contents,
                    lesson: data.lesson,
                    attendees: data.attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
                    absent: data.attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
                }
            }));
        } else {
            dispatch(pushClasses({
                week: weekSelect,
                contents: data.contents,
                lesson: data.lesson,
                attendees: data.attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
                absent: data.attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
            }));
        }

        //TODO updateQueryDB

        setData({
            attendanceList: [],
            contents: "",
            lesson: "",
        });

        handlerClickEye({ open: false, week: 0 });

    }

    useEffect(() => {
        const _attendanceList: AttendanceList = [];
        classes.map(
            ({ week, attendees, absent, year, semester, lesson, level }) => {
                const isLevelSelect = level === select.level;
                const isYearSelect = year === select.year;
                const isSemesterSelect = semester === select.semester;
                const isLessonSelect = lesson === select.lesson.split(' ')[1];
                const isWeekSelect = week === weekSelect;
                if (isLevelSelect && isYearSelect && isSemesterSelect && isLessonSelect && isWeekSelect) {
                    attendees.map((student) => {
                        _attendanceList.push({ student, attendance: "Present" });
                    });
                    absent.map((student) => {
                        _attendanceList.push({ student, attendance: "Absent" });
                    });
                }
            }
        );

        if (_attendanceList.length === 0) {
            Array.from({ length: 15 }, (_, i) => `Student ${i + 1}`).map((student) => { _attendanceList.push({ student, attendance: "Absent" }) });
        }

        _attendanceList.sort((a, b) => {
            if (a.student < b.student) {
                return -1;
            }
            if (a.student > b.student) {
                return 1;
            }
            return 0;
        });


        const _contents = classes.find(({ week }) => week === week)?.contents ?? "";

        const _lesson = classes.find(({ week }) => week === week)?.lesson ?? "A";

        setData({
            attendanceList: _attendanceList,
            contents: _contents,
            lesson: _lesson,
        });

    }, [classes, weekSelect]);

    return (<>
        <div className={`background ${open ? 'open' : ''}`} />
        <div className={`attendance ${open ? 'open' : ''}`}>
            <h2>{t('week')} {weekSelect}</h2>
            <IoIosClose className="ioClose" onClick={() => {
                handlerClickEye({ open: false, week: 0 });
                setData((prev) => {
                    return {
                        ...prev,
                        attendanceList: [],
                    }
                });
            }} />
            <div className="body">
                <div className="content">
                    <p>{t('content')}</p>
                    <input type={"text"} name="content" id="content"
                        value={data.contents}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData((prev) => { return { ...prev, content: e.target.value } })}
                    />
                </div>
                <div className="lesson">
                    <p>{t('lesson')}</p>
                    <select name="lesson" id="lesson" value={data.lesson}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setData((prev) => { return { ...prev, lesson: e.target.value } })}
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div className="teacher">
                    <p>{t('teacher')}</p>
                    <input type="text" name="teacher" id="teacher" defaultValue={"Teacher ..."} readOnly />
                </div>
                <table className="table-attendance-list">
                    <thead>
                        <tr>
                            <td colSpan={2}>
                                <p>{t('attendance_list')}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{t('students')}</td>
                            <td>{t('attendance')}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.attendanceList.map(({ student, attendance }) => {
                                return (
                                    <tr key={`${student}-${attendance}`} className="student">
                                        <td>
                                            <p>{student}</p>
                                        </td>
                                        <td>
                                            <select name="attendance" id="attendance" value={attendance}
                                                onChange={(e: ChangeEvent<HTMLSelectElement>) => handlerChangeAttendance(student, e.target.value)}
                                            >
                                                <option value="Present">{t('present')}</option>
                                                <option value="Absent">{t('absent')}</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="footer">
                <button className="confirm"
                    onClick={handlerClickConfirm}
                >Confirmar</button>
                <button className="cancel"
                    onClick={() => {
                        setData({
                            attendanceList: [],
                            contents: "",
                            lesson: "",
                        });
                        handlerClickEye({ open: false, week: 0 });
                    }}
                >Cancelar</button>
            </div>
        </div >
    </>)
}

export default ClassTable;
