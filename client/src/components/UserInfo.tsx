import { useAppDispatch, useAppSelector } from '../redux/hooks'
// import { swaptype } from '../redux/features/userSlice'
import { BiSolidUserRectangle } from 'react-icons/bi'


function UserInfo() {
    const user = useAppSelector(state => state.userReducer)
    // const dispatch = useAppDispatch()

    return (
        <div className='user-info-container'
        // onClick={() => dispatch(swaptype())}
        >
            <div className='user-icon'>
                <BiSolidUserRectangle />
            </div>
            <div className='user-info'>
                <b className='user-name'>{user.name}</b>
                <small className='user-role'>{user.role}</small>
            </div>
        </div>
    )
}

export default UserInfo