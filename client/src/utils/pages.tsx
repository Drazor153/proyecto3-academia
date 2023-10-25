import { FaTh, FaBookOpen, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import Dashboard from '../pages/Dashboard';
import Grades from '../pages/Grades';
import Classes from '../pages/Classes';
import Administration from '../pages/Administration';

export const menuItems = [
	{
		path: '/',
		name: 'Dashboard',
		icon: <FaTh />,
		component: <Dashboard />,
		only: ['all'],
	},
	{
		path: '/grades',
		name: 'Grades',
		icon: <FaBookOpen />,
		component: <Grades />,
		only: ['all'],
	},
	{
		path: '/classes',
		name: 'Classes',
		icon: <FaRegCalendarAlt />,
		component: <Classes />,
		only: ['all'],
	},

	{
		path: '/administration',
		name: 'Administration',
		icon: <FaUser />,
		component: <Administration />,
		only: ['ADMIN'],
	},
	{
		path: '/administration/:m/:c',
		name: 'Administration',
		icon: <FaUser />,
		component: <Administration />,
		only: ['all'],
		type: 'route',
	},
];

export const privilegedItemsShortcuts = [
	{
		path: '/administration/students/registration',
		name: 'Student Registration',
		icon: <FaUser />,
		component: <Administration />,
	},
];
