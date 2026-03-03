
export interface ISocialNetwork {
  number: number;
  displayName: string;
  iconUrl: string;
}

export interface IResumeSocialNetwork {
  "SocialNetwork": {
    "SocialType": number;
    "SocialLink": string;
  }
}