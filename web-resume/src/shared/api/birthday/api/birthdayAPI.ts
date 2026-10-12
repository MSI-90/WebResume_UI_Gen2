import ENV from "@shared/config/env.ts";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi} from "@reduxjs/toolkit/query/react";
import type {IBirthday} from "@shared/api/birthday/types/birthday.interfaces.ts";

const configApi = ENV;

export const birthdayApi = createApi({
    reducerPath: "birthdayApi",
    baseQuery: fetchBaseQuery({ baseUrl: configApi('VITE_API_URL')  }),
    endpoints: (builder) => ({
        getBirthdayList: builder.query<IBirthday, void>({
            query: () => ({
                url: `api/birthday`
            })
        })
    })
})

export const {useGetBirthdayListQuery} = birthdayApi;