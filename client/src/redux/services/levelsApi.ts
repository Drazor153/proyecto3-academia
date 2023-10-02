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
  }),
});

export const { useGetLevelsQuery } = levelsApi;
