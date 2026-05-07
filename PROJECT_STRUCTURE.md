# TEDxYola Website - Complete File Structure

```
c:\Users\USER\Desktop\TEDxYola 2026\tedxyola.com\
│
├── 📄 Configuration Files
│   ├── package.json                    # Dependencies and scripts
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── tsconfig.node.json              # TypeScript for Vite config
│   ├── vite.config.ts                  # Vite build configuration
│   ├── tailwind.config.js              # Tailwind CSS customization
│   ├── postcss.config.js               # PostCSS configuration
│   ├── .eslintrc.cjs                   # ESLint rules
│   ├── .prettierrc                     # Prettier formatting rules
│   └── .gitignore                      # Git ignore patterns
│
├── 📚 Documentation Files
│   ├── START_HERE.md                   # ⭐ BEGIN HERE - Quick start
│   ├── QUICKSTART.md                   # Quick start guide
│   ├── README.md                       # Full documentation
│   ├── DEVELOPMENT.md                  # Developer guide
│   ├── SUMMARY.md                      # Project summary
│   └── PROJECT_STRUCTURE.md            # This file
│
├── 🌐 HTML Entry
│   └── index.html                      # Main HTML file
│
├── 🖼️ Assets & Logos
│   ├── logo-black.png                  # TEDxYola logo (black version)
│   └── logo-white.png                  # TEDxYola logo (white version)
│
├── 📁 public/                          # Static assets (served as-is)
│   └── images/
│       ├── README.md                   # Image directory guide
│       ├── speakers/
│       │   └── .gitkeep                # Speaker photos go here (800x800px)
│       └── gallery/
│           └── .gitkeep                # Event photos go here (1920x1080px)
│
├── 🎨 src/                             # Source code
│   │
│   ├── 🚀 Core Files
│   │   ├── main.tsx                    # Application entry point
│   │   ├── App.tsx                     # Main app with routing
│   │   ├── index.css                   # Global styles & Tailwind
│   │   └── vite-env.d.ts               # Vite TypeScript definitions
│   │
│   ├── 📝 content/                     # ⭐ EDIT THESE FOR YOUR EVENT
│   │   ├── siteConfig.ts               # Event details, theme, dates, venue
│   │   ├── speakers.ts                 # Speaker information & bios
│   │   ├── program.ts                  # Event schedule & timeline
│   │   └── gallery.ts                  # Gallery image metadata
│   │
│   ├── 📄 pages/                       # Page components
│   │   ├── Home.tsx                    # Home page (hero, featured content)
│   │   ├── ThemePage.tsx               # Theme explanation page
│   │   ├── SpeakersPage.tsx            # Speakers listing page
│   │   ├── ProgramPage.tsx             # Program schedule page
│   │   ├── GalleryPage.tsx             # Photo gallery page
│   │   ├── ContactPage.tsx             # Contact form page
│   │   └── WatchPage.tsx               # Video gallery page
│   │
│   └── 🧩 components/                  # Reusable UI components
│       │
│       ├── layout/                     # Layout components
│       │   ├── Header.tsx              # Site header with navigation
│       │   ├── Footer.tsx              # Site footer
│       │   └── Layout.tsx              # Main layout wrapper
│       │
│       ├── common/                     # Common/shared components
│       │   └── Section.tsx             # Section wrapper with animations
│       │
│       ├── home/                       # Home page components
│       │   ├── Hero.tsx                # Hero section with parallax
│       │   ├── AboutSection.tsx        # About TEDxYola section
│       │   ├── ThemeHighlight.tsx      # Theme highlight card
│       │   └── FeaturedSpeakers.tsx    # Featured speakers carousel
│       │
│       ├── speakers/                   # Speaker-related components
│       │   ├── SpeakerCard.tsx         # Individual speaker card
│       │   ├── SpeakerGrid.tsx         # Speaker grid layout
│       │   └── SpeakerModal.tsx        # Speaker detail modal
│       │
│       ├── program/                    # Program/schedule components
│       │   └── ProgramTimeline.tsx     # Event timeline component
│       │
│       ├── gallery/                    # Gallery components
│       │   ├── GalleryGrid.tsx         # Image grid with filtering
│       │   └── Lightbox.tsx            # Image lightbox viewer
│       │
│       └── contact/                    # Contact components
│           └── ContactForm.tsx         # Contact form with validation
│
└── 🛠️ .vscode/                        # VS Code settings
    ├── settings.json                   # Editor settings
    └── extensions.json                 # Recommended extensions

```

## 📊 File Count Summary

- **Total Files**: ~60 files
- **Pages**: 7 pages
- **Components**: 17 components
- **Content Files**: 4 config files
- **Documentation**: 6 guides

## 🎯 Key Files to Edit

### For Each New Event:

1. **`src/content/siteConfig.ts`** - Theme, dates, venue
2. **`src/content/speakers.ts`** - Speaker lineup
3. **`src/content/program.ts`** - Schedule
4. **`src/content/gallery.ts`** - Photos

### For Customization:

5. **`tailwind.config.js`** - Colors, fonts
6. **`src/index.css`** - Custom styles

### Static Assets:

7. **`public/images/speakers/`** - Speaker photos
8. **`public/images/gallery/`** - Event photos

## 📦 Build Output

When you run `npm run build`, a `dist/` folder is created:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Main JavaScript bundle
│   ├── react-vendor-[hash].js    # React vendor bundle
│   ├── framer-motion-[hash].js   # Animation bundle
│   └── index-[hash].css     # Compiled CSS
└── images/
    └── (copied from public/)
```

## 🔍 Component Hierarchy

```
App
└── Layout
    ├── Header
    │   └── Navigation Menu
    │
    ├── Pages (Routes)
    │   ├── Home
    │   │   ├── Hero
    │   │   ├── AboutSection
    │   │   ├── ThemeHighlight
    │   │   └── FeaturedSpeakers
    │   │
    │   ├── ThemePage
    │   │   └── Section
    │   │
    │   ├── SpeakersPage
    │   │   ├── SpeakerGrid
    │   │   │   └── SpeakerCard
    │   │   └── SpeakerModal
    │   │
    │   ├── ProgramPage
    │   │   └── ProgramTimeline
    │   │
    │   ├── GalleryPage
    │   │   ├── GalleryGrid
    │   │   └── Lightbox
    │   │
    │   ├── ContactPage
    │   │   └── ContactForm
    │   │
    │   └── WatchPage
    │
    └── Footer
```

## 🚀 Development Workflow

```
1. Edit content files → 2. Add images → 3. npm run dev → 4. Test → 5. npm run build → 6. Deploy
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are mobile-first!

## 🎨 Design System

### Colors
- **Primary**: TED Red (#E62B1E)
- **Background**: Black (#000000)
- **Text**: White (#FFFFFF)

### Typography
- **Display**: Space Grotesk
- **Body**: Inter

### Spacing Scale
- 4px, 8px, 16px, 24px, 32px, 48px, 64px

## 🔗 Important Links

- **Start Here**: `START_HERE.md`
- **Full Docs**: `README.md`
- **Dev Guide**: `DEVELOPMENT.md`
