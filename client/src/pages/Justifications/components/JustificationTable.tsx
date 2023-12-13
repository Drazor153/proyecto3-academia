import JustificationViewer from '@/components/JustificationViewer';
import { useGetOwnJustificationQuery } from '@/redux/services/justificationApi';
import { getYYYYMMDD } from '@/utils/functions';
import { t } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { MdDelete } from 'react-icons/md';
import { TiDocumentText } from 'react-icons/ti';
import { ThreeDots } from 'react-loading-icons';

export default function JustificationTable() {
	useTranslation();
	const { data, isLoading, isFetching } = useGetOwnJustificationQuery(null);
	const [selectedFile, setSelectedFile] = useState('');

	if (isLoading || isFetching)
		return (
			<div>
				<ThreeDots
					className='threeDots'
					fill='#2F4858'
				/>
			</div>
		);

	const justifications = data?.data;

	if (!justifications || justifications.length === 0)
		return (
			<div className='no-justifications'>
				<h2>{t('no_justifications')}</h2>
			</div>
		);

	return (
		<>
			<table className='student-justifications-table'>
				<thead>
					<tr>
						<th>{t('date')}</th>
						<th>{t('description')}</th>
						<th>{t('status')}</th>
						<th>{t('actions')}</th>
					</tr>
				</thead>
				<tbody>
					{justifications.map(justification => (
						<tr key={justification.id}>
							<td className='date-item'>
								{getYYYYMMDD(justification.initAusencia as string)}
							</td>
							<td>
								<p>{justification.reason}</p>
							</td>
							<td>{t(justification.approved)}</td>
							<td className='action-buttons'>
								<button
									onClick={() => setSelectedFile(justification.file as string)}
								>
									<TiDocumentText className='icon' />
									<span>{t('view_file')}</span>
								</button>
								{/* <button>
								<MdDelete className='icon' />
								<span>{t('delete')}</span>
							</button> */}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<JustificationViewer
				fileName={selectedFile}
				onClose={() => setSelectedFile('')}
			/>
		</>
	);
}
