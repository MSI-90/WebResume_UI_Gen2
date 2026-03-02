interface IFirstNameField {
  minLength: number;
  maxLength: number;
}

interface ILastNameField {
  minLength: number;
  maxLength: number;
}

interface IFatherNameField {
  maxLength: number;
}

export interface IFieldConst {
  firstName: IFirstNameField
  lastName: ILastNameField
  fatherName: IFatherNameField
}