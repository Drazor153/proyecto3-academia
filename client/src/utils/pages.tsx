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
        color: "#BDA69E"
    },
    {
        path: "/Grades",
        name: "Grades",
        icon: <FaBookOpen />,
        component: <Grades />,
        color: "#F4A460"
    },
    {
        path: "/Classes",
        name: "Classes",
        icon: <FaRegCalendarAlt />,
        component: <Classes />,
        color: "#FFE5B4"
    },
    {
        path: "/Logout",
        name: "Logout",
        icon: <FaSignOutAlt />,
        component: <Logout />,
        color: "#DDD06A"
    }
]

export const privilegedItems = [
    {
        path: "/Administration",
        name: "Administration",
        icon: <FaUser />,
        component: <Administration shortcut='' />,
        color: "#BDA69E"
    }]

export const privilegedItemsShortcuts = [
    {
        path: "/Administration/Student/Registration",
        name: "Student Registration",
        icon: <FaUser />,
        component: <Administration shortcut={['Students', 'Registration']} />,
        color: "#BDA69E"
    }
]
