import type {IResumeSocialNetwork, ISocialNetwork} from "@entities/resume/social-network/type/social.ts";
import SocialNetworkSelect from "@entities/resume/social-network/ui/SocialNetworkSelect.tsx";
import {setSocialLink, setSocialType} from "@entities/resume/social-network/model/social.slice.ts";
import {useEffect, useId} from "react";
import Input from "@shared/ui/input/Input.tsx";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {t} from "i18next";
import {allowedSocialLinkData} from "@features/social-network/lib/socialLink-data.ts";
import {Controller, useForm} from "react-hook-form";
import ErrorLabel from "@shared/ui/errorLabel/ErrorLabel.tsx";
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";

interface ISocialLinkRenderDataProps {
  socialLinkData: ISocialNetwork[];
}

export function SocialLinkRenderData({socialLinkData}: ISocialLinkRenderDataProps){
  const socialVariantId = useId();
  const socialNickId = useId();
  const socialSelector: IResumeSocialNetwork = useAppSelector(state => state.social)
  const dispatch = useDispatch();

  const allowedInfo:ISocialNetwork[] = allowedSocialLinkData(socialLinkData);

  interface ISocialValidate {
    socialType: number;
    socialLink: string;
  }

  const {
    control,
    formState: {isValid},
    watch,
    trigger,
    setValue,
  } = useForm<ISocialValidate>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      socialType: socialSelector.SocialNetwork.SocialType,
      socialLink: socialSelector.SocialNetwork.SocialLink
    }
  });

  const watchedSocialType = watch('socialType');
  const watchedSocialLink = watch('socialLink');

  // 👇 1. Когда socialType меняется на 0 — ПРИНУДИТЕЛЬНО очищаем поле никнейма
  useEffect(() => {
    if (watchedSocialType !== undefined && watchedSocialType === 0) {
      setValue('socialLink', '', { shouldValidate: false });
    }
  }, [watchedSocialType, setValue]);

  // 👇 2. ЕДИНАЯ синхронизация Формы → Redux (убрали дубликат!)
  useEffect(() => {
    if (watchedSocialType !== undefined) {
      dispatch(setSocialType(watchedSocialType));
    }

    // Отправляем в Redux: если соцсеть выбрана — значение, иначе — пустая строка
    const linkToDispatch = (watchedSocialType !== undefined && watchedSocialType > 0)
      ? (watchedSocialLink || '')
      : '';

    dispatch(setSocialLink(linkToDispatch));
  }, [watchedSocialType, watchedSocialLink, dispatch]);

  // 👇 3. Синхронизация: Redux → Форма (только при внешней загрузке)
  useEffect(() => {
    if (socialSelector.SocialNetwork.SocialType !== watchedSocialType) {
      // can skip validation here
    }
  }, [watchedSocialType, socialSelector.SocialNetwork.SocialType]);

  useEffect(() => {
    dispatch(nextStepStateDisabled(!isValid));
  }, [dispatch, isValid]);

  return (
    <>
      <div className={'social-type'}>
        <label htmlFor={socialVariantId}>{t('resume.contactInfo.socialNetworkType')}</label><br/>
        <Controller
          control={control}
          name={'socialType'}
          render={({field}) => (
            <SocialNetworkSelect
              dataList={allowedInfo}
              id={socialVariantId}
              value={field.value}
              onChange={value => {
                field.onChange(value);
                //Обновляем форму
                trigger('socialLink');
              }}
            />
          )}
        />
      </div>
      <div className={'social-link'}>
        <label htmlFor={socialNickId}>{t('resume.contactInfo.nickName')}</label><br/>
        <Controller
          name={'socialLink'}
          control={control}
          rules={{
            validate: {
              requiredIfTypeSelected: (value, formValues) => {
                // Если socialType > 0 (выбрана соцсеть) → ник обязателен
                if (formValues.socialType && formValues.socialType > 0) {
                  return value && value.trim().length > 0 ||
                    t('resume.validation.socialNetwork.linkRequired');
                }
                // Если socialType (не выбрано) ник не обязателен
                return true;
              },
              minLength: (value, formValues) => {
                if (!formValues.socialType || formValues.socialType === 0)
                  return true;

                if (!value || value.trim().length === 0)
                  return true;

                return value.trim().length >= 3 ||
                  t('resume.validation.socialNetwork.linkMinLength');
              }
            }
          }}
          render={({field, fieldState}) =>
            <>
              <Input
                type={'text'}
                id={socialNickId}
                baseInput={false}
                {...field}
                onChange={e=> {
                  const value = e.target.value;

                  // 👇 ПРОВЕРЯЕМ watchedSocialType (из формы), а не socialSelector (из Redux)
                  if (watchedSocialType !== undefined && watchedSocialType > 0) {
                    field.onChange(value);
                    // dispatch вызывается автоматически через watch-эффект ниже
                  } else {
                    // 👇 Если соцсеть не выбрана — очищаем форму
                    field.onChange('');
                    // dispatch('') тоже вызовется через watch-эффект
                  }
                }}
              />
              <ErrorLabel
                error={fieldState.error}
                baseError={true}
              />
            </>
          }
        />
      </div>
    </>
  )
}