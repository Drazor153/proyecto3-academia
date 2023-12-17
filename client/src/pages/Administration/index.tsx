import FormNewStudent from './components/FormNewStudent';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import SearchStudent from './components/SearchStudent';
import AnnouncementTable from './components/AnnouncementTable';
import JustificationTable from './components/JustificationsTable';
import ExamsCalendarManagement from './components/ExamsCalendarManagement';
import AcademicCalendarManagement from './components/AcademicCalendarManagement';
import { administrationItems } from '../../utils/pages';
import { useTranslation } from 'react-i18next';

type Menus = {
	[menuName: string]: {
		[actionName: string]: React.ReactNode;
	};
};

const menus: Menus = {
	students: {
		registration: <FormNewStudent />,
		search: <SearchStudent />,
		justifications: <JustificationTable />,
	},
	announcement: {
		manage: <AnnouncementTable />,
	},
	calendar: {
		exams: <ExamsCalendarManagement />,
		academic: <AcademicCalendarManagement />,
	},
};

function Content({ menu, action }: { menu: string; action: string }) {
	if (!menu || !action) return null;
	return <section className='content'>{menus[menu][action]}</section>;
}

function Students({ content }: { content: string }) {
	const studentsMenu = Object.keys(menus.students);

	const navigate = useNavigate();

	return (
		<section className='action-selector'>
			<h2>{t('students_menu')}</h2>
			{studentsMenu.map((item, index) => {
				return (
					<button
						key={index}
						onClick={() => navigate(`/administration/students/${item}`)}
						className={content == item ? 'selected' : ''}
					>
						{t(item)}
					</button>
				);
			})}
		</section>
	);
}

function Calendar({ content }: { content: string }) {
	const calendarMenu = Object.keys(menus.calendar);

	const navigate = useNavigate();

	return (
		<section className='action-selector'>
			<h2>{t('calendar_menu')}</h2>
			{calendarMenu.map((item, index) => {
				return (
					<button
						key={index}
						onClick={() => navigate(`/administration/calendar/${item}`)}
						className={content == item ? 'selected' : ''}
					>
						{t(item)}
					</button>
				);
			})}
		</section>
	);
}

function renderSwitch(menu: string, content: string) {
	switch (menu) {
		case 'students':
			return <Students content={content} />;
		case 'calendar':
			return <Calendar content={content} />;
		default:
			return <></>;
	}
}

function Administration() {
	useTranslation();

	const navigate = useNavigate();
	const { menu, content } = useParams();

	const allowedParams: { [menu: string]: string[] }[] = [
		{ undefined: [''] },
		...administrationItems.map(({ menu, children }) => {
			const params = {
				[menu]: [] as string[],
			};
			if (children) {
				children.map(({ content }) => params[menu].push(content));
			}

			return params;
		}),
	];

	useEffect(() => {
		const allowed: { menu: boolean; content: boolean } = {
			menu: false,
			content: false,
		};

		allowedParams.map(param => {
			if (Object.keys(param).includes(menu ?? 'undefined')) {
				allowed.menu = true;
				if (param[menu!].includes(content ?? '')) {
					allowed.content = true;
					return true;
				}
			}
			return false;
		});

		if (!(allowed.menu && allowed.content)) {
			navigate('/administration');
		}
	}, [menu, content]);

	return (
		<>
			<h1>{t('administration')}</h1>
			<main className='admin-layout'>
				<section className='menu-selector'>
					<h2>{t('menu')}</h2>
					{administrationItems.map(({ menu: name, path }, index) => (
						<button
							key={name + index}
							onClick={() => {
								navigate(path);
							}}
							className={menu === name ? 'selected' : ''}
						>
							{t(name)}
						</button>
					))}
				</section>
				{renderSwitch(menu ?? 'undefined', content ?? '')}
				<Content
					menu={menu ?? 'undefined'}
					action={content ?? ''}
				/>
			</main>
		</>
	);
}

export default Administration;
