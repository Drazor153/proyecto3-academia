import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/Modal';
import { useRef, useState } from 'react';
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { MdFileUpload } from 'react-icons/md';
import { useCreateJustificationMutation } from '@/redux/services/justificationApi';
import { toast } from 'react-toastify';

function CreateJustificationFooter({
	submitHandler,
}: {
	submitHandler: () => void;
}) {
	return (
		<>
			<button
				type='button'
				onClick={submitHandler}
			>
				{t('save')}
			</button>
		</>
	);
}

export function CreateJustification({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	useTranslation();
	const [initialDate, setInitialDate] = useState('');
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [CreateJustification] = useCreateJustificationMutation();

	const handleSubmit = (form: HTMLFormElement) => {
		if (!form) return;
		const formData = new FormData(form);
		const description = formData.get('reason') as string;
		const initialDate = formData.get('initAusencia') as string;
		const finalDate = formData.get('endAusencia') as string;
		const file = formData.get('file') as File;
		if (!description || !initialDate || !finalDate || !file) {
			toast.error(t('empty_fields'), { toastId: 'empty_fields' });
			return;
		}

		const loadingToast = toast.loading(t('creating_justification'));

		CreateJustification({
			body: formData,
		})
			.unwrap()
			.then(payload => {
				toast.update(loadingToast, {
					isLoading: false,
					type: 'success',
					render: t(payload.msg),
					autoClose: 1000,
				});
				closeModal();
			})
			.catch(error =>
				toast.update(loadingToast, {
					isLoading: false,
					type: 'error',
					render: t(error.message),
					autoClose: 1000,
				}),
			);
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setPdfFile(file);
		}
	};

	const closeModal = () => {
		formRef.current?.reset();
		setOpen(false);
		setPdfFile(null);
	};

	return (
		<Modal
			title={t('create_justification')}
			isOpen={() => open}
			onClick={closeModal}
			footer={
				<CreateJustificationFooter
					submitHandler={() => handleSubmit(formRef.current as HTMLFormElement)}
				/>
			}
		>
			<div className='create-justification'>
				<form
					className='create-justification-form'
					ref={formRef}
				>
					<div className='form-group'>
						<label htmlFor='justification-description'>
							{t('justification_description')}
						</label>
						<textarea
							className='form-control'
							id='justification-description'
							name='reason'
							rows={10}
							placeholder={t('justification_detail')}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='initial-date'>{t('initial_date')}</label>
						<input
							type='date'
							className='form-control'
							id='initial-date'
							name='initAusencia'
							onChange={e => setInitialDate(e.target.value)}
							placeholder={t('initial_date')}
						/>
						<label htmlFor='final-date'>{t('final_date')}</label>
						<input
							type='date'
							className='form-control'
							id='final-date'
							name='endAusencia'
							min={initialDate}
							placeholder={t('final_date')}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='file-upload'>{t('upload_backup_file')}</label>
						<span className='additional-info'>({t('pdf_only')})</span>
						<label
							htmlFor='file-upload'
							className='file-upload'
						>
							{pdfFile ? (
								<>
									<MdFileUpload />
									<span>{pdfFile.name}</span>
								</>
							) : (
								<>
									<MdFileUpload />
									<span>{t('upload_file')}</span>
								</>
							)}
						</label>
						<input
							type='file'
							className='form-control-file'
							id='file-upload'
							name='file'
							accept='application/pdf'
							onChange={handleFileUpload}
						/>
					</div>
				</form>

				<div className='justification-pdf-preview'>
					<h4>{t('justification_pdf_preview')}</h4>
					<div className='pdf-preview'>
						{pdfFile ? (
							<Viewer
								fileUrl={URL.createObjectURL(pdfFile)}
								defaultScale={SpecialZoomLevel.PageFit}
							/>
						) : (
							<span>{t('no_file')}</span>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default CreateJustification;
