// Speaker data is fetched live from the TEDxYola Speaker API
// (https://speaker.tedxyola.com). See:
//   - src/services/speakersApi.ts  (fetching + mapping the API response)
//   - src/hooks/useSpeakers.ts     (cache + auto-refresh on update)
// This file only defines the shared types consumed across the site.

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company?: string;
  photo: string;
  talkTitle: string;
  talkSummary: string;
  bio: string;
  socialLinks?: SocialLink[];
}
