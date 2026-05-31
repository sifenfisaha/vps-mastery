import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Search } from '../components/search.jsx'
import { flattenPageMap } from '../lib/flatten-page-map.js'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://vps-mastery.local'),
  title: {
    default: 'VPS Mastery — Learn Linux Server Admin from Zero',
    template: '%s — VPS Mastery'
  },
  description:
    'A complete, hands-on path from beginner to advanced Linux server administration, using your own home PC as a VPS.'
}

const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
        <span style={{ opacity: 0.6 }}>~/</span>vps-mastery
      </span>
    }
  />
)

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  const pages = flattenPageMap(pageMap)
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="▲" />
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          search={<Search pages={pages} />}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          docsRepositoryBase="https://github.com/your/repo/tree/main"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
