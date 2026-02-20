import classNames from "classnames";
import {type ReactNode, type Ref} from "react";

interface InputProps {
  type: 'text' | 'number' | 'file';
  id: string;
  name?: string;
  required?: boolean;
  baseInput: boolean;
  className?: string;
  hidden?: boolean;
  children?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  click?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
    ref,
    accept,
    onChange,
    click,
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
        onClick={click}
        hidden={hidden}
        ref={ref}
        accept={accept}
      >
        {children}
      </input>
    </>
  )
}