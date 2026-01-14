import { Libre_Baskerville, Lora, IBM_Plex_Mono } from 'next/font/google'

import { Providers } from '@/components/providers'
import '@workspace/ui/globals.css'

const fontSans = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
})

const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
})

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
