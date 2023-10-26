import { announcement, menuItems } from '../../utils/pages';
import { privilegedItemsShortcuts } from '../../utils/pages';
import { useAppSelector } from '../../redux/hooks';
import Shortcuts, {
	AdministrationShortcuts,
	Shortcut,
} from './components/Shortcuts';
import Announcement from './components/Announcement';
// import { AnnouncementType } from './types';
import { t } from 'i18next';

function Dashboard() {
	const role = useAppSelector(state => state.userReducer.role);

	return (
		<>
			<h1>{t('dashboard')}</h1>
			<main className="dashboard">
				<aside className="shortcuts-container">
					{
						<Shortcuts>
							{menuItems /**.slice(1, -1)*/
								.map((item, index) => {
									if (item.type !== 'route') {
										return (
											<Shortcut
												key={item.name}
												index={index}
												item={item}
											/>
										);
									}
								})}
						</Shortcuts>
					}
					{role === 'ADMIN' && (
						<AdministrationShortcuts>
							{privilegedItemsShortcuts.map((item, index) => (
								<Shortcut
									key={item.name}
									className="privileged"
									index={index}
									item={item}
								/>
							))}
						</AdministrationShortcuts>
					)}
				</aside>
				<section className="announcement-container">
					{announcement
						.sort((a, b) => {
							const dateA = new Date(a.createdAt).getTime();
							const dateB = new Date(b.createdAt).getTime();

							return dateB - dateA;
						})
						.map(announcement => (
							<Announcement
								key={announcement.title}
								// categories={[]}
								announcement={announcement}
							/>
						))}
				</section>
			</main>
		</>
	);
}

export default Dashboard;
