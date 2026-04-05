import {useGetCurrencyListQuery} from "@shared/api/currency/api/currencyAPI.ts";
import type {CurrencyResult} from "@entities/resume/job-info/api/types/currency/currency.interface.ts";

export function useCurrencyVariants(): CurrencyResult {
  const {data, isLoading, error} = useGetCurrencyListQuery('');

    return {
    currencyList: data,
    isLoading,
    error
  }
}