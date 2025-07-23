import '@/app/global.css'
import type { PropsWithChildren } from 'react'

import { RootProvider } from 'fumadocs-ui/provider'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

const Layout = ({ children }: PropsWithChildren) => (
  <html className={inter.className} lang="en" suppressHydrationWarning>
    <body className="flex flex-col min-h-screen">
      <RootProvider>{children}</RootProvider>
    </body>
  </html>
)

export default Layout
