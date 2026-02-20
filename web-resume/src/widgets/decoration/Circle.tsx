import './Circle.css';
import classNames from "classnames";

interface CircleProps {
  className?: string;
}

const Decoration = (className:CircleProps) => {
  const inputClass = classNames(className ? className.className : 'circle');
  return (
    <>
      <div className={inputClass}></div>
    </>
  )
}

export default Decoration;