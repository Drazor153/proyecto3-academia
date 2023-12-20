import { useReducer } from 'react';
import {
	FaPen,
	FaEarListen,
	FaCommentDots,
	FaSpellCheck,
} from 'react-icons/fa6';
import { useAppSelector } from '../../redux/hooks';
import { DispatchProps, TypeKind, reducer } from './selectedOption';
import ExamsTableTeacher from './components/ExamsTableTeacher';
import ExamsTableStudent, { Average } from './components/ExamsTableStudent';
import { t } from 'i18next';
import Options from './components/Options';
import { useTranslation } from 'react-i18next';

const topics = [
	{
		name: 'writing',
		icon: <FaPen />,
	},
	{
		name: 'grammar',
		icon: <FaSpellCheck />,
	},
	{
		name: 'listening',
		icon: <FaEarListen />,
	},
	{
		name: 'speaking',
		icon: <FaCommentDots />,
	},
];

function TopicsButtons({ state, dispatch }: DispatchProps) {
	return (
		<section className='topics-selector'>
			<h2>{t('topics')}</h2>
			<div className='buttons-container'>
				{topics.map((topic, index) => (
					<button
						onClick={() =>
							dispatch({
								type: TypeKind.TOPIC,
								payload: topic.name,
							})
						}
						key={index}
						className={`button ${state.topic == topic.name ? 'selected' : ''}`}
					>
						{topic.icon}
						<span>{t(topic.name)}</span>
					</button>
				))}
			</div>
		</section>
	);
}

function TeacherLayout({ state, dispatch }: DispatchProps) {
	const isInputFilled = () => {
		return (
			state.topic != '' &&
			state.level != '' &&
			state.semester != '' &&
			state.year != ''
		);
	};

	return (
		<main className='grades-layout teacher'>
			<TopicsButtons
				state={state}
				dispatch={dispatch}
			/>
			<section className='options-container'>
				<h2>{t('options')}</h2>
				<div className='options-select-container'>
					<Options
						state={state}
						dispatch={dispatch}
					/>
				</div>
			</section>
			<section className='grades'>
				{isInputFilled() && (
					<>
						<h2>{t(state.topic)}</h2>
						<ExamsTableTeacher
							year={parseInt(state.year)}
							semester={parseInt(state.semester)}
							level={state.level}
							topic={state.topic}
						/>
					</>
				)}
			</section>
		</main>
	);
}

function StudentLayout({ state, dispatch }: DispatchProps) {
	const isInputFilled = () => {
		return state.level != '' && state.semester != '' && state.year != '';
	};

	return (
		<main className='grades-layout student'>
			<section className='options-container'>
				<h2>{t('options')}</h2>
				<div className='options-select-container'>
					<Options
						state={state}
						dispatch={dispatch}
					/>
				</div>
			</section>
			<section className='grades'>
				{isInputFilled() && (
					<>
						<h2>{t('grades')}</h2>
						<div className='topics-exams-container'>
							{topics.map((topic, index) => (
								<div
									key={index}
									className={`${topic.name}-exams-container topic-container`}
								>
									<h3>{t(topic.name)}</h3>
									<ExamsTableStudent
										year={parseInt(state.year)}
										semester={parseInt(state.semester)}
										level={state.level}
										topic={topic.name}
									/>
								</div>
							))}
							<div className='average-container topic-container'>
								<Average
									year={parseInt(state.year)}
									semester={parseInt(state.semester)}
									level={state.level}
								></Average>
							</div>
						</div>
					</>
				)}
			</section>
		</main>
	);
}

function Grades() {
	useTranslation();

	const role = useAppSelector(state => state.userReducer.role);

	const [state, dispatch] = useReducer(reducer, {
		topic: '',
		level: '',
		year: '',
		semester: '',
	});

	let layout = null;

	if (role == 'STUDENT') {
		layout = (
			<StudentLayout
				state={state}
				dispatch={dispatch}
			/>
		);
	} else {
		layout = (
			<TeacherLayout
				state={state}
				dispatch={dispatch}
			/>
		);
	}

	return (
		<>
			<h1>{t('grades')}</h1>
			{layout}
		</>
	);
}

export default Grades;
