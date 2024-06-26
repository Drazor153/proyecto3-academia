import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Exams, Quiz } from "../../utils/types";

export const teacherApi = createApi({
    reducerPath: "teacherAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api/teachers`,
        credentials: 'include',
    }),
    tagTypes: ["TeacherLevels", "ExamTeacher", "Quiz"],
    endpoints: (builder) => ({

        getExamsByYearSemesterLevel: builder.query<Data<Exams[]>, { year: number, semester: number, level: string }>({
            query: ({ year, semester, level }) => `/grades/${year}/${semester}/${level}`,
        }),

        getGradesByExamId: builder.query<Data<Quiz[]>, { quizId: number }>({
            query: ({ quizId }) => `/grades/quizzes/${quizId}`,
            providesTags: ["Quiz"]
        }),

        uploadGrades: builder.mutation({
            query: (grades) => ({
                url: "/grades/quizzes",
                method: "POST",
                body: grades,
            }),
            invalidatesTags: ["Quiz"],
        }),
    })
});

export const {
    useGetExamsByYearSemesterLevelQuery,
    useGetGradesByExamIdQuery,
    useLazyGetGradesByExamIdQuery,
    useUploadGradesMutation
} = teacherApi;
