import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseMsg, User } from '../../utils/types';

export const userApi = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/api/auth`,
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
		resetPassword: builder.mutation<ResponseMsg, { run: User['run'] }>({
			query: ({ run }) => ({
				url: `/reset-password/${run}`,
				method: 'PATCH',
			}),
		}),
		changePassword: builder.mutation<
			ResponseMsg,
			{ oldPassword: string; newPassword: string }
		>({
			query: ({ oldPassword, newPassword }) => ({
				url: '/change-password',
				method: 'PATCH',
				body: {
					oldPassword,
					newPassword,
				},
			}),
		}),
	}),
});

export const {
	useAuthUserMutation,
	useAutoLoginQuery,
	useLazyAutoLoginQuery,
	useLogoutMutation,
	useResetPasswordMutation,
} = userApi;
