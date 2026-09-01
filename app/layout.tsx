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

const TITLE = 'Ijelekhai Faith Olohijere | Product Designer & Design Engineer'
const DESCRIPTION =
  'Product designer crafting thoughtful digital experiences while exploring AI and design engineering.'

export const metadata: Metadata = {
  // README.md documents this as the live production domain.
  metadataBase: new URL('https://snowolohijere.com'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: 'Faith Olohijere — Snow',
    // Reuses the existing About page portrait rather than a dedicated
    // og:image asset — the closest thing this site already has to a
    // "face" for link previews.
    images: ['/images/about/About%20Header%20Image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/about/About%20Header%20Image.png'],
  },
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
          {/* id targeted by Preloader.tsx to toggle `inert` while it's
              covering the screen — a plain, unstyled div, so it changes
              nothing about layout (Nav/ContextualCursor are both
              position:fixed, unaffected by their parent's box). */}
          <div id="site-content">
            <Nav />
            <ContextualCursor />
            <MagneticHover />
            <main>{children}</main>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
