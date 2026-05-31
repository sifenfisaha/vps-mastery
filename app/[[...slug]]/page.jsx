import { notFound } from 'next/navigation'
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription
} from 'fumadocs-ui/page'
import { source } from '../../lib/source.js'
import { getMDXComponents } from '../../mdx-components.jsx'

export default async function Page(props) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description ? (
        <DocsDescription>{page.data.description}</DocsDescription>
      ) : null}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()
  return {
    title: page.data.title,
    description: page.data.description
  }
}
