import './ResumeBuilder.css';
import Button from "@shared/ui/button/Button.tsx";

export default function ResumeBuilder() {
  return (
    <>
      <div className="resume">
        <section className="resume__header">
          <Button
            baseButton={false}
            children={'Назад'}
            className={'resume__back-button'}
          />
          <span className="resume__step-number">Шаг 1 из 10</span>
          <span className="resume__step-title">Контактная информация</span>
          <section className="resume__decoration">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </section>
        </section>
      </div>
    </>
  )
}