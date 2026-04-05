import {useGetEmploymentTypeListQuery} from "@shared/api/employnment-type/api/employmentAPI.ts";
import type {IEmploymentResult} from "@entities/resume/job-info/api/types/employment/employment.interface.ts";

export function useEmploymentTypeVariants(): IEmploymentResult {
  const {data, isLoading, error} = useGetEmploymentTypeListQuery('');

  return {
    employmentVariants: data,
    isLoading,
    error
  }
}