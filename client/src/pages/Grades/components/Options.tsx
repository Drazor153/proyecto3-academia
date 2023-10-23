import { ThreeDots } from "react-loading-icons";
import { useAppSelector } from "../../../redux/hooks";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { TypeKind, DispatchProps } from "../selectedOption";
import { useGetLevelsByRoleRunQuery } from "../../../redux/services/levelsApi";
import Select from "react-select";

function GetLevelsData() {
  const user = useAppSelector((state) => state.userReducer);
  const role = user.role == "STUDENT" ? "students" : "teachers";
  const { data: response } = useGetLevelsByRoleRunQuery({
    role: role,
  });

  if (!response) return null;

  return response.data;
}

function Options({ state, dispatch }: DispatchProps) {
  useTranslation();

  const handleLevelChange = (level: string | undefined) => {
    if (!level) return;
    dispatch({ type: TypeKind.LEVEL, payload: level });
  };

  const handleYearChange = (year: string | undefined) => {
    if (!year) return;
    dispatch({ type: TypeKind.YEAR, payload: year });
  };

  const handleSemesterChange = (semester: string | undefined) => {
    if (!semester) return;
    dispatch({ type: TypeKind.SEMESTER, payload: semester });
  };

  const levels = GetLevelsData();

  if (!levels)
    return (
      <section className="loading-section">
        <ThreeDots fill="#8d2840" />
      </section>
    );

  const yearOptions = levels.map((year) => ({
    value: year.year.toString(),
    label: year.year,
  }));

  const semesterOptions = () => {
    if (!state.year) return null;

    const semesterOptions = levels
      .find((year) => year.year == parseInt(state.year))!
      .semesters.map((semester) => ({
        value: semester.semester.toString(),
        label: t("semester") + " " + semester.semester,
      }));

    return (
      <Select
        options={semesterOptions}
        onChange={(choice) => handleSemesterChange(choice?.value)}
      />
    );
  };

  const levelOptions = () => {
    if (!state.semester) return null;

    const levelOptions = levels
      .find((year) => year.year == parseInt(state.year))!
      .semesters.find(
        (semester) => semester.semester == parseInt(state.semester)
      )!
      .levels.map((level) => ({
        value: level.code,
        label: t(level.level),
      }));
    return (
      <Select
        options={levelOptions}
        onChange={(choice) => handleLevelChange(choice?.value)}
      />
    );
  };

  return (
    <section className="options-container">
      <h2>{t("options")}</h2>
      <Select
        options={yearOptions}
        onChange={(choice) => handleYearChange(choice?.value)}
      />
      {semesterOptions()}
      {levelOptions()}
    </section>
  );
}

export default Options;