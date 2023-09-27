import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Levels = {
    id: string,
    name: string
};

export const levelsApi = createApi({
    reducerPath: 'levelsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.242.108.185:3000/api'
    }),
    endpoints: (builder) => ({
        getLevels: builder.query<Levels[], null>({
            query: () => '/levels'
        })
    })
})

export const {
    useGetLevelsQuery
} = levelsApi