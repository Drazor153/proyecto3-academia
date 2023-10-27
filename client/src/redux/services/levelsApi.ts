import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Level, LevelInfo } from "../../utils/types";


export const levelsApi = createApi({
  reducerPath: "levelsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getLevels: builder.query<Data<LevelInfo[]>, null>({
      query: () => "/levels",
    }),

    getLevelsByRoleRun: builder.query<Data<Level[]>, { role: string }>({
      query: ({ role }) => {
        return `/${role}/levels/`;
      },
    }),
  }),
});

export const { useGetLevelsQuery, useGetLevelsByRoleRunQuery } = levelsApi;
