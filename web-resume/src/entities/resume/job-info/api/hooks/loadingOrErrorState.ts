import type {
  IJobInfoApiQueryVariant, IQueryStateResult
} from "@entities/resume/job-info/api/hooks/types/loadingOrErrorState.interfaces.ts";


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