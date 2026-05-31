'use client'

import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export function Search({ pages }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    function onKey(e) {
      const isMac = navigator.platform.toLowerCase().includes('mac')
      const isK = e.key === 'k' || e.key === 'K'
      if (isK && (isMac ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const groups = useMemo(() => groupBySection(pages), [pages])

  function go(route) {
    setOpen(false)
    router.push(route)
  }

  return (
    <>
      <button
        type="button"
        className="shadcn-search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <SearchIcon />
        <span className="shadcn-search-trigger__text">Search docs…</span>
        <kbd className="shadcn-kbd">
          <span style={{ fontSize: '0.65rem' }}>⌘</span>K
        </kbd>
      </button>

      {open && (
        <div
          className="shadcn-search-overlay"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="shadcn-search-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Search"
          >
            <Command label="Search docs" shouldFilter loop className="shadcn-command">
              <div className="shadcn-command-input-wrap">
                <SearchIcon />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search lessons, commands, concepts…"
                  className="shadcn-command-input"
                  autoFocus
                />
                <kbd className="shadcn-kbd shadcn-kbd--esc">ESC</kbd>
              </div>

              <Command.List className="shadcn-command-list">
                <Command.Empty className="shadcn-command-empty">
                  No results for <span style={{ opacity: 0.9 }}>&ldquo;{query}&rdquo;</span>
                </Command.Empty>

                {groups.map(({ section, items }) => (
                  <Command.Group
                    key={section.label}
                    heading={section.label}
                    className="shadcn-command-group"
                  >
                    {items.map((p) => (
                      <Command.Item
                        key={p.route}
                        value={`${p.title} ${p.description ?? ''} ${p.route}`}
                        onSelect={() => go(p.route)}
                        className="shadcn-command-item"
                      >
                        <FileIcon />
                        <div className="shadcn-command-item__body">
                          <div className="shadcn-command-item__title">{p.title}</div>
                          {p.description ? (
                            <div className="shadcn-command-item__desc">{p.description}</div>
                          ) : null}
                        </div>
                        <kbd className="shadcn-kbd shadcn-kbd--enter">↵</kbd>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="shadcn-command-footer">
                <span className="shadcn-command-footer__hint">
                  <kbd className="shadcn-kbd">↑</kbd>
                  <kbd className="shadcn-kbd">↓</kbd>
                  to navigate
                </span>
                <span className="shadcn-command-footer__hint">
                  <kbd className="shadcn-kbd">↵</kbd>
                  to select
                </span>
                <span className="shadcn-command-footer__hint">
                  <kbd className="shadcn-kbd">esc</kbd>
                  to close
                </span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}

function groupBySection(pages) {
  const sectionLabels = {
    '': 'Introduction',
    foundations: 'Foundations',
    'linux-basics': 'Linux Basics',
    networking: 'Networking',
    'remote-access': 'Remote Access',
    hosting: 'Hosting Apps',
    operations: 'Operations',
    advanced: 'Advanced'
  }
  const order = Object.keys(sectionLabels)
  const buckets = new Map(order.map((k) => [k, []]))

  for (const p of pages) {
    const seg = (p.route || '').split('/').filter(Boolean)[0] ?? ''
    const key = order.includes(seg) ? seg : ''
    buckets.get(key).push(p)
  }

  return order
    .map((key) => ({ section: { key, label: sectionLabels[key] }, items: buckets.get(key) }))
    .filter((g) => g.items.length > 0)
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ opacity: 0.7, flexShrink: 0 }}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}
