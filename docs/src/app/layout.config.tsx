import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

// import pkg from '../../package.json' with { type: 'json' }

/**
 * Shared layout configurations
 *
 * you can customize layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/moeru-ai/std',
  links: [
    // {
    //   active: 'nested-url',
    //   text: 'Docs',
    //   url: '/docs',
    // },
    // {
    //   active: 'none',
    //   text: 'Blog',
    //   url: 'https://blog.moeru.ai',
    // },
  ],
  nav: {
    title: (
      <div className="flex items-center justify-center gap-2">
        <img className="size-6" src="https://github.com/moeru-ai.png" />
        <span>Moeru AI Std</span>
      </div>
    ),
  },
}
