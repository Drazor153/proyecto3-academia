import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Justification, Paginate, ResponseMsg } from "../../utils/types";

export const justificationApi = createApi({
    reducerPath: "justificationAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api/justification`,
        credentials: 'include',
    }),
    tagTypes: ['Justification'],
    endpoints: (builder) => ({
        getJustification: builder.query<Paginate<Justification[]>, { page: number, size: number, name: string, run: string, approved: string }>({
            query: (params) => {
                return {
                    url: '/all',
                    params
                };
            },
        }),

        getOwnJustification: builder.query<Data<Justification[]>, null>({
            query: () => {
                return {
                    url: '/'
                };

            },
            providesTags: ['Justification']
        }),

        createJustification: builder.mutation<ResponseMsg, { body: FormData }>({
            query: ({ body }) => {
                return ({
                    url: "/",
                    method: "POST",
                    body,
                    formData: true
                })
            },
            invalidatesTags: ['Justification']
        }),
    }),
});

export const { useGetJustificationQuery,
    useLazyGetJustificationQuery,
    useGetOwnJustificationQuery,
    useCreateJustificationMutation } = justificationApi;
