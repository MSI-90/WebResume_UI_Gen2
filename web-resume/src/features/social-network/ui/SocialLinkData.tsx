import type {IResumeSocialNetwork, ISocialNetwork} from "@entities/resume/social-network/type/social.ts";
import SocialNetworkSelect from "@entities/resume/social-network/ui/SocialNetworkSelect.tsx";
import {setSocialLink, setSocialType} from "@entities/resume/social-network/model/social.slice.ts";
import {useId} from "react";
import Input from "@shared/ui/input/Input.tsx";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {t} from "i18next";
import {allowedSocialLinkData} from "@features/social-network/lib/socialLink-data.ts";

interface ISocialLinkRenderDataProps {
  socialLinkData: ISocialNetwork[];
}

export function SocialLinkRenderData({socialLinkData}: ISocialLinkRenderDataProps){
  const socialVariantId = useId();
  const socialNickId = useId();
  const socialSelector: IResumeSocialNetwork = useAppSelector(state => state.social)
  const dispatch = useDispatch();

  const allowedInfo:ISocialNetwork[] = allowedSocialLinkData(socialLinkData);

  return (
    <>
      <div className={'social-type'}>
        <label htmlFor={socialVariantId}>{t('resume.contactInfo.socialNetworkType')}</label><br/>
        <SocialNetworkSelect
          dataList={allowedInfo}
          id={socialVariantId}
          value={socialSelector.SocialNetwork.SocialType}
          onChange={value =>
            dispatch(setSocialType(value))
          }
        />
      </div>
      <div className={'social-link'}>
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