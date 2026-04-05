import {useGetWorkScheduleVariantsQuery} from "@shared/api/work-schedule/api/workScheduleApi.ts";
import type {IWorkScheduleResult} from "@entities/resume/job-info/api/types/work-schedule/work-schedule.interface.ts";

export function useWorkScheduleVariants() : IWorkScheduleResult {
  const {data, isLoading, error} = useGetWorkScheduleVariantsQuery('');

  return {
    workScheduleVariants: data,
    isLoading,
    error
  }
}