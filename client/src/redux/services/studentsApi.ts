import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Student, Exams, Paginate, StudentCareer } from "../../utils/types";

export const studentsApi = createApi({
    reducerPath: "studentsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api/students`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getStudents: builder.query<Paginate<Student[]>, { size: number, page: number, run: string, level: string }>({
            query: ({ size, page, run, level }) => {
                return {
                    url: '/',
                    params: {
                        size,
                        page,
                        run,
                        level
                    },
                };
            },

        }),

        getStudentsGrades: builder.query<Data<Exams[]>, { year: number; semester: number; level: string; }>({
            query: ({ year, semester, level }) =>
                `/grades/${year}/${semester}/${level}`,
        }),

        addStudent: builder.mutation({
            query: (student) => ({
                url: "/",
                method: "POST",
                body: student,
            }),
        }),

        getStudentCareerByRun: builder.query<Data<StudentCareer>, { run: number }>({
            query: ({ run }) =>
                `/career/${run}`,
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useLazyGetStudentsQuery,
    useAddStudentMutation,
    useGetStudentsGradesQuery,
    useGetStudentCareerByRunQuery,
} = studentsApi;
