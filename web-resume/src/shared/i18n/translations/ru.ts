import type {LanguageStruct} from "@shared/i18n/types/TranslationTypes/LanguageStruct.ts";

export const ru: LanguageStruct = {
  // общие
  common: {
    back: 'Назад',
    next: 'Далее',
    prevStep: 'Предыдущий шаг',
    nextStep: 'Следующий шаг',
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

    // Компонент FirstInfo
    firstInfo: {
      title: 'ФИО и фото',
      photoButtonText: 'Добавьте фото',
      firstName: 'Имя',
      lastName: 'Фамилия',
      fatherName: 'Отчество'
    },

    // Компонент Контактная информация
    contactInfo: {
      title: 'Контактная информация',
      phoneNumber: 'Номер телефона',
      email: 'Электронная почта',
      addSocialButton: 'Добавить социальную сеть',
      removeSocialButton: 'Удалить социальную сеть',
      socialNetworkType: 'Социальная сеть',
      nickName: 'Никнейм'
    },

    // Компонент Цель резюме
    goal: {
      title: 'Цель резюме',
      articleText: 'Цель резюме — это короткий блок в начале резюме, где ты в 1–3 предложениях объясняешь,\n'
        + 'какую позицию ищешь и какую пользу принесёшь работодателю.',
      ul1: {
        li1: 'Помогает рекрутеру сразу понять, кто ты',
        li2: 'Выделяет резюме среди похожих',
        li3: 'Задаёт контекст всему остальному резюме',
      },
      span: 'Может помочь, если:',
      ui2: {
        li2_1: 'Мало опыта',
        li2_2: 'Меняешь профессию',
        li2_3: 'Откликаешься на конкретную вакансию',
      },
      textarea_placeholder: 'Введите не более {{maxLengthValue}} символов',
      removeGoalButton: 'Удалить текст для цель резюме',
      addGoalButton: 'Добавить текст для цели резюме',
    },

    progress: 'Шаг {{current}} из {{total}}',
    validation: {
      firstInfo: {
        photoValidation: {
          fileSizeError: 'Максимальный размер {{fileSize}} Мб',
          fileTypeError: 'Разрешены только изображения'
        }
      },
      contactInfo: {
        phoneNumber: 'Укажите номер телефона',
        email: 'Укажите адрес электронной почты'
      },
      socialNetwork: {
        linkRequired: 'Никнейм обязателен',
        linkMinLength: 'Количество символов должно быть больше',
      },
      common: {
        required: 'Обязательное поле',
        fieldMaxSize: 'Максимальная длина поля составляет {{maxSize}} символов',
        fieldMinSize: 'Минимальная длина поля составляет {{minSize}} символа'
      }
    }
  }
}