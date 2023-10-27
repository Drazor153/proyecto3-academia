import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClassesStudent, ClassesTeacher, Data, PostClass, ResponseMsg, Students } from "../../utils/types";


export const classesApi = createApi({
    reducerPath: "classesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
        credentials: 'include',
    }),
    tagTypes: ['Classes', 'Students'],
    keepUnusedDataFor: 5,
    refetchOnFocus: true,
    endpoints: (builder) => ({

        getClassesByLessonId: builder.query<Data<ClassesStudent[] | ClassesTeacher[]>, { lesson: number }>({
            query: ({ lesson }) => {
                return ({
                    url: `/lesson/${lesson}/classes`,
                });
            },
            providesTags: ['Classes'],
        }),

        getStudentsByLesson: builder.query<Data<Students[]>, { lesson: number }>({
            query: ({ lesson }) => {
                return `/lesson/${lesson}/students`;
            },
        }),

        addClass: builder.mutation<ResponseMsg, { body: PostClass }>({
            query: ({ body }) => ({
                url: '/classes',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Classes'],
        }),

        deleteClass: builder.mutation<ResponseMsg, { id: number }>({
            query: ({ id }) => ({
                url: `/classes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Classes'],
        }),

        updateClass: builder.mutation<ResponseMsg, { id: number, body: Omit<PostClass, 'lessonId' | 'week'> }>({
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
    useLazyGetClassesByLessonIdQuery,
} = classesApi;
