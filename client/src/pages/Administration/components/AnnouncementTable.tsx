// import { Announcement } from '../types';

import { t } from 'i18next';
import Modal from '@/components/Modal';
import { ChangeEvent, useState } from 'react';
import Announcement from '../../Dashboard/components/Announcement';
import AnnouncementDetails from './AnnouncementDetails';
import { AnnouncementType, PostAnnouncement } from '@/utils/types';
import {
	useAddAnnouncementMutation,
	useDeleteAnnouncementMutation,
	useGetAllAnnouncementsQuery,
	useUpdateAnnouncementMutation,
} from '@/redux/services/announcementsApi';
import { toast } from 'react-toastify';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { useAppSelector } from '@/redux/hooks';
// import { announcement } from '../../../utils/pages';
import {
	HiOutlinePencil,
	HiOutlineTrash,
	HiPencil,
	HiTrash,
} from 'react-icons/hi2';
import { ThreeDots } from 'react-loading-icons';
import { useTranslation } from 'react-i18next';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

const initialState: AnnouncementType = {
	author: {
		name: '',
		first_surname: '',
	},
	category: '',
	content: '',
	createdAt: '',
	expiresAt: '',
	id: -2,
	image: '',
	target: [],
	title: '',
	updatedAt: '',
};

enum Type {
	'new',
	'update',
	'delete',
}

function AnnouncementTable(): JSX.Element {
	useTranslation();

	const [addAnnouncement] = useAddAnnouncementMutation();
	const [updateAnnouncement] = useUpdateAnnouncementMutation();
	const [deleteAnnouncement] = useDeleteAnnouncementMutation();

	const [page, setPage] = useState(1);

	const size = 15;

	const {
		data: announcement,
		isLoading,
		isSuccess,
		isFetching,
	} = useGetAllAnnouncementsQuery({
		page,
		size,
	});

	const { name, first_surname } = useAppSelector(state => state.userReducer);

	const [selectedAnnouncement, setSelectedAnnouncement] =
		useState<AnnouncementType>(initialState);

	const [type, setType] = useState<Type>(Type.update);

	const openDetailsModal = () => {
		return (
			selectedAnnouncement.id >= -1 &&
			(type === Type.update || type === Type.new)
		);
	};

	const openDeleteModal = () => {
		return selectedAnnouncement.id >= 0 && type === Type.delete;
	};

	const detailsModal = ({
		announcement,
	}: {
		announcement: AnnouncementType;
	}) => {
		setSelectedAnnouncement(announcement);
		setType(Type.update);
	};

	const deleteModal = ({
		announcement,
	}: {
		announcement: AnnouncementType;
	}) => {
		setSelectedAnnouncement(announcement);
		setType(Type.delete);
	};

	const closeModal = () => {
		setSelectedAnnouncement(initialState);
	};

	const newAnnouncement = () => {
		const author = {
			name,
			first_surname,
		};
		setSelectedAnnouncement({
			...initialState,
			author,
			id: -1,
		});
		setType(Type.new);
	};

	const onChangeForm = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setSelectedAnnouncement(prevState => {
			const { name } = e.target;
			switch (name) {
				case 'title': {
					const title = e.target.value;
					return { ...prevState, title };
				}
				case 'content': {
					const content = e.target.value;
					return { ...prevState, content };
				}
				case 'image': {
					const image = e.target.value;
					console.log(image);
					return { ...prevState, image };
				}
				case 'expiresAt': {
					const expiresAt = e.target.value;
					return { ...prevState, expiresAt };
				}
				case 'target': {
					const array = JSON.parse(e.target.value);
					const target: string[] = [];
					array.map(
						({ value }: any) => target.includes(value) || target.push(value),
					);
					return { ...prevState, target };
				}
				case 'category': {
					const { value: category } = JSON.parse(e.target.value);
					return { ...prevState, category };
				}
				default:
					return prevState;
			}
		});
	};

	const onSave = () => {
		const { category, content, expiresAt, image, target, title } =
			selectedAnnouncement;

		const body: PostAnnouncement = {
			category,
			content,
			expiresAt,
			image,
			target,
			title,
		};

		switch (type) {
			case Type.new: {
				console.log(body);
				addAnnouncement({ body })
					.unwrap()
					.then(res => {
						toast.success(res.msg);

						closeModal();
					})
					.catch(err => {
						console.log(err);
					});
				break;
			}
			case Type.update: {
				const id = selectedAnnouncement.id;
				//TODO: fix this
				console.table({ id, body });
				updateAnnouncement({ id, body })
					.unwrap()
					.then(res => {
						toast.success(res.msg);
						closeModal();
					})
					.catch(err => {
						console.log(err);
					});
				break;
			}
		}
	};

	const onDelete = () => {
		const id = selectedAnnouncement.id;
		deleteAnnouncement({ id })
			.unwrap()
			.then(res => {
				toast.success(res.msg);
				closeModal();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (isSuccess) {
			let nextPage = page;
			const { name } = event.target as HTMLButtonElement;

			switch (name) {
				case 'next': {
					if (announcement.next) {
						nextPage++;
					}
					break;
				}
				case 'previous': {
					if (announcement.previous) {
						nextPage--;
					}
					break;
				}
			}
			setPage(nextPage);
		}
	};

	return (
		<>
			{isLoading && <ThreeDots />}
			{isSuccess && (
				<>
					<table className='table-announcement-list'>
						<thead>
							<tr data-title>
								<th>
									<p>{t('announcement')}</p>
									<BiSolidPlusSquare
										className='biSolidPlusSquare'
										onClick={newAnnouncement}
									/>
								</th>
							</tr>
							<tr className='grid'>
								<th>ID</th>
								<th>{t('title')}</th>
								<th>{t('created')}</th>
								<th>{t('updated')}</th>
								<th>{t('expires')}</th>
								<th>{t('actions')}</th>
							</tr>
						</thead>
						<tbody>
							{announcement.data.map(announcement => {
								const {
									id,
									title,
									createdAt: cAt,
									updatedAt: uAt,
									expiresAt: eAt,
								} = announcement;

								const createdAt = new Date(cAt).toLocaleDateString();
								const updatedAt = new Date(uAt).toLocaleDateString();
								const expiresAt = new Date(eAt).toLocaleDateString();

								return (
									<tr
										key={id}
										className='grid'
									>
										<td>{id}</td>
										<td>{title}</td>
										<td>{createdAt}</td>
										<td>{updatedAt}</td>
										<td>{expiresAt}</td>
										<td>
											<div
												className='actions'
												onClick={() => detailsModal({ announcement })}
											>
												<HiPencil className='hiPencil' />
												<HiOutlinePencil className='hiOutlinePencil' />
											</div>
											<div
												className='actions'
												onClick={() => deleteModal({ announcement })}
											>
												<HiTrash className='hiTrash' />
												<HiOutlineTrash className='hiOutlineTrash' />
											</div>
										</td>
									</tr>
								);
							})}
							<AnimatePresence>
								{isFetching && (
									<motion.tr
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										style={{
											position: 'absolute',
											top: 0,
											left: 0,
											width: '100%',
											height: '100%',
											margin: 0,
										}}
									>
										<td
											style={{
												backgroundColor: 'rgba(255, 255, 255, .5)',
											}}
										>
											<ThreeDots />
										</td>
									</motion.tr>
								)}
							</AnimatePresence>
						</tbody>
					</table>
					<div
						className='pagination-container'
						style={{ marginTop: '5px' }}
					>
						<p>
							{t('page')} {page}
						</p>
						<div className='pagination-btn-container'>
							<button
								disabled={page == 1 || isFetching}
								name={'previous'}
								onClick={handleChangePage}
							>
								<AiOutlineDoubleLeft />
							</button>
							<button
								disabled={!announcement?.next || isFetching}
								name={'next'}
								onClick={handleChangePage}
							>
								<AiOutlineDoubleRight />
							</button>
						</div>
					</div>
				</>
			)}

			<Modal
				className='details'
				isOpen={openDetailsModal}
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
					<Announcement announcement={selectedAnnouncement} />
				</section>
			</Modal>
			<Modal
				className='delete'
				isOpen={openDeleteModal}
				title={t('delete_announcement')}
				footer={
					<>
						<button onClick={onDelete}>{t('delete')}</button>
						<button onClick={closeModal}>{t('cancel')}</button>
					</>
				}
				onClick={closeModal}
			>
				<p>{t('delete_announcement_message')}</p>
			</Modal>
		</>
	);
}

export default AnnouncementTable;
