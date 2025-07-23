import '@/app/global.css'
import type { PropsWithChildren } from 'react'

import { RootProvider } from 'fumadocs-ui/provider'
import { Inter } from 'next/font/google'

import { SearchDialog } from '@/components/search'

const inter = Inter({
  subsets: ['latin'],
})

const Layout = ({ children }: PropsWithChildren) => (
  <html className={inter.className} lang="en" suppressHydrationWarning>
    <head>
      <link href="https://github.com/moeru-ai.png" rel="icon" type="image/png" />
    </head>
    <body className="flex flex-col min-h-screen">
      <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
    </body>
  </html>
)

export default Layout
