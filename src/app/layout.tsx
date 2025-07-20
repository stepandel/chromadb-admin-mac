import ReactQueryProvider from '@/app/ReactQueryProvider'

import './globals.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chromadb Admin',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head suppressHydrationWarning />
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
