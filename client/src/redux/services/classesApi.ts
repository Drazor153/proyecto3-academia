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

        getClassesByLessonId: builder.query<Data<ClassesStudent[] | ClassesTeacher[]>, { role: string, lesson: number, run?: number }>({
            query: ({ role, lesson, run }) => {
                return ({
                    url: `/${role}/classes/${lesson}${run ? `/${run}` : ''}`,
                });
            },
            providesTags: ['Classes'],
        }),

        getStudentsByLesson: builder.query<Data<Students[]>, { lesson: number }>({
            query: ({ lesson }) => {
                return `/teachers/classes/${lesson}/students`;
            },
        }),

        addClass: builder.mutation<{ msg: string }, { body: PostClass }>({
            query: ({ body }) => ({
                url: '/teachers/classes',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Classes'],
        }),

        deleteClass: builder.mutation<{ msg: string }, { id: number }>({
            query: ({ id }) => ({
                url: `/teachers/classes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Classes'],
        }),

        updateClass: builder.mutation<{ msg: string }, { id: number, body: Omit<PostClass, 'lessonId' | 'week'> }>({
            query: ({ id, body }) => {
                return ({
                    url: `/teachers/classes/${id}`,
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
