import type {ApiResult} from "@shared/api/types/get.result.type.ts";
import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";
import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";
import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

interface IJobInfoApiQueryVariant {
  currency: ApiResult<ICurrency[]>;
  employment: ApiResult<IEmployment[]>;
  workSchedule: ApiResult<IWorkSchedule[]>;
}

interface IQueryStateResult {
  loading?: boolean;
  error?:  boolean | FetchBaseQueryError | SerializedError | undefined;
}

export function useJobInfoQueryState(variants: IJobInfoApiQueryVariant): IQueryStateResult {
  const {currency, employment, workSchedule} = variants;

  const loading = ('isLoading' in currency && currency?.isLoading) ||
    ('isLoading' in employment && employment?.isLoading) ||
    ('isLoading' in workSchedule && workSchedule?.isLoading);

  const error = ('error' in currency && currency?.error) ||
    ('error' in employment && employment?.error) ||
    ('error' in workSchedule && workSchedule?.error);

  return {
    loading,
    error
  }
}