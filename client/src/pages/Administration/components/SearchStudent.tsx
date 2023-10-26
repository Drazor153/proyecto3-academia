import { t } from 'i18next';
import { useGetStudentsQuery } from '../../../redux/services/studentsApi';
import { RutFormat, formatRut } from '@fdograph/rut-utilities';

import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchStudent() {
	// const { data } = useGetStudentsQuery(null);
	const [run, setRun] = useState('');

	const handleRUNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newRUN = event.target.value;
		if (newRUN.length > 12) return;
		const cleanRUN = newRUN.replace(/[^0-9kK]/g, '').toUpperCase();
		setRun(formatRut(cleanRUN, RutFormat.DOTS_DASH));
	};

	return (
		<>
			<h2>{t('search')}</h2>
			<div className="rut-search-container">
				<label htmlFor="run-search">{t('run_input')}</label>
				<div className="input-container">
					<fieldset className="float-label-field">
						<input
							id="run-search"
							type="text"
							onChange={handleRUNChange}
							value={run}
							placeholder="Ej. 12.345.678-9"
						/>
					</fieldset>
					<AiOutlineSearch className="icon" />
				</div>
			</div>
		</>
	);
}

export default SearchStudent;
