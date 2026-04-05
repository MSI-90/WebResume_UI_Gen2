import {useGetCurrencyListQuery} from "@shared/api/currency/api/currencyAPI.ts";
import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";
import type {ApiResult} from "@shared/api/types/get.result.type.ts";

export function useCurrencyVariants(): ApiResult<ICurrency[]> {
  const {data, isLoading, error} = useGetCurrencyListQuery('');

    return {
    data,
    isLoading,
    error
  }
}