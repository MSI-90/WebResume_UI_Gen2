import './FirstInfo.css';
import {useEffect, useId, useRef} from "react";
import Input from "@shared/ui/input/Input.tsx";
import {useAppDispatch, useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {setFatherName, setFirstName, setLastName, setPhoto} from "@entities/fio/model/slice/fio.slice.ts";
import {t} from "i18next";
import {useForm, Controller} from 'react-hook-form';
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import type {IFirstInfoValidate} from "@features/firstInfo/types/firstInfo.types.ts";
import {DEFAULT_PHOTO_PLACEHOLDER} from "@shared/const/image.ts";
import {isImage, isValidSizeImage} from "@features/firstInfo/lib/photoValidation.ts";
import ENV from '@shared/config/env';
import {fieldConst} from "@shared/const/validation.config.ts";

export default function FirstInfo(){
  const familyId = useId();
  const nameId = useId();
  const surnameId = useId();
  const photo = useRef<HTMLInputElement>(null);

  const photoUrl = useAppSelector(state => state.fio.photoUrl);
  const firstName = useAppSelector(state => state.fio.firstName);
  const lastName = useAppSelector(state => state.fio.lastName);
  const fatherName = useAppSelector(state => state.fio.fatherName);

  const dispatch = useAppDispatch();

  const config = ENV;
  const validationConfig = fieldConst;

  //TODO: рассмотреть о defaultValue
  const {
    control,
    formState: { isValid, errors },
    getValues,
  } = useForm<IFirstInfoValidate>({
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    dispatch(nextStepStateDisabled(!isValid));
    if (isValid) {
      const values = getValues();
      dispatch(setLastName(values.lastName ?? ''));
      dispatch(setFirstName(values.firstName ?? ''));
      dispatch(setFatherName(values.fatherName ?? ''));
    }
  }, [isValid, dispatch, getValues, lastName, firstName, fatherName]);

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
            {errors.photo && <p className={'validation-error'}>{errors.photo.message}</p>}
          </div>
          <div>
            <label id="fam" htmlFor={familyId}>{t('resume.firstInfo.lastName')}</label><br/>
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
                },
                maxLength: {
                  value: validationConfig.lastName.maxLength,
                  message: t('resume.validation.common.fieldMaxSize', {
                    maxSize:validationConfig.lastName.maxLength
                  })
                }
              }}
              render = {({field, fieldState}) =>
                <>
                  <Input
                    type={'text'}
                    baseInput={false}
                    name={'family'}
                    id={familyId}
                    required={true}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(e.target.value)
                    }
                    onBlur={field.onBlur}
                  />
                  {fieldState.error && <p className={'validation-error'}>{fieldState.error.message}</p>}
                </>
              }
            />
          </div>
          <div>
            <label htmlFor={nameId}>{t('resume.firstInfo.firstName')}</label><br/>
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
                },
                maxLength: {
                  value: validationConfig.firstName.maxLength,
                  message: t('resume.validation.common.fieldMaxSize', {
                    maxSize:validationConfig.firstName.maxLength
                  })
                }
              }}
              render = {({field, fieldState}) =>
                <>
                  <Input
                    type={'text'}
                    baseInput={false}
                    name={'name'}
                    id={nameId}
                    required={true}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                  {fieldState.error && <p className={'validation-error'}>{fieldState.error.message}</p>}
                </>
              }
            />
          </div>
          <div>
            <label htmlFor={surnameId}>{t('resume.firstInfo.fatherName')}</label><br/>
            <Controller
              control={control}
              name={'fatherName'}
              rules={{
                maxLength: {
                  value: validationConfig.fatherName.maxLength,
                  message: t('resume.validation.common.fieldMaxSize', {
                    maxSize:validationConfig.fatherName.maxLength
                  })
                }
              }}
              render={({field, fieldState}) =>
                <>
                  <Input
                    type={'text'}
                    baseInput={false}
                    name={'father-name'}
                    id={surnameId}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                  {fieldState.error && <p className={'validation-error'}>{fieldState.error.message}</p>}
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}