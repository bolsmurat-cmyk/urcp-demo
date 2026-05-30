import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  title: 'URCP — USCEM Resource Control Platform',
  description: 'Inventory and resource management for USCEM Group',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'URCP' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F6E56',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={dmSans.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
