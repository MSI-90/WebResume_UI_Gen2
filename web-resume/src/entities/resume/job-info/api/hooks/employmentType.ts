import {useGetEmploymentTypeListQuery} from "@shared/api/employnment-type/api/employmentAPI.ts";
import type {employmentVariantResult} from "@entities/resume/job-info/api/types/employment/employment.type.ts";

export function useEmploymentTypeVariants(): employmentVariantResult {
  const {data, isLoading, error} = useGetEmploymentTypeListQuery('');
  if (!data)
    return [];

  return {
    employmentVariants: data,
    isLoading,
    error
  }
}