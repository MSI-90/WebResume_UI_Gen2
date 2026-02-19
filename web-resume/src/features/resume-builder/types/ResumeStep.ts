import type {FunctionComponent} from "react";

export interface ResumeStep {
  id: number;
  key: string;
  titleKey: string;
  component: FunctionComponent;
}