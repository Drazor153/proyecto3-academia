import { useReducer } from "react";

import { t } from "i18next";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../redux/hooks";

import ClassTable from "./components/ClassTable";
// import { ClassesStudent, ClassesTeacher } from "../../utils/types";
import { reducer } from "./reducer/selectedOption";
import Selector from "./components/Selector";

// const responseS: Data<Level[]> = {
//   data: [
//     {
//       year: 2024,
//       semester: 1,
//       levelName: "elementary",
//       status: "in_progress",
//       levelCode: "A2",
//       lessons: ["lesson A", "lesson B", "lesson C"],
//     },
//     {
//       year: 2023,
//       semester: 1,
//       levelName: "elementary",
//       status: "failed",
//       levelCode: "A2",
//       lessons: ["lesson A", "lesson B", "lesson C"],
//     },
//     {
//       year: 2022,
//       semester: 2,
//       levelName: "beginner",
//       status: "approved",
//       levelCode: "A1",
//       lessons: ["lesson A", "lesson B", "lesson C"],
//     },
//     {
//       year: 2022,
//       semester: 1,
//       levelName: "beginner",
//       status: "approved",
//       levelCode: "A1",
//       lessons: ["lesson A", "lesson B", "lesson C"],
//     },
//   ]
// };

// const responseT: Data<Level[]> = {
//   data: [
//     {
//       year: 2024,
//       semester: 1,
//       levelName: "elementary",
//       levelCode: "A2",
//       lessons: ["lesson A", "lesson C"],
//     },
//     {
//       year: 2023,
//       semester: 2,
//       levelName: "elementary",
//       levelCode: "A2",
//       lessons: ["lesson A", "lesson B"],
//     },
//     {
//       year: 2023,
//       semester: 1,
//       levelName: "elementary",
//       levelCode: "A2",
//       lessons: ["lesson A", "lesson B"],
//     },
//     {
//       year: 2022,
//       semester: 2,
//       levelName: "beginner",
//       levelCode: "A1",
//       lessons: ["lesson A", "lesson B", "lesson C"],
//     },
//     {
//       year: 2022,
//       semester: 1,
//       levelName: "beginner",
//       levelCode: "A1",
//       lessons: ["lesson A", "lesson B", "lesson C"],
//     }
//   ]
// }

// const classesT: ClassesTeacher[] = [
//   {
//     week: 1,
//     contents: "Basic and advanced grammar, Essential and advanced, Conversation and effective communication in English, Listening and reading comprehension, English pronunciation and intonation, Writing and editing in English, Preparation for English exams, such as TOEFL or IELTS, English for business and professionals, Culture and customs of English- speaking countries",
//     lesson: "A",
//     attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
//   },
//   {
//     week: 1,
//     contents: "Present Simple",
//     lesson: "B",
//     attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 13", "student 14", "student 15"],
//   },
//   {
//     week: 1,
//     contents: "Present Simple",
//     lesson: "C",
//     attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
//   },
//   {
//     week: 4,
//     contents: "Present Simple",
//     lesson: "A",
//     attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
//   },
//   {
//     week: 5,
//     contents: "Present Simple",
//     lesson: "B",
//     attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 13", "student 14", "student 15"],
//   },
//   {
//     week: 6,
//     contents: "Present Simple",
//     lesson: "C",
//     attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
//   },
//   {
//     week: 7,
//     contents: "Present Simple",
//     lesson: "A",
//     attendees: ["student 1", "student 2", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 3", "student 4", "student 5", "student 13", "student 14", "student 15"],
//   },
//   {
//     week: 8,
//     contents: "Present Simple",
//     lesson: "B",
//     attendees: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 13", "student 14", "student 15"],
//   },
//   {
//     week: 9,
//     contents: "Present Simple",
//     lesson: "C",
//     attendees: ["student 7", "student 8", "student 9", "student 10", "student 11", "student 12"],
//     absent: ["student 1", "student 2", "student 3", "student 4", "student 5", "student 6", "student 13", "student 14", "student 15"],
//   }
// ]

// const classesS: ClassesStudent[] = [
//   {
//     week: 1,
//     contents: "Basic and advanced grammar, Essential and advanced, Conversation and effective communication in English, Listening and reading comprehension, English pronunciation and intonation, Writing and editing in English, Preparation for English exams, such as TOEFL or IELTS, English for business and professionals, Culture and customs of English- speaking countries",
//     teacher: "Teacher 1",
//     lesson: "A",
//     attendance: "Present"
//   },
//   {
//     week: 2,
//     contents: "Present Simple",
//     teacher: "Teacher 2",
//     lesson: "B",
//     attendance: "Absent"
//   },
//   {
//     week: 3,
//     contents: "Present Simple",
//     teacher: "Teacher 3",
//     lesson: "C",
//     attendance: "Present"
//   },
//   {
//     week: 4,
//     contents: "Present Simple",
//     teacher: "Teacher 1",
//     lesson: "A",
//     attendance: "Present"
//   },
//   {
//     week: 5,
//     contents: "Present Simple",
//     teacher: "Teacher 2",
//     lesson: "B",
//     attendance: "Absent"
//   },
//   {
//     week: 6,
//     contents: "Present Simple",
//     teacher: "Teacher 3",
//     lesson: "C",
//     attendance: "Absent"
//   },
//   {
//     week: 7,
//     contents: "Present Simple",
//     teacher: "Teacher 1",
//     lesson: "A",
//     attendance: "Present"
//   },
//   {
//     week: 8,
//     contents: "Present Simple",
//     teacher: "Teacher 2",
//     lesson: "B",
//     attendance: "Present"
//   },
// ];


function Classes() {

  useTranslation();

  const { role } = useAppSelector(state => state.userReducer)

  const [select, setSelect] = useReducer(reducer, {
    year: 0,
    semester: 0,
    level: "",
    lesson: "",
  });


  return (
    <>
      <h1>{t('classes')}</h1>
      <main className="classes-layout">
        <section className="options-selector">
          <Selector
            role={role === 'STUDENT' ? 'students' : 'teachers'}
            run={role === 'STUDENT' ? 7221200 : 87654321}
            select={select}
            setSelect={setSelect}
          />
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
                <p style={{ textAlign: "center" }}>{t('select a lesson')}</p>
              </div>
            )
          }
        </section>
      </main >
    </>
  );
}

export default Classes;

