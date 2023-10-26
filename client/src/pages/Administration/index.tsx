import FormNewStudent from './components/FormNewStudent';
import { Dispatch, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { t } from 'i18next';
import SearchStudent from './components/SearchStudent';
import AnnouncementTable from './components/AnnouncementTable';

type Menus = {
	[menuName: string]: {
		[actionName: string]: React.ReactNode;
	};
};

const menus: Menus = {
	students: {
		registration: <FormNewStudent />,
		search: <SearchStudent />,
	},
	announcement: {
		manage: <AnnouncementTable />,
	},
};

function Content({ menu, action }: { menu: string; action: string }) {
	if (!menu || !action) return null;
	return <section className="content">{menus[menu][action]}</section>;
}

function Students({
	content,
	setContent,
}: {
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
}) {
	const studentsMenu = Object.keys(menus.students);

	return (
		<section className="action-selector">
			<h2>{t('students_menu')}</h2>
			{studentsMenu.map((item, index) => {
				return (
					<button
						key={index}
						onClick={() => setContent(item)}
						className={content == item ? 'selected' : ''}
					>
						{t(item)}
					</button>
				);
			})}
		</section>
	);
}

function renderSwitch(
	menu: string,
	content: string,
	setContent: Dispatch<SetStateAction<string>>,
) {
	switch (menu) {
		case 'students':
			console.log('students');
			return (
				<Students
					content={content}
					setContent={setContent}
				/>
			);
		default:
			return <></>;
	}
}

const administrationItems = ['students', 'announcement'];

function Administration() {
	const { m, c } = useParams();
	const [menu, setMenu] = useState(m ?? '');
	const [content, setContent] = useState(c ?? '');

	return (
		<>
			<h1>{t('administration')}</h1>
			<main className="admin-layout">
				<section className="menu-selector">
					<h2>{t('menu')}</h2>
					{administrationItems.map((item, index) => (
						<button
							key={item + index}
							onClick={() => {
								setMenu(_ => {
									if (item === 'announcement') {
										setContent('manage');
									} else {
										setContent('');
									}
									return item;
								});
							}}
							className={menu == item ? 'selected' : ''}
						>
							{t(item)}
						</button>
					))}
				</section>
				{renderSwitch(menu, content, setContent)}
				<Content
					menu={menu}
					action={content}
				/>
			</main>
		</>
	);
}

export default Administration;
