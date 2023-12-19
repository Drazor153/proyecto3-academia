import { useEffect, useState } from 'react';
import { sidebarItems } from '../utils/pages';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toast } from 'react-toastify';
import Logout from './Logout';
import { useLogoutMutation } from '../redux/services/userApi';
import { logout } from '../redux/features/userSlice';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

function Sidebar() {
	useTranslation();
	const [isOpen, setIsOpen] = useState(
		localStorage.getItem('sidebar') === 'true' ? true : false,
	);
	const [showLogout, setShowLogout] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);
	const { role } = useAppSelector(state => state.userReducer);

	const navigate = useNavigate();

	const [logoutQuery] = useLogoutMutation();
	const dispatch = useAppDispatch();

	const handlerClickLogout = () => {
		setShowLogout(true);
		logoutQuery(null)
			.unwrap()
			.then(result => {
				toast.success(result.msg);
				dispatch(logout());
				setShowLogout(false);
				navigate('/login');
			});
	};

	useEffect(() => {
		localStorage.setItem('sidebar', isOpen.toString());
	}, [isOpen]);

	return (
		<>
			<nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
				<div className='top-section'>
					<div className={`logo-container ${isOpen ? '' : 'closed'}`}>
						<img
							className='logo'
							src={'/images/hlogo.png'}
							alt='logo'
						/>
					</div>

					<div
						className='bars'
						onClick={toggleOpen}
					>
						<FaBars />
					</div>
				</div>
				{sidebarItems.map((item, index) => {
					if (item.only.includes('ALL') || item.only.includes(role)) {
						return (
							<NavLink
								to={item.path}
								key={index}
								className={({ isActive }) =>
									isActive ? 'link active' : 'link'
								}
							>
								<div className={`icon ${isOpen ? '' : 'closed'}`}>
									{item.icon}
								</div>
								<div className={`link-text ${isOpen ? '' : 'closed'}`}>
									{t(item.name)}
								</div>
							</NavLink>
						);
					}
				})}

				<img
					src='/images/utalogo.png'
					className={`sidebar-logo-uta${isOpen ? ' open' : ' closed'}`}
				/>
				<div
					data-div='Logout'
					className='link'
					onClick={handlerClickLogout}
				>
					<div className='icon'>
						<FaSignOutAlt />
					</div>
					<div className={`link-text ${isOpen ? '' : 'closed'}`}>
						{t('logout')}
					</div>
				</div>
			</nav>
			<Logout show={`${showLogout ? 'show' : 'hide'}`} />
		</>
	);
}

export default Sidebar;
