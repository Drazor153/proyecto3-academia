import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Student, Level, Exams } from "../../utils/types";

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

        getStudentsGrades: builder.query<Data<Exams[]>, { year: number; semester: number; level: string; run: number }>({
            query: ({ year, semester, level, run }) =>
                `/grades/${year}/${semester}/${level}/${run}`,
        }),

        addStudent: builder.mutation({
            query: (student) => ({
                url: "/students",
                method: "POST",
                body: student,
            }),
        }),

        getStudentLevels: builder.query<Data<Level[]>, { run: number }>({
            query: ({ run }) => `/levels/${run}`,
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useAddStudentMutation,
    useGetStudentsGradesQuery,
    useGetStudentLevelsQuery,
} = studentsApi;
