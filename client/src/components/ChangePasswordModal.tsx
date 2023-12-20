import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import { Dispatch, FormEvent, useState } from 'react';
import FloatLabelInput from './FloatLabelInput';
import { useChangePasswordMutation } from '@/redux/services/userApi';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loading-icons';

interface ChangePasswordModalProps {
	open: boolean;
	handleClose: Dispatch<boolean>;
}
export default function ChangePasswordModal({
	open,
	handleClose,
}: ChangePasswordModalProps) {
	const { t } = useTranslation();
	const [changePassword] = useChangePasswordMutation();
	const [isLoading, setIsLoading] = useState(false);

	const submitChangePasswordForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const oldPassword = formData.get('old_password') as string;
		const newPassword = formData.get('new_password') as string;
		const confirmPassword = formData.get('confirm_password') as string;

		if (!oldPassword || !newPassword || !confirmPassword) {
			toast.error(t('invalid_field'), { toastId: 'invalid_field' });
			return;
		}

		if (oldPassword === newPassword) {
			toast.error(t('same_password'), { toastId: 'same_password' });
			return;
		}

		if (newPassword !== confirmPassword) {
			toast.error(t('mismatch_password'), { toastId: 'confirm_password' });
			return;
		}

		setIsLoading(true);
		toast.loading(t('changing_password'), { toastId: 'changing_password' });

		changePassword({ oldPassword, newPassword })
			.unwrap()
			.then(payload => {
				handleClose(true);
				toast.update('changing_password', {
					isLoading: false,
					type: 'success',
					render: t(payload.msg),
				});
			})
			.catch(error => {
				toast.update('changing_password', {
					isLoading: false,
					type: 'error',
					render: t(error.data.msg),
				});
			});

		e.currentTarget.reset();
		setIsLoading(false);
	};

	return (
		<Modal
			isOpen={() => open}
			onClick={() => handleClose(false)}
		>
			<div className='change-password-modal'>
				<h2>{t('change_password')}</h2>
				<form
					className='change-password-form'
					onSubmit={submitChangePasswordForm}
				>
					<div>
						<FloatLabelInput
							name='old_password'
							type='password'
							autocomplete='false'
						/>
						<FloatLabelInput
							name='new_password'
							type='password'
							autocomplete='false'
						/>
						<FloatLabelInput
							name='confirm_password'
							type='password'
							autocomplete='false'
						/>
					</div>

					<button
						type='submit'
						disabled={isLoading}
						className={`button ${isLoading ? 'loading-btn' : ''}`}
					>
						{isLoading ? <ThreeDots /> : t('confirm')}
					</button>
				</form>
			</div>
		</Modal>
	);
}
