import {useGetWorkScheduleVariantsQuery} from "@shared/api/work-schedule/api/workScheduleApi.ts";
import type {ApiResult} from "@shared/api/types/get.result.type.ts";
import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";

export function useWorkScheduleVariants() : ApiResult<IWorkSchedule[]> {
  const {data, isLoading, error} = useGetWorkScheduleVariantsQuery('');

  return {
    data,
    isLoading,
    error
  }
}