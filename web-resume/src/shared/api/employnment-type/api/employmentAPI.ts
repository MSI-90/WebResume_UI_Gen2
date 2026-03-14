import ENV from "@shared/config/env.ts";
import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";

const configApi = ENV;

//TODO: рассмотреть целесообразность переноса в shared
export const employmentApi = createApi({
  reducerPath: 'employmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: configApi('VITE_API_URL') }),
  endpoints: (builder) => ({
    getEmploymentTypeList: builder.query<IEmployment[], ''>({
      query: () => ({
        url: `api/employment-type`,
      })
    })
  })
})

export const {useGetEmploymentTypeListQuery} = employmentApi;