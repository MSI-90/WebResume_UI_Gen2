import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";
import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";
import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";

type AllowedType =
  | ICurrency[]
  | IWorkSchedule[]
  | IEmployment[]
  | undefined;


function isCurrencyData(data: AllowedType): data is ICurrency[] {
  return Array.isArray(data) && 'currencyCode' in data[0];
}

function isWorkScheduleData(data: AllowedType): data is IWorkSchedule[] {
  return Array.isArray(data) && 'workScheduleName' in data[0];
}

function isEmploymentData(data: AllowedType): data is IEmployment[] {
  return Array.isArray(data) && 'employmentTypeName' in data[0];
}

export function dataOption(data: AllowedType) {
  if (isCurrencyData(data)) {
    if (!data)
      return [];

    return data.map(item => ({
      value: item.currencyCode,
      label: item.currencyNameRu,
    }));
  }

  if (isWorkScheduleData(data)) {
    if (!data)
      return [];

    return data.map(item => ({
      value: item.id,
      label: item.workScheduleNameRu,
    }));
  }

  if (isEmploymentData(data)) {
    if (!data)
      return [];

    return data.map(item => ({
      value: item.id,
      label: item.employmentTypeNameRu,
    }));
  }

  return [];
}