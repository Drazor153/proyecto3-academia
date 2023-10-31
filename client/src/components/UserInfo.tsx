import { t } from 'i18next';
import { useAppSelector } from '../redux/hooks';
import { BiSolidUserRectangle } from 'react-icons/bi';
// import { useNavigate } from 'react-router-dom';

function UserInfo() {
  const user = useAppSelector(state => state.userReducer);

  // const navigate = useNavigate();

  return (
    <div
      className="user-info-container"
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
    </div>
  );
}

export default UserInfo;
