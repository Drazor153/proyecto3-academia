import { ChangeEvent, useEffect, useState } from "react";
import { ClassesStudent, ClassesTeacher } from "../../../utils/types"
import { t } from "i18next";
import { BiSolidPlusSquare } from "react-icons/bi";
import { ImEyeMinus, ImEyePlus } from "react-icons/im";
import { IoIosClose } from "react-icons/io";

interface ClassTableProps {
    classes: ClassesStudent[] | ClassesTeacher[],
    role: string;
}

function ClassTable({ classes, role }: ClassTableProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [watchWeek, setWatchWeek] = useState<number>(0)

    const handlerClickEye = ({ open, week }: { open: boolean, week: number }) => {
        if (open) {
            setWatchWeek(week)
        } else {
            setWatchWeek(0)
        }
        setOpen(open)
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
                        {/* <td>{t('lesson')}</td> */}
                        <td>{t('attendance')}</td>
                        {role === "SUPERUSER" &&
                            <td>{t('actions')}</td>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        role === 'STUDENT' && (classes as ClassesStudent[]).map(({ attendance, contents, lesson, teacher, week }) => {
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
                                    {/* <td>{lesson}</td> */}
                                    <td>
                                        {attendance}
                                    </td>
                                </tr>
                            );
                        }
                        )
                    }
                    {
                        role === 'SUPERUSER' && (classes as ClassesTeacher[]).map(({ absent, attendees, contents, lesson, week }) => {
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
                                    {/* <td>{lesson}</td> */}
                                    <td>
                                        {`${attendees.length.toString().padStart(2, "0")} / ${absent.length + attendees.length} (${Math.round(attendees.length / (absent.length + attendees.length) * 100)}%)`}
                                    </td>
                                    <td>
                                        {(!open || watchWeek !== week) && (
                                            <>
                                                <ImEyePlus onClick={() => handlerClickEye({ open: true, week: week })} className="imEyePlus" />
                                            </>
                                        )}
                                        {
                                            open && watchWeek === week && (<ImEyeMinus onClick={() => handlerClickEye({ open: false, week: week })} className="imEyeMinus" />)
                                        }
                                    </td>
                                </tr>
                            );
                        }
                        )
                    }
                </tbody>
            </table >
            {
                role === 'SUPERUSER' &&
                <ModalClassList
                    open={open}
                    watchWeek={watchWeek}
                    handlerClickEye={handlerClickEye}
                    classes={classes as ClassesTeacher[]}
                />
            }
        </>
    )
}

type ModalClassListProps = {
    open: boolean,
    watchWeek: number,
    handlerClickEye: ({ open, week }: { open: boolean, week: number }) => void,
    classes: ClassesTeacher[],
}

function ModalClassList({ open, watchWeek, handlerClickEye, classes }: ModalClassListProps) {

    const [attendanceList, setAttendanceList] = useState<{ student: string, attendance: string }[]>([])
    const [contents, setContents] = useState<string>("")
    const [lesson, setGroup] = useState<string>("")

    const handlerChangeAttendance = (student: string, attendance: string) => {
        setAttendanceList((prev) => {
            const _attendanceList = [...prev];
            const index = _attendanceList.findIndex(({ student: s }) => s === student);
            _attendanceList[index].attendance = attendance;
            return _attendanceList;
        })
    }

    const handlerClickConfirm = () => {


        const _index = classes.findIndex(({ week }) => week === watchWeek);
        if (_index !== -1) {
            classes[_index] = {
                ...classes[_index],
                contents,
                lesson,
                attendees: attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
                absent: attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
            };
        } else {
            classes.push({
                week: watchWeek,
                contents,
                lesson,
                attendees: attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
                absent: attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
            });
            // classesS.push({
            //     week: watchWeek,
            //     contents,
            //     teacher: "Teacher ...",
            //     lesson,
            //     attendance: "Present",
            // });
        }


        setAttendanceList([]);
        setContents("");
        setGroup("");
        handlerClickEye({ open: false, week: 0 });

    }

    useEffect(() => {
        const _attendanceList: { student: string, attendance: string }[] = [];
        classes.map(
            ({ week, attendees, absent }) => {
                if (week === watchWeek) {
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
        setAttendanceList(_attendanceList);

        const _contents = classes.find(({ week }) => week === watchWeek)?.contents ?? "";
        setContents(_contents);

        const _group = classes.find(({ week }) => week === watchWeek)?.lesson ?? "A";
        setGroup(_group);

    }, [classes, watchWeek]);

    return (<>
        <div className={`background ${open ? 'open' : ''}`} />
        <div className={`attendance ${open ? 'open' : ''}`}>
            <h2>{t('week')} {watchWeek}</h2>
            <IoIosClose className="ioClose" onClick={() => {
                handlerClickEye({ open: false, week: 0 });
                setAttendanceList([]);
            }} />
            <div className="body">
                <div className="content">
                    <p>{t('content')}</p>
                    <input type={"text"} name="content" id="content"
                        value={contents}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setContents(e.target.value)}
                    />
                </div>
                <div className="lesson">
                    <p>{t('lesson')}</p>
                    <select name="lesson" id="lesson" value={lesson}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setGroup(e.target.value)}
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
                            attendanceList.map(({ student, attendance }) => {
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
                        setAttendanceList([]);
                        setContents("");
                        setGroup("");
                        handlerClickEye({ open: false, week: 0 });
                    }}
                >Cancelar</button>
            </div>
        </div >
    </>)
}

export default ClassTable;