import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, ExamStudent, Student, StudentLevels } from "../../utils/types";

export const studentsApi = createApi({
    reducerPath: "studentsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
    }),
    endpoints: (builder) => ({
        getStudents: builder.query<Student[], null>({
            query: () => "/students",
        }),

        getStudentsGrades: builder.query<Data<ExamStudent[]>, { year: number; semester: number; level: string; run: number }>({
            query: ({ year, semester, level, run }) =>
                `/students/grades/${year}/${semester}/${level}/${run}`,
        }),

        addStudent: builder.mutation({
            query: (student) => ({
                url: "/students",
                method: "POST",
                body: student,
            }),
        }),

        getStudentLevels: builder.query<Data<StudentLevels[]>, { run: number }>({
            query: ({ run }) => `/students/levels/${run}`,
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useAddStudentMutation,
    useGetStudentsGradesQuery,
    useGetStudentLevelsQuery,
} = studentsApi;
