import type {IFieldConst} from "@shared/config/const/types/contactInfo.fieldConst.interfaces.ts";

export const fieldConst: IFieldConst = {
  match: {
    phone: new RegExp(/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/),
    email: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,)
  }
} as const