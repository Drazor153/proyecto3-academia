import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, ExamTeacher, TeacherLevels, Quiz } from "../../utils/types";

export const teacherApi = createApi({
    reducerPath: "teacherAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
    }),
    endpoints: (builder) => ({
        getTeacherLevels: builder.query<Data<TeacherLevels[]>, { run: number }>({
            query: ({ run }) => `/teachers/levels/${run}`,
        }),

        getExamsByYearSemesterLevel: builder.query<Data<ExamTeacher[]>, {year: number, semester:number, level: string}>({
            query: ({year, semester, level}) => `/teachers/grades/${year}/${semester}/${level}`,
        }),

        getGradesByExamId: builder.query<Data<Quiz[]>, {quizId: number}>({
            query: ({quizId}) => `/teachers/grades/quizzes/${quizId}`,
        }),

        uploadGrades: builder.mutation({
            query: (grades) => ({
                url: "/teachers/grades/quizzes",
                method: "POST",
                body: grades,
            }),
        }),
    })
});

export const {
    useGetTeacherLevelsQuery,
    useGetExamsByYearSemesterLevelQuery,
    useGetGradesByExamIdQuery
} = teacherApi;
