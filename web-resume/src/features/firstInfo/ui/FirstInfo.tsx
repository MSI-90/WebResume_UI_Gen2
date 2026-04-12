import './FirstInfo.css';
import {useEffect, useId, useRef, useState} from "react";
import Input from "@shared/ui/input/Input.tsx";
import {useAppDispatch, useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {setFatherName, setFirstName, setLastName, setPhoto} from "@entities/resume/fio/model/slice/fio.slice.ts";
import {t} from "i18next";
import {useForm, Controller} from 'react-hook-form';
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import type {IFirstInfoValidate} from "@features/firstInfo/types/firstInfo.types.ts";
import {DEFAULT_PHOTO_PLACEHOLDER} from "@shared/config/const/image.ts";
import {isImage, isValidSizeImage} from "@features/firstInfo/lib/photoValidation.ts";
import ENV from '@shared/config/env';
import {fieldConst} from "@shared/config/const/firstInfo.validation.config.ts";
import ErrorLabel from "@shared/ui/errorLabel/ErrorLabel.tsx";
import type {FIO} from "@entities/resume/fio/model/type/fio.type.ts";
import type {IFieldConst} from "@shared/config/const/types/firstInfo.fieldConst.interfaces.ts";

//TODO: Предусмотреть ограничение на длину строки ввода данных - maxLength и в результате этого пересмотреть появление ошибок валидации
export default function FirstInfo(){
  const familyId = useId();
  const nameId = useId();
  const surnameId = useId();
  const photo = useRef<HTMLInputElement>(null);

  const fioSelector: FIO = useAppSelector(state => state.fio);
  const photoUrl: string | undefined = fioSelector.photoUrl;
  const firstNameState: string = fioSelector.firstName;
  const lastNameState: string = fioSelector.lastName;
  const fatherNameState: string | undefined = fioSelector.fatherName;

  const dispatch = useAppDispatch();

  const config = ENV;
  const validationConfig: IFieldConst = fieldConst;

  const {
    control,
    formState: { isValid, errors},
  } = useForm<IFirstInfoValidate>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: firstNameState || '',
      lastName: lastNameState || '',
      fatherName: fatherNameState || ''
    }
  });

  useEffect(() => {
    dispatch(nextStepStateDisabled(!isValid));
  }, [dispatch, isValid]);

  const [isMaxLastNameReached, setMaxLastNameReached] = useState<boolean>(false);
  const [isMaxFirstNameReached, setMaxFirstNameReached] = useState<boolean>(false);
  const [isFatherNameReached, setFatherNameReached] = useState<boolean>(false);

  return (
    <>
      <div id="item-main" className={'section'}>
        <div className="item-main-header">
          <h3>{t('resume.firstInfo.title')}</h3>
        </div>
        <div className={'item-main-body'}>
          <div className={'photo'}>
            <Controller
              control={control}
              name="photo"
              rules={{
                validate: {
                  fileSize: (file) =>
                    !file || isValidSizeImage(file) || t(
                      'resume.validation.firstInfo.photoValidation.fileSizeError', {
                        fileSize: config('VITE_PHOTO_SIZE')}
                    ),

                  fileType: (file) =>
                    !file || isImage(file) ||
                    (t('resume.validation.firstInfo.photoValidation.fileTypeError'))
                }
              }}
              render={({field}) =>
                <>
                  <Input
                    type={'file'}
                    baseInput={false}
                    id={'photoInput'}
                    name={'photo'}
                    ref={photo}
                    onChange={(e)=> {
                      const file = e.target.files?.[0] ?? null;
                      field.onChange(file);

                      if (file && (!isValidSizeImage(file) || !isImage(file)))
                        return;

                      if (file) {
                        const url = URL.createObjectURL(file);
                        dispatch(setPhoto(url));
                      }
                    }}
                    hidden={true}
                  />
                </>
              }
            />
            <div
              id={'photo-photo'}
              onClick={()=> photo.current?.click()}
              style={{backgroundImage: photoUrl ? `url(${photoUrl})` : DEFAULT_PHOTO_PLACEHOLDER}}
            >
            </div>
            <span
              id="photo-sp" onClick={()=> photo.current?.click()}
            >
              {t('resume.firstInfo.photoButtonText')}
            </span>
            <br/>
            <ErrorLabel
              error={errors.photo}
              baseError={true}
            />
          </div>
          <div>
            <label id="fam" htmlFor={familyId}>
              {t('resume.firstInfo.lastName')}
            </label><br/>
            <Controller
              control={control}
              name={'lastName'}
              rules={{
                required: t('resume.validation.common.required'),
                minLength: {
                  value: validationConfig.lastName.minLength,
                  message: t('resume.validation.common.fieldMinSize', {
                    minSize: validationConfig.lastName.minLength
                  })
                }
              }}
              render = {({field, fieldState}) =>
                <>
                  <Input
                    type={'text'}
                    baseInput={false}
                    id={familyId}
                    autoComplete={'off'}
                    {...field}
                    maxLength={validationConfig.lastName.maxLength}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      dispatch(setLastName(value));

                      if (value.length == validationConfig.lastName.maxLength)
                        setMaxLastNameReached(true);
                      else
                        setMaxLastNameReached(false);
                    }}
                  />
                  <ErrorLabel
                    error={fieldState.error}
                    baseError={!isMaxLastNameReached}
                    message={
                    isMaxLastNameReached
                      ? `Достигнут максимальный лимит ${validationConfig.lastName.maxLength}`
                      :''
                    }
                    className={'validation-recommendation'}
                  />
                </>
              }
            />
          </div>
          <div>
            <label htmlFor={nameId}>
              {t('resume.firstInfo.firstName')}
            </label><br/>
            <Controller
              control={control}
              name={'firstName'}
              rules={{
                required: t('resume.validation.common.required'),
                minLength: {
                  value: validationConfig.firstName.minLength,
                  message: t('resume.validation.common.fieldMinSize', {
                    minSize: validationConfig.firstName.minLength
                  })
                }
              }}
              render = {({field, fieldState}) =>
                <>
                  <Input
                    type={'text'}
                    baseInput={false}
                    id={nameId}
                    autoComplete={'off'}
                    {...field}
                    maxLength={validationConfig.firstName.maxLength}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      dispatch(setFirstName(value));

                      if (value.length == validationConfig.firstName.maxLength)
                        setMaxFirstNameReached(true);
                      else
                        setMaxFirstNameReached(false);
                    }}
                  />
                  <ErrorLabel
                    error={fieldState.error}
                    baseError={!isMaxFirstNameReached}
                    message={
                      isMaxFirstNameReached
                        ? `Достигнут максимальный лимит ${validationConfig.firstName.maxLength}`
                        :''
                    }
                    className={'validation-recommendation'}
                  />
                </>
              }
            />
          </div>
          <div>
            <label htmlFor={surnameId}>{t('resume.firstInfo.fatherName')}</label><br/>
            <Controller
              control={control}
              name={'fatherName'}
              render={({field, fieldState}) =>
                <>
                  <Input
                    type={'text'}
                    baseInput={false}
                    id={surnameId}
                    {...field}
                    autoComplete={'off'}
                    maxLength={validationConfig.fatherName.maxLength}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      dispatch(setFatherName(value));

                      if (value.length == validationConfig.fatherName.maxLength)
                        setFatherNameReached(true);
                      else
                        setFatherNameReached(false);
                    }}
                  />
                  <ErrorLabel
                    error={fieldState.error}
                    baseError={!isFatherNameReached}
                    message={
                      isFatherNameReached
                        ? `Достигнут максимальный лимит ${validationConfig.fatherName.maxLength}`
                        :''
                    }
                    className={'validation-recommendation'}
                  />
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}