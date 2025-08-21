'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifiedPage() {
  const params = useSearchParams();
  const router = useRouter();

  // Only redirect if ?next= is provided
  const nextUrl = useMemo(() => params.get('next'), [params]);

  useEffect(() => {
    // celebratory burst
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.3 } });

    // guard redirect
    let t: ReturnType<typeof setTimeout> | undefined;
    if (nextUrl) {
      t = setTimeout(() => router.push(nextUrl), 1800);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [router, nextUrl]);

  return (
    <main
      className="flex items-center justify-center min-h-screen px-4 text-slate-100"
      style={{
        background: 'radial-gradient(circle at center, #0B1324 0%, #0F172A 100%)'
      }}
    >
      {/* Background blobs */}
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
        className="relative w-full max-w-xl rounded-2xl bg-slate-800/80 backdrop-blur border border-white/10 shadow-xl p-8"
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
        <p className="mt-2 text-center text-slate-300">
          Your email is confirmed. Welcome to <span className="font-semibold">FridgeF</span>.
        </p>

        {/* Advisory only */}
        <p className="mt-6 text-center text-sm text-slate-400">
          To continue, open the FridgeF mobile app. If you don’t have it installed,
          download it from the App Store.
        </p>
      </motion.section>
    </main>
  );
}
