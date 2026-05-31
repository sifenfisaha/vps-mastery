import defaultMdxComponents from 'fumadocs-ui/mdx'
import * as TabsComponents from 'fumadocs-ui/components/tabs'

export function getMDXComponents(components = {}) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components
  }
}
