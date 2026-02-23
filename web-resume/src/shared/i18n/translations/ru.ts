import type {LanguageStruct} from "@shared/i18n/types/TranslationTypes/LanguageStruct.ts";

export const ru: LanguageStruct = {
  // общие
  common: {
    back: 'Назад',
    next: 'Далее',
    prevStep: 'Предыдущий шаг',
    nextStep: 'Следующий шаг'
  },

  // Preview
  preview: {
    title: 'Создайте профессиональное резюме онлайн',
    description: 'соберите его пошагово - просто, быстро и без лишних усилий',
    startButton: 'Приступим'
  },

  // шаги резюме
  resume: {
    stepNavigation: {
      prevStep: 'Назад'
    },
    steps: {
      fio: 'ФИО',
      contactInfo: 'Контактная информация',
      goal: 'Цель резюме',
      jobInfo: 'Информация о должности',
      personalInfo: 'Личная информация',
      experience: 'Опыт работы',
      education: 'Образование',
      courses: 'Курсы',
      languages: 'Знание языков',
      skills: 'Компьютерные навыки',
      additionalInfo: 'Дополнительная информация',
      projectInfo: 'Портфолио'
    },
    firstInfo: {
      title: 'ФИО и фото',
      photoButtonText: 'Добавьте фото',
      firstName: 'Имя',
      lastName: 'Фамилия',
      fatherName: 'Отчество'
    },
    contactInfo: {
      title: 'Контактная информация',
      phoneNumber: 'Номер телефона',
      email: 'Электронная почта',
      addSocialButton: 'Добавить социальную сеть',
      removeSocialButton: 'Удалить социальную сеть',
      socialNetworkType: 'Социальная сеть',
      nickName: 'Никнейм'
    },
    progress: 'Шаг {{current}} из {{total}}'
  }
}