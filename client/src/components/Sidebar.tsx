import { useState } from 'react';
import { sidebarItems } from '../utils/pages';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
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

  return (
    <>
      <nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <div className="top-section">
          <div className={`logo-container ${isOpen ? '' : 'closed'}`}>
            <img
              className="logo"
              src={logo}
              alt="logo"
            />
          </div>

          <div
            className="bars"
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
                  {item.name}
                </div>
              </NavLink>
            );
          }
        })}
        <div
          data-div="Logout"
          className="link"
          onClick={handlerClickLogout}
        >
          <div className="icon">
            <FaSignOutAlt />
          </div>
          <div className={`link-text ${isOpen ? '' : 'closed'}`}>Logout</div>
        </div>
      </nav>
      <Logout show={`${showLogout ? 'show' : 'hide'}`} />
    </>
  );
}

export default Sidebar;
