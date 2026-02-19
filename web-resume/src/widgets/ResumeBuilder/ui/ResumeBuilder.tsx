import './ResumeBuilder.css';
import Button from "@shared/ui/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/providers/store/hooks/ReduxHooks.ts";
import {resumeFlowSteps} from "@features/resume-builder/model/steps.config.ts";
import {nextStep} from "@features/resume-builder/model/resumeFlow.slice.ts";
import {useTranslation} from "react-i18next";

export default function ResumeBuilder() {

  const currentStep = useAppSelector(state => state.resumeFlow.currentFlowStep);
  const currentStepTitleKey = resumeFlowSteps[currentStep].key
  const stepsCount = resumeFlowSteps.length;
  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  return (
    <>
      <div className="resume">
        <section className="resume__header">
          <Button
            baseButton={false}
            children={'Назад'}
            className={'resume__back-button'}
          />
          <span className="resume__step-number">{
            t('resume.progress', {
              current: currentStep + 1,
              total: stepsCount,
            })
          }
          </span>
          <span className="resume__step-title">{t(`resume.steps.${currentStepTitleKey}`)}</span>
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