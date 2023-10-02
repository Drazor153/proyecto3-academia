import { useState } from 'react'
import { menuItems, privilegedItems } from '../utils/pages'
import { FaBars } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'


function Sidebar({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen)
    const role = useAppSelector(state => state.userReducer.role)

    return (
        <>
            <nav className={`sidebar ${isOpen ? "" : "closed"}`}>
                <div className='top-section'>
                    <img className={`logo ${isOpen ? "" : "closed"}`} src="src\assets\logo.png" alt="logo" />
                    <div className='bars'>
                        <FaBars onClick={toggleOpen} />
                    </div>
                </div>
                {
                    (role == 'SUPERUSER' ? [...menuItems, ...privilegedItems] : menuItems).map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className={
                                ({ isActive }) => (isActive ? "link active" : "link")
                            }
                            style={{ justifyContent: isOpen ? "" : "center" }}
                        >
                            <div className='icon'>{item.icon}</div>
                            <div className={`link-text ${isOpen ? "" : "closed"}`}>{item.name}</div>
                        </NavLink>
                    ))
                }
            </nav>
            {children}
        </>
    )
}

export default Sidebar