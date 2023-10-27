import { FaTh, FaBookOpen, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import Dashboard from '../pages/Dashboard';
import Grades from '../pages/Grades';
import Classes from '../pages/Classes';
import Administration from '../pages/Administration';
import { AnnouncementType } from './types';

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

// export const announcement: AnnouncementType[] = [
// 	{
// 		id: 1,
// 		title: 'Mi primera publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Sofia Rodriguez',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-01').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-01').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 2,
// 		title: 'Mi segunda publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'ucas Martinez',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-02').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-02').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 3,
// 		title: 'Mi tercera publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Valentina Gomez',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-03').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-03').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 4,
// 		title: 'Mi cuarta publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Santiago Fernandez',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-04').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-04').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 5,
// 		title: 'Mi quinta publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Isabella Torres',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-05').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-05').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 6,
// 		title: 'Mi sexta publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Mateo Diaz',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-06').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-06').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 7,
// 		title: 'Mi séptima publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Camila Alvarez',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-07').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-07').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 8,
// 		title: 'Mi octava publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Nicolas Ramirez',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-08').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-08').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 9,
// 		title: 'Mi novena publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Martina Castro',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-09').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-09').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// 	{
// 		id: 10,
// 		title: 'Mi décima publicación',
// 		content:
// 			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
// 		author: 'Tomas Herrera',
// 		category: {
// 			id: 1,
// 			name: 'classes',
// 		},
// 		createdAt: new Date('2022-01-10').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		updatedAt: new Date('2022-01-10').toLocaleDateString('es-CL', {
// 			timeZone: 'UTC',
// 		}),
// 		expiresAt: '',
// 		image: '',
// 		target: [0],
// 	},
// ];
