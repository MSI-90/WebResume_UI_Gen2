import ENV from "@shared/config/env.ts";
import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";

const configApi = ENV;

//TODO: рассмотреть целесообразность переноса в shared
export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: configApi('VITE_API_URL') }),
  endpoints: (builder) => ({
    getCurrencyList: builder.query<ICurrency[], ''>({
      query: () => ({
        url: `api/currency`,
      })
    })
  })
})

export const {useGetCurrencyListQuery} = currencyApi;