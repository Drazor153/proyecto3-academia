// import { Announcement } from '../types';

import { t } from 'i18next';
import Modal from '../../../components/Modal';
import { ChangeEvent, useEffect, useState } from 'react';
import Announcement from '../../Dashboard/components/Announcement';
import AnnouncementDetails from './AnnouncementDetails';
import { AnnouncementType, PostAnnouncement } from '../../../utils/types';
import {
	useAddAnnouncementMutation,
	useGetAllAnnouncementsQuery,
} from '../../../redux/services/announcementsApi';
import { toast } from 'react-toastify';

const initialState: AnnouncementType = {
	author: '',
	category: {
		id: -1,
		name: '',
	},
	content: '',
	createdAt: '',
	expiresAt: '',
	id: -1,
	image: '',
	target: [-1],
	title: '',
	updatedAt: '',
};

function AnnouncementTable(): JSX.Element {
	const [addAnnouncement] = useAddAnnouncementMutation();

	const {
		data: response,
		isLoading,
		isSuccess,
	} = useGetAllAnnouncementsQuery({
		page: 1,
		size: 10,
	});

	const [selectedAnnouncement, setSelectedAnnouncement] =
		useState<AnnouncementType>(initialState);
	// useState<AnnouncementType>(announcement[4]);

	const isOpen = () => {
		return selectedAnnouncement.id !== -1;
	};

	const closeModal = () => {
		setSelectedAnnouncement(initialState);
	};

	const onChangeForm = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setSelectedAnnouncement(prevState => {
			const name = e.target.name;
			switch (name) {
				case 'title':
					const title = e.target.value;
					return { ...prevState, title };
				case 'content':
					const content = e.target.value;
					return { ...prevState, content };
				case 'image':
					const image = e.target.value;
					console.log(image);
					return { ...prevState, image };
				case 'expiresAt':
					const expiresAt = e.target.value;
					return { ...prevState, expiresAt };
				case 'target':
					const target = [parseInt(e.target.value)];
					// const target = e.target.value.split(', ');
					// if (target.length === 1 && target[0] === '') {
					// 	return { ...prevState, target: [] };
					// }
					return { ...prevState, target };
				case 'category':
					const value = JSON.parse(e.target.value);
					const category = {
						id: value.value,
						name: value.label,
					};
					// console.log(category);
					return { ...prevState, category };
				default:
					return prevState;
			}
		});
	};

	const onSave = () => {
		const {
			category: { id: category },
			content,
			expiresAt,
			image,
			target,
			title,
		} = selectedAnnouncement;

		const body: PostAnnouncement = {
			category,
			content,
			expiresAt,
			image,
			target,
			title,
		};

		console.table(body);

		addAnnouncement({ body })
			.unwrap()
			.then(res => {
				toast.success(res.msg);
				closeModal();
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (isSuccess && response.data.length >= 1)
			setSelectedAnnouncement(response.data[0]);
	}, [response]);

	return (
		<>
			{isLoading && (
				<div className="loading">
					<div className="lds-ellipsis">
						<div />
						<div />
						<div />
						<div />
					</div>
				</div>
			)}
			{isSuccess && (
				<table
					className="table-announcement-list"
					data-announcement-list
				>
					<thead>
						<tr>
							<th>{t('announcement')}</th>
						</tr>
						<tr className="grid">
							<th>Nº</th>
							<th>{t('title')}</th>
							<th>{t('created')}</th>
							<th>{t('updated')}</th>
							<th>{t('expires')}</th>
							<th>{t('actions')}</th>
						</tr>
					</thead>
					<tbody>
						{response.data.map(
							({ id, title, createdAt, updatedAt, expiresAt }, index) => (
								<tr
									key={id}
									className="grid"
								>
									<td>{index + 1}</td>
									<td>{title}</td>
									<td>{createdAt}</td>
									<td>{updatedAt}</td>
									<td>{expiresAt ?? t('undefined')}</td>
									<td>actions</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			)}
			<Modal
				isOpen={isOpen}
				title={t('announcement_details')}
				footer={
					<>
						<button onClick={onSave}>{t('save')}</button>
						<button onClick={closeModal}>{t('cancel')}</button>
					</>
				}
				onClick={closeModal}
			>
				<AnnouncementDetails
					announcement={selectedAnnouncement}
					onChange={onChangeForm}
				/>
				<hr />
				<section>
					<Announcement
						announcement={selectedAnnouncement}
						// categories={categories}
					/>
				</section>
			</Modal>
		</>
	);
}

export default AnnouncementTable;
