import '../scss/userinfo.scss'
import { BiSolidUserRectangle } from 'react-icons/bi'

interface Props {
    name: string;
    role: string;
}

function UserInfo({ name, role }: Props) {
    return (
        <div className='user-info-container'>
            <div className='user-icon'>
                <BiSolidUserRectangle />
            </div>
            <div className='user-info'>
                <b className='user-name'>{name}</b>
                <small className='user-role'>{role}</small>
            </div>
        </div>
    )
}

export default UserInfo