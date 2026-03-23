# 🚀 PannnTastic Portfolio

[![CI/CD Pipeline](https://github.com/PannnTastic/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/PannnTastic/portfolio/actions/workflows/deploy.yml)
[![Vercel](https://img.shields.io/badge/Vercel-Live-black?logo=vercel)](https://my-portfolio-re0u8h071-pannntastics-projects.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

> A stunning 3D portfolio website built with Next.js, Three.js, and Tailwind CSS.

![Portfolio Preview](./public/preview.png)

## 🔗 Live Demo

**🌐 [https://my-portfolio-re0u8h071-pannntastics-projects.vercel.app](https://my-portfolio-re0u8h071-pannntastics-projects.vercel.app)**

## ✨ Features

- 🎨 **Modern 3D Animations** - Interactive particle background with Three.js
- 🌙 **Dark/Light Mode** - Toggle between themes with next-themes
- ⚡ **Fast Performance** - Optimized with Next.js 14 App Router
- 📱 **Fully Responsive** - Looks great on all devices
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🎯 **TypeScript** - Type-safe codebase
- 🎨 **Tailwind CSS** - Utility-first styling
- 🔗 **GitHub Integration** - Real-time repository data fetching
- 📝 **Contact Form** - With validation and toast notifications
- 🚀 **CI/CD Pipeline** - Auto-deploy with GitHub Actions

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **3D Graphics:** [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Deployment:** [Vercel](https://vercel.com/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PannnTastic/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
```

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflow Stages:
1. **🔍 Lint & Type Check** - Validates code quality
2. **🏗️ Build Test** - Ensures build succeeds
3. **🚀 Deploy Preview** - For pull requests (preview URL)
4. **🚀 Deploy Production** - For main branch (production URL)

### Automatic Deployment:
- ✅ **Push to `main`** → Auto-deploy to Production
- ✅ **Pull Request** → Deploy Preview URL for testing
- ✅ **Merge PR** → Auto-deploy to Production

### Setup GitHub Secrets:

To enable CI/CD, add these secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `VERCEL_TOKEN` - Your Vercel token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

Get these values from:
```bash
npx vercel login
npx vercel link
# Then check .vercel/project.json
```

## 📝 Customization

### Update Personal Information

Edit `src/lib/data.ts` to update your:
- Name and title
- Bio and location
- Social links
- Skills and experience
- Education

### Update GitHub Username

Change the GitHub username in `src/hooks/useGitHub.ts`:
```typescript
const GITHUB_USERNAME = "PannnTastic"; // Change to your username
```

### Update Colors

The primary color scheme uses indigo and purple gradients. Customize in:
- `tailwind.config.ts` - Update color palette
- `src/app/globals.css` - Update CSS variables

## 📁 Project Structure

```
my-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
├── src/
│   ├── app/
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   ├── api/              # API routes
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/           # Reusable components
│   │   ├── ParticlesBackground.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── hooks/                # Custom hooks
│   │   └── useGitHub.ts
│   └── lib/
│       ├── data.ts           # Personal data
│       ├── github-types.ts   # TypeScript types
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── dist/                     # Build output
└── README.md
```

## 🎨 Sections

1. **Hero** - 3D animated introduction with GitHub stats
2. **About** - Personal bio, education (UMY), and experience
3. **Skills** - Technical skills with focus on Backend & ML
4. **Projects** - Featured GitHub projects with live data
5. **Contact** - Contact form and social links

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy is using Vercel:

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Auto-deploy enabled!

### Manual Deploy

```bash
npm i -g vercel
vercel --prod
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 About Me

**Ahmad Alfan Alfian Irfan** - Information Technology Student at Universitas Muhammadiyah Yogyakarta

- 🎓 Currently studying Information Technology (2023 - Present)
- 🔧 Focus: Backend Development & Machine Learning
- 🌐 Location: Yogyakarta, Indonesia

### Connect with me:

- GitHub: [@PannnTastic](https://github.com/PannnTastic)
- LinkedIn: [PannnTastic](https://linkedin.com/in/pannntastic)
- Twitter: [@PannnTastic](https://twitter.com/pannntastic)

---

<p align="center">
  Made with ❤️ by PannnTastic
</p>
