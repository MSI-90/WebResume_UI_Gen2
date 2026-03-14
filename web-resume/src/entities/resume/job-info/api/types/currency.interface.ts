import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

export interface CurrencyResult {
  currencyList: ICurrency[];
  isLoading: boolean;
  error:  FetchBaseQueryError | SerializedError | undefined;
}