import { privilegedShortcutsItems, shortcutsItems } from '../../utils/pages';
import { useAppSelector } from '../../redux/hooks';
import Shortcuts, {
	AdministrationShortcuts,
	Shortcut,
} from './components/Shortcuts';
import Announcement from './components/Announcement';
// import { AnnouncementType } from './types';
import { t } from 'i18next';
import { useGetAnnouncementsQuery } from '../../redux/services/announcementsApi';
import { useTranslation } from 'react-i18next';

function Dashboard() {
	useTranslation();

	const role = useAppSelector(state => state.userReducer.role);

	const { data: announcement, isSuccess } = useGetAnnouncementsQuery(null);

	return (
		<>
			<h1>{t('dashboard')}</h1>
			<main className='dashboard'>
				<aside className='shortcuts-container'>
					{
						<Shortcuts>
							{shortcutsItems /**.slice(1, -1)*/
								.map((item, index) => {
									if (item.only.includes(role) || item.only.includes('ALL'))
										return (
											<Shortcut
												key={item.name}
												index={index}
												item={item}
											/>
										);
									// }
								})}
						</Shortcuts>
					}
					{role === 'ADMIN' && (
						<AdministrationShortcuts>
							{privilegedShortcutsItems.map((item, index) => (
								<Shortcut
									key={item.name}
									className='privileged'
									index={index}
									item={item}
								/>
							))}
						</AdministrationShortcuts>
					)}
				</aside>
				<section className='announcement-container'>
					{isSuccess &&
						announcement.data.map(announcement => (
							<Announcement
								key={announcement.title}
								announcement={announcement}
							/>
						))}
				</section>
			</main>
		</>
	);
}

export default Dashboard;
