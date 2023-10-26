import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseMsg, User } from '../../utils/types'

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
        credentials: 'include'
    }),
    tagTypes: ['login'],
    endpoints: (builder) => ({

        authUser: builder.mutation<{ userData: User }, { run: string, password: string }>({
            query: ({ run, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    run: parseInt(run),
                    password
                }
            }),
            invalidatesTags: ['login']
        }),
        autoLogin: builder.query<{ userData: User }, null>({
            query: () => ({
                url: '/auth/auto-login',
                method: 'GET',
            }),
            providesTags: ['login']
        }),
        logout: builder.mutation<ResponseMsg, null>({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
            }),
            invalidatesTags: ['login']
        })
    })
})

export const { useAuthUserMutation, useAutoLoginQuery, useLazyAutoLoginQuery, useLogoutMutation } = userApi