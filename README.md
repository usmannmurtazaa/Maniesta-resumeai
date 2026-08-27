# Maniesta ResumeAI

**AI-powered resume builder with ATS optimization, daily job matching, secure Firebase backend, and a modern glassmorphism admin dashboard.**

Built with React, TypeScript, Vite, Firebase, Netlify Functions, and Gemini AI.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Version](https://img.shields.io/badge/version-1.0.0-orange)  

---

## 🚀 Overview

Maniesta ResumeAI is a production‑grade SaaS platform that helps users create, optimize, and export professional resumes. It combines an intuitive resume builder with a deterministic ATS scoring engine, AI‑powered content improvement, daily job discovery, and a complete admin dashboard.

**Live Demo:** [https://maniesta-resumeai.netlify.app](https://maniesta-resumeai.netlify.app)  
**Portfolio:** [https://usmanmurtaza.netlify.app](https://usmanmurtaza.netlify.app)  

---

## ✨ Features

### Resume Builder
- Create, edit, duplicate, and delete multiple resumes
- Drag‑and‑drop sections and entries (coming soon)
- Real‑time live preview
- Five professional templates (Modern, Classic, Creative, Tech, Elegant)
- Design customization: font family, size, spacing, color
- Autosave with debounced persistence
- Upload existing PDF/DOCX resumes and parse content (DOCX fully supported, PDF serverless)

### AI & ATS
- AI assistant for summaries, experience bullets, skills, and achievements
- AI suggestions are reviewable, with accept/reject/regenerate
- Strict factual integrity – AI never invents experience, metrics, or skills
- Deterministic ATS scoring engine
- Job description matching with matched/missing keywords
- ATS report with breakdown, recommendations, and warnings
- AI optimization for specific jobs

### Daily Jobs & Alerts
- Browse published jobs with search, filters, and featured section
- Save/bookmark jobs
- Job detail with application link, skills, qualifications
- Job preferences for personalized alerts
- Notification bell with unread count and new job count
- Personalized job notifications and deadline reminders (serverless functions)

### Admin Dashboard
- Dashboard overview with platform statistics
- User management: search, filter, user detail, resume counts
- Resume management: view user resumes, ATS scores
- ATS analysis history (if data model supports)
- Job management: create, edit, publish, schedule, feature, delete
- Analytics and admin search
- Secure admin authorization via Firebase custom claims

### Authentication
- Email/password login and signup
- Google authentication
- Password reset flow
- Protected routes and admin routes

---

## 🛠 Tech Stack

| Layer          | Technology |
|----------------|------------|
| Frontend       | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| State          | Zustand, Immer |
| Forms          | React Hook Form, Zod |
| Backend        | Netlify Functions |
| Database       | Firebase Firestore |
| Storage        | Firebase Storage |
| Authentication | Firebase Authentication |
| AI             | Google Gemini API |
| Testing        | Vitest, React Testing Library |

---

## 📂 Project Structure

```
src/
├── app/                 # App entry, routes, providers
├── components/          # Reusable UI and feature components
│   ├── admin/           # Admin dashboard components
│   ├── ai/              # AI action button and suggestion modal
│   ├── ats/             # ATS score and report components
│   ├── auth/            # Login/Signup forms, AuthSplitLayout
│   ├── common/          # ErrorBoundary, Logo, UserMenu, etc.
│   ├── dashboard/       # Dashboard cards, stats
│   ├── jobs/            # Job card, filters, detail, modals
│   ├── notifications/   # Notification bell and panel
│   ├── resume/          # Resume preview, section renderer
│   ├── settings/        # Job preferences form
│   ├── ui/              # Button, Input, Modal, Card, Badge, etc.
│   └── landing/         # Landing page components
├── hooks/               # Custom hooks (useAutosave, useDebouncedCallback)
├── layouts/             # AuthLayout, DashboardLayout, AdminLayout, BuilderLayout
├── pages/               # Route-level pages
├── services/            # Firebase, AI, jobs, notifications, parser, PDF
├── store/               # Zustand stores (auth, resume, job, notification, etc.)
├── templates/           # Resume templates (modern, classic, creative, tech, elegant)
├── types/               # TypeScript type definitions
├── utils/               # Utilities, validators, dateUtils, jobMatching
└── styles/              # global.css, print.css
netlify/functions/       # Serverless functions (AI, admin, jobs)
tests/                   # Unit and integration tests
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Google AI Studio API key (Gemini)
- Netlify account (for serverless functions and deployment)

### Installation

```bash
git clone https://github.com/usmannmurtazaa/Maniesta-resumeai.git
cd Maniesta-resumeai
npm install
```

### Environment Variables

Create `.env.local` in the root directory (or set in Netlify dashboard for production):

```env
# Frontend (public)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Server-side (Netlify Functions – secret)
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_SERVICE_ACCOUNT={"type":"service_account", ...}
```

> **Important:** Never commit real secrets to version control.

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** – Email/Password and Google sign-in.
3. Create a **Firestore Database**.
4. Enable **Storage**.
5. Download your service account JSON and set `FIREBASE_SERVICE_ACCOUNT` in Netlify environment variables as a stringified JSON.
6. Deploy Firestore and Storage security rules:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```
7. Create required composite indexes (see `firestore.indexes.json`).

### Google AI Studio (Gemini) Setup

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Create an API key.
3. Set `GEMINI_API_KEY` in Netlify environment variables.

### Running Locally

```bash
npm run dev
```

The app will run at `http://localhost:3000`.

For Netlify Functions locally:

```bash
netlify dev
```

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run typecheck and lint:

```bash
npm run typecheck
npm run lint
```

Build for production:

```bash
npm run build
```

---

## 🚢 Deployment

### Netlify

1. Push your code to GitHub.
2. Connect the repository in Netlify.
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add the environment variables listed above.
6. Deploy.

SPA redirects are already configured in `netlify.toml`.

### Firebase Admin Setup

To grant a user admin access, set a custom claim using Firebase Admin SDK:

```bash
firebase functions:shell
# or use a one-time script
```

Or via a secure serverless function.

---

## 👥 Author

**Usman Murtaza**  
Full‑Stack Developer & UI/UX Engineer

- Portfolio: [https://usmanmurtaza.netlify.app](https://usmanmurtaza.netlify.app)
- GitHub: [https://github.com/usmannmurtazaa](https://github.com/usmannmurtazaa)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Icons: custom SVG system
- AI: Google Gemini

---

Feel free to reach out via the portfolio link for any questions or collaboration.