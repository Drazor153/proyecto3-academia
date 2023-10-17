import { t } from "i18next";
import { useAppSelector } from "../redux/hooks";
// import { swaptype } from '../redux/features/userSlice'
import { BiSolidUserRectangle } from "react-icons/bi";
import { useTranslation } from "react-i18next";

function UserInfo() {
  useTranslation();
  const user = useAppSelector((state) => state.userReducer);
  // const dispatch = useAppDispatch()

  return (
    <div
      className="user-info-container"
      // onClick={() => dispatch(swaptype())}
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
