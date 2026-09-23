import type { SocialLink } from '../types';

export const EMAIL = 'fuquanlin347@gmail.com';
export const GITHUB_URL = 'https://github.com/HL42';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/fuquan-lin-1b3ba3290';

export const SOCIALS: SocialLink[] = [
  {
    name: 'Email',
    url: `mailto:${EMAIL}`,
    label: EMAIL,
  },
  {
    name: 'GitHub',
    url: GITHUB_URL,
    label: 'github.com/HL42',
  },
  {
    name: 'LinkedIn',
    url: LINKEDIN_URL,
    label: 'linkedin.com/in/fuquan-lin',
  },
];
