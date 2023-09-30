import { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

import "../scss/classes.scss";

var iY: number = 0;

const semestersYears: { year: number; semester: number }[] = [
  // { year: 2023, semester: 1 },
  { year: 2023, semester: 2 },
  { year: 2022, semester: 1 },
  { year: 2022, semester: 2 },
];

const levels: string[] = [
  "Principiante",
  "Básico",
  "Intermedio",
  "Intermedio-Superior",
  "Avanzado",
];

const topics: string[] = [
  "Grammar",
  "Listening",
  "Speaking",
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
  const [topic, setTopic] = useState<string>(topics[0]);


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
  }

  useEffect(() => {
    console.log(level);
  }, [level])

  return (
    <>
      <h1>Classes</h1>
      <main className="classes-layout">
        <section className="options-selector">
          <h2>Periodo</h2>
          {
            levels.map((localLevel) => {

              const isLevelSelect = localLevel === level;
              return <div
                key={localLevel}
                className={`dropdown ${isLevelSelect ? "expand" : ""}`}
              >
                <div
                  className={`flex ${isLevelSelect ? "active" : ""}`}
                  onClick={() => handlerClickLevel(localLevel)}
                >
                  <p>{localLevel}</p>
                  <IoIosArrowDown className={`ioIosArrowDown ${isLevelSelect ? 'rotate' : ''}`}></IoIosArrowDown>
                </div>

              </div>
            })
          }
          {/* {semestersYears.map(({ year }) => {
            if (iY !== year) {
              iY = year
              const isYear = year === semesterYear.year;
              return (
                <div
                  key={`${year}`}
                  className={`dropdown ${isYear ? "expand" : ""}`}
                >
                  <div
                    className={`flex ${isYear ? "active" : ""}`}
                    onClick={() => handlerClickYear(year)}
                  >
                    <p>{year}</p>
                    <IoIosArrowDown className={`ioIosArrowDown ${isYear ? 'rotate' : ''}`}></IoIosArrowDown>
                  </div>
                  {semestersYears.map(({ year: y, semester }, index) => {
                    if (year === y) {
                      const isSemester = semester === semesterYear.semester;
                      return (
                        <div
                          key={`${year}-${semester}`}
                          className={`dropdown ${isYear && isSemester ? "expand" : ""}`}
                        >
                          <div
                            className={`flex ${isYear && isSemester ? "active" : ""}`}

                            onClick={() => handlerClickSemester(semester)}
                          >
                            <p>Semestre {semester}</p>
                            <IoIosArrowDown className={`ioIosArrowDown ${isYear && isSemester ? 'rotate' : ''}`}></IoIosArrowDown>
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
      </main>
    </>
  );
}

export default Classes;
