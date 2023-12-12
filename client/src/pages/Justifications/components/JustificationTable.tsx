import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { MdDelete } from 'react-icons/md';

const justifications = [
	{
		id: 1,
		description: 'Justification 1 description',
		status: 'pending',
		file: 'file.pdf',
		date: '2021-01-01',
	},
	{
		id: 2,
		description: 'Justification 2 description',
		status: 'pending',
		file: 'file.pdf',
		date: '2021-01-01',
	},
	{
		id: 3,
		description: 'Justification 3 description',
		status: 'pending',
		file: 'file.pdf',
		date: '2021-01-01',
	},
	{
		id: 4,
		description: 'Justification 4 description',
		status: 'pending',
		file: 'file.pdf',
		date: '2021-01-01',
	},
	{
		id: 5,
		description: 'Justification 5 description',
		status: 'pending',
		file: 'file.pdf',
		date: '2021-01-01',
	},
	{
		id: 6,
		description: 'Justification 6 description',
		status: 'pending',
		file: 'file.pdf',
		date: '2021-01-01',
	},
	{
		id: 7,
		description: 'Justification 7 description',
		status: 'pending',
		file: 'file.pdf',
		date: '2021-01-01',
	},
];

export default function JustificationTable() {
	useTranslation();

	return (
		<table className='student-justifications-table'>
			<thead>
				<tr>
					<th>{t('date')}</th>
					<th>{t('description')}</th>
					<th>{t('status')}</th>
					<th>{t('file')}</th>
					<th>{t('actions')}</th>
				</tr>
			</thead>
			<tbody>
				{justifications.map(justification => (
					<tr key={justification.id}>
						<td>{justification.date}</td>
						<td>{justification.description}</td>
						<td>{t(justification.status)}</td>
						<td>{justification.file}</td>
						<td>
							<button>
								<MdDelete />
								<span>{t('delete')}</span>
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
