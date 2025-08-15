# Manizili Next.js Project

A minimal, production-ready Next.js project built with TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ⚡ **Next.js 14+** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- ✨ **Framer Motion** for animations
- 📱 **Responsive design** with mobile-first approach
- 🚀 **Production optimized** with best practices
- 🔍 **SEO optimized** with proper meta tags
- ♿ **Accessibility** focused
- 📦 **Zero configuration** deployment ready

## Tech Stack

- **Framework**: Next.js 14.0.4
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.0
- **Animations**: Framer Motion 10.16.16
- **Font**: Inter (Google Fonts)
- **Linting**: ESLint with Next.js config

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone or download** the project files to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
manizili/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── public/                 # Static assets
├── .eslintrc.json         # ESLint configuration
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Customization

### Colors and Theme
Edit `tailwind.config.js` to customize colors, fonts, and animations.

### Animations
Modify the Framer Motion animations in `app/page.tsx` to create different effects.

### Styling
Update `app/globals.css` for custom CSS or modify Tailwind classes in components.

## Deployment

This project is ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting platform**

### Build for Production

```bash
npm run build
npm run start
```

## Performance Features

- ✅ **Image optimization** with Next.js Image component
- ✅ **Font optimization** with Google Fonts
- ✅ **Code splitting** and lazy loading
- ✅ **Minification** and compression
- ✅ **Tree shaking** for unused code removal

## Accessibility Features

- ✅ **Semantic HTML** structure
- ✅ **ARIA labels** and roles
- ✅ **Keyboard navigation** support
- ✅ **Screen reader** friendly
- ✅ **Color contrast** compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using modern web technologies
