import { t } from "i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../redux/hooks";
import { useGetStudentLevelsQuery } from "../redux/services/studentsApi";

import { ImEyeMinus, ImEyePlus } from "react-icons/im";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { ThreeDots } from 'react-loading-icons'
import { BiSolidPlusSquare } from "react-icons/bi";


// const response: StudentLevels = {
//   data: [
//     {
//       year: 2024,
//       semester: 1,
//       levelName: "elementary",
//       status: "in_progress",
//       levelCode: "A2",
//     },
//     {
//       year: 2023,
//       semester: 1,
//       levelName: "elementary",
//       status: "failed",
//       levelCode: "A2",
//     },
//     {
//       year: 2022,
//       semester: 2,
//       levelName: "beginner",
//       status: "approved",
//       levelCode: "A1",
//     },
//     {
//       year: 2022,
//       semester: 1,
//       levelName: "beginner",
//       status: "approved",
//       levelCode: "A1",
//     },
//   ]
// };


type Class = {
  week: number;
  contents: string;
  group: string;
  // topicName: string;
  // levelName: string;
  // semester: number;
  // year: number;
}

type ClassesStudent = {
  teacher: string;
  attendance: string;
} & Class;

type ClassesTeacher = {
  attendees: string[];
  absent: string[];
  // attendees: number;
  // absent: number;
  // attendanceList: string[];
} & Class;

const classesT: ClassesTeacher[] = [
  {
    week: 1,
    contents: "Basic and advanced grammar, Essential and advanced, Conversation and effective communication in English, Listening and reading comprehension, English pronunciation and intonation, Writing and editing in English, Preparation for English exams, such as TOEFL or IELTS, English for business and professionals, Culture and customs of English- speaking countries",
    group: "A",
    attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
  },
  {
    week: 2,
    contents: "Present Simple",
    group: "B",
    attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 13", "student 14", "student 15"],
  },
  {
    week: 3,
    contents: "Present Simple",
    group: "C",
    attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
  },
  {
    week: 4,
    contents: "Present Simple",
    group: "A",
    attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
  },
  {
    week: 5,
    contents: "Present Simple",
    group: "B",
    attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 13", "student 14", "student 15"],
  },
  {
    week: 6,
    contents: "Present Simple",
    group: "C",
    attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
  },
  {
    week: 7,
    contents: "Present Simple",
    group: "A",
    attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
  },
  {
    week: 8,
    contents: "Present Simple",
    group: "B",
    attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 13", "student 14", "student 15"],
  },
]

const classesS: ClassesStudent[] = [
  {
    week: 1,
    contents: "Basic and advanced grammar, Essential and advanced, Conversation and effective communication in English, Listening and reading comprehension, English pronunciation and intonation, Writing and editing in English, Preparation for English exams, such as TOEFL or IELTS, English for business and professionals, Culture and customs of English- speaking countries",
    teacher: "Teacher 1",
    group: "A",
    attendance: "Present"
  },
  {
    week: 2,
    contents: "Present Simple",
    teacher: "Teacher 2",
    group: "B",
    attendance: "Absent"
  },
  {
    week: 3,
    contents: "Present Simple",
    teacher: "Teacher 3",
    group: "C",
    attendance: "Present"
  },
  {
    week: 4,
    contents: "Present Simple",
    teacher: "Teacher 1",
    group: "A",
    attendance: "Present"
  },
  {
    week: 5,
    contents: "Present Simple",
    teacher: "Teacher 2",
    group: "B",
    attendance: "Absent"
  },
  {
    week: 6,
    contents: "Present Simple",
    teacher: "Teacher 3",
    group: "C",
    attendance: "Absent"
  },
  {
    week: 7,
    contents: "Present Simple",
    teacher: "Teacher 1",
    group: "A",
    attendance: "Present"
  },
  {
    week: 8,
    contents: "Present Simple",
    teacher: "Teacher 2",
    group: "B",
    attendance: "Present"
  },
];


const topics: string[] = [
  "grammar",
  "listening & speaking",
  "writing",
];

type SemesterYear = {
  year: number;
  semester: number;
};

function Classes() {
  useTranslation();
  const { role } = useAppSelector(state => state.userReducer)

  const [semesterYear, setSemesterYear] = useState<SemesterYear>({
    year: 0,
    semester: 0,
  });
  const [level, setLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const { data: response, isLoading, isFetching, isSuccess, } = useGetStudentLevelsQuery({ run: 12345678 });

  const [formattedResponse, setFormattedResponse] = useState<{
    [key: string]: {
      [key: number]: {
        [key: number]: {
          status: string;
          levelCode: string;
        };
      };
    };
  }>({});

  const handlerClickLevel = (newLevel: string) => {
    setLevel(newLevel === level ? "" : newLevel);
    setSemesterYear({
      year: 0,
      semester: 0,
    });
    setTopic("");
  };

  const handlerClickYear = (year: number) => {
    setSemesterYear({
      year: year === semesterYear.year ? 0 : year,
      semester: 0,
    });
    setTopic("");
  };

  const handlerClickSemester = (semester: number) => {
    setSemesterYear((prev) => {
      return {
        ...prev,
        semester: semester === semesterYear.semester ? 0 : semester,
      };
    });
    setTopic("");
  };

  const handlerClickTopic = (newTopic: string) => {
    setTopic(newTopic === topic ? "" : newTopic);
  }

  useEffect(() => {

    if (response !== undefined) {

      const _formattedResponse: {
        [key: string]: {
          [key: number]: {
            [key: number]: {
              status: string;
              levelCode: string;
            };
          };
        };
      } = {};

      response.data.map(({ levelName, year, semester, status, levelCode }) => {
        if (!_formattedResponse[levelName]) {
          _formattedResponse[levelName] = {};
        }
        if (!_formattedResponse[levelName][year]) {
          _formattedResponse[levelName][year] = {};
        }
        if (!_formattedResponse[levelName][year][semester]) {
          _formattedResponse[levelName][year][semester] = {
            status,
            levelCode,
          };
        }
      });

      setFormattedResponse(_formattedResponse);
    }

  }, [response]);


  return (
    <>
      <h1>{t('classes')}</h1>
      {(isLoading || isFetching) && (<ThreeDots className="threeDots" fill='#2F4858' />)}
      {isSuccess && (<main className="classes-layout">
        {/* {true && (<main className="classes-layout"> */}
        <section className="options-selector">
          <h2>{t('level')}</h2>
          {
            Object.keys(formattedResponse).map((levelName) => {
              const isLevelSelect = levelName === level;
              return (
                <div key={levelName}
                  className={`dropdown ${isLevelSelect ? "expand" : ""}`}
                >
                  <div
                    className={`flex ${isLevelSelect ? "active" : ""}`}
                    onClick={() => handlerClickLevel(levelName)}
                  >
                    <p>{t(levelName)}</p>
                    <IoIosArrowDown className={`ioIosArrowDown ${isLevelSelect ? 'rotate' : ''}`} />
                  </div>
                  {
                    Object.keys(formattedResponse[levelName]).map((year) => {
                      const _year: number = parseInt(year);
                      const isYearSelect = _year === semesterYear.year;
                      return <div
                        key={`${levelName}-${year}`}
                        className={`dropdown ${isYearSelect ? "expand" : ""}`}>
                        <div
                          className={`flex ${isYearSelect ? "active" : ""}`}
                          onClick={() => handlerClickYear(_year)}
                        >
                          <p>{year}</p>
                          <IoIosArrowDown className={`ioIosArrowDown ${isYearSelect ? 'rotate' : ''}`} />
                        </div>
                        {
                          Object.keys(formattedResponse[levelName][_year]).map((semester) => {
                            const _semester: number = parseInt(semester);
                            const isSemesterSelect = _semester === semesterYear.semester;
                            return <div
                              key={`${levelName}-${year}-${semester}`}
                              className={`dropdown ${isSemesterSelect ? "expand" : ""}`}>
                              <div
                                className={`flex ${isSemesterSelect ? "active" : ""}`}
                                onClick={() => handlerClickSemester(_semester)}
                              >
                                <p>{t('semester')} {_semester}</p>
                                <IoIosArrowDown className={`ioIosArrowDown ${isSemesterSelect ? 'rotate' : ''}`} />
                              </div>
                              {
                                topics.map((tc) => {
                                  const [t1, t2, t3] = tc.split(" ");
                                  return <div
                                    key={`${levelName}-${year}-${semester}-${tc}`}
                                    className={`topic ${tc === topic ? "active" : ""}`}
                                    onClick={() => handlerClickTopic(tc)}
                                  >
                                    {t(t1)} {t2 && t(t2)} {t3 && t(t3)}
                                  </div>
                                })
                              }
                            </div>
                          })
                        }
                      </div>
                    })
                  }
                </div>
              )
            })
          }
        </section>
        <section className="class-list">
          {topic !== "" && (
            <ClassTable
              classes={role === 'STUDENT' ? classesS : classesT}
            />
          )}
          {
            topic === "" && (
              <div className="empty-list">
                <p style={{ textAlign: "center" }}>Seleccione un tópico</p>
              </div>
            )
          }
        </section>
      </main >)
      }
    </>
  );
}

interface ClassTableProps {
  classes: ClassesStudent[] | ClassesTeacher[],
}

function ClassTable({ classes }: ClassTableProps) {
  const { role } = useAppSelector(state => state.userReducer)
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
          <tr>
            <td>{t('week')}</td>
            <td>{t('content')}</td>
            {role === 'STUDENT' &&
              <td>{t('teacher')}</td>
            }
            <td>{t('group')}</td>
            <td>{t('attendance')}</td>
            {role === "SUPERUSER" &&
              <td>{t('actions')}</td>
            }
          </tr>
        </thead>
        <tbody>
          {
            role === 'STUDENT' && (classes as ClassesStudent[]).map(({ attendance, contents, group, teacher, week }) => {
              const contentsList = contents.split(',')
              return (
                <tr key={week}>
                  <td>{week}</td>
                  <td datatype="content">{
                    contentsList.map((content) => (
                      <p key={content.trim()}>
                        {content.trim()}
                      </p>
                    ))}</td>
                  <td datatype="teacher">{teacher}</td>
                  <td>{group}</td>
                  <td>
                    {attendance}
                  </td>
                </tr>
              );
            }
            )
          }
          {
            role === 'SUPERUSER' && (classes as ClassesTeacher[]).map(({ absent, attendees, contents, group, week }) => {
              const contentsList = contents.split(',')
              return (
                <tr key={week}>
                  <td>{week}</td>
                  <td datatype="content">
                    {contentsList.map((content) => (
                      <p key={content.trim()}>
                        {content.trim()}
                      </p>
                    ))}
                  </td>
                  <td>{group}</td>
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
  const [group, setGroup] = useState<string>("")

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
        group,
        attendees: attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
        absent: attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
      };
    } else {
      classes.push({
        week: watchWeek,
        contents,
        group,
        attendees: attendanceList.filter(({ attendance }) => attendance === "Present").map(({ student }) => student),
        absent: attendanceList.filter(({ attendance }) => attendance === "Absent").map(({ student }) => student),
      });
      classesS.push({
        week: watchWeek,
        contents,
        teacher: "Teacher ...",
        group,
        attendance: "Present",
      });
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

    const _group = classes.find(({ week }) => week === watchWeek)?.group ?? "A";
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
        <div className="group">
          <p>{t('group')}</p>
          <select name="group" id="group" value={group}
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

export default Classes;
