import './FirstInfo.css';
import {useId, useRef} from "react";
import Input from "@shared/ui/input/Input.tsx";

export default function FirstInfo(){
  const familyId = useId();
  const nameId = useId();
  const surnameId = useId();

  const photo = useRef<HTMLInputElement>(null);

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
              hidden={true}
            />
            <div id={'photo-photo'}
                 onClick={()=> photo.current?.click()}
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
            />
          </div>
          <div>
            <label htmlFor={surnameId}>Отчество</label><br/>
            <Input
              type={'text'}
              baseInput={false}
              name={'father-name'}
              id={surnameId}
            />
          </div>
        </div>
      </div>
    </>
  )
}