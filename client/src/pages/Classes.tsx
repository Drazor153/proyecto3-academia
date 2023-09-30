import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IoIosArrowDown } from "react-icons/io";


var iL = "";
var iY = 0;

const enrol: {
  year: number;
  semester: number;
  levelName: string;
  status: string;
}[] = [
    {
      year: 2024,
      semester: 1,
      levelName: "basic",
      status: "in_progress",
    },
    {
      year: 2023,
      semester: 1,
      levelName: "basic",
      status: "failed",
    },
    {
      year: 2022,
      semester: 2,
      levelName: "beginner",
      status: "approved",
    },
    {
      year: 2022,
      semester: 1,
      levelName: "beginner",
      status: "approved",
    },
  ];


// const levels: {
//   id: string;
//   name: string;
// }[] = [
//     {
//       id: "A1",
//       name: "Principiante"
//     },
//     {
//       id: "A2",
//       name: "Elemental"
//     },
//     {
//       id: "B1",
//       name: "Intermedio"
//     },
//     {
//       id: "B2",
//       name: "Intermedio-Superior"
//     },
//     {
//       id: "C1",
//       name: "Avanzado"
//     }
//   ]

const topics: string[] = [
  "grammar",
  "listening & speaking",
  "writing",
];

// const groups: string[] = ["A", "B", "C"];

function Classes() {

  useTranslation();


  const [semesterYear, setSemesterYear] = useState<{
    year: number;
    semester: number;
  }>({
    year: 0,
    semester: 0,
  });
  const [level, setLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");



  const handlerClickLevel = (newLevel: string) => {
    setLevel(newLevel === level ? "" : newLevel);
    setSemesterYear({
      year: 0,
      semester: 0,
    });
    setTopic("");
  }

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
    console.log(topic);
  }, [topic])

  return (
    <>
      <h1>{t('classes')}</h1>
      <main className="classes-layout">
        <section className="options-selector">
          <h2>{t('level')}</h2>
          {
            enrol.map(({ levelName }) => {
              const isLevelSelect = levelName === level;
              if (iL !== levelName) {
                iL = levelName
                return <div
                  key={levelName}
                  className={`dropdown ${isLevelSelect ? "expand" : ""}`}
                >
                  <div
                    className={`flex ${isLevelSelect ? "active" : ""}`}
                    onClick={() => handlerClickLevel(levelName)}
                  >
                    <p>{t(levelName)}</p>
                    <IoIosArrowDown className={`ioIosArrowDown ${isLevelSelect ? 'rotate' : ''}`}></IoIosArrowDown>
                  </div>
                  {
                    enrol.map(({ year, semester, levelName: lName }) => {
                      const isLevel = lName === levelName;
                      const isYear = iY !== year;
                      if (isLevel && isYear) {
                        iY = year;
                        const isYearSelect = year === semesterYear.year;
                        return <div
                          key={`${levelName}-${year}-${semester}`}
                          className={`dropdown ${isYearSelect ? "expand" : ""}`}>
                          <div
                            className={`flex ${isYearSelect ? "active" : ""}`}
                            onClick={() => handlerClickYear(year)}>
                            <p>{year}</p>
                            <IoIosArrowDown className={`ioIosArrowDown ${isYearSelect ? 'rotate' : ''}`}></IoIosArrowDown>
                          </div>
                          {
                            enrol.map(({ year: y, semester }) => {
                              if (isLevel && year === y) {
                                const isSemesterSelect = semester === semesterYear.semester;
                                return <div
                                  key={`${levelName}-${year}-${semester}`}
                                  className={`dropdown ${isSemesterSelect ? "expand" : ""}`}>
                                  <div
                                    className={`flex ${isSemesterSelect ? "active" : ""}`}
                                    onClick={() => handlerClickSemester(semester)}>
                                    <p>{t('semester')} {semester}</p>
                                    <IoIosArrowDown className={`ioIosArrowDown ${isSemesterSelect ? 'rotate' : ''}`}></IoIosArrowDown>
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
                              }
                            })
                          }
                        </div>
                      }
                    })
                  }
                </div>
              }
            })
          }
        </section>
        <section className="class-list">
          {topic !== "" && (
            <table>
              <thead>
                <tr><td colSpan={5}>Lista de clases</td></tr>
                <tr>
                  <td>Semana</td>
                  <td>Contenido</td>
                  <td>Docente</td>
                  <td>Grupo</td>
                  <td>Asistencia</td>
                  {/* <td>Justificativo</td> */}
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          )}
          {
            topic === "" && (
              <div className="empty-list">
                <p>Seleccione un tópico</p>
              </div>
            )
          }
        </section>
      </main >
    </>
  );
}

export default Classes;
