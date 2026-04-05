import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

export interface ApiResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error:  FetchBaseQueryError | SerializedError | undefined;
}