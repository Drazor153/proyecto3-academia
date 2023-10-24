import { t } from 'i18next';
import { NavLink } from 'react-router-dom';

function AdministrationShortcuts({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<h2 className="bg-blue">{t('administration_shortcuts')}</h2>
			<div className="grid">{children}</div>
		</section>
	);
}

function Shortcuts({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<h2>{t('shortcuts')}</h2>
			<div className="grid">{children}</div>
		</section>
	);
}

function Shortcut({
	className,
	index,
	item,
}: {
	className?: string;
	index: number;
	item: {
		path: string;
		name: string;
		icon: JSX.Element;
	};
}) {
	const { path, icon, name } = item;

	return (
		<NavLink
			className={`shortcut ${className}`}
			to={path}
			key={index}
		>
			<div className="icon">{icon}</div>
			<div className="name">
				{t(name.toLowerCase().replace(' ', '_'))}
			</div>
		</NavLink>
	);
}

export default Shortcuts;
export { AdministrationShortcuts, Shortcut };
