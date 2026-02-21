import classNames from "classnames";
import type {Ref, ChangeEvent, MouseEvent} from "react";

interface InputProps {
  type: 'text' | 'number' | 'file' | 'tel' | 'email';
  id: string;
  autoComplete?: string;
  name?: string;
  required?: boolean;
  baseInput: boolean;
  className?: string;
  hidden?: boolean;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
  accept?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  click?: (e: MouseEvent<HTMLDivElement>) => void;
  value?: string;
}

export default function Input ({
    type,
    id,
    autoComplete,
    name,
    required,
    baseInput,
    className,
    hidden,
    placeholder,
    ref,
    accept,
    onChange,
    click,
    value,
  }: InputProps) {
  const inputClass = classNames(baseInput && 'component-item', className);

  return (
    <>
      <input
        type={type}
        id={id}
        autoComplete={autoComplete}
        name={name}
        required={required}
        className={inputClass}
        onChange={onChange}
        onClick={click}
        hidden={hidden}
        placeholder={placeholder}
        ref={ref}
        accept={accept}
        value={value}
      />
    </>
  )
}