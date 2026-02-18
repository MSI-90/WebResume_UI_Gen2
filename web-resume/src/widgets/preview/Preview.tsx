import {useState} from "react";
import './Preview.css';
import Button from "@shared/ui/button/Button.tsx";

export default function Preview() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
    {isVisible
      ? <h3>Заглушка.....</h3>
      : (
        <main>
          <div className="prestart-resume">
            <h1>Создайте профессиональное резюме онлайн</h1>
            <h3>Соберите его пошагово — просто, быстро и без лишних усилий.</h3>
            <Button
              baseButton={false}
              onClick={() => setIsVisible(prev => !prev)}
              className={"preview-button"}
              children={<span className={"get-start"}>Приступим</span>}
            />
          </div>
        </main>
        )
    }
    </>
  )
}