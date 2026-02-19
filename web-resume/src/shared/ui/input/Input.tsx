import classNames from "classnames";
import {type ReactNode} from "react";

interface InputProps {
  type: 'text' | 'number' | 'file';
  id: string;
  name?: string;
  required?: boolean;
  baseInput: boolean;
  className?: string;
  hidden?: boolean;
  children?: ReactNode;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input ({
    type,
    id,
    name,
    required,
    baseInput,
    className,
    hidden,
    children,
    accept,
    onChange
  }: InputProps) {
  const inputClass = classNames(baseInput && 'component-item', className);

  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        className={inputClass}
        onChange={onChange}
        hidden={hidden}
        accept={accept}
      >
        {children}
      </input>
    </>
  )
}