import type { Metadata } from 'next'
import './globals.css'
import '@/index.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Pizzaria Joy Feast',
  description: 'Delicious pizzas delivered hot and fresh',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
