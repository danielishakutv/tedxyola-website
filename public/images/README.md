# Image Assets

## Directory Structure

Place your images in the following directories:

### `/public/images/speakers/`
- Speaker headshots
- Recommended size: 800x800px (square)
- Format: JPG or PNG
- Naming convention: `speaker-name.jpg` or `speaker-name.png`

Example:
```
/public/images/speakers/
├── amina-abdullahi.jpg
├── chidi-okonkwo.jpg
└── fatima-hassan.jpg
```

### `/public/images/gallery/`
- Event photos
- Recommended size: 1920x1080px or larger
- Format: JPG (optimized for web)
- Naming convention: `event-year-description.jpg`

Example:
```
/public/images/gallery/
├── 2025-opening-ceremony.jpg
├── 2025-speaker-stage.jpg
└── 2025-audience.jpg
```

### `/public/images/`
- Logos, icons, and other assets
- Format: PNG, SVG preferred for logos

## Image Optimization Tips

1. **Compress images** before uploading (use TinyPNG, Squoosh, or similar)
2. **Use appropriate formats**:
   - JPG for photos
   - PNG for graphics with transparency
   - SVG for logos and icons
3. **Provide alt text** in content configuration files for accessibility
4. **Consider WebP** format for better compression (optional)

## Placeholder Images

Currently, the site uses placeholder references. Replace these with actual images:

1. Update speaker photos in `src/content/speakers.ts`
2. Update gallery images in `src/content/gallery.ts`
3. Add actual image files to the directories above
