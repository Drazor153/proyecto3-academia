import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	Data,
	Student,
	Exams,
	Paginate,
	StudentCareer,
	ResponseMsg,
} from '../../utils/types';

export const studentsApi = createApi({
	reducerPath: 'studentsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/api/students`,
		credentials: 'include',
	}),
	tagTypes: ['Students', 'Grades'],
	endpoints: builder => ({
		getStudents: builder.query<
			Paginate<Student[]>,
			{
				size: number;
				page: number;
				run: string;
				level: string;
				name: string;
				paid: boolean | undefined;
			}
		>({
			query: params => {
				return {
					url: '/',
					params,
				};
			},
			providesTags: ['Students'],
		}),

		getStudentsGrades: builder.query<
			Data<Exams[]>,
			{ year: number; semester: number; level: string }
		>({
			query: ({ year, semester, level }) =>
				`/grades/${year}/${semester}/${level}`,
		}),

		addStudent: builder.mutation({
			query: student => ({
				url: '/',
				method: 'POST',
				body: student,
			}),
		}),

		getStudentCareerByRun: builder.query<Data<StudentCareer>, { run: number }>({
			query: ({ run }) => `/career/${run}`,
		}),

		changeStudentInfo: builder.mutation<ResponseMsg, Student>({
			query: body => ({
				url: `/${body.run}`,
				method: 'PATCH',
				body: {
					name: body.name,
					first_surname: body.first_surname,
					level: body.level,
					paid: body.paid,
				},
			}),
			invalidatesTags: ['Students'],
		}),
	}),
});

export const {
	useGetStudentsQuery,
	useLazyGetStudentsQuery,
	useAddStudentMutation,
	useGetStudentsGradesQuery,
	useGetStudentCareerByRunQuery,
	useChangeStudentInfoMutation,
} = studentsApi;
