export interface LanguageStruct {
  common: {
    back: string;
    next: string;
    prevStep: string;
    nextStep: string;
  };
  preview: {
    title: string;
    description: string;
    startButton: string;
  };
  resume: {
    stepNavigation: {
      prevStep: string;
    },
    steps: {
      fio: string;
      contactInfo: string;
      goal: string;
      jobInfo: string;
      personalInfo: string;
      experience: string;
      education: string;
      courses: string;
      languages: string;
      skills: string;
      additionalInfo: string;
      projectInfo: string;
    },
    firstInfo: {
      title: string;
      photoButtonText: string;
      firstName: string;
      lastName: string;
      fatherName: string;
    }
    progress: string;
  }
}