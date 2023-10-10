import { FaTh, FaBookOpen, FaRegCalendarAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import Dashboard from '../pages/Dashboard'
import Grades from '../pages/Grades'
import Classes from '../pages/Classes'
import Logout from '../components/Logout'
import Administration from '../pages/Administration'

export const menuItems = [
    {
        path: "/",
        name: "Dashboard",
        icon: <FaTh />,
        component: <Dashboard />,
    },
    {
        path: "/Grades",
        name: "Grades",
        icon: <FaBookOpen />,
        component: <Grades />,
    },
    {
        path: "/Classes",
        name: "Classes",
        icon: <FaRegCalendarAlt />,
        component: <Classes />,
    },
    {
        path: "/Logout",
        name: "Logout",
        icon: <FaSignOutAlt />,
        component: <Logout />,
    }
]

export const privilegedItems = [
    {
        path: "/Administration",
        name: "Administration",
        icon: <FaUser />,
        component: <Administration shortcut='' />,
    }]

export const privilegedItemsShortcuts = [
    {
        path: "/Administration/Student/Registration",
        name: "Student Registration",
        icon: <FaUser />,
        component: <Administration shortcut={['Students', 'Registration']} />,
    }
]
