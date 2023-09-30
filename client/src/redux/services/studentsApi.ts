import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Student, Grade } from '../../utils/types'

export type Data = {
    data: Grade[]

}

export const studentsApi = createApi({
    reducerPath: 'studentsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`
    }),
    endpoints: (builder) => ({
        getStudents: builder.query<Student[], null>({
            query: () => '/students'
        }),
        getStudentsGrades: builder.query<Data, { year: number, level: string, run: number }>({
            query: ({ year, level, run }) => `/students/grades/${year}/${level}/${run}`
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
    useAddStudentMutation,
    useGetStudentsGradesQuery
} = studentsApi