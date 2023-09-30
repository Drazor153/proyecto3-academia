import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Level } from '../../utils/types'

type Data = {
    data: Level[]
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