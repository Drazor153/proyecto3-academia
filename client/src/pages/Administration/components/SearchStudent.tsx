import { t } from 'i18next';
import {
  useGetStudentCareerByRunQuery,
  useLazyGetStudentsQuery,
} from '../../../redux/services/studentsApi';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';

import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { useGetLevelsQuery } from '../../../redux/services/levelsApi';

import Select from 'react-select';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { Student } from '../../../utils/types';
import { IoMdSchool } from 'react-icons/io';
import Modal from '../../../components/Modal';
import { useTranslation } from 'react-i18next';

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function ShowStudentCareer({ run }: { run: number }) {
  const { data, isLoading, isFetching, isError } =
    useGetStudentCareerByRunQuery({ run });

  if (isLoading || isFetching) return <ThreeDots />;
  if (!data || isError) return <p>{t('no_results')}</p>;

  const career = data.data;

  return (
    <div className="student-career-container">
      {career.map(({ year, semesters, level, status }) => (
        <table key={year}>
          <thead>
            <tr>
              <th colSpan={3}>
                {t('year')} {year}
              </th>
            </tr>
          </thead>
          <tbody>
            {semesters.map(semester => (
              <tr key={semester}>
                <td>{`${t('semester')} ${semester}`}</td>
                <td>{t(level)}</td>
                <td>{t(status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

function SearchStudent() {
  useTranslation();

  const [page, setPage] = useState(1);
  const [run, setRun] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const debouncedRun = useDebounce<string>(run, 1000);
  const debouncedName = useDebounce<string>(name, 1000);
  const size = 10;

  const loadingInput = () => {
    if (run != debouncedRun || name != debouncedName) return true;
    return false;
  };

  const [getStudents, result] = useLazyGetStudentsQuery();

  const { data: levels, isLoading: isLevelsLoading } = useGetLevelsQuery(null);

  const runWithoutDv = (run: string) => {
    const { digits } = deconstructRut(run);
    if (!digits) return run;
    return digits;
  };

  const handleRUNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRUN = event.target.value;
    if (newRUN.length > 12) return;
    const cleanRUN = newRUN.replace(/[^0-9kK]/g, '').toUpperCase();
    setRun(formatRut(cleanRUN, RutFormat.DOTS_DASH));
  };

  useEffect(() => {
    const run: string = runWithoutDv(debouncedRun);
    setPage(1);
    getStudents({ page: 1, size, run, level, name: debouncedName });
  }, [debouncedRun, level, debouncedName]);

  useEffect(() => {
    const run: string = runWithoutDv(debouncedRun);
    getStudents({ page, size, run, level, name });
  }, [page]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (result.isSuccess) {
      let nextPage = page;
      const { name } = event.target as HTMLButtonElement;

      switch (name) {
        case 'next': {
          if (result.data.next) {
            nextPage++;
          }
          break;
        }
        case 'previous': {
          if (result.data.previous) {
            nextPage--;
          }
          break;
        }
      }
      setPage(nextPage);
    }
  };

  return (
    <>
      <h2>{t('search')}</h2>
      <div className="filters-container">
        <h3>{t('filters')}</h3>
        <div className="search-student-container">
          <div className="search-container">
            <label htmlFor="run-search">{t('search_run')}</label>
            <div className="input-container">
              <fieldset className="float-label-field">
                <input
                  id="run-search"
                  type="text"
                  onChange={handleRUNChange}
                  value={run}
                />
              </fieldset>
            </div>
          </div>
          <div className="search-container">
            <label htmlFor="name-search">{t('search_name')}</label>
            <div className="input-container">
              <fieldset className="float-label-field">
                <input
                  id="name-search"
                  type="text"
                  onChange={e => setName(e.target.value)}
                />
              </fieldset>
            </div>
          </div>
          <div className="search-container">
            <label>{t('search_level')}</label>
            <div className="input-container">
              <Select
                className="react-select-container"
                classNamePrefix={'react-select'}
                placeholder={t('level_select')}
                onChange={option => setLevel(option?.value ? option.value : '')}
                options={
                  levels && levels.data.length > 0
                    ? levels.data.map(({ code, name }) => ({
                        value: code,
                        label: t(name),
                      }))
                    : []
                }
                isClearable
                isSearchable={false}
                isLoading={isLevelsLoading}
              />
            </div>
          </div>
        </div>
      </div>
      <table className="students-table">
        <thead>
          <tr>
            <th>{t('run')}</th>
            <th>{t('name')}</th>
            <th>{t('level')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {loadingInput() && <ThreeDots />}
          {result.isSuccess &&
            !loadingInput() &&
            !result.isLoading &&
            // !result.isFetching &&
            (result.data.data.length == 0 ? (
              <tr>
                <td className="no-results">{t('no_results')}</td>
              </tr>
            ) : (
              result.data.data.map((student: Student) => (
                <tr key={student.run}>
                  <td>
                    {formatRut(
                      `${student.run}-${student.dv}`,
                      RutFormat.DOTS_DASH,
                    )}
                  </td>
                  <td data-student-name>
                    {student.first_surname.toLowerCase()},{' '}
                    {student.name.toLowerCase()}
                  </td>
                  <td>{student.level}</td>
                  <td>
                    <button onClick={() => setSelectedStudent(student)}>
                      <IoMdSchool className="icon" />
                      {t('inspect')}
                    </button>
                  </td>
                </tr>
              ))
            ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <p>
          {t('page')} {page}
        </p>
        <div className="pagination-btn-container">
          <button
            disabled={page == 1}
            name={'previous'}
            onClick={handleChangePage}
          >
            <AiOutlineDoubleLeft />
          </button>
          <button
            disabled={!result.data?.next}
            name={'next'}
            onClick={handleChangePage}
          >
            <AiOutlineDoubleRight />
          </button>
        </div>
      </div>
      <Modal
        title={`${t('career_of')} ${selectedStudent?.name} ${
          selectedStudent?.first_surname
        }`}
        isOpen={() => selectedStudent !== null}
        onClick={() => setSelectedStudent(null)}
        footer={
          <button onClick={() => setSelectedStudent(null)}>{t('close')}</button>
        }
        className="student-career-modal"
      >
        {selectedStudent && <ShowStudentCareer run={+selectedStudent.run} />}
      </Modal>
    </>
  );
}

export default SearchStudent;
