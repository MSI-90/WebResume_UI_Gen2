import type {FieldError} from "react-hook-form";
import classNames from "classnames";
import './ErrorLabel.css';

interface IErrorLabelProps {
  error?: FieldError | undefined;
  baseError?: boolean;
  className?: string
}

export default function  ErrorLabel({error, baseError, className}: IErrorLabelProps) {
  const errorClass = classNames(baseError && 'validation-error', className);
  return (
    <>
      {error && <p className={errorClass}>{error.message}</p>}
    </>
  )
}
