import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../../utils/types'

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({

        authUser: builder.mutation<{userData: User}, { run: string, password: string }>({
            query: ({ run, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    run: parseInt(run),
                    password
                }
            }),
        }),
        autoLogin: builder.query<{userData: User}, null>({
            query: () => ({
                url: '/auth/auto-login',
                method: 'GET',
            }),
        }),
        logout: builder.query<{msg: string}, null>({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
            })
        })
    })
})

export const { useAuthUserMutation, useAutoLoginQuery, useLazyAutoLoginQuery, useLogoutQuery, useLazyLogoutQuery } = userApi