import { t } from 'i18next';
import { ChangeEvent } from 'react';
import { AnnouncementType } from '../../../utils/types';
import { compressImage } from '../../../utils/functions';
import Select from 'react-select';
import { useGetCategoriesTargetsQuery } from '../../../redux/services/announcementsApi';

interface AnnouncementDetailsProps {
	announcement: AnnouncementType;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function AnnouncementDetails({
	announcement,
	onChange,
}: AnnouncementDetailsProps) {
	const {
		data: response,
		isLoading,
		isSuccess,
	} = useGetCategoriesTargetsQuery(null);

	const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target as HTMLInputElement;
		if (fileInput.files?.length) {
			const reader = new FileReader();
			const fileImage = fileInput.files[0];
			const percentQuality = 25;

			const blob: Blob = await compressImage({
				fileImage,
				percentQuality,
			});
			reader.addEventListener('load', () => {
				const image = reader.result?.toString().split(',')[1];
				onChange({
					target: { name: e.target.name, value: image },
				} as ChangeEvent<HTMLInputElement>);
			});
			reader.readAsDataURL(blob);
		}
	};

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{isSuccess && (
				<section>
					<form>
						<label htmlFor="title">{t('title')}</label>
						<input
							type="text"
							name="title"
							id="title"
							placeholder={t('title')}
							value={announcement.title}
							onChange={onChange}
							required
						/>
						<label htmlFor="content">{t('content')}</label>
						<textarea
							name="content"
							id="content"
							placeholder={t('content')}
							value={announcement.content}
							onChange={onChange}
							required
						/>
						<label htmlFor="category">{t('category')}</label>
						<Select
							name="category"
							placeholder={t('category')}
							className="react-select-container"
							classNamePrefix="react-select"
							value={{
								value: announcement.category.id,
								label: t(announcement.category.name),
							}}
							options={response.categories.map(
								({ id: value, name: label }: { id: number; name: string }) => ({
									value,
									label: t(label),
								}),
							)}
							onChange={choice => {
								onChange({
									target: { name: 'category', value: JSON.stringify(choice) },
								} as ChangeEvent<HTMLInputElement>);
							}}
							required
						/>
						{/* <input
					type="text"
					name="category"
					id="category"
					placeholder={t('category')}
					value={announcement.category}
					onChange={onChange}
				/> */}
						<label>{t('expires')}</label>
						<input
							type="date"
							name="expiresAt"
							id="expiresAt"
							min={new Date().toISOString().split('T')[0]}
							max={
								new Date(new Date().setMonth(new Date().getMonth() + 1))
									.toISOString()
									.split('T')[0]
							}
							value={announcement.expiresAt.split('T')[0]}
							onChange={onChange}
							required
						/>

						<label htmlFor="target">{t('target')}</label>
						<Select
							name="target"
							placeholder={t('target')}
							className="react-select-container"
							classNamePrefix="react-select"
							value={{
								value: announcement.target[0],
								label: t(announcement.target[0].name),
							}}
							options={response.targets.map(
								({ id: value, name: label }: { id: number; name: string }) => ({
									value,
									label: t(label),
								}),
							)}
							onChange={choice => {
								onChange({
									target: { name: 'target', value: JSON.stringify(choice) },
								} as ChangeEvent<HTMLInputElement>);
							}}
							required
						/>

						<label htmlFor="image">{t('image')}</label>
						<input
							type="file"
							name="image"
							id="image"
							accept="image/*"
							onChange={onChangeImage}
						/>
					</form>
				</section>
			)}
		</>
	);
}

export default AnnouncementDetails;
