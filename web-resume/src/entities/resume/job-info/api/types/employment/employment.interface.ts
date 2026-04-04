import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

export interface IEmploymentResult {
  employmentVariants: IEmployment[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}