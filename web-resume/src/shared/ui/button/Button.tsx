import type {ReactNode} from "react";
import classNames from "classnames";
import './Button.css';

interface IButtonProps {
  children?: ReactNode;
  baseButton?: boolean;
  className?: string;
  inert?: boolean;
  onClick?: () => void;
}

export default function Button({children, baseButton, onClick, className, inert} : IButtonProps){
  const buttonClass = classNames(baseButton && 'component-button', className);
  return (
    <>
      <button
        className={buttonClass}
        onClick={onClick}
        inert={inert}
      >
        {children}
      </button>
    </>
  )
}