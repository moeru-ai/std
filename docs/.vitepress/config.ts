import type { DefaultTheme } from 'vitepress'

import { calculateSidebar } from '@nolebase/vitepress-plugin-sidebar'
import { defineConfig } from 'vitepress'

const calculateSidebarWithDefaultOpen = (targets?: Array<string | {
  folderName: string
  separate: boolean
// eslint-disable-next-line sonarjs/function-return-type
}>, base?: string) => {
  const result = calculateSidebar(targets, base)
  if (Array.isArray(result)) {
    result.forEach((item) => {
      item.collapsed = false
    })
  }
  else {
    Object.values(result).forEach((items) => {
      (items as DefaultTheme.SidebarItem[]).forEach((item) => {
        item.collapsed = false
      })
    })
  }
  return result
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: 'Standard for Moeru AI.',
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: 'https://github.com/moeru-ai.png',
    nav: [
      { link: '/', text: 'Home' },
      { link: 'https://blog.moeru.ai', text: 'Blog' },
    ],
    sidebar: calculateSidebarWithDefaultOpen([
      'lib',
      'node',
    ]),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/moeru-ai/std' },
    ],
  },
  title: 'Moeru AI Std',
})
