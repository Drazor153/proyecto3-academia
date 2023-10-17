import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Student, Exams } from "../../utils/types";

export const studentsApi = createApi({
    reducerPath: "studentsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api/students`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getStudents: builder.query<Student[], null>({
            query: () => "/",
        }),

        getStudentsGrades: builder.query<Data<Exams[]>, { year: number; semester: number; level: string; }>({
            query: ({ year, semester, level }) =>
                `/grades/${year}/${semester}/${level}`,
        }),

        addStudent: builder.mutation({
            query: (student) => ({
                url: "/students",
                method: "POST",
                body: student,
            }),
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useAddStudentMutation,
    useGetStudentsGradesQuery
} = studentsApi;
