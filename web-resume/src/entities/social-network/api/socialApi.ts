import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import ENV from "@shared/config/env.ts";
import type {SocialNetwork} from "@entities/social-network/type/social.ts";

const configApi = ENV;

interface Params {
  limit?: number;
}

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: configApi('VITE_API_URL') }),
  endpoints: (builder) => ({
    getSocialList: builder.query<SocialNetwork, Params>({
      query: ({limit}: Params) => ({
        url: `api/social`,
        params: {_limit: limit}
      })
    })
  })
})

export const {useGetSocialListQuery} = socialApi;