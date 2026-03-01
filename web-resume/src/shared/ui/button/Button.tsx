import type {ReactNode} from "react";
import classNames from "classnames";
import './Button.css';

interface IButtonProps {
  children?: ReactNode;
  baseButton?: boolean;
  className?: string;
  inert?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export default function Button({children, baseButton, onClick, className, inert, href} : IButtonProps){
  const buttonClass = classNames(baseButton && 'component-button', className);

  if (href) {
    return (
      <>
        <a
          href={href}
          onClick={onClick}
          className={buttonClass}
        >
          {children}
        </a>
      </>
    )
  }

  return (
    <>
      <button
        type={type}
        className={buttonClass}
        onClick={onClick}
        inert={inert}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  )
}