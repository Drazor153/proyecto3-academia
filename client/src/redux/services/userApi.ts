import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type User = {
    rut: number
    name: string
}

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/'
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], null>({
            query: () => 'users'
        }),
        getUserByRut: builder.query<User, { rut: string }>({
            query: ({ rut }) => `users/${rut}`
        })
    })
})

export const { useGetUsersQuery, useGetUserByRutQuery } = userApi