import { createRelativeLink } from 'fumadocs-ui/mdx'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'

import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>
}) => {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page)
    notFound()

  const image = ['/docs-og', ...params.slug!, 'image.png'].join('/')

  return {
    description: page.data.description,
    openGraph: { images: image },
    title: page.data.title,
  }
}

export const generateStaticParams = async () =>
  source.generateParams()

const Page = async (props: {
  params: Promise<{ slug?: string[] }>
}) => {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page)
    notFound()

  const MDXContent = page.data.body

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          githubUrl={`https://github.com/moeru-ai/std/blob/main/docs/content/docs/${page.path}`}
          markdownUrl={`${page.url}.mdx`}
        />
      </div>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export default Page
