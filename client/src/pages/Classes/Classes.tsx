import { useEffect, useState } from "react";

import { t } from "i18next";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setClasses } from "../../redux/features/classesSlice";

import * as Selector from './components/Selector';
import ClassTable from "./components/ClassTable";
import { ClassesStudent, ClassesTeacher, Data, StudentLevels, TeacherLevels } from "../../utils/types";



const responseS: Data<StudentLevels[]> = {
  data: [
    {
      year: 2024,
      semester: 1,
      levelName: "elementary",
      status: "in_progress",
      levelCode: "A2",
      lessons: ["lesson A", "lesson B", "lesson C"],
    },
    {
      year: 2023,
      semester: 1,
      levelName: "elementary",
      status: "failed",
      levelCode: "A2",
      lessons: ["lesson A", "lesson B", "lesson C"],
    },
    {
      year: 2022,
      semester: 2,
      levelName: "beginner",
      status: "approved",
      levelCode: "A1",
      lessons: ["lesson A", "lesson B", "lesson C"],
    },
    {
      year: 2022,
      semester: 1,
      levelName: "beginner",
      status: "approved",
      levelCode: "A1",
      lessons: ["lesson A", "lesson B", "lesson C"],
    },
  ]
};

const responseT: Data<TeacherLevels[]> = {
  data: [
    {
      year: 2024,
      semester: 1,
      levelName: "elementary",
      levelCode: "A2",
      lessons: ["lesson A", "lesson C"],
    },
    {
      year: 2023,
      semester: 2,
      levelName: "elementary",
      levelCode: "A2",
      lessons: ["lesson A", "lesson B"],
    },
    {
      year: 2023,
      semester: 1,
      levelName: "elementary",
      levelCode: "A2",
      lessons: ["lesson A", "lesson B"],
    },
    {
      year: 2022,
      semester: 2,
      levelName: "beginner",
      levelCode: "A1",
      lessons: ["lesson A", "lesson B", "lesson C"],
    },
    {
      year: 2022,
      semester: 1,
      levelName: "beginner",
      levelCode: "A1",
      lessons: ["lesson A", "lesson B", "lesson C"],
    }
  ]
}

const classesT: ClassesTeacher[] = [
  {
    week: 1,
    contents: "Basic and advanced grammar, Essential and advanced, Conversation and effective communication in English, Listening and reading comprehension, English pronunciation and intonation, Writing and editing in English, Preparation for English exams, such as TOEFL or IELTS, English for business and professionals, Culture and customs of English- speaking countries",
    lesson: "A",
    attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
  },
  {
    week: 1,
    contents: "Present Simple",
    lesson: "B",
    attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 13", "student 14", "student 15"],
  },
  {
    week: 1,
    contents: "Present Simple",
    lesson: "C",
    attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
  },
  {
    week: 4,
    contents: "Present Simple",
    lesson: "A",
    attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
  },
  {
    week: 5,
    contents: "Present Simple",
    lesson: "B",
    attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 13", "student 14", "student 15"],
  },
  {
    week: 6,
    contents: "Present Simple",
    lesson: "C",
    attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
  },
  {
    week: 7,
    contents: "Present Simple",
    lesson: "A",
    attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
  },
  {
    week: 8,
    contents: "Present Simple",
    lesson: "B",
    attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 13", "student 14", "student 15"],
  },
  {
    week: 9,
    contents: "Present Simple",
    lesson: "C",
    attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
    absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
  }
]

const classesS: ClassesStudent[] = [
  {
    week: 1,
    contents: "Basic and advanced grammar, Essential and advanced, Conversation and effective communication in English, Listening and reading comprehension, English pronunciation and intonation, Writing and editing in English, Preparation for English exams, such as TOEFL or IELTS, English for business and professionals, Culture and customs of English- speaking countries",
    teacher: "Teacher 1",
    lesson: "A",
    attendance: "Present"
  },
  {
    week: 2,
    contents: "Present Simple",
    teacher: "Teacher 2",
    lesson: "B",
    attendance: "Absent"
  },
  {
    week: 3,
    contents: "Present Simple",
    teacher: "Teacher 3",
    lesson: "C",
    attendance: "Present"
  },
  {
    week: 4,
    contents: "Present Simple",
    teacher: "Teacher 1",
    lesson: "A",
    attendance: "Present"
  },
  {
    week: 5,
    contents: "Present Simple",
    teacher: "Teacher 2",
    lesson: "B",
    attendance: "Absent"
  },
  {
    week: 6,
    contents: "Present Simple",
    teacher: "Teacher 3",
    lesson: "C",
    attendance: "Absent"
  },
  {
    week: 7,
    contents: "Present Simple",
    teacher: "Teacher 1",
    lesson: "A",
    attendance: "Present"
  },
  {
    week: 8,
    contents: "Present Simple",
    teacher: "Teacher 2",
    lesson: "B",
    attendance: "Present"
  },
];

type Select = { level: string, year: number, semester: number, lesson: string };

type Levels = {
  [key: string]: {
    [key: number]: {
      [key: number]: {
        // status: string;
        // levelCode: string;
        lessons: string[]
      };
    };
  };
};

function Classes() {

  useTranslation();

  const { role } = useAppSelector(state => state.userReducer)

  const dispatch = useAppDispatch()

  const [select, setSelect] = useState<Select>({
    level: "",
    year: 0,
    semester: 0,
    lesson: "",
  });

  // const { data: response, isLoading: isLoadingLevels } = useGetStudentLevelsQuery({ run: 12345678 });

  // const {data: lessons, isLoading: isLoadingLessons} = useGetStudentLessonsQuery({ run: 12345678 });

  const [levels, setLevels] = useState<Levels>({});

  const handlerClickLevel = ({ level }: { level: string; }) => {
    setSelect({
      level: level === select.level ? "" : level,
      year: 0,
      semester: 0,
      lesson: "",
    });
  };

  const handlerClickYear = ({ year }: { year: number; }) => {
    setSelect((prev) => {
      return {
        ...prev,
        year: year === select.year ? 0 : year,
        semester: 0,
        lesson: "",
      }
    });
  };

  const handlerClickSemester = ({ semester }: { semester: number; }) => {
    setSelect((prev) => {
      return {
        ...prev,
        semester: semester === select.semester ? 0 : semester,
        lesson: "",
      }
    });
  };

  const handlerClickLesson = ({ lesson }: { lesson: string; }) => {
    setSelect((prev) => {
      return {
        ...prev,
        lesson: lesson === select.lesson ? "" : lesson,
      }
    });
  }

  useEffect(() => {

    // if (responseS !== undefined) {
    const levels: Levels = {};

    if (role === 'STUDENT') {


      // (response as Data<StudentLevels[]>).data.map(({ levelName, year, semester, lessons }) => {
      responseS.data.map(({ levelName, year, semester, lessons }) => {
        if (!levels[levelName]) {
          levels[levelName] = {};
        }
        if (!levels[levelName][year]) {
          levels[levelName][year] = {};
        }
        if (!levels[levelName][year][semester]) {
          levels[levelName][year][semester] = {
            // status,
            // levelCode,
            lessons: lessons,
          };
        }
      });

      dispatch(setClasses(classesS));

    } else {
      responseT.data.map(({ levelName, year, semester, lessons }) => {
        if (!levels[levelName]) {
          levels[levelName] = {};
        }
        if (!levels[levelName][year]) {
          levels[levelName][year] = {};
        }
        if (!levels[levelName][year][semester]) {
          levels[levelName][year][semester] = {
            // status,
            // levelCode,
            lessons: lessons,
          };
        }
      });

      dispatch(setClasses(classesT));

    }

    setLevels(levels);

  }, [role]);
  // }, [response]);


  return (
    <>
      <h1>{t('classes')}</h1>
      {/* {(isLoading || isFetching) && (<ThreeDots className="threeDots" fill='#2F4858' />)} */}
      {/* {isSuccess && (<main className="classes-layout"> */}
      {true && (<main className="classes-layout">
        <section className="options-selector">
          <h2>{t('level')}</h2>
          {
            Object.keys(levels).sort().map((level) => {
              const isLevelSelect = level === select.level;
              return <Selector.Level
                key={level}
                level={level}
                isLevelSelect={isLevelSelect}
                handlerClickLevel={handlerClickLevel}
              >
                {
                  Object.keys(levels[level]).reverse().map((year) => {
                    const _year: number = parseInt(year);
                    const isYearSelect = _year === select.year;
                    return <Selector.Year
                      key={`${level}-${year}`}
                      year={_year}
                      isYearSelect={isYearSelect}
                      handlerClickYear={handlerClickYear}
                    >
                      {
                        Object.keys(levels[level][_year]).reverse().map((semester) => {
                          const _semester: number = parseInt(semester);
                          const isSemesterSelect = _semester === select.semester;
                          return <Selector.Semester
                            key={`${level}-${year}-${semester}`}
                            semester={_semester}
                            isSemesterSelect={isSemesterSelect}
                            handlerClickSemester={handlerClickSemester}
                          >
                            {
                              levels[level][_year][_semester].lessons.map((lesson) => {
                                const [_lesson, letter] = lesson.split(" ");
                                const isLessonSelect = lesson === select.lesson;
                                return <Selector.Lesson
                                  key={`${level}-${year}-${semester}-${lesson}`}
                                  lesson={lesson}
                                  isLessonSelect={isLessonSelect}
                                  handlerClickLesson={handlerClickLesson}
                                >
                                  {t(_lesson)} {letter}
                                </Selector.Lesson>
                              })
                            }
                          </Selector.Semester>
                        })
                      }
                    </Selector.Year>
                  })
                }
              </Selector.Level>
            })
          }
        </section>
        <section className="class-list">
          {select.lesson !== "" && (
            <ClassTable
              role={role}
              select={select}
            />
          )}
          {
            select.lesson === "" && (
              <div className="empty-list">
                <p style={{ textAlign: "center" }}>Seleccione un {t('lesson')}</p>
              </div>
            )
          }
        </section>
      </main >)
      }
    </>
  );
}

export default Classes;
