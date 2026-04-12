import type {FieldError} from "react-hook-form";
import classNames from "classnames";
import './ErrorLabel.css';

interface IErrorLabelProps {
  error?: FieldError | undefined;
  baseError?: boolean;
  className?: string
  message?: string
}

export default function  ErrorLabel({
  error,
  baseError,
  className,
  message
}: IErrorLabelProps) {

  const finalMessage = message || error?.message;
  const errorClass = classNames(baseError ? 'validation-error' : className);
  return (
    <>
      {finalMessage && (
        <p className={errorClass}>{finalMessage}</p>
      )}
    </>
  )
}
