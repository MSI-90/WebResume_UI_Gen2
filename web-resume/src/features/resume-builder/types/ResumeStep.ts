import type {FunctionComponent} from "react";

export interface IResumeFlowState {
  currentFlowStep: number;
  disabledNextStepButton: boolean;
}

export interface ResumeStep {
  id: number;
  key: string;
  titleKey: string;
  component: FunctionComponent;
}