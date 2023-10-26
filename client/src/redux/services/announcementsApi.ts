import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnnouncementType, Data, PostAnnouncement, ResponseMsg } from '../../utils/types';

export const announcementsApi = createApi({
    reducerPath: 'announcementsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api/announcements`,
        credentials: 'include',
    }),
    refetchOnFocus: true,
    endpoints: (builder) => ({
        getAnnouncements: builder.query<Data<AnnouncementType[]>, {}>({
            query: () =>
                ('/'),
        }),

        getAllAnnouncements: builder.query<Data<AnnouncementType[]> & { next: boolean }, { page: number, size: number }>({
            query: ({ page, size }) =>
            ({
                url: '/all',
                params: {
                    page,
                    size,
                },
            })
        }),

        addAnnouncement: builder.mutation<ResponseMsg, { body: PostAnnouncement }>({
            query: ({ body }) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),

        deleteAnnouncement: builder.mutation<ResponseMsg, { id: number }>({
            query: ({ id }) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),

        updateAnnouncement: builder.mutation<ResponseMsg, { id: number, body: PostAnnouncement }>({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useGetAnnouncementsQuery,
    useGetAllAnnouncementsQuery,
    useAddAnnouncementMutation,
    useDeleteAnnouncementMutation,
    useUpdateAnnouncementMutation,
} = announcementsApi;