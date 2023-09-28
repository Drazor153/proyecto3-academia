import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Student = {
    run: number;
    dv: string;
    name: string;
    firstLastname: string;
    secondLastname: string;
    level: string;
};

type Grade = {
    id: number,
    name: string,
    date: Date,
    classGroupId: number,
    Results: {
        examId: number,
        studentId: number,
        grade: number
    }[],
    classgroup: {
        teacherId: number,
        group: { letter: string, topic: string }
    }
}

type Data = {
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