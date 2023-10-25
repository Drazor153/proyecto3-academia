import { menuItems } from '../../utils/pages';
import { privilegedItemsShortcuts } from '../../utils/pages';
import { useAppSelector } from '../../redux/hooks';
import Shortcuts, {
	AdministrationShortcuts,
	Shortcut,
} from './components/Shortcuts';
import Announcement from './components/Announcement';
import { AnnouncementType } from './types';
import { t } from 'i18next';

const announcement: AnnouncementType[] = [
	{
		id: 1,
		title: 'Mi primera publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Sofia Rodriguez',
		category: 'Tecnología',
		tags: ['React', 'TypeScript', 'Redux'],
		createdAt: new Date('2022-01-01'),
		updatedAt: new Date('2022-01-01'),
		image: '',
	},
	{
		id: 2,
		title: 'Mi segunda publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'ucas Martinez',
		category: 'Deportes',
		tags: ['Fútbol', 'Tenis', 'Baloncesto'],
		createdAt: new Date('2022-01-02'),
		updatedAt: new Date('2022-01-02'),
		image: '',
	},
	{
		id: 3,
		title: 'Mi tercera publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Valentina Gomez',
		category: 'Tecnología',
		tags: ['React', 'TypeScript', 'Redux'],
		createdAt: new Date('2022-01-03'),
		updatedAt: new Date('2022-01-03'),
		image: '',
	},
	{
		id: 4,
		title: 'Mi cuarta publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Santiago Fernandez',
		category: 'Deportes',
		tags: ['Fútbol', 'Tenis', 'Baloncesto'],
		createdAt: new Date('2022-01-04'),
		updatedAt: new Date('2022-01-04'),
		image: '',
	},
	{
		id: 5,
		title: 'Mi quinta publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Isabella Torres',
		category: 'Tecnología',
		tags: ['React', 'TypeScript', 'Redux'],
		createdAt: new Date('2022-01-05'),
		updatedAt: new Date('2022-01-05'),
		image: 'https://placehold.co/310x300?text=Another+Image',
	},
	{
		id: 6,
		title: 'Mi sexta publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Mateo Diaz',
		category: 'Deportes',
		tags: ['Fútbol', 'Tenis', 'Baloncesto'],
		createdAt: new Date('2022-01-06'),
		updatedAt: new Date('2022-01-06'),
		image: '',
	},
	{
		id: 7,
		title: 'Mi séptima publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Camila Alvarez',
		category: 'Tecnología',
		tags: ['React', 'TypeScript', 'Redux'],
		createdAt: new Date('2022-01-07'),
		updatedAt: new Date('2022-01-07'),
		image: '',
	},
	{
		id: 8,
		title: 'Mi octava publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Nicolas Ramirez',
		category: 'Deportes',
		tags: ['Fútbol', 'Tenis', 'Baloncesto'],
		createdAt: new Date('2022-01-08'),
		updatedAt: new Date('2022-01-08'),
		image: 'https://placehold.co/310x300?text=A+Image',
	},
	{
		id: 9,
		title: 'Mi novena publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Martina Castro',
		category: 'Tecnología',
		tags: ['React', 'TypeScript', 'Redux'],
		createdAt: new Date('2022-01-09'),
		updatedAt: new Date('2022-01-09'),
		image: '',
	},
	{
		id: 10,
		title: 'Mi décima publicación',
		content:
			'NO TE LO PIERDAS 🚩\nASISTENCIA SOCIAL MÓVIL 📣\nTe esperamos este miércoles 25 de octubre de 09:00 a 12:00 horas en el Campus Velásquez (Pasillo Central).\nPodrás resolver las siguientes dudas:\n- FUAS 2024\n- Generales sobre beneficios estudiantiles.\nNos vemos.',
		author: 'Tomas Herrera',
		category: 'Deportes',
		tags: ['Fútbol', 'Tenis', 'Baloncesto'],
		createdAt: new Date('2022-01-10'),
		updatedAt: new Date('2022-01-10'),
		image: '',
	},
];
function Dashboard() {
	const role = useAppSelector(state => state.userReducer.role);

	return (
		<>
			<h1>{t('dashboard')}</h1>
			<main className="dashboard">
				<aside className="shortcuts-container">
					{
						<Shortcuts>
							{menuItems /**.slice(1, -1)*/
								.map((item, index) => {
									if (item.type !== 'route') {
										return (
											<Shortcut
												key={item.name}
												index={index}
												item={item}
											/>
										);
									}
								})}
						</Shortcuts>
					}
					{role === 'ADMIN' && (
						<AdministrationShortcuts>
							{privilegedItemsShortcuts.map((item, index) => (
								<Shortcut
									key={item.name}
									className="privileged"
									index={index}
									item={item}
								/>
							))}
						</AdministrationShortcuts>
					)}
				</aside>
				<section className="announcement-container">
					{announcement
						.sort((a, b) => {
							const dateA = a.createdAt.getTime();
							const dateB = b.createdAt.getTime();

							return dateB - dateA;
						})
						.map((announcement, index) => (
							<Announcement
								index={index}
								key={announcement.title}
								announcement={announcement}
							/>
						))}
				</section>
			</main>
		</>
	);
}

export default Dashboard;
