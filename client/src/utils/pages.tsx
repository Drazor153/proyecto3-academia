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

export const sidebarItems = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <FaTh />,
    only: ['ALL'],
  },
  {
    path: '/grades',
    name: 'Grades',
    icon: <FaBookOpen />,
    only: ['ALL'],
  },
  {
    path: '/classes',
    name: 'Classes',
    icon: <FaRegCalendarAlt />,
    only: ['ALL'],
  },
  {
    path: '/justifications',
    name: 'Justifications',
    icon: <FaFileAlt />,
    only: ['STUDENT'],
  },
  {
    path: '/administration',
    name: 'Administration',
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
];

export const routes = createBrowserRouter(
  [
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
          element: <Dashboard />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'profile/:tab',
          element: <Profile />,
        },
        {
          path: 'grades',
          element: <Grades />,
        },
        {
          path: 'classes',
          element: <Classes />,
        },
        {
          path: 'justifications',
          element: <Justifications />,
        },
        {
          path: 'administration',
          element: <Administration />,
        },
        {
          path: 'administration/:menu',
          element: <Administration />,
        },
        {
          path: 'administration/:menu/:content',
          element: <Administration />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <Navigate to={'/'} />,
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  },
);
