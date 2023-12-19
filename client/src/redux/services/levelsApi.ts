import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Data, Level, LevelInfo, Topic } from '../../utils/types';

export const levelsApi = createApi({
	reducerPath: 'levelsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/api`,
		credentials: 'include',
	}),
	endpoints: builder => ({
		getLevels: builder.query<Data<LevelInfo[]>, null>({
			query: () => '/levels',
		}),

		getLevelsByRoleRun: builder.query<Data<Level[]>, { role: string }>({
			query: ({ role }) => `/${role}/levels/`,
		}),
		getTopics: builder.query<Data<Topic[]>, null>({
			query: () => '/levels/topics',
		}),
	}),
});

export const {
	useGetLevelsQuery,
	useGetLevelsByRoleRunQuery,
	useGetTopicsQuery,
	useLazyGetTopicsQuery,
} = levelsApi;
