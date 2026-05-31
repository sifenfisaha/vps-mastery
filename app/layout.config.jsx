/**
 * Shared layout configuration used across HomeLayout and DocsLayout.
 * @type {import('fumadocs-ui/layouts/shared').BaseLayoutProps}
 */
export const baseOptions = {
  nav: {
    title: (
      <span style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
        <span style={{ opacity: 0.6 }}>~/</span>vps-mastery
      </span>
    )
  },
  githubUrl: undefined
}
