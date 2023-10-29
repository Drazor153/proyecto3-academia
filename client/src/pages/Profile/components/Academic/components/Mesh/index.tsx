import { t } from 'i18next';

export default function Mesh() {
  const levels = [
    {
      level: 'beginner',
      semesters: [
        {
          semester: 1,
          state: 'approved',
        },
        {
          semester: 2,
          state: 'approved',
        },
      ],
    },
    {
      level: 'elementary',
      semesters: [
        {
          semester: 1,
          state: 'approved',
        },
        {
          semester: 2,
          state: 'approved',
        },
      ],
    },
    {
      level: 'intermediate',
      semesters: [
        {
          semester: 1,
          state: 'approved',
        },
        {
          semester: 2,
          state: 'approved',
        },
      ],
    },
    {
      level: 'upper_intermediate',
      semesters: [
        {
          semester: 1,
          state: 'failed',
        },
        {
          semester: 2,
          state: 'pending',
        },
      ],
    },
    {
      level: 'advanced',
      semesters: [
        {
          semester: 1,
          state: 'pending',
        },
        {
          semester: 2,
          state: 'pending',
        },
      ],
    },
  ];

  return (
    <section className="academic-mesh-section">
      <h3>{t('academic_mesh')}</h3>
      <div className="mesh-container">
        {levels.map(
          ({ level, semesters }) =>
            semesters.map(({ semester, state }) => (
              // const [s1, s2] = semesters;

              // <div
              //   style={{
              //     display: 'flex',
              //     flexDirection: 'column',
              //     gap: '.5rem',
              //   }}
              // >
              <div
                className="mesh-item"
                data-state={state}
              >
                <h3>{t(level)}</h3>
                <span>{`${t('semester')} ${semester}`}</span>
                <span>{state}</span>
              </div>
              //   <div
              //     className="mesh-item"
              //     data-state={s2.state}
              //   >
              //     <h3>{t(level)}</h3>
              //     <span>{`${t('semester')} ${s2.semester}`}</span>
              //     <span>{s2.state}</span>
              //   </div>
              // </div>
            )),
          // }Ç
          // )
        )}
      </div>
      {/* <div className="academic-mesh-item">
        <h3>{t('career')}</h3>
        <p>Informática</p>
      </div>
      <div className="academic-mesh-item">
        <h3>{t('semester')}</h3>
        <p>6</p>
      </div>
      <div className="academic-mesh-item">
        <h3>{t('institution')}</h3>
        <p>Universidad de Santiago de Chile</p>
      </div> */}
    </section>
  );
}
