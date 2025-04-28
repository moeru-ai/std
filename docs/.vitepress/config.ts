import { calculateSidebar } from '@nolebase/vitepress-plugin-sidebar'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: 'Standard for Moeru AI.',
  themeConfig: {
    logo: 'https://github.com/moeru-ai.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { link: '/', text: 'Home' },
      { link: 'https://blog.moeru.ai', text: 'Blog' },
    ],

    sidebar: calculateSidebar([
      'lib',
      'node',
      // 'Notes',
      // { folderName: 'Articles', separate: true },
    ]),

    // sidebar: [
    //   {
    //     items: [
    //       { link: '/lib', text: 'index' },
    //     ],
    //     link: '/lib',
    //     text: 'TypeScript Library',
    //   },
    //   {
    //     items: [
    //       { link: '/markdown-examples', text: 'Markdown Examples' },
    //       { link: '/api-examples', text: 'Runtime API Examples' },
    //     ],
    //     text: 'Examples',
    //   },
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/moeru-ai/std' },
    ],
  },
  title: 'Moeru AI Std',
})
