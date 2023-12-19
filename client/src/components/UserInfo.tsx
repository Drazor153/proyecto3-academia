import { t } from 'i18next';
import { useAppSelector } from '../redux/hooks';
import { BiSolidUserRectangle, BiSolidLock } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Suspense, lazy, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';

function UserInfo() {
	const user = useAppSelector(state => state.userReducer);
	useTranslation();
	// const navigate = useNavigate();
	const ChangePasswordModal = lazy(() => import('./ChangePasswordModal'));
	const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

	return (
		<div className='user-container'>
			<NavLink
				className='user-info-container'
				to={`/profile`}
				// style={({ isActive }) => ({
				//   opacity: isActive ? 1 : 0.7,
				// })}
				// onMouseEnter={e => {
				//   e.currentTarget.style.opacity = '1';
				// }}
				// onClick={() => navigate('/profile')}
			>
				<div className='user-icon'>
					<BiSolidUserRectangle />
				</div>
				<div className='user-info'>
					<b className='user-name'>
						{user.name} {user.first_surname}
					</b>
					<small className='user-role'>{t(user.role.toLowerCase())}</small>
				</div>
			</NavLink>
			<div className='float-menu'>
				<div
					className='float-menu-item'
					onClick={() => setOpenChangePasswordModal(true)}
				>
					<BiSolidLock />
					<span className='user-role'>{t('change_password')}</span>
				</div>
			</div>
			{openChangePasswordModal && (
				<Suspense fallback={<ThreeDots />}>
					<ChangePasswordModal
						open={openChangePasswordModal}
						handleClose={() => setOpenChangePasswordModal(false)}
					/>
				</Suspense>
			)}
		</div>
	);
}

export default UserInfo;
