import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { t } from "i18next";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteClasses } from "../../../redux/features/classesSlice";

import { ClassesStudent, ClassesTeacher } from "../../../utils/types"

import { BiSolidPlusSquare } from "react-icons/bi";
import { ImEyeMinus, ImEyePlus } from "react-icons/im";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

type Select = { level: string, year: number, semester: number, lesson: string };

interface ClassTableProps {
    role: string;
    select: Select;
}

function ClassTable({ role, select }: ClassTableProps) {
    const classes = useAppSelector(state => state.classesReducer) as ClassesStudent[] | ClassesTeacher[];
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState<boolean>(false)
    // const [weekSelect, setWeekSelect] = useState<number>(0)

    const [selectedClass, setSelectedClass] = useState<SelectedClass>({
        attendanceList: [],
        contents: "",
        lesson: "",
        teacher: "",
        week: 0,
        id: -1,
    })

    const handlerClickEye = ({ id }: { id: number }) => {

        const attendanceList: AttendanceList = [];

        if (id > -1) {
            const { attendees, students, contents, week, lesson } = (classes as ClassesTeacher[]).find(({ id: _id }) => _id === id)!;

            students.map((student) => {
                attendanceList.push({ student, attendance: attendees.includes(student) ? "Present" : "Absent" });
            });

            setSelectedClass({
                attendanceList: attendanceList,
                contents: contents,
                id: id,
                lesson: lesson,
                teacher: "this.name",
                week: week,
            });
        } else {
            const { students, week } = (classes as ClassesTeacher[]).reverse()[0] ?? {
                students: [
                    "Student 1",
                    "Student 2",
                    "Student 3",
                    "Student 4",
                    "Student 5",
                    "Student 6",
                    "Student 7",
                    "Student 8",
                    "Student 9",
                    "Student 10",
                    "Student 11",
                    "Student 12",
                    "Student 13",
                    "Student 14",
                    "Student 15",
                ], week: 0
            };
            students.map((student) => {
                attendanceList.push({ student, attendance: "absent" });
            });
            setSelectedClass({
                attendanceList: attendanceList,
                contents: "",
                id: -1,
                lesson: select.lesson.split(' ')[1],
                teacher: "this.name",
                week: week + 1,
            });
        }
        setShowModal(!showModal)
    }

    const handlerClickDelete = ({ id }: { id: number; }) => {
        dispatch(deleteClasses(id));
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
                                    onClick={() => handlerClickEye({ id: -1 })}
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
                        role === 'SUPERUSER' && (classes as ClassesTeacher[]).map(({ id, students, attendees, contents, week, lesson: lesson }) => {
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
                                            {`${attendees.length.toString().padStart(2, "0")} / ${students.length} (${Math.round(attendees.length / (students.length) * 100)}%)`}
                                        </td>
                                        <td>
                                            {(!showModal) && (
                                                <>
                                                    <ImEyePlus onClick={() => handlerClickEye({ id: id! })} className="imEyePlus" />
                                                </>
                                            )}
                                            {
                                                showModal && (<ImEyeMinus className="imEyeMinus" />)
                                            }
                                            <MdOutlineDeleteForever onClick={() => handlerClickDelete({ id: id! })} className="mdOutlineDeleteForever" />
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
                    showModal={showModal}
                    handlerClickEye={handlerClickEye}
                    select={select}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                />
            }
        </>
    )
}

type ModalClassListProps = {
    showModal: boolean,
    handlerClickEye: ({ id }: { id: number }) => void,
    select: Select,
    selectedClass: SelectedClass,
    setSelectedClass: Dispatch<SetStateAction<SelectedClass>>
}

type AttendanceList = { student: string, attendance: string }[];

type SelectedClass = {
    attendanceList: AttendanceList;
    contents: string;
    id: number;
    lesson: string;
    teacher: string;
    week: number;
}

function ModalClassList({ showModal, handlerClickEye, selectedClass, setSelectedClass }: ModalClassListProps) {

    // const classes = useAppSelector(state => state.classesReducer) as ClassesTeacher[];
    // const dispatch = useAppDispatch();

    // const [data, setData] = useState<SelectedClass>(dataClass);

    // const handlerChangeAttendance = (student: string, attendance: string) => {
    //     setData((prev) => {
    //         const attendanceList = [...prev.attendanceList];
    //         const index = attendanceList.findIndex(({ student: s }) => s === student);
    //         attendanceList[index].attendance = attendance;
    //         return {
    //             ...prev,
    //             attendanceList: attendanceList,
    //         };
    //     })
    // }

    // const handlerClickConfirm = () => {

    //     const index = classes.findIndex(({ week, year, semester, lesson, level }) => {
    //         const isLevelSelect = level === select.level;
    //         const isYearSelect = year === select.year;
    //         const isSemesterSelect = semester === select.semester;
    //         const isLessonSelect = lesson === select.lesson.split(' ')[1];
    //         const isWeekSelect = week === weekSelect;
    //         return isLevelSelect && isYearSelect && isSemesterSelect && isLessonSelect && isWeekSelect;
    //     });
    //     if (index !== -1) {
    //         dispatch(updateClasses({
    //             index: index,
    //             class: {
    //                 ...classes[index],
    //                 contents: selectedClass.contents,
    //                 lesson: selectedClass.lesson,
    //                 attendees: selectedClass.attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
    //                 absent: selectedClass.attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
    //             }
    //         }));
    //     } else {
    //         dispatch(pushClasses({
    //             week: weekSelect,
    //             contents: selectedClass.contents,
    //             lesson: selectedClass.lesson,
    //             attendees: selectedClass.attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
    //             absent: selectedClass.attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
    //         }));
    //     }

    //     //TODO updateQueryDB

    //     setData({
    //         attendanceList: [],
    //         contents: "",
    //         lesson: "",
    //     });

    //     handlerClickEye({ showModal: false, week: 0 });

    // }

    // useEffect(() => {
    //     const _attendanceList: AttendanceList = [];
    //     classes.map(
    //         ({ week, attendees, absent, year, semester, lesson, level }) => {
    //             const isLevelSelect = level === select.level;
    //             const isYearSelect = year === select.year;
    //             const isSemesterSelect = semester === select.semester;
    //             const isLessonSelect = lesson === select.lesson.split(' ')[1];
    //             const isWeekSelect = week === weekSelect;
    //             if (isLevelSelect && isYearSelect && isSemesterSelect && isLessonSelect && isWeekSelect) {
    //                 attendees.map((student) => {
    //                     _attendanceList.push({ student, attendance: "Present" });
    //                 });
    //                 absent.map((student) => {
    //                     _attendanceList.push({ student, attendance: "Absent" });
    //                 });
    //             }
    //         }
    //     );

    //     if (_attendanceList.length === 0) {
    //         Array.from({ length: 15 }, (_, i) => `Student ${i + 1}`).map((student) => { _attendanceList.push({ student, attendance: "Absent" }) });
    //     }

    //     _attendanceList.sort((a, b) => {
    //         if (a.student < b.student) {
    //             return -1;
    //         }
    //         if (a.student > b.student) {
    //             return 1;
    //         }
    //         return 0;
    //     });


    //     const _contents = classes.find(({ week }) => week === week)?.contents ?? "";

    //     const _lesson = classes.find(({ week }) => week === week)?.lesson ?? "A";

    //     setData({
    //         attendanceList: _attendanceList,
    //         contents: _contents,
    //         lesson: _lesson,
    //     });

    // }, [classes, weekSelect]);

    return (<>
        <div className={`background ${showModal ? 'showModal' : ''}`} />
        <div className={`attendance ${showModal ? 'showModal' : ''}`}>
            <h2>{t('week')} {selectedClass.week}</h2>
            <IoIosClose className="ioClose" onClick={() => {
                handlerClickEye({ id: -1 });
                // setData((prev) => {
                //     return {
                //         ...prev,
                //         attendanceList: [],
                //     }
                // });
            }} />
            <div className="body">
                <div className="content">
                    <p>{t('content')}</p>
                    <input type={"text"} name="content" id="content"
                        value={selectedClass.contents}
                    // onChange={(e: ChangeEvent<HTMLInputElement>) => setData((prev) => { return { ...prev, content: e.target.value } })}
                    />
                </div>
                <div className="lesson">
                    <p>{t('lesson')}</p>
                    <input type="text" name="lesson" id="lesson" value={selectedClass.lesson} readOnly />
                </div>
                <div className="teacher">
                    <p>{t('teacher')}</p>
                    <input type="text" name="teacher" id="teacher" defaultValue={selectedClass.teacher} readOnly />
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
                            selectedClass.attendanceList.map(({ student, attendance }) => {
                                return (
                                    <tr key={`${student}-${attendance}`} className="student">
                                        <td>
                                            <p>{student}</p>
                                        </td>
                                        <td>
                                            <p>{t('present')}</p>
                                            <input type="checkbox" name={`attendance ${student}`} id={`attendance ${student}`} checked={attendance === 'present'}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    const attendanceList = [...selectedClass.attendanceList];
                                                    const index = attendanceList.findIndex(({ student: s }) => {
                                                        return s === student;
                                                    });
                                                    attendanceList[index].attendance = e.target.checked ? 'present' : 'absent';
                                                    setSelectedClass({ ...selectedClass, attendanceList: attendanceList });
                                                }}
                                            />
                                            <label className="label-attendance" htmlFor={`attendance ${student}`}></label>
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
                // onClick={handlerClickConfirm}
                >Confirmar</button>
                <button className="cancel"
                    onClick={() => {
                        // setData({
                        //     attendanceList: [],
                        //     contents: "",
                        //     lesson: "",
                        // });
                        handlerClickEye({ id: -1 });
                    }}
                >Cancelar</button>
            </div>
        </div >
    </>)
}

export default ClassTable;
