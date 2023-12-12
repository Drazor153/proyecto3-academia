import { t } from 'i18next';
import { Academic, Personal } from './components';
import { AcademicInfo, Timeline } from './components/academic/components';

export default function Profile() {
	return (
		<>
			<h1>{t('profile')}</h1>
			<main className='profile'>
				<Personal />
				{/* <hr /> */}
				<Academic />
				{/* <section
					style={{
						margin: '1px',
						padding: '1px',
						flex: 4,
						backgroundColor: 'transparent',
						boxShadow: 'none',
					}}
				>
					<Timeline />
					<AcademicInfo />
				</section> */}
			</main>
		</>
	);
}
