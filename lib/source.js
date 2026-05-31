import { loader } from 'fumadocs-core/source'
import { docs } from '@/.source'

const mdxSource = docs.toFumadocsSource()
const files =
  typeof mdxSource.files === 'function' ? mdxSource.files() : mdxSource.files

export const source = loader({
  baseUrl: '/',
  source: { files }
})
