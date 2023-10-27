import { ThreeDots } from 'react-loading-icons';
import { useAppSelector } from '../../../redux/hooks';
import { t } from 'i18next';
import { TypeKind, DispatchProps } from '../selectedOption';
import { useGetLevelsByRoleRunQuery } from '../../../redux/services/levelsApi';
import Select from 'react-select';
import { Level } from '../../../utils/types';

const GetLevelsData = () => {
	const user = useAppSelector(state => state.userReducer);
	const role = user.role == 'STUDENT' ? 'students' : 'teachers';
	const { data: response } = useGetLevelsByRoleRunQuery({
		role: role,
	});

	if (!response) return null;

	return response.data;
};

type OptionsProps = { data: Level[] } & DispatchProps;

function LevelOptions({ state, dispatch, data }: OptionsProps) {
	const handleLevelChange = (level: string | undefined) => {
		if (!level) return;
		dispatch({ type: TypeKind.LEVEL, payload: level });
	};

	if (!state.semester) return null;

	const levelOptionsFiltered = data
		.find(year => year.year == parseInt(state.year))!
		.semesters.find(semester => semester.semester == parseInt(state.semester))!
		.levels.map(level => ({
			value: level.code,
			label: t(level.level),
		}));

	return (
		<Select
			className="react-select-container"
			classNamePrefix="react-select"
			placeholder={t('level_select')}
			options={levelOptionsFiltered}
			onChange={choice => handleLevelChange(choice?.value)}
		/>
	);
}

function SemesterOptions({ state, dispatch, data }: OptionsProps) {
	const handleSemesterChange = (semester: string | undefined) => {
		if (!semester) return;
		dispatch({ type: TypeKind.SEMESTER, payload: semester });
	};

	if (!state.year) return null;

	const semesterOptionsFiltered = data
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
			options={semesterOptionsFiltered}
			onChange={choice => handleSemesterChange(choice?.value)}
		/>
	);
}

function YearOptions({ state, dispatch, data }: OptionsProps) {
	const handleYearChange = (year: string | undefined) => {
		if (!year) return;
		dispatch({ type: TypeKind.YEAR, payload: year });
	};

	const yearOptionsFiltered = data.map(year => ({
		value: year.year.toString(),
		label: year.year,
	}));

	return (
		<Select
			className="react-select-container"
			classNamePrefix="react-select"
			placeholder={t('year_select')}
			options={yearOptionsFiltered}
			onChange={choice => handleYearChange(choice?.value)}
		/>
	);
}

function Options({ state, dispatch }: DispatchProps) {
	const levels = GetLevelsData();	

	if (!levels)
		return (
			<section className="loading-section">
				<ThreeDots fill="#8d2840" />
			</section>
		);

	return (
		<section className="options-container">
			<h2>{t('options')}</h2>

			<YearOptions
				dispatch={dispatch}
				state={state}
				data={levels}
			/>
			<SemesterOptions
				dispatch={dispatch}
				state={state}
				data={levels}
			/>
			<LevelOptions
				dispatch={dispatch}
				state={state}
				data={levels}
			/>
		</section>
	);
}

export default Options;
