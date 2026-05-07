export interface Partner {
  name: string;
  logo: string;
  url?: string;
}

export interface SiteConfig {
  eventName: string;
  themeName: string;
  themeTagline: string;
  eventDate: string;
  eventYear: number;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  ticketUrl: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    email?: string;
  };
  partners: Partner[];
  metaDescription: string;
  organizerEmail: string;
}

export const siteConfig: SiteConfig = {
  eventName: 'TEDxYola',
  themeName: 'IGNITE',
  themeTagline: 'ideas that set change in motion',
  eventDate: 'June 20, 2026',
  eventYear: 2026,
  venue: {
    name: 'Yola International Conference Center',
    address: 'TBD',
    city: 'Yola',
    state: 'Adamawa',
    country: 'Nigeria',
  },
  ticketUrl: '/tickets',
  socialLinks: {
    facebook: 'https://facebook.com/tokoacademy',
    twitter: 'https://twitter.com/tokoacademy',
    instagram: 'https://instagram.com/tokoacademy',
    linkedin: 'https://linkedin.com/company/tokoacademy',
    youtube: 'https://youtube.com/@tokoacademy',
    email: 'hello@tedxyola.com',
  },
  partners: [
    {
      name: 'Adama Beverages Ltd.',
      logo: 'https://www.adamabeverages.com/wp-content/themes/tech-blue/images/logo.png',
      url: 'https://www.adamabeverages.com',
    },
    {
      name: 'Toko Academy',
      logo: 'https://tokoacademy.org/logo/ta_logo_png.png',
      url: 'https://tokoacademy.org',
    },
    {
      name: 'Tent2School',
      logo: 'https://www.tent2school.org.ng/images/logo%20COPY.png',
      url: 'https://www.tent2school.org.ng',
    },
    {
      name: 'BrightNest Realty Ltd.',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhN7dHoSAkhkwrSyULwPvyWYoYttpz3AxVCw&s',
    },
    {
      name: 'Himaz Properties Ltd.',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1zwV42DCnyM3IjYpHhtFe0O7b7KAOSFh2g&s',
    },
  ],
  metaDescription: 'TEDxYola brings together bright minds and thought leaders in Yola, Adamawa to share ideas worth spreading.',
  organizerEmail: 'hello@tedxyola.com',
};
