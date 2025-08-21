# Project: fridgef-verified (Next.js + Tailwind + Framer Motion)
# Use this repo on Vercel. Includes animated, polished /verified page with auto-redirect support via ?next=.

# ==========================
# package.json
# ==========================
{
  "name": "fridgef-verified",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.3",
    "framer-motion": "^11.0.0",
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.5",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.5.4"
  }
}

# ==========================
# next.config.js
# ==========================
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
}
module.exports = nextConfig

# ==========================
# postcss.config.js
# ==========================
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

# ==========================
# tailwind.config.js
# ==========================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        card: '#111827',
        brand: '#3b82f6'
      },
      boxShadow: {
        soft: '0 20px 50px rgba(0,0,0,0.45)'
      }
    },
  },
  plugins: [],
}


# ==========================
# app/globals.css
# ==========================
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0f172a;
}
html, body { height: 100%; }
body { background: radial-gradient(1200px 600px at 8% 10%, #0b1227 0%, var(--bg) 60%); }

/* Subtle shimmer for buttons */
.button-shimmer { position: relative; overflow: hidden; }
.button-shimmer::after {
  content: '';
  position: absolute;
  top: -100%; left: -50%;
  width: 200%; height: 300%;
  background: linear-gradient(60deg, transparent, rgba(255,255,255,0.08), transparent);
  transform: rotate(10deg);
  animation: shimmer 3s linear infinite;
}
@keyframes shimmer { 0% { transform: translateX(-100%) rotate(10deg); } 100% { transform: translateX(100%) rotate(10deg); } }

/* Floating animation for images */
@keyframes floaty { 0%{ transform: translateY(0px);} 50%{ transform: translateY(-8px);} 100%{ transform: translateY(0px);} }
.floaty { animation: floaty 6s ease-in-out infinite; }

# ==========================
# app/layout.tsx
# ==========================
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Verified • FridgeF',
  description: 'Your email has been verified. Welcome to FridgeF.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-100">{children}</body>
    </html>
  )
}

# ==========================
# app/verified/page.tsx
# ==========================
'use client'

import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'

export default function VerifiedPage() {
  const params = useSearchParams()
  const router = useRouter()
  const nextUrl = useMemo(() => params.get('next') || '/login', [params])

  useEffect(() => {
    // celebratory burst
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.3 } })

    // timed redirect if next is supplied
    const t = setTimeout(() => { router.push(nextUrl) }, 1800)
    return () => clearTimeout(t)
  }, [router, nextUrl])

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-bg">
      {/* Background animated blobs */}
      <motion.div
        className="absolute -z-10 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(closest-side, #3b82f6, transparent)' }}
        initial={{ x: -200, y: -120, scale: 0.9 }}
        animate={{ x: -120, y: -60, scale: 1.05 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className="absolute -z-10 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(closest-side, #22d3ee, transparent)' }}
        initial={{ x: 220, y: 140, scale: 0.9 }}
        animate={{ x: 140, y: 80, scale: 1.05 }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Card */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-xl rounded-2xl bg-card/80 backdrop-blur border border-white/10 shadow-soft p-8"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -6 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 130, damping: 10 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/30"
        >
          <span className="text-2xl">✅</span>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-semibold text-center">Email verified</h1>
        <p className="mt-2 text-center text-slate-300">Your email is confirmed. Welcome to <span className="font-semibold">FridgeF</span>.</p>

        {/* Motion image strip */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <motion.div whileHover={{ scale: 1.03 }} className="overflow-hidden rounded-xl border border-white/10">
            <Image
              className="floaty"
              src="https://images.unsplash.com/photo-1517959105821-eaf2591984a0?q=80&w=1200&auto=format&fit=crop"
              alt="Fresh ingredients"
              width={600}
              height={400}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="overflow-hidden rounded-xl border border-white/10">
            <Image
              className="floaty"
              src="https://images.unsplash.com/photo-1543352634-8730c3b1f1dc?q=80&w=1200&auto=format&fit=crop"
              alt="Kitchen prep"
              width={600}
              height={400}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="overflow-hidden rounded-xl border border-white/10">
            <Image
              className="floaty"
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
              alt="Healthy bowl"
              width={600}
              height={400}
            />
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <motion.a
            href={nextUrl}
            whileTap={{ scale: 0.98 }}
            className="button-shimmer rounded-xl bg-brand px-5 py-3 font-semibold text-white"
            aria-label="Go to app"
          >
            Continue to app
          </motion.a>
          <a
            href="/signup"
            className="rounded-xl border border-white/20 px-5 py-3 text-slate-200 hover:bg-white/5"
            aria-label="Create an account"
          >
            Create account
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">You’ll be redirected automatically. If not, use the button above.</p>
      </motion.section>
    </main>
  )
}

# ==========================
# .gitignore
# ==========================
.next/
node_modules/
.DS_Store
.env

# ==========================
# tsconfig.json
# ==========================
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "es2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "forceConsistentCasingInFileNames": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

# ==========================
# README.md (quick deploy)
# ==========================
# FridgeF Verified Page

A polished, animated email verification landing page for **fridge.app** (brand name: FridgeF).

## Quick Start

```bash
# 1) Install deps
npm i

# 2) Run locally
npm run dev

# 3) Deploy to Vercel
# – push to GitHub first, then import the repo in Vercel
```

## URL Behavior
- Page lives at `/verified`.
- Supports `?next=/login` (auto-redirect in ~1.8s).

## Common build fixes (CI)
- Ensure `tsconfig.json` exists (included here).
- Tailwind uses `tailwind.config.js` to avoid ts-node issues on CI.
- If you renamed the repo, no config changes are needed.

## Customization
- Replace image URLs in `app/verified/page.tsx` with your assets.
- Update brand colors in `tailwind.config.js`. 
