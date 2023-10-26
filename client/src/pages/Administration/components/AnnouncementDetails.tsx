import { t } from 'i18next';
import { ChangeEvent } from 'react';
import { AnnouncementType } from '../../../utils/types';
import { compressImage } from '../../../utils/functions';
import Select from 'react-select';

interface AnnouncementDetailsProps {
	announcement: AnnouncementType;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function AnnouncementDetails({
	announcement,
	onChange,
}: AnnouncementDetailsProps) {
	const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target as HTMLInputElement;
		if (fileInput.files?.length) {
			const reader = new FileReader();
			const fileImage = fileInput.files[0];
			const percentQuality = 50;

			const blob: Blob = await compressImage({
				fileImage,
				percentQuality,
			});
			reader.addEventListener('load', () => {
				const image = reader.result?.toString().split(',')[1];
				// const image = reader.result as ArrayBuffer;
				onChange({
					target: { name: e.target.name, value: image },
				} as ChangeEvent<HTMLInputElement>);
			});
			reader.readAsDataURL(blob);
		}
	};

	return (
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
				/>
				<label htmlFor="content">{t('content')}</label>
				<textarea
					name="content"
					id="content"
					placeholder={t('content')}
					value={announcement.content}
					onChange={onChange}
				/>
				<label htmlFor="category">{t('category')}</label>
				<Select
					name="category"
					placeholder={t('category')}
					className="react-select-container"
					classNamePrefix="react-select"
					options={[
						{ value: 1, label: 'Deportes' },
						// { value: 1, label: 'A1' },
						// { value: 2, label: 'A2' },
						// { value: 3, label: 'B1' },
						// { value: 4, label: 'B2' },
						// { value: 5, label: 'C1' },
					].map(({ value, label }) => ({
						value,
						label: t(label),
					}))}
					onChange={choice => {
						onChange({
							target: { name: 'category', value: JSON.stringify(choice) },
						} as ChangeEvent<HTMLInputElement>);
					}}
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
					onChange={onChange}
				/>

				<label htmlFor="target">{t('target')}</label>
				<Select
					name="target"
					placeholder={t('target')}
					className="react-select-container"
					classNamePrefix="react-select"
					options={[
						{ value: 0, label: 'ALL' },
						{ value: 1, label: 'A1' },
						{ value: 2, label: 'A2' },
						{ value: 3, label: 'B1' },
						{ value: 4, label: 'B2' },
						{ value: 5, label: 'C1' },
					].map(({ value, label }) => ({
						value,
						label: t(label),
					}))}
					onChange={choice => {
						onChange({
							target: { name: 'target', value: choice?.value.toString() },
						} as ChangeEvent<HTMLInputElement>);
					}}
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
	);
}

export default AnnouncementDetails;
