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