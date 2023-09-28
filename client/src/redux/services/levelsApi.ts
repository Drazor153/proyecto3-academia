import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Levels = {
    id: string,
    name: string
};

type Data = {
    data: Levels[]
}

export const levelsApi = createApi({
    reducerPath: 'levelsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`
    }),
    endpoints: (builder) => ({
        getLevels: builder.query<Data, null>({
            query: () => '/levels'
        })
    })
})

export const {
    useGetLevelsQuery
} = levelsApi