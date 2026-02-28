import './FirstInfo.css';
import {useEffect, useId, useRef} from "react";
import Input from "@shared/ui/input/Input.tsx";
import {useAppDispatch, useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {setFatherName, setFirstName, setPhoto} from "@entities/fio/model/slice/fio.slice.ts";
import {t} from "i18next";
import {useForm, Controller} from 'react-hook-form';
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";

interface IFirstInfoValidate {
  lastName: string;

}

export default function FirstInfo(){
  const familyId = useId();
  const nameId = useId();
  const surnameId = useId();
  const photo = useRef<HTMLInputElement>(null);

  const fioDispatch = useAppDispatch();
  const photoUrl = useAppSelector(state => state.fio.photoUrl);
  const backgroundImageDefault = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231f88a3\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'lucide lucide-scan-face-icon lucide-scan-face\'%3E%3Cpath d=\'M3 7V5a2 2 0 0 1 2-2h2\'/%3E%3Cpath d=\'M17 3h2a2 2 0 0 1 2 2v2\'/%3E%3Cpath d=\'M21 17v2a2 2 0 0 1-2 2h-2\'/%3E%3Cpath d=\'M7 21H5a2 2 0 0 1-2-2v-2\'/%3E%3Cpath d=\'M8 14s1.5 2 4 2 4-2 4-2\'/%3E%3Cpath d=\'M9 9h.01\'/%3E%3Cpath d=\'M15 9h.01\'/%3E%3C/svg%3E';

  const firstName = useAppSelector(state => state.fio.firstName);

  /*const lastName = useAppSelector(state => state.fio.lastName);*/
  const fatherName = useAppSelector(state => state.fio.fatherName);

  const dispatch = useAppDispatch();

  const {
    control,
    formState: { isValid },
  } = useForm<IFirstInfoValidate>({
    mode: "onBlur",
    reValidateMode: "onChange"
  });

  useEffect(() => {
      dispatch(nextStepStateDisabled(!isValid))
  }, [isValid, dispatch]);

  return (
    <>
      <div id="item-main" className={'section'}>
        <div className="item-main-header">
          <h3>{t('resume.firstInfo.title')}</h3>
        </div>
        <div className={'item-main-body'}>
          <div className={'photo'}>
            <Input
              type={'file'}
              baseInput={false}
              id={'photoInput'}
              name={'photo'}
              accept={'image/*'}
              ref={photo}
              onChange={(e)=> {
                const file = e.target.files?.[0] ?? null;
                if (file) {
                  const url = URL.createObjectURL(file);
                  fioDispatch(setPhoto(url));
                }
              }}
              hidden={true}
            />
            <div
              id={'photo-photo'}
              onClick={()=> photo.current?.click()}
              style={{backgroundImage: photoUrl ? `url(${photoUrl})` : backgroundImageDefault}}
            >
            </div>
            <span
              id="photo-sp" onClick={()=> photo.current?.click()}
            >
              {t('resume.firstInfo.photoButtonText')}
            </span>
          </div>
          <div>
            <label id="fam" htmlFor={familyId}>{t('resume.firstInfo.lastName')}</label><br/>
            <Controller
              control={control}
              name={'lastName'}
              rules={{
                required: 'Имя обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Минимальная длина для поля Фамилия составляет 2 символа'
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
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                  {fieldState.error && <h3>{fieldState.error.message}</h3>}
                </>
              }
            />

          </div>
          <div>
            <label htmlFor={nameId}>{t('resume.firstInfo.firstName')}</label><br/>
            <Input
              type={'text'}
              baseInput={false}
              name={'name'}
              id={nameId}
              required={true}
              value={firstName}
              onChange={(e) =>
                fioDispatch(setFirstName(e.target.value)
              )}
            />
          </div>
          <div>
            <label htmlFor={surnameId}>{t('resume.firstInfo.fatherName')}</label><br/>
            <Input
              type={'text'}
              baseInput={false}
              name={'father-name'}
              id={surnameId}
              value={fatherName}
              onChange={(e) =>
                fioDispatch(setFatherName(e.target.value))}
            />
          </div>
        </div>
      </div>
    </>
  )
}