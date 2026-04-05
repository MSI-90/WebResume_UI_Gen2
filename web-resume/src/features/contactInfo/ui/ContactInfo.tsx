import './ContactInfo.css';
import Input from "@shared/ui/input/Input.tsx";
import {useEffect, useId, useState} from "react";
import {useGetSocialListQuery} from "@entities/resume/social-network/api/socialApi.ts";
import Button from "@shared/ui/button/Button.tsx";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {setEmail, setPhone} from "@entities/resume/contact/model/slice/contact.slice.ts";
import {t} from "i18next";
import type {Contact} from "@entities/resume/contact/type/contact.ts";
import {SocialLinkRenderData} from "@features/social-network/ui/SocialLinkData.tsx";
import Loader from "@shared/ui/loader/types/ui/loader.tsx";
import ServerError from "@shared/ui/serverError/ui/serverError.tsx";
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import type {IContactInfoValidate} from "@features/contactInfo/types/contactInfo.types.ts";
import {Controller, useForm} from "react-hook-form";
import ErrorLabel from "@shared/ui/errorLabel/ErrorLabel.tsx";
import {fieldConst} from "@shared/config/const/contactInfo.validation.config.ts";
import type {IFieldConst} from "@shared/config/const/types/contactInfo.fieldConst.interfaces.ts";

export default function ContactInfo(){
  const telId = useId()
  const emailId = useId()
  const [showSocialUI, setShowSocialUI] = useState<boolean>(false);

  //TODO: вынести? и в других компонентах
  const {data, isLoading, error} = useGetSocialListQuery({});

  const dispatch = useDispatch();
  const contactSelector: Contact = useAppSelector(state => state.contact);
  const phoneState: string = contactSelector.phone;
  const emailState: string = contactSelector.email;

  const validationConfig: IFieldConst = fieldConst;

  const {
    control,
    formState: { isValid },
    trigger
  } = useForm<IContactInfoValidate>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      phone: phoneState ?? '',
      email: emailState ?? ''
    }
  });

  useEffect(() => {
    dispatch(nextStepStateDisabled(!isValid || !!error));
  }, [dispatch, isValid, error])

  return (
    <>
      <div id="item-contact" className="section">
        <div className="item-main-header">
          <h3>{t('resume.contactInfo.title')}</h3>
        </div>
        <div className="item-contact-body">
          <div>
            <label htmlFor={telId}>{t('resume.contactInfo.phoneNumber')}</label><br/>
            <Controller
              control={control}
              name={'phone'}
              rules={{
                pattern: {
                  value: validationConfig.match.phone,
                  message: t('resume.validation.contactInfo.phoneNumber')
                },
              }}
              render={({field, fieldState}) =>
                <>
                  <Input
                    type={'tel'}
                    baseInput={false}
                    {...field}
                    id={telId}
                    autoComplete={'off'}
                    placeholder={'+7(999) 777 - 66 - 55'}
                    mask={'+7 (___) ___-__-__'}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      dispatch(setPhone(e.target.value));
                    }}
                  />
                  <ErrorLabel
                    error={fieldState.error}
                    baseError={false}
                    className={'validation-recommendation'}
                  />
                </>
              }
            />
          </div>
          <div>
            <label htmlFor={emailId}>
              {t('resume.contactInfo.email')}

            </label><br/>
            <Controller
              control={control}
              name={'email'}
              rules={{
                required: t('resume.validation.common.required'),
                pattern: {
                  value: validationConfig.match.email,
                  message: t('resume.validation.contactInfo.email')
                },
              }}
              render={({field, fieldState}) =>
                <>
                  <Input
                    type={"email"}
                    baseInput={false}
                    {...field}
                    id={emailId}
                    autoComplete={'off'}
                    placeholder={'example@email.ru'}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      dispatch(setEmail(e.target.value));
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

          {showSocialUI && typeof data !== 'undefined' && (
            <SocialLinkRenderData
              removeSocial={showSocialUI}
              socialLinkData={data}
            />
          )}

          {Array.isArray(data) && data.length > 0 && (
            <div className="add-social">
              <Button
                href={'#'}
                baseButton={false}
                className={showSocialUI ? 'remove-social-link' : 'add-social-link' }
                onClick={async () => {
                  const valid = await trigger();
                  if (valid)
                    setShowSocialUI(prev => !prev);
                }}
                children={showSocialUI
                  ? `${t('resume.contactInfo.removeSocialButton')}`
                  :`${t('resume.contactInfo.addSocialButton')}`
                }
              />
            </div>
          )}
          {isLoading && <Loader type={'social'} />}
          {error && <ServerError />}
        </div>
      </div>
    </>
  )
}