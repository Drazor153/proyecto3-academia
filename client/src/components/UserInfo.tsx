import { t } from 'i18next';
import { useAppSelector } from '../redux/hooks';
import { BiSolidUserRectangle } from 'react-icons/bi';
import { useNavigate, NavLink } from 'react-router-dom';

function UserInfo() {
  const user = useAppSelector(state => state.userReducer);

  // const navigate = useNavigate();

  return (
    <NavLink
      className="user-info-container"
      to={`/profile`}
      // style={({ isActive }) => ({
      //   opacity: isActive ? 1 : 0.7,
      // })}
      // onMouseEnter={e => {
      //   e.currentTarget.style.opacity = '1';
      // }}
      // onClick={() => navigate('/profile')}
    >
      <div className="user-icon">
        <BiSolidUserRectangle />
      </div>
      <div className="user-info">
        <b className="user-name">
          {user.name} {user.first_surname}
        </b>
        <small className="user-role">{t(user.role.toLowerCase())}</small>
      </div>
    </NavLink>
  );
}

export default UserInfo;
