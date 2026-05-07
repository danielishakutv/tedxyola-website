# TEDxYola Website - Quick Start Guide

Welcome! This guide will help you get the TEDxYola website up and running in minutes.

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
Open a terminal in this directory and run:

```bash
npm install
```

This will download all required packages (React, Tailwind CSS, etc.)

### Step 2: Start Development Server
```bash
npm run dev
```

The website will open at: **http://localhost:5173**

### Step 3: Make It Yours
Edit these files to customize for your event:

**Update Event Details** (`src/content/siteConfig.ts`)
- Theme name and tagline
- Event date and venue
- Ticket URL
- Social media links

**Add Speakers** (`src/content/speakers.ts`)
- Add speaker information
- Place photos in `public/images/speakers/`

**Update Program** (`src/content/program.ts`)
- Update event schedule
- Modify times and sessions

**Add Photos** (`src/content/gallery.ts`)
- Add gallery images
- Place photos in `public/images/gallery/`

## 📝 First-Time Changes Checklist

Before launching, update these:

- [ ] Update theme name in `src/content/siteConfig.ts`
- [ ] Set event date and venue
- [ ] Add real ticket purchase URL
- [ ] Update social media links
- [ ] Add speaker information and photos
- [ ] Update program schedule
- [ ] Add gallery images from previous events
- [ ] Test contact form
- [ ] Update email addresses

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  ted: {
    red: '#E62B1E',  // Change to your accent color
  },
}
```

### Add New Page
1. Create file in `src/pages/`
2. Add route in `src/App.tsx`
3. Add link in header navigation

## 📦 Build for Production

When ready to deploy:

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## 🆘 Need Help?

**Common Issues:**

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
npm install --legacy-peer-deps
```

**TypeScript errors?**
- Check that all imports are correct
- Restart VS Code

## 📚 Full Documentation

- **README.md** - Complete project documentation
- **DEVELOPMENT.md** - Developer guide
- **File Structure** - See below

## 📁 Key Files to Know

```
src/
├── content/           ← Update these for your event!
│   ├── siteConfig.ts  ← Event details, theme, dates
│   ├── speakers.ts    ← Speaker information
│   ├── program.ts     ← Event schedule
│   └── gallery.ts     ← Gallery images
├── pages/             ← Page components (don't need to edit often)
├── components/        ← UI components (don't need to edit often)
└── index.css          ← Global styles
```

## 🎯 Next Steps

1. ✅ Install and run the project
2. ✅ Update `siteConfig.ts` with your event details
3. ✅ Add speaker information
4. ✅ Update program schedule
5. ✅ Add your images
6. ✅ Test on mobile and desktop
7. ✅ Deploy to web hosting

## 🌐 Deploy (When Ready)

**Netlify** (Recommended)
1. Push code to GitHub
2. Import project to Netlify
3. Deploy automatically

**Vercel**
1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

---

**Questions?** Read the full README.md or reach out to your development team.

**Ready to start?** Run `npm install` then `npm run dev` 🚀
