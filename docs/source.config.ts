import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config'
import { transformerTwoslash } from 'fumadocs-twoslash'

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      langs: ['js', 'jsx', 'ts', 'tsx'],
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
    },
  },
})
