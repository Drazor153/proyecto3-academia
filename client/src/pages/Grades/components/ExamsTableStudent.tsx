import { ThreeDots } from 'react-loading-icons';
import { useGetStudentsGradesQuery } from '../../../redux/services/studentsApi';
import { GenericExam, Exams } from '../../../utils/types';
import { t } from 'i18next';

const getSum = (examsUnfiltered: Exams[]) => {
	let sum = 0;

	examsUnfiltered.forEach(exam => {
		exam.quizzes.forEach(quiz => {
			sum += quiz.studentGrade;
		});
	});

	return sum;
};

const isOptTestElegible = (average: number) => {
	if (average < 5 && average >= 4) return <span>{t('pending')}</span>;

	return <span>{t('not_apply')}</span>;
};

const isApproved = (average: string) => {
	const integerAvg = parseInt(average);
	if (integerAvg >= 5) return <span className='approved'>{t('approved')}</span>;
	else if (integerAvg < 5) return <span className='failed'>{t('failed')}</span>;

	return <span className='pending'>{t('pending')}</span>;
};

function TableRow({ test }: { test: GenericExam }) {
	return (
		<tr>
			<td>Quiz {test.quizNumber}</td>
			<td>{test.studentGrade == 0 ? 'pending' : test.studentGrade}</td>
		</tr>
	);
}

function Average({
	year,
	semester,
	level,
}: {
	year: number;
	semester: number;
	level: string;
}) {
	const {
		data: response,
		isLoading,
		isFetching,
		isError,
	} = useGetStudentsGradesQuery({ year, semester, level });

	if (isLoading || isFetching) return <ThreeDots />;

	if (isError || !response) return <p>No data</p>;

	const exams: Exams[] = response.data;

	getSum(exams);

	const totalExams = exams.reduce((acc, exam) => acc + exam.quizzes.length, 0);

	const average = +(getSum(exams) / totalExams).toFixed(2);

	return (
		<>
			<div className='average-container'>
				<h3>{t('average')}</h3>
				<span className='average-text'>
					{Number.isNaN(average) ? t('pending') : average}
				</span>
			</div>
			<div className='moreinfo-container'>
				<div>
					<h4>{t('status')}</h4>
					{isApproved(average.toString())}
				</div>
				<div>
					<h4>{t('is_opt_test_elegible')}</h4>
					<span>{isOptTestElegible(average)}</span>
				</div>
			</div>
		</>
	);
}

function ExamsTable({
	topic,
	year,
	semester,
	level,
}: {
	topic: string;
	year: number;
	semester: number;
	level: string;
}) {
	const {
		data: response,
		isLoading,
		isFetching,
		isError,
	} = useGetStudentsGradesQuery({ year, semester, level });

	if (isLoading || isFetching) return <ThreeDots />;

	if (isError || !response) return <p>No data</p>;

	const filteredExams: Exams = response.data.filter(
		exam => exam.topic === topic,
	)[0];

	const tablerows: JSX.Element[] = filteredExams.quizzes.map((exam, index) => (
		<TableRow
			key={index}
			test={exam}
		/>
	));

	return (
		<>
			<table className='grades-table'>
				<thead>
					<tr>
						<th>{t('quiz')}</th>
						<th>{t('score')}</th>
					</tr>
				</thead>
				<tbody>
					{tablerows.length > 0 ? (
						tablerows
					) : (
						<tr>
							<td className='noquiz'>
								<span>{t('no_exams')}</span>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
}

export default ExamsTable;
export { Average };
