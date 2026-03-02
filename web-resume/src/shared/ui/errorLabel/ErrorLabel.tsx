import type {FieldError} from "react-hook-form";

interface IErrorLabelProps {
  error?: FieldError | undefined;
}

export default function  ErrorLabel({error}: IErrorLabelProps) {
  return (
    <>
      {error && <p className={'validation-error'}>{error.message}</p>}
    </>
  )
}
