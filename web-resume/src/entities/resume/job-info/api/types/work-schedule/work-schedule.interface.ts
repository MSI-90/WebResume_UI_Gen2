import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

export interface IWorkScheduleResult {
  workScheduleVariants: IWorkSchedule[] | undefined;
  isLoading: boolean;
  error:  FetchBaseQueryError | SerializedError | undefined;
}