import './ResumeBuilder.css';
import Button from "@shared/ui/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/providers/store/hooks/ReduxHooks.ts";
import {resumeFlowSteps} from "@features/resume-builder/model/steps.config.ts";
import {nextStep} from "@features/resume-builder/model/resumeFlow.slice.ts";

export default function ResumeBuilder() {

  const currentStep = useAppSelector(state => state.resumeFlow.currentFlowStep);
  const currentStepTitle = resumeFlowSteps[currentStep].titleKey
  const stepsCount = resumeFlowSteps.length;
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="resume">
        <section className="resume__header">
          <Button
            baseButton={false}
            children={'Назад'}
            className={'resume__back-button'}
          />
          <span className="resume__step-number">Шаг {currentStep + 1} из {stepsCount}</span>
          <span className="resume__step-title">{currentStepTitle}</span>
          <section className="resume__decoration">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </section>
          <button onClick={()=> dispatch(nextStep())}>Следующий шаг</button>
        </section>
      </div>
    </>
  )
}