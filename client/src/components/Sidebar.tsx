import { useState } from 'react';
import { menuItems, privilegedItems } from '../utils/pages';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toast } from 'react-toastify';
import logo from '../assets/hlogo.png';
import Logout from './Logout';
import { useLogoutMutation } from '../redux/services/userApi';
import { logout } from '../redux/features/userSlice';

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);
	const role = useAppSelector(state => state.userReducer.role);

	const [logoutQuery] = useLogoutMutation();
	const dispatch = useAppDispatch();

	const handlerClickLogout = () => {
		setShowLogout(true);
		logoutQuery(null)
			.unwrap()
			.then(result => {
				toast.success(result.msg);
				dispatch(logout());
			});
	};

	return (
		<>
			<nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
				<div className="top-section">
					<img
						className={`logo ${isOpen ? '' : 'closed'}`}
						src={logo}
						alt="logo"
					/>
					<div className="bars">
						<FaBars onClick={toggleOpen} />
					</div>
				</div>
				{(role == 'ADMIN'
					? [...menuItems, ...privilegedItems]
					: menuItems
				).map((item, index) => (
					<NavLink
						to={item.path}
						key={index}
						className={({ isActive }) =>
							isActive ? 'link active' : 'link'
						}
						style={{ justifyContent: isOpen ? '' : 'center' }}
					>
						<div className="icon">{item.icon}</div>
						<div className={`link-text ${isOpen ? '' : 'closed'}`}>
							{item.name}
						</div>
					</NavLink>
				))}
				<div
					data-div="Logout"
					className="link"
					style={{ justifyContent: isOpen ? '' : 'center' }}
					onClick={handlerClickLogout}
				>
					<div className="icon">
						<FaSignOutAlt />
					</div>
					<div className={`link-text ${isOpen ? '' : 'closed'}`}>
						Logout
					</div>
				</div>
			</nav>
			<Logout show={`${showLogout ? 'show' : 'hide'}`} />
		</>
	);
}

export default Sidebar;
