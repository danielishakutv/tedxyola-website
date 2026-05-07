# Development Guide

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm package manager

### First Time Setup

1. **Clone and install**
```bash
cd "c:\Users\USER\Desktop\TEDxYola 2026\tedxyola.com"
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Open browser**
Navigate to http://localhost:5173

## Available Scripts

### Development
```bash
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Development Workflow

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Header.tsx`

### Adding New Components

1. Create component in appropriate directory:
   - `src/components/layout/` for layout components
   - `src/components/common/` for reusable components
   - `src/components/[feature]/` for feature-specific components

2. Use TypeScript interfaces for props
3. Export component as named export

### Styling Guidelines

- Use Tailwind CSS utility classes
- Mobile-first approach (start with mobile, add `md:` and `lg:` breakpoints)
- Use design tokens from `tailwind.config.js`
- Custom styles in `src/index.css` if needed

### Animation Guidelines

- Use Framer Motion for complex animations
- Use CSS transitions for simple hover effects
- Respect `prefers-reduced-motion` for accessibility
- Keep animations subtle and purposeful

## Code Style

### TypeScript
- Use explicit types for function parameters and return values
- Avoid `any` type
- Use interfaces for object shapes
- Use type aliases for unions and complex types

### React
- Use functional components with hooks
- Extract logic into custom hooks when reused
- Keep components small and focused
- Use composition over prop drilling

### Naming Conventions
- Components: PascalCase (e.g., `SpeakerCard.tsx`)
- Files: PascalCase for components, camelCase for utilities
- CSS classes: kebab-case or Tailwind utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

## Performance Tips

### Optimization Checklist
- [ ] Use lazy loading for routes (already implemented)
- [ ] Optimize images before adding to project
- [ ] Use React.memo() for expensive components
- [ ] Avoid unnecessary re-renders
- [ ] Use production build for testing performance

### Testing Performance
```bash
npm run build
npm run preview
# Open Chrome DevTools > Lighthouse
# Run performance audit
```

Target scores:
- Performance: > 90
- Accessibility: 100
- Best Practices: > 90
- SEO: > 90

## Debugging

### React DevTools
Install React Developer Tools browser extension

### TypeScript Errors
Check `tsconfig.json` if you encounter unexpected errors

### Vite Issues
- Clear cache: Delete `node_modules/.vite`
- Restart dev server

### Build Errors
- Check console for specific error messages
- Ensure all imports are correct
- Verify all dependencies are installed

## Common Tasks

### Update Dependencies
```bash
npm update
# or for major updates:
npm outdated
npm install [package]@latest
```

### Add New Dependency
```bash
npm install [package-name]
npm install -D [dev-dependency]
```

### Environment Variables
Create `.env` file in root:
```env
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# or change port
npm run dev -- --port 3000
```

### Module Not Found
```bash
npm install
# If still failing:
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check TypeScript errors
npx tsc --noEmit
```

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/guide/)
