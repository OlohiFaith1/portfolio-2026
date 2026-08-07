import type { Metadata } from 'next'
import { Pirata_One, Rethink_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { Nav } from '@/components/nav/Nav'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { NavigationProvider } from '@/components/providers/NavigationProvider'
import { NavigationDrawer } from '@/components/navigation/NavigationDrawer'
import { MenuHint } from '@/components/navigation/MenuHint'

const pirata = Pirata_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pirata',
  display: 'swap',
})

const rethink = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink',
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
    <html lang="en" className={`${pirata.variable} ${rethink.variable}`}>
      <body className="font-sans antialiased">
        <NavigationProvider>
          <SmoothScrollProvider>
            <Nav />
            <NavigationDrawer />
            <MenuHint />
            <main>{children}</main>
          </SmoothScrollProvider>
        </NavigationProvider>
      </body>
    </html>
  )
}
