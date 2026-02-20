import './ResumeBuilder.css';
import Button from "@shared/ui/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/providers/store/hooks/ReduxHooks.ts";
import {resumeFlowSteps} from "@features/resume-builder/model/steps.config.ts";
import {nextStep, previousStep} from "@features/resume-builder/model/resumeFlow.slice.ts";
import {useTranslation} from "react-i18next";
import Circle from "@widgets/decoration/Circle.tsx";

export default function ResumeBuilder() {

  const currentStep = useAppSelector(state => state.resumeFlow.currentFlowStep);
  const currentStepTitleKey = resumeFlowSteps[currentStep].key
  const stepsCount = resumeFlowSteps.length;
  const StepComponent = resumeFlowSteps[currentStep].component;

  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  // TODO: рассмотреть целесообразность разбиения на компоненты
  return (
    <>
      <div className="resume">
        <section className="resume__header">
          <Button
            baseButton={false}
            children={'Назад'}
            className={'resume__nav-button--prev'}
            onClick={() => {dispatch(previousStep())}}
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
            <Circle />
            <Circle />
            <Circle />
          </section>
        </section>
        <div className={'resume__content'}>
          <StepComponent />
          <div className={'resume__navigate'}>
            <Button
              baseButton={false}
              children={t('common.nextStep')}
              className={'resume__nav-button--next'}
              onClick={() =>
                dispatch(nextStep())}
            />
          </div>
        </div>
      </div>
    </>
  )
}