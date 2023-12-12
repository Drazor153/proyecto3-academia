import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/redux/hooks';

import { useGetLevelsQuery } from '@/redux/services/levelsApi';
import { useGetStudentCareerByRunQuery } from '@/redux/services/studentsApi';

const COLORS = [
	'#8d2840',
	'#9e2b46',
	'#b42f4e',
	'#cb3356',
	'#e4375f',
	'#ff3c69',
];

export default function Timeline() {
	useTranslation();
	const run = useAppSelector(state => state.userReducer.run);
	const {
		data: levels,
		isLoading: isLoadingLevels,
		isSuccess: isSuccessLevels,
	} = useGetLevelsQuery(null);
	const {
		data: academic,
		isLoading: isLoadingAcademic,
		isSuccess: isSuccessAcademic,
	} = useGetStudentCareerByRunQuery({
		run,
	});

	return (
		<section className='timeline'>
			<h2>{t('academic_timeline')}</h2>
			<div className='container'>
				{isLoadingLevels && <div>Loading...</div>}
				{isSuccessLevels &&
					levels.data &&
					levels.data.map(({ code, name }, index) => (
						<section key={code}>
							<div className='content'>
								{isLoadingAcademic && <div>Loading...</div>}
								{isSuccessAcademic && academic.data && (
									<>
										{academic.data.map(
											({ level, semesters: s, status, year }, i) => {
												if (level === name) {
													// s.sort()
													const semesters: (string | number)[] = [];
													Array.from(s).sort().map((n, i) => {
														semesters.push(n);
														semesters.push(
															status === 'failed' && i === 0
																? 'approved'
																: status,
														);
													});
													return (
														<ul
															key={`${name}-${year}`}
															style={{ order: -i }}
														>
															<li className='year'>{year}</li>
															{semesters.map(value => {
																const type: string = typeof value;
																return (
																	<li
																		className={`${
																			type === 'number' ? 'semester' : 'status'
																		}`}
																		key={`${level}-${year}-${semesters}-${status}`}
																	>
																		{type === 'number' &&
																			`${t('semester')} ${value}`}
																		{type === 'string' && t(`${value}`)}
																	</li>
																);
															})}
														</ul>
													);
												}
											},
										)}
									</>
								)}
							</div>
							<div
								className='right-chevron'
								style={{
									backgroundColor: COLORS[index],
								}}
							>
								<h3>
									<span>{t(code)}</span>
									<span>{t(name)}</span>
								</h3>
							</div>
						</section>
					))}
			</div>
		</section>
	);
}
