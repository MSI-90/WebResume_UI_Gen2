import './ContactInfo.css';
import Input from "@shared/ui/input/Input.tsx";
import {useId, useState} from "react";
import {useGetSocialListQuery} from "@entities/social-network/api/socialApi.ts";
import Button from "@shared/ui/button/Button.tsx";
import SocialNetworkSelect from "@entities/social-network/ui/SocialNetworkSelect.tsx";
import type {SocialNetwork} from "@entities/social-network/type/social.ts";
import {useDispatch} from "react-redux";
import {setSocialLink, setSocialType} from "@entities/social-network/model/social.slice.ts";
import {useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {setEmail, setPhone} from "@entities/contact/model/slice/contact.slice.ts";
import {t} from "i18next";

//TODO: Пересмотреть loader и error (например, сделать лоадер отдельный и error)
export default function ContactInfo(){
  const telId = useId()
  const emailId = useId()
  const [showSocialUI, setShowSocialUI] = useState<boolean>(false);
  const socialVariantId = useId();
  const socialNickId = useId();

  const {data, isLoading, error} = useGetSocialListQuery({});

  const dispatch = useDispatch();
  const contactSelector = useAppSelector(state => state.contact);
  const socialSelector = useAppSelector(state => state.social)

  function socialLinkRenderData(data:SocialNetwork[]){
    return (
      <>
        <div>
          <label htmlFor={socialVariantId}>{t('resume.contactInfo.socialNetworkType')}</label><br/>
          <SocialNetworkSelect
            dataList={data}
            id={socialVariantId}
            value={socialSelector.SocialNetwork.SocialType}
            onChange={value =>
              dispatch(setSocialType(value))
            }
          />
        </div>
        <div>
          <label htmlFor={socialNickId}>{t('resume.contactInfo.nickName')}</label><br/>
          <Input
            type={'text'}
            id={socialNickId}
            baseInput={false}
            value={socialSelector.SocialNetwork.SocialLink}
            onChange={e=>
              dispatch(setSocialLink(e.target.value))
            }
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
            <label htmlFor={telId}>{t('resume.contactInfo.phoneNumber')}</label><br/>
            <Input
              type={'tel'}
              baseInput={false}
              name={'phone'}
              required={true}
              id={telId}
              autoComplete={'tel'}
              placeholder={contactSelector.phone}
              value={contactSelector.phone}
              onChange={(e) =>
                dispatch(setPhone(e.target.value))
              }
            />
          </div>
          <div>
            <label htmlFor={emailId}>{t('resume.contactInfo.email')}</label><br/>
            <Input
              type={"email"}
              baseInput={false}
              name={'email'}
              id={emailId}
              required={true}
              autoComplete={'email'}
              placeholder={contactSelector.email}
              value={contactSelector.email}
              onChange={(e) =>
                dispatch(setEmail(e.target.value))
              }
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
                children={showSocialUI
                  ? `${t('resume.contactInfo.removeSocialButton')}`
                  :`${t('resume.contactInfo.addSocialButton')}`
                }
              />
            </div>
          )}

          {isLoading && (
            <span className={'loading'}>
              Загрузка списка выбора социальных сетей
            </span>
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