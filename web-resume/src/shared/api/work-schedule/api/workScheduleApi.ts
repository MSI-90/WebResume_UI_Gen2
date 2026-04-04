import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

import ENV from "@shared/config/env.ts";
import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";

const configApi = ENV;

export const workScheduleApi = createApi({
  reducerPath: 'workScheduleApi',
  baseQuery: fetchBaseQuery({ baseUrl: configApi('VITE_API_URL') }),
  endpoints: (builder) => ({
    getWorkScheduleVariants: builder.query<IWorkSchedule[], ''>({
      query: () => ({
        url: `api/work-schedule`,
      })
    })
  })
})

export const {useGetWorkScheduleVariantsQuery} = workScheduleApi;