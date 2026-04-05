import {useGetEmploymentTypeListQuery} from "@shared/api/employnment-type/api/employmentAPI.ts";
import type {ApiResult} from "@shared/api/types/get.result.type.ts";
import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";

export function useEmploymentTypeVariants(): ApiResult<IEmployment[]> {
  const {data, isLoading, error} = useGetEmploymentTypeListQuery('');

  return {
    data,
    isLoading,
    error
  }
}