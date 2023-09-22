import { useState } from 'react'
import { menuItems } from '../utils/pages'
import { FaBars } from 'react-icons/fa'
import '../scss/sidebar.scss'
import { NavLink } from 'react-router-dom'


function Sidebar({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen)

    return (
        <>
            <div className={`sidebar ${isOpen ? "" : "closed"}`}>
                <div className='top-section'>
                    <img className={`logo ${isOpen ? "" : "closed"}`} src="src\assets\logo.png" alt="logo" />
                    <div className='bars'>
                        <FaBars onClick={toggleOpen} />
                    </div>
                </div>
                {
                    menuItems.map((item, index) => (
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
            </div>
            {children}
        </>
    )
}

export default Sidebar