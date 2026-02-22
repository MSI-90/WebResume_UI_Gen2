import './ContactInfo.css';
import Input from "@shared/ui/input/Input.tsx";
import {useId, useState} from "react";
import {useGetSocialListQuery} from "@entities/social-network/api/socialApi.ts";
import Button from "@shared/ui/button/Button.tsx";
import SocialNetworkSelect from "@entities/social-network/ui/SocialNetworkSelect.tsx";
import type {SocialNetwork} from "@entities/social-network/type/social.ts";

//TODO: Пересмотреть loader и error (например, сделать лоадер отдельный и error)
export default function ContactInfo(){
  const telId = useId()
  const emailId = useId()
  const [showSocialUI, setShowSocialUI] = useState<boolean>(false);
  const socialVariantId = useId();
  const socialNickId = useId();

  const {data, isLoading, error} = useGetSocialListQuery({});

  function socialLinkRenderData(data:SocialNetwork[]){
    return (
      <>
        <div>
          <label htmlFor={socialVariantId}>Социальная сеть</label><br/>
          <SocialNetworkSelect
            dataList={data}
            id={socialVariantId}
          />
        </div>
        <div>
          <label htmlFor={socialNickId}>Никнейм</label><br/>
          <Input
            type={'text'}
            id={socialNickId}
            baseInput={false}
          />
        </div>
      </>
    )
  }

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

          {showSocialUI && typeof data !== 'undefined' && (
            socialLinkRenderData(data)
          )}

          {Array.isArray(data) && data.length > 0 && (
            <div className="add-social">
              <Button
                baseButton={false}
                className={'long-button'}
                onClick={() => setShowSocialUI(prev => !prev)}
                children={showSocialUI ? 'Удалить социальную сеть' :'Добавить социальную сеть'}
              />
            </div>
          )}

          {isLoading && (
            <h3>Загрузка....</h3>
          )}

          {error &&
            <span className='error'>
              Ошибка сети, ответственные уже занимаются решением этого вопроса, повторите попытку позднее...
            </span>
          }
        </div>
      </div>
    </>
  )
}