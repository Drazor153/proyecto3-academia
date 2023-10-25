// import { Announcement } from '../types';

import { t } from 'i18next';

function AnnouncementTable(): JSX.Element {
	return (
		<table>
			<thead>
				<tr>
					<th>{t('title')}</th>
					<th>{t('content')}</th>
					<th>{t('date')}</th>
				</tr>
			</thead>
			<tbody>
				{/* {announcements.map(announcement => (
					<tr key={announcement.id}>
						<td>{announcement.title}</td>
						<td>{announcement.description}</td>
						<td>{announcement.date}</td>
					</tr>
				))} */}
			</tbody>
		</table>
	);
}

export default AnnouncementTable;
