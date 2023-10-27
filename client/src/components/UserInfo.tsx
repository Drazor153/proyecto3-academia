import { t } from 'i18next';
import { useAppSelector } from '../redux/hooks';
import { BiSolidUserRectangle } from 'react-icons/bi';

function UserInfo() {
	const user = useAppSelector(state => state.userReducer);

	return (
		<div className="user-info-container">
			<div className="user-icon">
				<BiSolidUserRectangle />
			</div>
			<div className="user-info">
				<b className="user-name">
					{user.name} {user.first_surname}
				</b>
				<small className="user-role">
					{t(user.role.toLowerCase())}
				</small>
			</div>
		</div>
	);
}

export default UserInfo;
