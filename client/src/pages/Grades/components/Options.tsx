import { ThreeDots } from 'react-loading-icons';
import { useAppSelector } from '../../../redux/hooks';
import { t } from 'i18next';
import { TypeKind, DispatchProps } from '../selectedOption';
import { useGetLevelsByRoleRunQuery } from '../../../redux/services/levelsApi';
import Select from 'react-select';

function GetLevelsData() {
	const user = useAppSelector(state => state.userReducer);
	const role = user.role == 'STUDENT' ? 'students' : 'teachers';
	const { data: response } = useGetLevelsByRoleRunQuery({
		role: role,
	});

	if (!response) return null;

	return response.data;
}

function Options({ state, dispatch }: DispatchProps) {
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

	const yearOptions = levels.map(year => ({
		value: year.year.toString(),
		label: year.year,
	}));

	const SemesterOptions = () => {
		if (!state.year) return null;

		const semesterOptions = levels
			.find(year => year.year == parseInt(state.year))!
			.semesters.map(semester => ({
				value: semester.semester.toString(),
				label: t('semester') + ' ' + semester.semester,
			}));

		return (
			<Select
				className="react-select-container"
				classNamePrefix="react-select"
				placeholder={t('semester_select')}
				options={semesterOptions}
				onChange={choice => handleSemesterChange(choice?.value)}
			/>
		);
	};

	const LevelOptions = () => {
		if (!state.semester) return null;

		const levelOptions = levels
			.find(year => year.year == parseInt(state.year))!
			.semesters.find(
				semester => semester.semester == parseInt(state.semester),
			)!
			.levels.map(level => ({
				value: level.code,
				label: t(level.level),
			}));
		return (
			<Select
				className="react-select-container"
				classNamePrefix="react-select"
				placeholder={t('level_select')}
				options={levelOptions}
				onChange={choice => handleLevelChange(choice?.value)}
			/>
		);
	};

	console.log(state);

	return (
		<section className="options-container">
			<h2>{t('options')}</h2>
			{/* <div
			className={``}
			style={{ height: '50px' }}
			> */}
			<Select
				className="react-select-container"
				classNamePrefix="react-select"
				placeholder={t('year_select')}
				options={yearOptions}
				onChange={choice => handleYearChange(choice?.value)}
			/>
			<SemesterOptions />
			<LevelOptions />
			{/* </div> */}
		</section>
	);
}

export default Options;
