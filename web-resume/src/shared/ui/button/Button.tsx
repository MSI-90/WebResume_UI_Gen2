import type {ReactNode} from "react";
import classNames from "classnames";
import './Button.css';

interface IButtonProps {
  children?: ReactNode;
  baseButton?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({children, baseButton, onClick, className} : IButtonProps){
  const buttonClass = classNames(baseButton && 'component-button', className);
  return (
    <>
      <button
        className={buttonClass}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )

}