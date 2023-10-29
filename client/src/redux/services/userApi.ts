import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseMsg, User } from '../../utils/types';

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: ['login'],
  endpoints: builder => ({
    authUser: builder.mutation<
      { userData: User },
      { run: string; password: string }
    >({
      query: ({ run, password }) => ({
        url: '/login',
        method: 'POST',
        body: {
          run: parseInt(run),
          password,
        },
      }),
    }),
    autoLogin: builder.query<{ userData: User }, null>({
      query: () => ({
        url: '/auto-login',
        method: 'GET',
      }),
    }),
    logout: builder.mutation<ResponseMsg, null>({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAuthUserMutation,
  useAutoLoginQuery,
  useLazyAutoLoginQuery,
  useLogoutMutation,
} = userApi;
