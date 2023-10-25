import { t } from 'i18next';
import { useGetStudentsQuery } from '../../../redux/services/studentsApi';

function SearchStudent() {
	const { data } = useGetStudentsQuery(null);
	console.log(data);

	return (
		<>
			<h2>{t('search')}</h2>
			{data}
		</>
	);
}

export default SearchStudent;
