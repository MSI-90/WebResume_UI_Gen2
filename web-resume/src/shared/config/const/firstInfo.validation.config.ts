import type {IFieldConst} from "@shared/config/const/types/firstInfo.fieldConst.interfaces.ts";

export const fieldConst: IFieldConst = {
  firstName: {
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    minLength: 2,
    maxLength: 70,
  },
  fatherName: {
    maxLength: 70
  }
} as const;