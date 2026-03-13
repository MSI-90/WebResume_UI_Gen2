import type {ISocialNetwork} from "@entities/resume/social-network/type/social.ts";


/** Фильтрует массив социальных сетей, исключая заблокированные РКН сервисы.
*
* @param socialLinkData - Массив объектов социальных сетей
* @returns Отфильтрованный массив социальных сетей
*/
export function allowedSocialLinkData(socialLinkData:ISocialNetwork[]) {
  const blockedServices: string[] = ['Facebook', 'Instagram', 'Whatsapp', 'Viber', 'Skype'];
  const filtered: ISocialNetwork[] = socialLinkData.filter((item) =>
    !blockedServices.includes(item.displayName)
  );

  return [
    { number: 0, displayName: 'Выберите соц. сеть', iconUrl: 'default.svg' },
    ...filtered
  ];
}