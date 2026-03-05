import './ContactInfo.css';
import Input from "@shared/ui/input/Input.tsx";
import {useId, useState} from "react";
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

//TODO: Пересмотреть loader и error (например, сделать лоадер отдельный и error)
export default function ContactInfo(){
  const telId = useId()
  const emailId = useId()
  const [showSocialUI, setShowSocialUI] = useState<boolean>(false);


  const {data, isLoading, error} = useGetSocialListQuery({});

  const dispatch = useDispatch();
  const contactSelector: Contact = useAppSelector(state => state.contact);

  return (
    <>
      <div id="item-contact" className="section">
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
              placeholder={'+7(999) - 777 - 66 - 55'}
              mask={'+7 (___) ___-__-__'}
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
              placeholder={'example@email.ru'}
              value={contactSelector.email}
              onChange={(e) =>
                dispatch(setEmail(e.target.value))
              }
            />
          </div>

          {showSocialUI && typeof data !== 'undefined' && (
            <SocialLinkRenderData
              socialLinkData={data}
            />
          )}

          {Array.isArray(data) && data.length > 0 && (
            <div className="add-social">
              <Button
                href={'#'}
                baseButton={false}
                className={showSocialUI ? 'remove-social-link' : 'add-social-link' }
                onClick={() => setShowSocialUI(prev => !prev)}
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