import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Student = {
    run: number;
    dv: string;
    name: string;
    firstLastname: string;
    secondLastname: string;
    level: string;
};

export const studentsApi = createApi({
    reducerPath: 'studentsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://7gv0ggpz-3000.brs.devtunnels.ms/api'
    }),
    endpoints: (builder) => ({
        getStudents: builder.query<Student[], null>({
            query: () => '/students'
        }),

        addStudent: builder.mutation({
            query: (student) => ({
                url: '/students',
                method: 'POST',
                body: student
            })
        })
    })
})

export const {
    useGetStudentsQuery,
    useAddStudentMutation
} = studentsApi