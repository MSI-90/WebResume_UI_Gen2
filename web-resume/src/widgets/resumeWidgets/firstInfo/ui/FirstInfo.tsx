import './FirstInfo.css';
import {useId, useRef} from "react";
import Input from "@shared/ui/input/Input.tsx";
import {useAppDispatch, useAppSelector} from "../../../../app/providers/store/hooks/ReduxHooks.ts";
import {setFatherName, setFirstName, setLastName, setPhoto} from "@entities/fio/model/slice/fio.slice.ts";

export default function FirstInfo(){
  const familyId = useId();
  const nameId = useId();
  const surnameId = useId();
  const photo = useRef<HTMLInputElement>(null);

  const fioDispatch = useAppDispatch();
  const photoUrl = useAppSelector(state => state.fio.photoUrl);
  const backgroundImageDefault = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231f88a3\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'lucide lucide-scan-face-icon lucide-scan-face\'%3E%3Cpath d=\'M3 7V5a2 2 0 0 1 2-2h2\'/%3E%3Cpath d=\'M17 3h2a2 2 0 0 1 2 2v2\'/%3E%3Cpath d=\'M21 17v2a2 2 0 0 1-2 2h-2\'/%3E%3Cpath d=\'M7 21H5a2 2 0 0 1-2-2v-2\'/%3E%3Cpath d=\'M8 14s1.5 2 4 2 4-2 4-2\'/%3E%3Cpath d=\'M9 9h.01\'/%3E%3Cpath d=\'M15 9h.01\'/%3E%3C/svg%3E';
  const firstName = useAppSelector(state => state.fio.firstName);
  const lastName = useAppSelector(state => state.fio.lastName);
  const fatherName = useAppSelector(state => state.fio.fatherName);

  return (
    <>
      <div id="item-main" className={'section'}>
        <div className="item-main-header">
          <h3>ФИО и фото</h3>
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
              Добавьте фото
            </span>
          </div>
          <div>
            <label id="fam" htmlFor={familyId}>Фамилия</label><br/>
            <Input
              type={'text'}
              baseInput={false}
              name={'family'}
              id={familyId}
              required={true}
              value={lastName}
              onChange={(e) =>
                fioDispatch(setLastName(e.target.value)
              )}
            />
          </div>
          <div>
            <label htmlFor={nameId}>Имя</label><br/>
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
            <label htmlFor={surnameId}>Отчество</label><br/>
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