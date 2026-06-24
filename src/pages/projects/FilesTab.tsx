import { useState } from 'react'
import { FILES, type ProjectFile } from '../mockData'
import { Avatar, FileIcon, InsightChip, Button, Card, cn } from '../components'

// ── Version history drawer ────────────────────────────────────────────────────
function VersionDrawer({ file, onClose }: { file: ProjectFile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm" />
      <div className="relative w-80 bg-surface-1 border-l border-border h-full shadow-xl flex flex-col animate-slide-in-right"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <p className="text-sm font-semibold text-text-primary">{file.name}</p>
            <p className="text-xs text-text-tertiary mt-0.5">Version history</p>
          </div>
          <button onClick={onClose} className="text-text-tertiary hover:text-text-primary transition-colors text-lg cursor-pointer">×</button>
        </div>

        {/* Current version */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-900/20 border border-purple-800/40">
            <FileIcon type={file.type} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-text-primary">{file.version}</span>
                <span className="px-1.5 py-0.5 rounded text-2xs font-bold bg-success-bg border border-success-border text-success-text">Latest</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Avatar initials={file.uploader.initials} size="xs" index={0} />
                <span className="text-2xs text-text-tertiary">{file.uploader.name} · {file.uploadedAt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Previous versions */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          <p className="text-2xs text-text-disabled uppercase tracking-wide font-semibold mb-3">Previous versions</p>
          {file.previousVersions.length === 0 && (
            <p className="text-xs text-text-tertiary text-center py-8">No previous versions</p>
          )}
          <div className="space-y-3">
            {file.previousVersions.map(v => (
              <div key={v.version} className="flex gap-3 p-3 rounded-xl bg-surface-2 border border-border group hover:border-border-strong transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text-secondary">{v.version}</span>
                    <span className="text-2xs text-text-disabled">{v.date}</span>
                  </div>
                  {v.note && <p className="text-2xs text-text-tertiary mt-1 italic">"{v.note}"</p>}
                  <p className="text-2xs text-text-disabled mt-0.5">{v.uploader}</p>
                </div>
                <button className="text-2xs text-text-disabled hover:text-info-text transition-colors opacity-0 group-hover:opacity-100 cursor-pointer self-center">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="px-5 py-4 border-t border-border">
          {(file.task || file.decision) && (
            <div className="space-y-2">
              <p className="text-2xs text-text-disabled uppercase tracking-wide font-semibold mb-2">Linked to</p>
              {file.task && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-info-bg border border-info-border">
                  <span className="text-2xs text-info-main">◈</span>
                  <span className="text-xs text-info-text">Task #{file.task}</span>
                </div>
              )}
              {file.decision && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-900/20 border border-purple-800/40">
                  <span className="text-2xs text-purple-400">⬡</span>
                  <span className="text-xs text-purple-300">Decision #{file.decision}</span>
                </div>
              )}
            </div>
          )}
          <Button variant="primary" size="sm" className="w-full mt-3 justify-center">
            Download latest
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── File row (table view) ─────────────────────────────────────────────────────
function FileRow({ file, onVersionClick }: { file: ProjectFile; onVersionClick: () => void }) {
  return (
    <tr className={cn(
      'border-b border-border/40 hover:bg-surface-hover/40 transition-colors group',
      file.outdated && 'bg-error-bg/10',
    )}>
      {/* Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <FileIcon type={file.type} />
          <div>
            <div className="flex items-center gap-2">
              <span className={cn('text-sm font-medium',
                file.outdated ? 'text-text-disabled line-through' : 'text-text-primary')}>
                {file.name}
              </span>
              {file.outdated && (
                <span className="px-1.5 py-0.5 rounded text-2xs font-bold bg-error-bg border border-error-border text-error-text">
                  Outdated
                </span>
              )}
            </div>
            <p className="text-2xs text-text-tertiary mt-0.5">{file.size}</p>
          </div>
        </div>
      </td>

      {/* Version */}
      <td className="px-3 py-3">
        <button onClick={onVersionClick}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-3 border border-border
            hover:border-purple-600 hover:bg-purple-900/20 transition-colors text-xs font-medium text-text-secondary
            hover:text-purple-300 cursor-pointer">
          {file.version}
          {file.previousVersions.length > 0 && (
            <span className="text-2xs text-text-disabled">+{file.previousVersions.length}</span>
          )}
        </button>
      </td>

      {/* Uploader */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <Avatar initials={file.uploader.initials} size="xs" index={0} />
          <span className="text-xs text-text-secondary">{file.uploader.name}</span>
        </div>
      </td>

      {/* Date */}
      <td className="px-3 py-3 text-xs text-text-tertiary whitespace-nowrap">{file.uploadedAt}</td>

      {/* Links */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          {file.task && (
            <span className="px-1.5 py-0.5 rounded text-2xs bg-info-bg border border-info-border text-info-text font-medium">
              Task #{file.task}
            </span>
          )}
          {file.decision && (
            <span className="px-1.5 py-0.5 rounded text-2xs bg-purple-900/30 border border-purple-800/40 text-purple-300 font-medium">
              Decision #{file.decision}
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-3 py-3">
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="xs">Preview</Button>
          <Button variant="ghost" size="xs">Download</Button>
          {file.outdated && <Button variant="danger" size="xs">Replace</Button>}
        </div>
      </td>
    </tr>
  )
}

// ── File grid card ────────────────────────────────────────────────────────────
function FileCard({ file, onVersionClick }: { file: ProjectFile; onVersionClick: () => void }) {
  return (
    <Card className={cn('p-4 cursor-pointer hover:border-border-strong transition-colors group',
      file.outdated && 'border-error-border/40')}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-surface-3 border border-border flex items-center justify-center">
          <FileIcon type={file.type} />
        </div>
        {file.outdated && (
          <span className="px-1.5 py-0.5 rounded text-2xs font-bold bg-error-bg border border-error-border text-error-text">
            Outdated
          </span>
        )}
      </div>

      {/* Name */}
      <p className={cn('text-sm font-medium leading-snug mb-1',
        file.outdated ? 'text-text-disabled line-through' : 'text-text-primary')}>
        {file.name}
      </p>
      <p className="text-2xs text-text-tertiary mb-3">{file.size} · {file.uploadedAt}</p>

      {/* Version pill */}
      <div className="flex items-center justify-between">
        <button onClick={onVersionClick}
          className="px-2 py-1 rounded bg-surface-3 border border-border hover:border-purple-600 text-xs font-medium text-text-secondary hover:text-purple-300 transition-colors cursor-pointer">
          {file.version} {file.previousVersions.length > 0 && `+${file.previousVersions.length}`}
        </button>
        <div className="flex items-center gap-1.5">
          <Avatar initials={file.uploader.initials} size="xs" index={0} />
        </div>
      </div>

      {/* Links */}
      {(file.task || file.decision) && (
        <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-border/50">
          {file.task && <span className="px-1.5 py-0.5 rounded text-2xs bg-info-bg border border-info-border text-info-text">Task #{file.task}</span>}
          {file.decision && <span className="px-1.5 py-0.5 rounded text-2xs bg-purple-900/30 border border-purple-800/40 text-purple-300">Decision #{file.decision}</span>}
        </div>
      )}
    </Card>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function FilesTab() {
  const [view, setView] = useState<'grid' | 'table'>('table')
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date')
  const [filterType, setFilterType] = useState('all')

  const sorted = [...FILES]
    .filter(f => filterType === 'all' || f.type === filterType)
    .sort((a, b) =>
      sortBy === 'date' ? b.uploadedAt.localeCompare(a.uploadedAt)
      : sortBy === 'name' ? a.name.localeCompare(b.name)
      : a.type.localeCompare(b.type))

  const outdatedCount = FILES.filter(f => f.outdated).length

  return (
    <div className="flex flex-col h-full animate-fade-in">

      {/* Outdated banner */}
      {outdatedCount > 0 && (
        <div className="flex items-center gap-3 px-6 py-2.5 bg-error-bg border-b border-error-border">
          <span className="text-error-main font-bold">⚠</span>
          <p className="text-xs text-error-text">
            <strong>{outdatedCount} file{outdatedCount > 1 ? 's are' : ' is'} outdated</strong> — tasks referencing older versions may be using the wrong file.
          </p>
          <Button variant="danger" size="xs" className="ml-auto">Review outdated</Button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-surface-2/40 flex-shrink-0 flex-wrap">
        {/* Type filter */}
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          className="text-xs bg-surface-3 border border-border rounded-md px-2 py-1.5 text-text-secondary
            focus:outline-none focus:border-purple-500 cursor-pointer">
          <option value="all">All types</option>
          <option value="figma">Figma</option>
          <option value="pdf">PDF</option>
          <option value="doc">Document</option>
          <option value="sheet">Sheet</option>
          <option value="image">Image</option>
        </select>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-tertiary">Sort</span>
          {(['date', 'name', 'type'] as const).map(s => (
            <button key={s} onClick={() => setSortBy(s)}
              className={cn('px-2.5 py-1 rounded text-xs transition-colors cursor-pointer capitalize',
                sortBy === s ? 'bg-purple-600 text-white' : 'text-text-tertiary hover:bg-surface-hover')}>
              {s}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-surface-3 rounded-md border border-border p-0.5">
            {(['grid', 'table'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={cn('px-2.5 py-1 rounded text-xs transition-colors cursor-pointer',
                  view === v ? 'bg-surface-hover text-text-primary' : 'text-text-tertiary')}>
                {v === 'grid' ? '⊞' : '☰'}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            <span>↑</span> Upload file
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sorted.map(f => (
              <FileCard key={f.id} file={f} onVersionClick={() => setSelectedFile(f)} />
            ))}
          </div>
        ) : (
          <div className="bg-surface-2 rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-1 border-b border-border">
                <tr>
                  {['File', 'Version', 'Uploaded by', 'Date', 'Linked to', ''].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-2xs font-semibold text-text-tertiary uppercase tracking-wide first:px-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map(f => (
                  <FileRow key={f.id} file={f} onVersionClick={() => setSelectedFile(f)} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="flex items-center gap-3 px-6 py-2 border-t border-border bg-surface-2/40 flex-shrink-0">
        <InsightChip label="INS-01 · No single source of truth" />
        <InsightChip label="INS-05 · Tasks lack context" />
      </div>

      {/* Version drawer */}
      {selectedFile && (
        <VersionDrawer file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  )
}
