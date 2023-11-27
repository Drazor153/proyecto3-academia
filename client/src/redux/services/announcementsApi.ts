import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AnnouncementType,
  Category,
  Data,
  Paginate,
  PostAnnouncement,
  ResponseMsg,
  Target,
} from '../../utils/types';

export const announcementsApi = createApi({
  reducerPath: 'announcementsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api/announcements`,
    credentials: 'include',
  }),
  refetchOnFocus: true,
  tagTypes: ['get'],
  endpoints: builder => ({
    getAnnouncements: builder.query<Data<AnnouncementType[]>, null>({
      query: () => '/',
      providesTags: ['get'],
      keepUnusedDataFor: 5 * 60 * 1000, // 5 minutes
    }),

    getAllAnnouncements: builder.query<
      Paginate<AnnouncementType[]>,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: '/all',
        params: {
          page,
          size,
        },
      }),
      providesTags: ['get'],
    }),

    addAnnouncement: builder.mutation<ResponseMsg, { body: PostAnnouncement }>({
      query: ({ body }) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['get'],
    }),

    deleteAnnouncement: builder.mutation<ResponseMsg, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['get'],
    }),

    updateAnnouncement: builder.mutation<
      ResponseMsg,
      { id: number; body: PostAnnouncement }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['get'],
    }),
    getCategoriesTargets: builder.query<
      { categories: Category[]; targets: Target[] },
      null
    >({
      query: () => '/categories-targets',
    }),
    getCategories: builder.query<Data<Category[]>, null>({
      query: () => '/categories',
    }),
    getTargets: builder.query<Data<Target[]>, null>({
      query: () => '/targets',
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetAllAnnouncementsQuery,
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useGetCategoriesTargetsQuery,
  // useGetCategoriesQuery,
  // useGetTargetsQuery,
} = announcementsApi;
