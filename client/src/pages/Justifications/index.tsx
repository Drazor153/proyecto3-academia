import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { IoCreateOutline } from 'react-icons/io5';
import JustificationTable from './components/JustificationTable';
import CreateJustification from './components/CreateJustification';
import { useState } from 'react';

export default function Justifications() {
	useTranslation();
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<h1>{t('justifications')}</h1>
			<main className='justifications-layout'>
				<section className='justifications-container'>
					<h2>{t('justification_list')}</h2>
					<JustificationTable />
					<button
						className='button'
						onClick={() => setOpenModal(true)}
					>
						<IoCreateOutline />
						<span>{t('create')}</span>
					</button>
					<CreateJustification
						open={openModal}
						setOpen={setOpenModal}
					/>
				</section>
			</main>
		</>
	);
}
