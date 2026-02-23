import FirstInfo from "@widgets/resumeWidgets/firstInfo/ui/FirstInfo.tsx";
import ContactInfo from "@widgets/resumeWidgets/contactInfo/ui/ContactInfo.tsx";
import type {ResumeStep} from "@features/resume-builder/types/ResumeStep.ts";
import Goal from "@widgets/resumeWidgets/goal/Goal.tsx";

export const resumeFlowSteps: ResumeStep[] = [
  {
    id: 1,
    key: 'fio',
    titleKey: 'resume.steps.fio',
    component: FirstInfo
  },
  {
    id: 2,
    key: 'contactInfo',
    titleKey: 'resume.steps.contactInfo',
    component: ContactInfo
  },
  {
    id: 3,
    key: 'goal',
    titleKey: 'resume.steps.goal',
    component: Goal
  },
  {
    id: 4,
    key: 'jobInfo',
    titleKey: 'resume.steps.jobInfo',
    component: ContactInfo
  },
  {
    id: 5,
    key: 'personalInfo',
    titleKey: 'resume.steps.personalInfo',
    component: ContactInfo
  },
  {
    id: 6,
    key: 'experience',
    titleKey: 'resume.steps.experience',
    component: ContactInfo
  },
  {
    id: 7,
    key: 'education',
    titleKey: 'resume.steps.education',
    component: ContactInfo
  },
  {
    id: 8,
    key: 'courses',
    titleKey: 'resume.steps.courses',
    component: ContactInfo
  },
  {
    id: 9,
    key: 'languages',
    titleKey: 'resume.steps.languages',
    component: ContactInfo
  },
  {
    id: 10,
    key: 'skills',
    titleKey: 'resume.steps.skills',
    component: ContactInfo
  },
  {
    id: 11,
    key: 'additionalInfo',
    titleKey: 'resume.steps.additionalInfo',
    component: ContactInfo
  },
  {
    id: 12,
    key: 'projectInfo',
    titleKey: 'resume.steps.projectInfo',
    component: ContactInfo
  }
]