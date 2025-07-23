import type { PropsWithChildren } from 'react'

import { HomeLayout } from 'fumadocs-ui/layouts/home'

import { baseOptions } from '@/app/layout.config'

const Layout = ({ children }: PropsWithChildren) =>
  <HomeLayout {...baseOptions}>{children}</HomeLayout>

export default Layout
