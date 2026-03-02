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
    },
    contactInfo: {
      title: string;
      phoneNumber: string;
      email: string;
      addSocialButton: string;
      removeSocialButton: string;
      socialNetworkType: string;
      nickName: string;
    },
    goal: {
      title: string;
      articleText: string;
      ul1: {
        li1: string;
        li2: string;
        li3: string;
      },
      span: string,
      ui2: {
        li2_1: string;
        li2_2: string;
        li2_3: string;
      },
      textarea_placeholder: string;
      removeGoalButton: string;
      addGoalButton: string;
    },
    progress: string;
    validation: {
      firstInfo: {
        photoValidation: {
          fileSizeError: string;
          fileTypeError: string;
        }
      },
      common: {
        required: string;
        fieldMaxSize: string;
        fieldMinSize: string;
      }
    }
  }
}