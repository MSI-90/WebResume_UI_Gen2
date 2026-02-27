import type {ReactNode} from "react";
import classNames from "classnames";
import './Button.css';

interface IButtonProps {
  children?: ReactNode;
  baseButton?: boolean;
  className?: string;
  inert?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'submit'| 'reset' | 'button';
}

export default function Button({children, baseButton, onClick, className, inert, href, type} : IButtonProps){
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
      >
        {children}
      </button>
    </>
  )
}