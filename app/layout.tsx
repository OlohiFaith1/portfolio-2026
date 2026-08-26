import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Nav } from '@/components/nav/Nav'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { ContextualCursor } from '@/components/interaction/ContextualCursor'
import { MagneticHover } from '@/components/interaction/MagneticHover'
import { Preloader } from '@/components/preloader/Preloader'

const geist = Geist({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  // TODO: replace with production domain once live
  metadataBase: new URL('https://example.com'),
  title: 'Ijelekhai Faith Olohijere | Product Designer & Design Engineer',
  description:
    'Product designer crafting thoughtful digital experiences while exploring AI and design engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Mounted once at the root so it guards the true first entry point
            into the site regardless of which route that is (not just `/`),
            and — via its own module-scoped "already played" guard — never
            replays on client-side navigation between routes. */}
        <Preloader />
        <SmoothScrollProvider>
          <Nav />
          <ContextualCursor />
          <MagneticHover />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
