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