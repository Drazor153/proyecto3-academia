import {
	useGetLevelsQuery,
	useLazyGetTopicsQuery,
} from '@/redux/services/levelsApi';
import { AnimatePresence, motion } from 'framer-motion';
import { t } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCaretRight } from 'react-icons/fa';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';

interface PeriodProps {
	semesterID: number;
}

type IsOpen = {
	A1: boolean;
	A2: boolean;
	B1: boolean;
	B2: boolean;
	C1: boolean;
	C2: boolean;
};

export default function Period({ semesterID }: PeriodProps) {
	useTranslation();

	const [isOpen, setIsOpen] = useState<IsOpen>({
		A1: false,
		A2: false,
		B1: false,
		B2: false,
		C1: false,
		C2: false,
	});

	const {
		data: dataLevels,
		isLoading: isLoadingLevels,
		isSuccess: isSuccessLevels,
		isFetching: isFetchingLevels,
	} = useGetLevelsQuery(null);

	const [getTopics, topics] = useLazyGetTopicsQuery();

	// TODO: revisar esto bien
	console.log('topics: ', topics);
	const defaultState = {
		year: new Date().getFullYear(),
		semesters: [1, 2].map(semester => ({
			semester,
			startDate: '2021-03-01T00:00:00.000Z',
			endDate: '2021-07-15T00:00:00.000Z',
			levels: useGetLevelsQuery(null).data?.data.map(({ code }) => ({
				code,
				lessons: ['A', 'B', 'C'].map(lesson => ({
					lesson,
					teachers: [],
				})),
				quizzes: [1, 2, 3].map(quiz => {
					if (topics.isUninitialized) getTopics(null);
					return {
						quiz,
						startDate: '2021-03-01T00:00:00.000Z',
						endDate: '2021-07-15T00:00:00.000Z',
						topics: topics.data?.data.map(({ id }) => ({
							id,
						})),
					};
				}),
			})),
		})),
	};

	console.log(defaultState);

	return (
		<section
			style={{
				boxShadow: 'none',
				margin: 0,
				padding: 0,
				position: 'relative',
				height: '100%',
			}}
		>
			{isLoadingLevels || (isFetchingLevels && <ThreeDots />)}
			{isSuccessLevels && dataLevels && (
				<AnimatePresence>
					<motion.section
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={{
							margin: 0,
							boxShadow: 'none',
							height: '100%',
						}}
					>
						{dataLevels.data.map(({ code, name }) => (
							<div key={code}>
								<div
									className='toggle-container'
									onClick={() =>
										setIsOpen(prev => ({
											...prev,
											[code]: !prev[code as keyof IsOpen],
										}))
									}
									style={{ height: '30px' }}
								>
									<div className='caret-container'>
										<FaCaretRight
											className={`caret ${
												isOpen[code as keyof IsOpen] ? ' active' : ''
											}`}
										/>
									</div>
									<h3>{t(name)}</h3>
								</div>
								<motion.ul
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									style={{ margin: 0, padding: 0 }}
								></motion.ul>
							</div>
						))}
					</motion.section>
				</AnimatePresence>
			)}
		</section>
	);
}
