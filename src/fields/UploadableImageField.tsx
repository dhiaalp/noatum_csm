'use client'

import { useState, type ChangeEvent } from 'react'
import { TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Preview-only URL resolution: existing rows can hold a path relative to
 * the public site's own /public folder (e.g. "/images/foo.jpg", seeded from
 * the old static data file) — those don't exist on the CMS's own origin, so
 * the browser can't load them here unless resolved against the site. Files
 * uploaded through this field's Upload button are already absolute CMS
 * URLs and pass through unchanged. The stored field value itself is never
 * modified by this — only what we point <img> at for the admin preview.
 */
function resolvePreviewSrc(value: string): string {
  return /^https?:\/\//.test(value) ? value : `${SITE_URL}${value}`
}

function PlaceholderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.35 }}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}

/**
 * Scoped, one-time style injection: turns the Gallery array's rows from a
 * vertical stack into a wrapping row of fixed-width cards. Scoped to
 * `.gallery-photos-field` (set via the array field's admin.className) so
 * every other array field in the admin — Certificates, Documents, and any
 * future ones — keeps its normal stacked layout.
 */
function GalleryGridStyle() {
  return (
    <style>{`
      .gallery-photos-field .array-field__draggable-rows {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .gallery-photos-field .array-field__row {
        width: 220px;
        flex: 0 0 220px;
      }
    `}</style>
  )
}

/**
 * Compact card-style admin UI for a plain text `image` field: a thumbnail
 * on top, the URL input, and an Upload button below it — sized to sit
 * inside a fixed-width card so a whole gallery reads as a horizontal row
 * of photos instead of a long vertical list. Uploading sends the file
 * straight to the Media collection and fills the field with the resulting
 * URL. The field itself stays a plain text/URL column — this only changes
 * how it's edited in /admin — so it stays compatible with every existing
 * row and with the public site, which reads these as plain URL strings.
 */
const UploadableImageField: TextFieldClientComponent = ({ path }) => {
  const { setValue, value } = useField<string>({ path })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const response = await fetch('/api/media', { method: 'POST', credentials: 'include', body: form })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.errors?.[0]?.message || `Upload failed (${response.status})`)
      }
      const { doc } = await response.json()
      // Store an absolute URL so the public site (a different origin) can load it too.
      setValue(`${window.location.origin}${doc.url}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <GalleryGridStyle />
      <div
        style={{
          borderRadius: 6,
          overflow: 'hidden',
          border: '1px solid var(--theme-elevation-150)',
          background: 'var(--theme-elevation-50)',
          aspectRatio: '4 / 3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resolvePreviewSrc(value)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <PlaceholderIcon />
        )}
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <TextInput
            path={path}
            value={value ?? ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          />
        </div>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 38,
            cursor: uploading ? 'default' : 'pointer',
            padding: '0 10px',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            opacity: uploading ? 0.6 : 1,
            flexShrink: 0,
          }}
        >
          {uploading ? '…' : 'Upload'}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (file) void handleUpload(file)
            }}
          />
        </label>
      </div>
      {error && <p style={{ color: 'var(--theme-error-500)', fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  )
}

export default UploadableImageField
