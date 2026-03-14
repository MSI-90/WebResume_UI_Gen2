import type {IResumeSocialNetwork, ISocialNetwork} from "@entities/resume/social-network/type/social.ts";
import SocialNetworkSelect from "@entities/resume/social-network/ui/SocialNetworkSelect.tsx";
import {setSocialLink, setSocialType} from "@entities/resume/social-network/model/social.slice.ts";
import {useEffect, useId} from "react";
import Input from "@shared/ui/input/Input.tsx";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {t} from "i18next";
import {allowedSocialLinkData} from "@features/social-network/lib/socialLink-data.ts";
import {Controller, useForm, useWatch} from "react-hook-form";
import ErrorLabel from "@shared/ui/errorLabel/ErrorLabel.tsx";
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import type {ISocialValidate} from "@features/social-network/types/socialLinkData.types.ts";

interface ISocialLinkRenderDataProps {
  socialLinkData: ISocialNetwork[];
  removeSocial: boolean;
}

export function SocialLinkRenderData({socialLinkData, removeSocial}: ISocialLinkRenderDataProps){
  const socialVariantId = useId();
  const socialNickId = useId();
  const socialSelector: IResumeSocialNetwork = useAppSelector(state => state.social)
  const dispatch = useDispatch();

  const allowedInfo:ISocialNetwork[] = allowedSocialLinkData(socialLinkData);

  const {
    control,
    formState: {isValid},
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

  const watchedSocialType = useWatch({
    control,
    name: 'socialType',
    defaultValue: 0
  });

  const watchedSocialLink = useWatch({
    control,
    name: 'socialLink',
    defaultValue: ''
  });

  useEffect(() => {
    if (removeSocial){
      setValue('socialType', 0);
      setValue('socialLink', '');
    }
  }, [removeSocial, setValue]);

  // Когда socialType меняется на 0 — очищаем поле никнейма
  useEffect(() => {
    if (watchedSocialType !== undefined && watchedSocialType === 0) {
      setValue('socialLink', '', { shouldValidate: false });
    }
  }, [watchedSocialType, setValue]);

  // единая синхронизация Формы и Redux
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
              onChange={async (value) => {
                field.onChange(value);
                await trigger('socialLink');
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
                // Если socialType > 0 (выбрана соцсеть), то ник обязателен
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

                  // проверяем watchedSocialType (из формы)
                  if (watchedSocialType !== undefined && watchedSocialType > 0) {
                    field.onChange(value);
                  } else {
                    // Если соцсеть не выбрана — очищаем форму
                    field.onChange('');
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