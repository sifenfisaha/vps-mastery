const SECTION_TITLES = {
  '/': 'Introduction',
  '/foundations': 'Foundations',
  '/linux-basics': 'Linux Basics',
  '/networking': 'Networking',
  '/remote-access': 'Remote Access',
  '/hosting': 'Hosting Apps',
  '/operations': 'Operations',
  '/advanced': 'Advanced'
}

export function flattenPageMap(items, acc = []) {
  for (const item of items) {
    if (item.children) {
      flattenPageMap(item.children, acc)
      continue
    }
    if (typeof item.route !== 'string') continue
    if (item.route === '/_meta') continue

    const frontMatter = item.frontMatter ?? {}
    const title =
      frontMatter.title ||
      item.title ||
      SECTION_TITLES[item.route] ||
      humanize(item.name)

    acc.push({
      route: item.route,
      title,
      description: frontMatter.description ?? null,
      name: item.name
    })
  }
  return acc
}

function humanize(name) {
  if (!name) return ''
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
