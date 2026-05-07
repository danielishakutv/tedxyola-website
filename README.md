# TEDxYola Website

A modern, mobile-first website for TEDxYola events built with React, TypeScript, Vite, and Tailwind CSS. Features stunning animations, accessibility-first design, and optimized performance.

![TEDxYola](https://img.shields.io/badge/TED-TEDxYola-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Design
- **Mobile-First**: Fully responsive design optimized for all devices
- **TED-Inspired**: Bold typography, high contrast, clean layout with TED red accent (#E62B1E)
- **Smooth Animations**: Framer Motion powered transitions and scroll-based effects
- **Accessibility**: WCAG compliant with keyboard navigation, ARIA labels, and reduced-motion support

### 🚀 Performance
- **Code Splitting**: Route-based lazy loading for optimal bundle sizes
- **Optimized Images**: Lazy loading with proper srcset support
- **Fast Load Times**: Minimal dependencies and efficient React patterns
- **SEO Ready**: Per-page meta tags, Open Graph, and Twitter cards

### 📱 Pages
- **Home**: Hero section with animated background, featured speakers, program teaser, and gallery preview
- **Theme**: Detailed theme explanation with guiding principles
- **Speakers**: Grid of speakers with modal details
- **Program**: Interactive timeline of event schedule
- **Gallery**: Filterable image gallery with lightbox
- **Contact**: Contact form with validation
- **Watch**: Video gallery of past talks

### 🛠 Tech Stack
- React 18.2 with TypeScript
- Vite for blazing-fast development
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- React Router for navigation
- React Hook Form + Zod for form validation
- Lucide React for icons

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## 📁 Project Structure

```
tedxyola.com/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout
│   │   ├── common/          # Reusable components (Section)
│   │   ├── home/            # Home page components
│   │   ├── speakers/        # Speaker components
│   │   ├── program/         # Program components
│   │   ├── gallery/         # Gallery components
│   │   └── contact/         # Contact form
│   ├── content/             # Content configuration files
│   │   ├── siteConfig.ts    # Site-wide settings
│   │   ├── speakers.ts      # Speaker data
│   │   ├── program.ts       # Event schedule
│   │   └── gallery.ts       # Gallery images
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── ThemePage.tsx
│   │   ├── SpeakersPage.tsx
│   │   ├── ProgramPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── WatchPage.tsx
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎯 Updating Content

### Yearly Theme Update

Edit `/src/content/siteConfig.ts`:

```typescript
export const siteConfig: SiteConfig = {
  eventName: 'TEDxYola',
  themeName: 'Your New Theme 2027',          // ← Update this
  themeTagline: 'Your theme tagline',        // ← Update this
  eventDate: 'May 15, 2027',                 // ← Update this
  eventYear: 2027,                           // ← Update this
  venue: {
    name: 'Yola International Conference Center',
    address: 'TBD',
    city: 'Yola',
    state: 'Adamawa',
    country: 'Nigeria',
  },
  ticketUrl: '#tickets',                     // ← Update with real URL
  socialLinks: {
    facebook: 'https://facebook.com/tedxyola',
    twitter: 'https://twitter.com/tedxyola',
    instagram: 'https://instagram.com/tedxyola',
    linkedin: 'https://linkedin.com/company/tedxyola',
    youtube: 'https://youtube.com/@tedxyola',
    email: 'hello@tedxyola.com',
  },
  metaDescription: 'TEDxYola brings together bright minds...',
  organizerEmail: 'hello@tedxyola.com',
};
```

### Adding Speakers

Edit `/src/content/speakers.ts`:

```typescript
export const speakers: Speaker[] = [
  {
    id: 'unique-id',
    name: 'Speaker Name',
    title: 'Their Title',
    company: 'Company Name',
    photo: '/images/speakers/speaker-name.jpg',  // ← Add image here
    talkTitle: 'Talk Title',
    talkSummary: 'Brief summary of the talk...',
    bio: 'Full biography...',
    socialLinks: {
      twitter: 'https://twitter.com/handle',
      linkedin: 'https://linkedin.com/in/handle',
      website: 'https://website.com',
    },
  },
  // Add more speakers...
];
```

### Updating Program Schedule

Edit `/src/content/program.ts`:

```typescript
export const program: ProgramItem[] = [
  {
    id: 'item-1',
    time: '09:00 AM',
    title: 'Session Title',
    type: 'talk', // 'talk' | 'performance' | 'break' | 'networking' | 'opening' | 'closing'
    description: 'Session description...',
    speaker: 'Speaker Name', // Optional
    duration: '18 minutes',
  },
  // Add more items...
];
```

### Adding Gallery Images

Edit `/src/content/gallery.ts`:

```typescript
export const galleryImages: GalleryImage[] = [
  {
    id: 'img-1',
    src: '/images/gallery/image-1.jpg',  // ← Add image to public/images/gallery/
    alt: 'Image description',
    category: 'event', // 'event' | 'speakers' | 'venue' | 'audience' | 'performance'
    year: 2026,
  },
  // Add more images...
];
```

## 🖼 Adding Images

1. **Speaker Photos**: Place in `public/images/speakers/`
   - Recommended size: 800x800px (square)
   - Format: JPG or PNG

2. **Gallery Images**: Place in `public/images/gallery/`
   - Recommended size: 1920x1080px or larger
   - Format: JPG (optimized for web)

3. **Logos/Icons**: Place in `public/images/`

## 🎨 Customizing Theme Colors

Edit `/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      ted: {
        red: '#E62B1E',  // Main TED red
        black: '#000000',
        white: '#FFFFFF',
      },
      // Add custom theme accent colors here
    },
  },
}
```

## 🔧 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant updates during development. Just save your files and see changes immediately.

### TypeScript
All components are fully typed. The editor will provide autocomplete and catch errors early.

### Component Organization
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into custom hooks

### Performance
- Images are lazy-loaded by default
- Routes are code-split automatically
- Use React DevTools Profiler to identify bottlenecks

## 📱 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

## 🧪 Testing Checklist

Before going live, verify:

- [ ] All pages load correctly
- [ ] Navigation works on mobile and desktop
- [ ] Forms validate properly
- [ ] Images load and display correctly
- [ ] Links to social media work
- [ ] Ticket purchase link is correct
- [ ] Contact form submission works
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader compatible
- [ ] Performance: Lighthouse score > 90
- [ ] SEO: meta tags are correct
- [ ] Mobile responsiveness on various devices

## 📄 License

This project is an independently organized TEDx event website, operated under license from TED.

## 🤝 Contributing

For improvements or bug fixes:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Email: hello@tedxyola.com
- GitHub Issues: [Create an issue](https://github.com/tedxyola/website/issues)

## 🙏 Credits

Built with ❤️ for TEDxYola

**Technologies:**
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)

---

**Note**: This independent TEDx event is operated under license from TED.
