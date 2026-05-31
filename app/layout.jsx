import { RootProvider } from 'fumadocs-ui/provider'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { source } from '../lib/source.js'
import { baseOptions } from './layout.config.jsx'
import './global.css'

export const metadata = {
  metadataBase: new URL('https://vps-mastery.local'),
  title: {
    default: 'VPS Mastery — Learn Linux Server Admin from Zero',
    template: '%s — VPS Mastery'
  },
  description:
    'A complete, hands-on path from beginner to advanced Linux server administration, using your own home PC as a VPS.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  )
}
