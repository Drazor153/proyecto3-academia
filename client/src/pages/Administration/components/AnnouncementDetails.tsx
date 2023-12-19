import { t } from 'i18next';
import { ChangeEvent } from 'react';
import { AnnouncementType } from '@/utils/types';
import { compressImage } from '@/utils/functions';
import Select from 'react-select';
import { useGetCategoriesTargetsQuery } from '@/redux/services/announcementsApi';
import { ThreeDots } from 'react-loading-icons';

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
			{isLoading && <ThreeDots />}
			{isSuccess && response && (
				<section>
					<form>
						<label htmlFor='title'>{t('title')}</label>
						<input
							type='text'
							name='title'
							id='title'
							placeholder={t('title')}
							value={announcement.title}
							onChange={onChange}
							required
						/>
						<label htmlFor='content'>{t('content')}</label>
						<textarea
							name='content'
							id='content'
							placeholder={t('content')}
							value={announcement.content}
							onChange={onChange}
							required
						/>
						<label htmlFor='category'>{t('category')}</label>
						<Select
							name='category'
							placeholder={t('category')}
							className='react-select-container'
							classNamePrefix='react-select'
							value={
								announcement.category && {
									value: announcement.category,
									label: t(announcement.category),
								}
							}
							options={response.categories.map(
								({ name }: { name: string }) => ({
									value: name,
									label: t(name),
								}),
							)}
							onChange={choice => {
								onChange({
									target: { name: 'category', value: JSON.stringify(choice) },
								} as ChangeEvent<HTMLInputElement>);
							}}
							required
							menuPlacement='top'
						/>
						<label>{t('expires')}</label>
						<input
							type='date'
							name='expiresAt'
							id='expiresAt'
							min={new Date().toISOString().split('T')[0]}
							max={
								new Date(new Date().setMonth(new Date().getMonth() + 1))
									.toISOString()
									.split('T')[0]
							}
							value={new Date(announcement.expiresAt).toLocaleDateString(
								'en-CA',
								{},
							)}
							onChange={onChange}
							required
						/>

						<label htmlFor='target'>{t('target')}</label>
						<Select
							name='target'
							placeholder={t('target')}
							className='react-select-container'
							classNamePrefix='react-select'
							value={announcement.target.map(name => ({
								value: name,
								label: t(name),
							}))}
							options={response.targets.map(({ name }) => {
								return {
									value: name,
									label: t(name),
								};
							})}
							onChange={choice => {
								onChange({
									target: { name: 'target', value: JSON.stringify(choice) },
								} as ChangeEvent<HTMLInputElement>);
							}}
							required
							isMulti
							menuPlacement='top'
							closeMenuOnSelect={false}
							// hideSelectedOptions
							// isSearchable
						/>

						<span>{t('image')}</span>
						<label
							htmlFor='image'
							className='file-upload'
						>
							{t('upload_image')}
						</label>
						<input
							type='file'
							name='image'
							id='image'
							accept='image/*'
							className='form-control-file'
							onChange={onChangeImage}
						/>
					</form>
				</section>
			)}
		</>
	);
}

export default AnnouncementDetails;
