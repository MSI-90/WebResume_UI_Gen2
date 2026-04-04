import {useGetWorkScheduleVariantsQuery} from "@shared/api/work-schedule/api/workScheduleApi.ts";
import type {workScheduleResult} from "@entities/resume/job-info/api/types/work-schedule/work-schedule.types.ts";

export function useWorkScheduleVariants() : workScheduleResult {
  const {data, isLoading, error} = useGetWorkScheduleVariantsQuery('');

  if (!data)
    return [];

  return {
    workScheduleVariants: data,
    isLoading,
    error
  }
}