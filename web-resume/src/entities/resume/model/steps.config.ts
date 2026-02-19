import FirstInfo from "@widgets/resumeWidgets/firstInfo/ui/FirstInfo.tsx";
import type {FunctionComponent} from "react";
import ContactInfo from "@widgets/resumeWidgets/contactInfo/ui/ContactInfo.tsx";

export interface ResumeStep {
  id: number;
  key: string;
  titleKey: string;
  component: FunctionComponent;
}

export const resumeSteps: ResumeStep[] = [
  {
    id: 1,
    key: 'fio',
    titleKey: 'resume.steps.fio',
    component: FirstInfo
  },
  {
    id: 2,
    key: 'contact',
    titleKey: 'resume.steps.contact',
    component: ContactInfo
  }
]