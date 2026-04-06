import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";
import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";
import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";
import type {ApiResult} from "@shared/api/types/get.result.type.ts";

type AllowedType =
  | ApiResult<ICurrency[]>
  | ApiResult<IWorkSchedule[]>
  | ApiResult<IEmployment[]>;


function isCurrencyData(data: AllowedType): data is ApiResult<ICurrency[]> {
  return Array.isArray(data.data) && 'currencyCode' in data.data[0];
}

function isWorkScheduleData(data: AllowedType): data is ApiResult<IWorkSchedule[]> {
  return Array.isArray(data.data) && 'workScheduleName' in data.data[0];
}

function isEmploymentData(data: AllowedType): data is ApiResult<IEmployment[]> {
  return Array.isArray(data.data) && 'employmentTypeName' in data.data[0];
}

export function dataOption(data: AllowedType) {
  if (isCurrencyData(data)) {
    if (!data.data)
      return [];

    return data.data.map(item => ({
      value: item.currencyCode,
      label: item.currencyNameRu,
    }));
  }

  if (isWorkScheduleData(data)) {
    if (!data.data)
      return [];

    return data.data.map(item => ({
      value: item.id,
      label: item.workScheduleNameRu,
    }));
  }

  if (isEmploymentData(data)) {
    if (!data.data)
      return [];

    return data.data.map(item => ({
      value: item.id,
      label: item.employmentTypeNameRu,
    }));
  }

  return [];
}