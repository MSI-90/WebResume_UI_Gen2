import type {IJobInfoConst} from "@shared/config/const/types/job-info.fieldConst.interfaces.ts";

export const fieldConst: IJobInfoConst = {
  joTitle: {
    maxLength: 200,
  }
} as const;