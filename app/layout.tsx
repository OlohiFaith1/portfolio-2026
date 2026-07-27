import type { Metadata } from 'next'
import { Pirata_One, Rethink_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { Nav } from '@/components/nav/Nav'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'

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
  title: 'Ijelekhai Faith Olohijere',
  description:
    'I design digital products that are simple to use and enjoyable to interact with.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pirata.variable} ${rethink.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <Nav />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
