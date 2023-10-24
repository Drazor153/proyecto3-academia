import { Trans } from 'react-i18next';
import FormNewStudent from './components/FormNewStudent';
import { Dispatch, SetStateAction, useState } from 'react';

type Menus = {
	[menuName: string]: {
		[actionName: string]: React.ReactNode;
	};
};

const menus: Menus = {
	Students: {
		Registration: <FormNewStudent />,
	},
};

function Content(menu: string, action: string) {
	if (!menu || !action) return null;
	return <section className="content">{menus[menu][action]}</section>;
}

function Students(
	content: string,
	setContent: Dispatch<SetStateAction<string>>,
) {
	return (
		<section className="action-selector">
			<h2>
				<Trans>students_menu</Trans>
			</h2>
			<button
				onClick={() => setContent('Registration')}
				disabled={content == 'Registration' ? true : false}
			>
				<Trans>registration</Trans>
			</button>
		</section>
	);
}

function renderSwitch(
	menu: string,
	content: string,
	setContent: Dispatch<SetStateAction<string>>,
) {
	if (!menu) return null;
	switch (menu) {
		case 'Students':
			return Students(content, setContent);
	}
}

type shortcut = '' | ['Students', 'Registration' | ''];

function Administration({ shortcut }: { shortcut: shortcut }) {
	const [menu, setMenu] = useState(shortcut[0]);
	const [content, setContent] = useState(shortcut[1]);

	return (
		<>
			<h1>
				<Trans>administration</Trans>
			</h1>
			<main className="admin-layout">
				<section className="menu-selector">
					<h2>
						<Trans>menu</Trans>
					</h2>
					<button
						onClick={() => setMenu('Students')}
						className={menu == 'Students' ? 'selected' : ''}
					>
						<Trans>students</Trans>
					</button>
				</section>
				{renderSwitch(menu, content, setContent)}
				{Content(menu, content)}
			</main>
		</>
	);
}

export default Administration;
