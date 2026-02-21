import './ContactInfo.css';
import Input from "@shared/ui/input/Input.tsx";
import {useId} from "react";

export default function ContactInfo(){
  const telId = useId()
  const emailId = useId()
  return (
    <>
      <div id="item-contact" className="section item-hidden">
        <div className="item-main-header">
          <h3>Контактная информация</h3>
        </div>
        <div className="item-contact-body">
          <div>
            <label htmlFor={telId}>Номер телефона</label><br/>
            <Input
              type={'tel'}
              baseInput={false}
              name={'phone'}
              required={true}
              id={telId}
              autoComplete={'tel'}
              placeholder={'+79997776655'}
            />
          </div>
          <div>
            <label htmlFor={emailId}>Электронная почта</label><br/>
            <Input
              type={"email"}
              baseInput={false}
              name={'email'}
              id={emailId}
              required={true}
              autoComplete={'email'}
              placeholder={'example@email.ru'}
            />
          </div>
          <div className="add-social">


          </div>
        </div>
      </div>
    </>
  )
}