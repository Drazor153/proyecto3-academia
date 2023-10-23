import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClassesStudent, ClassesTeacher, Data, PostClass, Students } from "../../utils/types";


export const classesApi = createApi({
    reducerPath: "classesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
        credentials: 'include',
    }),
    tagTypes: ['Classes', 'Students'],
    endpoints: (builder) => ({

        getClassesByLessonId: builder.query<Data<ClassesStudent[] | ClassesTeacher[]>, { lesson: number }>({
            query: ({ lesson }) => {
                // const url = role === 'student' ? `students/classes/lesson/${lesson}` : `/classes/lesson/${lesson}`;

                return ({
                    url: `/lesson/${lesson}/classes`, //TODO: change to /lesson/:lessonId/classes
                });
            },
            providesTags: ['Classes'],
        }),

        getStudentsByLesson: builder.query<Data<Students[]>, { lesson: number }>({
            query: ({ lesson }) => {
                // return `/classes/lesson/${lesson}/students`; //TODO: change to /lesson/:lessonId/students
                return `/lesson/${lesson}/students`; //TODO: change to /lesson/:lessonId/students
            },
        }),

        addClass: builder.mutation<{ msg: string }, { body: PostClass }>({
            query: ({ body }) => ({
                url: '/classes',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Classes'],
        }),

        deleteClass: builder.mutation<{ msg: string }, { id: number }>({
            query: ({ id }) => ({
                url: `/classes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Classes'],
        }),

        updateClass: builder.mutation<{ msg: string }, { id: number, body: Omit<PostClass, 'lessonId' | 'week'> }>({
            query: ({ id, body }) => {
                return ({
                    url: `/classes/${id}`,
                    method: "PUT",
                    body,
                });
            },
            invalidatesTags: ['Classes'],
        }),

    }),
});

export const {
    useGetClassesByLessonIdQuery,
    useGetStudentsByLessonQuery,
    useAddClassMutation,
    useDeleteClassMutation,
    useUpdateClassMutation,
} = classesApi;
