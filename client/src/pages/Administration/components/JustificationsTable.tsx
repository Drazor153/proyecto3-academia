import { t } from 'i18next';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';

import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';

import Select from 'react-select';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { TiCancel, TiDocumentText, TiTick } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';
import { handleRUNChange, useDebounce } from '@/utils/functions';
import {
	useLazyGetJustificationQuery,
	useSendJustificationStatusMutation,
} from '@/redux/services/justificationApi';
import JustificationViewer from '@/components/JustificationViewer';
import { Justification } from '@/utils/types';

function JustificationsDetails() {
	useTranslation();

	const [sendJustificationStatus] = useSendJustificationStatusMutation();

	const statusOptions = [
		{ value: 'pending', label: t('pending') },
		{ value: 'approved', label: t('approved') },
		{ value: 'rejected', label: t('rejected') },
	];

	const [page, setPage] = useState(1);
	const [run, setRun] = useState('');
	const [name, setName] = useState('');
	const [status, setStatus] = useState(statusOptions[0].value);
	const [selectedJustification, setSelectedJustification] =
		useState<Justification>();
	const debouncedRun = useDebounce<string>(run, 1000);
	const debouncedName = useDebounce<string>(name, 1000);
	const size = 10;

	const loadingInput = () => {
		if (run != debouncedRun || name != debouncedName) return true;
		return false;
	};

	const [getJustifications, result] = useLazyGetJustificationQuery();

	const runWithoutDv = (run: string) => {
		const { digits } = deconstructRut(run);
		if (!digits) return run;
		return digits;
	};

	useEffect(() => {
		const run: string = runWithoutDv(debouncedRun);
		setPage(1);
		getJustifications({
			page: 1,
			size,
			run,
			name: debouncedName,
			approved: status,
		});
	}, [debouncedRun, debouncedName, status]);

	useEffect(() => {
		const run: string = runWithoutDv(debouncedRun);
		getJustifications({ page, size, run, name, approved: status });
	}, [page]);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (result.isSuccess) {
			let nextPage = page;
			const { name } = event.target as HTMLButtonElement;

			switch (name) {
				case 'next': {
					if (result.data.next) {
						nextPage++;
					}
					break;
				}
				case 'previous': {
					if (result.data.previous) {
						nextPage--;
					}
					break;
				}
			}
			setPage(nextPage);
		}
	};

	return (
		<>
			<h2>{t('search')}</h2>
			<div className='filters-container'>
				<h3>{t('filters')}</h3>
				<div className='search-student-container'>
					<div className='search-container'>
						<label htmlFor='run-search'>{t('search_run')}</label>
						<div className='input-container'>
							<fieldset className='float-label-field'>
								<input
									id='run-search'
									type='text'
									onChange={e => handleRUNChange(e, setRun)}
									value={run}
								/>
							</fieldset>
						</div>
					</div>
					<div className='search-container'>
						<label htmlFor='name-search'>{t('search_name')}</label>
						<div className='input-container'>
							<fieldset className='float-label-field'>
								<input
									id='name-search'
									type='text'
									onChange={e => setName(e.target.value)}
								/>
							</fieldset>
						</div>
					</div>
					<div className='search-container'>
						<label>{t('search_status')}</label>
						<div className='input-container'>
							<Select
								className='react-select-container'
								classNamePrefix={'react-select'}
								placeholder={t('status_select')}
								defaultValue={statusOptions[0]}
								onChange={e => setStatus(e?.value ?? statusOptions[0].value)}
								options={statusOptions}
								isSearchable={false}
							/>
						</div>
					</div>
				</div>
			</div>
			<table className='justifications-table'>
				<thead>
					<tr>
						<th>{t('date')}</th>
						<th>{t('run')}</th>
						<th>{t('name')}</th>
						<th>{t('status')}</th>
						<th>{t('actions')}</th>
					</tr>
				</thead>
				<tbody>
					{loadingInput() && <ThreeDots />}
					{result.isSuccess &&
						!loadingInput() &&
						!result.isLoading &&
						// !result.isFetching &&
						(result.data.data.length == 0 ? (
							<tr>
								<td className='no-results'>{t('no_results')}</td>
							</tr>
						) : (
							result.data.data.map(justification => (
								<tr key={justification.id}>
									<td>
										{new Date(justification.initAusencia).toLocaleDateString()}
									</td>
									<td>
										{formatRut(
											`${justification.run}-${justification.dv}`,
											RutFormat.DOTS_DASH,
										)}
									</td>
									<td data-student-name>
										{justification.first_surname?.toLowerCase()},{' '}
										{justification.name?.toLowerCase()}
									</td>
									<td>{justification.approved}</td>
									<td>
										<div className='action-buttons'>
											<button
												onClick={() => setSelectedJustification(justification)}
											>
												<TiDocumentText className='icon' />
												<span>{t('view')}</span>
											</button>
											<button
												onClick={() =>
													sendJustificationStatus({
														id: justification.id!.toString(),
														status: 'rejected',
													})
												}
											>
												<TiCancel className='icon' />
												<span>{t('reject')}</span>
											</button>
											<button
												onClick={() =>
													sendJustificationStatus({
														id: justification.id!.toString(),
														status: 'approved',
													})
												}
											>
												<TiTick className='icon' />
												<span>{t('approve')}</span>
											</button>
										</div>
									</td>
								</tr>
							))
						))}
				</tbody>
			</table>
			<div className='pagination-container'>
				<p>
					{t('page')} {page}
				</p>
				<div className='pagination-btn-container'>
					<button
						disabled={page == 1}
						name={'previous'}
						onClick={handleChangePage}
					>
						<AiOutlineDoubleLeft />
					</button>
					<button
						disabled={!result.data?.next}
						name={'next'}
						onClick={handleChangePage}
					>
						<AiOutlineDoubleRight />
					</button>
				</div>
			</div>
			<JustificationViewer
				fileName={(selectedJustification?.file as string) ?? ''}
				onClose={() => setSelectedJustification(undefined)}
			/>
		</>
	);
}

export default JustificationsDetails;
