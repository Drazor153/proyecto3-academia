import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Level } from "../../utils/types";


export const levelsApi = createApi({
  reducerPath: "levelsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_HOST}/api`,
  }),
  endpoints: (builder) => ({

    getLevels: builder.query<Data<Level[]>, null>({
      query: () => "/levels",
    }),

    getLevelsByRoleRun: builder.query<Data<Level[]>, { role: string, run: number }>({
      query: ({ role, run }) => {
        return `/${role}/levels/${run}`;
      },
    }),
  }),
});

export const { useGetLevelsQuery, useGetLevelsByRoleRunQuery } = levelsApi;
