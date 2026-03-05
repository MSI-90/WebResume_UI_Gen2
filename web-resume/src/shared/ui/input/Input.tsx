import classNames from "classnames";
import type {Ref, ChangeEvent, MouseEvent} from "react";
import {InputMask} from "@react-input/mask";


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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  click?: (e: MouseEvent<HTMLDivElement>) => void;
  value?: string;
  mask?: string;
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
    onBlur,
    click,
    value,
    mask,
  }: InputProps) {
  const inputClass = classNames(baseInput && 'component-item', className);

  if (mask){
    return (
      <>
        <InputMask
          mask={mask}
          replacement={{ _: /\d/ }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClass}
          type={type}
          id={id}
          name={name}
          required={required}
          autoComplete={autoComplete}
          hidden={hidden}
          ref={ref}
          onClick={click}
        />
      </>
    )
  }

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
        onBlur={onBlur}
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