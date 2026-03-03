import type {ISocialNetwork} from "@entities/resume/social-network/type/social.ts";


/** Фильтрует массив социальных сетей, исключая заблокированные РКН сервисы.
*
* @param socialLinkData - Массив объектов социальных сетей
* @returns Отфильтрованный массив социальных сетей
*/
export function allowedSocialLinkData(socialLinkData:ISocialNetwork[]) {
  return socialLinkData.filter((item) =>
    !['Facebook', 'Instagram', 'Whatsapp', 'Viber', 'Skype'].includes(item.displayName)
  );
}