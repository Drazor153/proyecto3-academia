import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../../utils/types'

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({

        authUser: builder.mutation<User, { run: string, password: string }>({
            query: ({ run, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    run: parseInt(run),
                    password
                }
            }),
        })

    })
})

export const { useAuthUserMutation } = userApi