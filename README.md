# Preethika Suresh — Cinematic Developer Portfolio

A personal portfolio website for **Preethika Suresh**, an Electronics and Communication Engineering student at Kalaignar Karunanidhi Institute of Technology (Class of 2029).

Built with **Next.js (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, and **Framer Motion**.

---

## Key Features

1. **Cinematic Eye Opening Sequence**:
   - Signature introductory animation beginning with an ultra close-up crop of Preethika's eye.
   - Organic aperture iris expansion and camera pull-out using GSAP timelines.
   - Smooth transition into the full editorial portrait and staggered typography reveal.
   - Instant "Skip Intro" control and zero-zoom fallback for `prefers-reduced-motion`.
2. **Editorial Typography & Visual Storytelling**:
   - Fluid typography blending *Instrument Serif* for oversized headlines and *Inter* for modern UI.
   - Curated palette: editorial light background (`#F8F8F5`), rich charcoal text (`#171717`), soft sage accent (`#A7C7B5`), warm sand (`#D8B8A5`), and dark cinematic contrast sections (`#151515`).
3. **Interactive Technology Matrix**:
   - Categorized skills across Programming, Web Development, Database & Backend, and Electronics/Engineering.
   - Real-time interactive technology inspector displaying verified project scope without fabricated percentage bars.
4. **Curated Engineering Projects & Technical Blueprints**:
   - Showcases 8 distinct projects across AgTech, Systems Programming, Data Structures, and Embedded IoT.
   - Custom SVG generative technical blueprints and circuit schematics.
   - Accessible project detail modal with problem statements, architecture, and GitHub links.
5. **Continuous Scroll Storytelling & Animated Timeline**:
   - SVG progressive line-drawing timeline illustrating academic and technical milestones.
   - Live ScrollSpy navigation pill and top viewport reading progress indicator.
6. **Validated Communication Pipeline**:
   - One-click email copy with visual feedback.
   - Schema-validated contact form with client & server Zod validation, honeypot anti-spam, and confetti celebration.

---

## Getting Started

### Prerequisites

- **Node.js**: v18.18 or higher (tested on Node v25)
- **npm** or **pnpm**

### Installation

```bash
git clone <repository-url>
cd Portfolio-Preethi
npm install
```

### Development Server

Run the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Verify TypeScript strict types and create an optimized production bundle:

```bash
npm run build
npm run start
```

### Code Quality & Linting

```bash
npm run lint
```

---

## Customization & Configuration

### 1. Replacing or Updating the Hero Portrait

The high-resolution portrait is stored in:
- `public/images/preethika-portrait.png`

To update the portrait:
1. Replace `public/images/preethika-portrait.png` with your new image.
2. If the filename or location changes, update `portraitPath` in `src/data/portfolioData.ts`.

### 2. Adjusting the Eye Focal Point

The eye coordinates are configured in `src/data/portfolioData.ts`:

```typescript
export const eyeConfig: EyeConfig = {
  eyeFocusX: 47.0, // Horizontal percentage of the eye (0 to 100)
  eyeFocusY: 44.0, // Vertical percentage of the eye (0 to 100)
  eyeZoom: 4.8,    // Scale factor for the close-up aperture crop
  heroObjectPosition: '50% 36%', // CSS object-position for hero frame
  portraitPath: '/images/preethika-portrait.png',
};
```

Adjust `eyeFocusX` and `eyeFocusY` based on facial landmarks to precisely frame either eye.

### 3. Adding or Updating Projects

All projects are strongly typed in `src/data/portfolioData.ts`:

```typescript
export const projectsData: Project[] = [
  {
    id: 'your-project-id',
    number: '09',
    title: 'Project Title',
    category: 'Software Development',
    status: 'Implemented Software',
    tagline: 'One-line summary of the system.',
    description: 'Detailed description of the problem and engineering approach.',
    features: ['Key feature 1', 'Key feature 2'],
    technologies: ['C++', 'Next.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/preethika2925/project',
    problemStatement: 'What challenge did this project address?',
    solutionArchitecture: 'How was the technical solution designed?',
    visualTheme: 'emerald',
  },
  // ...
];
```

### 4. Updating Personal Information

Update `profileData` in `src/data/portfolioData.ts`:
- Name, degree, institution, and graduation year
- Bio headline and paragraphs
- Email, LinkedIn, and GitHub profile URLs

### 5. Connecting a Real Email Service (e.g. Resend / SendGrid)

The contact form is hooked to the API route at `src/app/api/contact/route.ts`. To dispatch emails to your inbox via Resend:

1. Install Resend: `npm install resend`
2. Add your API key in `.env.local`: `RESEND_API_KEY=re_123456789`
3. In `src/app/api/contact/route.ts`, import `Resend` and send:

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Portfolio Contact <onboarding@resend.dev>',
  to: 'preethikasuresh25@gmail.com',
  subject: `[Portfolio Inquiry] ${subject}`,
  text: `From: ${name} (${email})\n\n${message}`,
});
```

---

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. The Next.js framework preset will automatically detect the build settings (`npm run build`).
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain for canonical SEO tags.

---

## License

Crafted for **Preethika Suresh**. All rights reserved.
