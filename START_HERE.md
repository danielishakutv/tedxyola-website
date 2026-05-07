# 🎬 TEDxYola Website - START HERE!

## ⚡ Get Started in 3 Commands

```bash
# 1. Install dependencies (takes ~2 minutes)
npm install

# 2. Start the development server
npm run dev

# 3. Open your browser to http://localhost:5173
```

That's it! The website is now running on your machine. 🎉

---

## 📝 What to Update First

### 1. Event Details (MOST IMPORTANT)
**File:** `src/content/siteConfig.ts`

Update these lines:
```typescript
themeName: 'Ignite Tomorrow',           // ← Your 2026 theme
themeTagline: 'Sparking Ideas...',      // ← Your tagline
eventDate: 'May 15, 2026',              // ← Your date
ticketUrl: '#tickets',                   // ← Real ticket URL
```

### 2. Add Your Speakers
**File:** `src/content/speakers.ts`

Add speaker info and place photos in `public/images/speakers/`

### 3. Update Schedule
**File:** `src/content/program.ts`

Modify the event timeline

### 4. Add Gallery Photos
**File:** `src/content/gallery.ts`

Add images and place in `public/images/gallery/`

---

## 📁 File Structure (What You Need to Know)

```
tedxyola.com/
├── src/content/          ← EDIT THESE FILES!
│   ├── siteConfig.ts     ← Event details
│   ├── speakers.ts       ← Speaker info
│   ├── program.ts        ← Schedule
│   └── gallery.ts        ← Gallery
│
├── public/images/        ← PUT IMAGES HERE!
│   ├── speakers/         ← Speaker photos
│   └── gallery/          ← Event photos
│
└── src/                  ← Don't edit (unless customizing)
    ├── pages/            ← Page components
    └── components/       ← UI components
```

---

## 🎨 Common Customizations

### Change Theme Color
**File:** `tailwind.config.js`
```javascript
colors: {
  ted: {
    red: '#E62B1E',  // ← Change this
  },
}
```

### Update Social Links
**File:** `src/content/siteConfig.ts`
```typescript
socialLinks: {
  facebook: 'https://facebook.com/tedxyola',
  twitter: 'https://twitter.com/tedxyola',
  instagram: 'https://instagram.com/tedxyola',
  // ... update these
}
```

---

## 🚀 Ready to Deploy?

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy Options
- **Netlify** - Drag & drop the `dist/` folder
- **Vercel** - Connect GitHub repo
- **GitHub Pages** - Upload `dist/` contents

---

## 🆘 Troubleshooting

### Port already in use?
```bash
npm run dev -- --port 3000
```

### Dependencies failing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?
Restart VS Code or your editor

---

## 📚 Need More Help?

- 📖 **Full Documentation**: See `README.md`
- 💻 **Developer Guide**: See `DEVELOPMENT.md`
- 📊 **Project Summary**: See `SUMMARY.md`

---

## ✅ Pre-Launch Checklist

- [ ] Update event theme and date in `siteConfig.ts`
- [ ] Add speaker information and photos
- [ ] Update program schedule
- [ ] Add gallery images
- [ ] Set real ticket purchase URL
- [ ] Update social media links
- [ ] Test on mobile and desktop
- [ ] Verify all links work
- [ ] Test contact form

---

## 🎯 Quick Reference

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

**Ready to build something amazing?** 

Run `npm install` and `npm run dev` to get started! 🚀

---

**This independent TEDx event is operated under license from TED.**
