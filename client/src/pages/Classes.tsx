import { useEffect, useState } from "react";

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
      levelName: "Básico",
      status: "En curso",
    },
    {
      year: 2023,
      semester: 1,
      levelName: "Básico",
      status: "Reprobado",
    },
    {
      year: 2022,
      semester: 2,
      levelName: "Principiante",
      status: "Aprobado",
    },
    {
      year: 2022,
      semester: 1,
      levelName: "Principiante",
      status: "Aprobado",
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
  "Grammar",
  "Listening & Speaking",
  "Writing",
];

// const groups: string[] = ["A", "B", "C"];

function Classes() {
  const [semesterYear, setSemesterYear] = useState<{
    year: number;
    semester: number;
  }>({
    year: 0,
    semester: 0,
  });
  const [level, setLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");


  const handlerClickYear = (year: number) => {
    setSemesterYear({
      year: year === semesterYear.year ? 0 : year,
      semester: 0,
    });
  };

  const handlerClickSemester = (semester: number) => {
    setSemesterYear((prev) => {
      return {
        ...prev,
        semester: semester === semesterYear.semester ? 0 : semester,
      };
    });
  };

  const handlerClickLevel = (newLevel: string) => {

    setLevel(newLevel === level ? "" : newLevel);
    setSemesterYear({
      year: 0,
      semester: 0,
    });
    setTopic("");

  }

  const handlerClickTopic = (newTopic: string) => {
    setTopic(newTopic === topic ? "" : newTopic);
  }


  useEffect(() => {
    console.log(topic);
  }, [topic])

  return (
    <>
      <h1>Classes</h1>
      <main className="classes-layout">
        <section className="options-selector">
          <h2>Nivel</h2>
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
                    <p>{levelName}</p>
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
                                    <p>Semestre {semester}</p>
                                    <IoIosArrowDown className={`ioIosArrowDown ${isSemesterSelect ? 'rotate' : ''}`}></IoIosArrowDown>
                                  </div>
                                  {
                                    topics.map((t) => {
                                      return <div
                                        key={`${levelName}-${year}-${semester}-${t}`}
                                        className={`topic ${t === topic ? "active" : ""}`}
                                        onClick={() => handlerClickTopic(t)}
                                      >
                                        {t}
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
          {/* {semestersYears.map(({ year }) => {
            if (iY !== year) {
              iY = year
              const isYear = year === semesterYear.year;
              return (
                <div
                  key={`${ year } `}
                  className={`dropdown ${ isYear ? "expand" : "" } `}
                >
                  <div
                    className={`flex ${ isYear ? "active" : "" } `}
                    onClick={() => handlerClickYear(year)}
                  >
                    <p>{year}</p>
                    <IoIosArrowDown className={`ioIosArrowDown ${ isYear ? 'rotate' : '' } `}></IoIosArrowDown>
                  </div>
                  {semestersYears.map(({ year: y, semester }, index) => {
                    if (year === y) {
                      const isSemester = semester === semesterYear.semester;
                      return (
                        <div
                          key={`${ year } -${ semester } `}
                          className={`dropdown ${ isYear && isSemester ? "expand" : "" } `}
                        >
                          <div
                            className={`flex ${ isYear && isSemester ? "active" : "" } `}

                            onClick={() => handlerClickSemester(semester)}
                          >
                            <p>Semestre {semester}</p>
                            <IoIosArrowDown className={`ioIosArrowDown ${ isYear && isSemester ? 'rotate' : '' } `}></IoIosArrowDown>
                          </div>
                          <p>Tópicos ...</p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          })} */}
        </section>
        <section className="class-list">
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
        </section>
      </main >
    </>
  );
}

export default Classes;
