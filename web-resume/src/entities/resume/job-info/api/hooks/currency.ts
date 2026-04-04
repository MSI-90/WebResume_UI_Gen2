import {useGetCurrencyListQuery} from "@shared/api/currency/api/currencyAPI.ts";
import type {resultType} from "@entities/resume/job-info/api/types/currency/currency.type.ts";

export function useCurrencyList(): resultType {
  const {data, isLoading, error} = useGetCurrencyListQuery('');
  if (!data)
    return [];

  return {
    currencyList: data,
    isLoading,
    error
  }
}