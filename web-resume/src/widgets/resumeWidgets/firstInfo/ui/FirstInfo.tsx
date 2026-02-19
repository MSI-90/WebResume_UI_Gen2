import './FirstInfo.css';
import {useId} from "react";
import Input from "@shared/ui/input/Input.tsx";

export default function FirstInfo(){
  const inputId = useId();

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
              hidden={true}
            />
            <div id={'photo-photo'}></div>
            <span id="photo-sp">Добавьте фото</span>
          </div>
          <div>
            <label id="fam" htmlFor={inputId}>Фамилия</label><br/>
            <Input
              type={'text'}
              baseInput={false}
              name={inputId}
              id={'family'}
              required={true}
            />
          </div>
          <div>
            <label htmlFor={inputId}>Имя</label><br/>
            <Input
              type={'text'}
              baseInput={false}
              name={inputId}
              id={'name'}
              required={true}
            />
          </div>
          <div>
            <label htmlFor={inputId}>Отчество</label><br/>
            <Input
              type={'text'}
              baseInput={false}
              name={inputId}
              id={'father-name'}
            />
          </div>
        </div>
      </div>
    </>
  )
}