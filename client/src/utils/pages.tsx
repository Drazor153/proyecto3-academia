import { FaTh, FaBookOpen, FaRegCalendarAlt, FaFileAlt } from 'react-icons/fa';
import Dashboard from '../pages/Dashboard';
import Grades from '../pages/Grades';
import Classes from '../pages/Classes';
import Administration from '../pages/Administration';
import { MdManageAccounts, MdNewspaper, MdPersonSearch } from 'react-icons/md';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import UserInfo from '../components/UserInfo';
import LanguageSwap from '../components/LanguageSwap';
import Sidebar from '../components/Sidebar';
import Login from '../pages/Login';
import Profile from '@/pages/Profile';
import Justifications from '@/pages/Justifications';
import { Suspense, lazy } from 'react';
import LazyLoading from '@/components/LazyLoading';

export const sidebarItems = [
	{
		path: '/',
		name: 'dashboard',
		icon: <FaTh />,
		only: ['ALL'],
	},
	{
		path: '/grades',
		name: 'grades',
		icon: <FaBookOpen />,
		only: ['ALL'],
	},
	{
		path: '/classes',
		name: 'classes',
		icon: <FaRegCalendarAlt />,
		only: ['ALL'],
	},
	{
		path: '/justifications',
		name: 'justifications',
		icon: <FaFileAlt />,
		only: ['STUDENT'],
	},
	{
		path: '/administration',
		name: 'administration',
		icon: <MdManageAccounts />,
		only: ['ADMIN'],
	},
];

export const shortcutsItems = [
	{
		path: '/',
		name: 'Dashboard',
		icon: <FaTh />,
	},
	{
		path: '/grades',
		name: 'Grades',
		icon: <FaBookOpen />,
	},
	{
		path: '/classes',
		name: 'Classes',
		icon: <FaRegCalendarAlt />,
	},
	{
		path: '/justifications',
		name: 'Justifications',
		icon: <FaFileAlt />,
	},
];

export const privilegedShortcutsItems = [
	{
		path: '/administration',
		name: 'Administration',
		icon: <MdManageAccounts />,
	},
	{
		path: '/administration/students/registration',
		name: 'Student Registration',
		icon: <MdManageAccounts />,
		component: <Administration />,
	},
	{
		path: '/administration/students/search',
		name: 'Student Search',
		icon: <MdPersonSearch />,
	},
	{
		path: '/administration/announcement/manage',
		name: 'Manage Announcements',
		icon: <MdNewspaper />,
	},
];

export const profileItems = [
	{
		path: '/profile/basic',
		name: 'basic_information',
	},
	{
		path: '/profile/academic',
		name: 'academic_information',
	},
	{
		path: '/profile/security',
		name: 'security',
	},
];

export const administrationItems = [
	{
		path: '/administration/students',
		menu: 'students',
		children: [
			{
				path: '/administration/students',
				content: '',
			},
			{
				path: '/administration/students/registration',
				content: 'registration',
			},
			{
				path: '/administration/students/search',
				content: 'search',
			},
			{
				path: '/administration/students/justifications',
				content: 'justifications',
			},
		],
	},
	{
		path: '/administration/announcement/manage',
		menu: 'announcement',
		children: [
			{
				path: '/administration/announcement/manage',
				content: 'manage',
			},
		],
	},
	{
		path: '/administration/calendar',
		menu: 'calendar',
		children: [
			{
				path: '/administration/calendar',
				content: '',
			},
			{
				path: '/administration/calendar/exams',
				content: 'exams',
			},
			{
				path: '/administration/calendar/academic',
				content: 'academic',
			},
		],
	},
];

const LazyDashboard = lazy(() => import('../pages/Dashboard'));

const LazyProfile = lazy(() => import('../pages/Profile'));

const LazyGrades = lazy(() => import('../pages/Grades'));

const LazyClasses = lazy(() => import('../pages/Classes'));

const LazyJustifications = lazy(() => import('../pages/Justifications'));

const LazyAdministration = lazy(() => import('../pages/Administration'));

const LazyLogin = lazy(() => import('../pages/Login'));

export const routes = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<UserInfo />
				<LanguageSwap />
				<Sidebar />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyDashboard />
					</Suspense>
				),
			},
			{
				path: 'profile',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyProfile />
					</Suspense>
				),
			},
			{
				path: 'profile/:tab',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyProfile />
					</Suspense>
				),
			},
			{
				path: 'grades',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyGrades />
					</Suspense>
				),
			},
			{
				path: 'classes',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyClasses />
					</Suspense>
				),
			},
			{
				path: 'justifications',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyJustifications />
					</Suspense>
				),
			},
			{
				path: 'administration',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyAdministration />
					</Suspense>
				),
			},
			{
				path: 'administration/:menu',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyAdministration />
					</Suspense>
				),
			},
			{
				path: 'administration/:menu/:content',
				element: (
					<Suspense fallback={<LazyLoading />}>
						<LazyAdministration />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/login',
		element: (
			<Suspense fallback={<LazyLoading />}>
				<LazyLogin />
			</Suspense>
		),
	},
	{
		path: '*',
		element: <Navigate to={'/'} />,
	},
]);
