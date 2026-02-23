
export interface SocialNetwork {
  number: number;
  displayName: string;
  iconUrl: string;
}

export interface ResumeSocialNetwork {
  "SocialNetwork": {
    "SocialType": number;
    "SocialLink": string;
  }
}