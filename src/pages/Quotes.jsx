import { useState, useRef, useEffect } from 'react'
import { Search, ChevronUp, ChevronDown, MoreHorizontal, Calendar, CheckSquare, Square } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'

function fmt(n) {
  return n === 0 ? '$0' : `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function Quotes({ quotes, navigate }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showMoreActions, setShowMoreActions] = useState(false)
  const [selected, setSelected] = useState(new Set())
  const moreRef = useRef(null)

  const filtered = quotes.filter(q => {
    const matchSearch = !search || [q.client, q.number, q.title, q.status, q.property]
      .some(v => v && v.toLowerCase().includes(search.toLowerCase()))
    const matchStatus = statusFilter === 'All' || q.status === statusFilter
    return matchSearch && matchStatus
  })

  const draft = quotes.filter(q => q.status === 'Draft')
  const awaiting = quotes.filter(q => q.status === 'Awaiting response')
  const changesReq = quotes.filter(q => q.status === 'Changes requested')
  const approved = quotes.filter(q => q.status === 'Approved')
  const sent = quotes.filter(q => ['Sent', 'Awaiting response'].includes(q.status))
  const converted = quotes.filter(q => q.status === 'Approved')

  useEffect(() => {
    function handler(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setShowMoreActions(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleSelect = (id) => {
    setSelected(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111827' }}>Quotes</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn-primary" style={{ fontSize: 15, padding: '10px 20px' }}
            onClick={() => navigate('quotes/new-template')}>
            New Quote
          </button>
          <div ref={moreRef} style={{ position: 'relative' }}>
            <button className="btn-secondary" style={{ fontSize: 14, padding: '10px 16px' }}
              onClick={() => setShowMoreActions(v => !v)}>
              <MoreHorizontal size={16} /> More Actions
            </button>
            {showMoreActions && (
              <div style={{
                position: 'absolute', right: 0, top: '100%', marginTop: 4,
                background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 220, zIndex: 100, overflow: 'hidden',
              }}>
                {['Export Quotes', 'Archive Selected', 'Delete Selected'].map(label => (
                  <button key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    padding: '12px 16px', background: 'none', border: 'none', textAlign: 'left',
                    cursor: 'pointer', color: '#374151', fontSize: 14,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {/* Overview */}
        <div className="metric-card" style={{ flex: 1.2 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#111827' }}>Overview</div>
          {[
            { dot: '#6b7280', label: `Draft (${draft.length})` },
            { dot: '#f59e0b', label: `Awaiting response (${awaiting.length})` },
            { dot: '#ef4444', label: `Changes requested (${changesReq.length})` },
            { dot: '#22c55e', label: `Approved (${approved.length})` },
          ].map(({ dot, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot }} />
              <span style={{ color: '#374151' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Conversion rate */}
        <div className="metric-card" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Conversion rate</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Past 30 days</div>
            </div>
            <ChevronUp size={16} color="#9ca3af" />
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              0% <span style={{ background: '#f3f4f6', borderRadius: 4, padding: '2px 8px', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>0%</span>
            </div>
          </div>
        </div>

        {/* Sent */}
        <div className="metric-card" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Sent</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Past 30 days</div>
            </div>
            <ChevronUp size={16} color="#9ca3af" />
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              {sent.length}
              <span style={{
                background: '#dcfce7', color: '#15803d',
                borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                ↑ 100%
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>$50</div>
          </div>
        </div>

        {/* Converted */}
        <div className="metric-card" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Converted</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Past 30 days</div>
            </div>
            <ChevronUp size={16} color="#9ca3af" />
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              {converted.length}
              <span style={{ background: '#f3f4f6', borderRadius: 4, padding: '2px 8px', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>0%</span>
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>$0</div>
          </div>
        </div>

        {/* Info card */}
        <div className="metric-card" style={{ flex: 1.2 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 8 }}>How can I get paid faster?</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
            ServiceTitan can help you take payments instantly in person or set up automatic payments.
          </div>
          <button style={{ background: 'none', border: 'none', color: '#1e7ad6', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            ✦ Learn more with ServiceTitan AI
          </button>
        </div>
      </div>

      {/* Table section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>All quotes</h2>
          <span style={{ fontSize: 14, color: '#9ca3af' }}>({filtered.length} {filtered.length === 1 ? 'result' : 'results'})</span>
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div className="filter-chip" onClick={() => setStatusFilter(statusFilter === 'All' ? 'Draft' : 'All')}>
            <span style={{ color: '#9ca3af' }}>Status</span>
            <span style={{ color: '#374151', fontWeight: 600 }}>| {statusFilter}</span>
          </div>
          <div className="filter-chip">
            <Calendar size={13} color="#6b7280" />
            <span style={{ fontWeight: 600 }}>All</span>
          </div>
          <div className="filter-chip">
            <span style={{ color: '#9ca3af' }}>Salesperson</span>
            <span style={{ color: '#374151', fontWeight: 600 }}>| All</span>
          </div>
          <div style={{ flex: 1 }} />
          <div className="search-input" style={{ width: 220 }}>
            <Search size={14} color="#9ca3af" />
            <input
              placeholder="Search quotes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <table>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <th style={{ padding: '12px 16px', width: 40 }}>
                  <div style={{
                    width: 16, height: 16, border: '1.5px solid #d1d5db',
                    borderRadius: 3, cursor: 'pointer',
                  }} />
                </th>
                {['Client', 'Quote number', 'Property', 'Created', 'Status', 'Total'].map((col, i) => (
                  <th key={col} style={{
                    padding: '12px 16px',
                    fontWeight: 600,
                    color: '#6b7280',
                    fontSize: 13,
                    textAlign: i === 5 ? 'right' : 'left',
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: i === 5 ? 'flex-end' : 'flex-start' }}>
                      {col}
                      {i < 5 && <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <ChevronUp size={10} color="#d1d5db" />
                        <ChevronDown size={10} color="#d1d5db" />
                      </div>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
                    No quotes found
                  </td>
                </tr>
              ) : filtered.map((quote, idx) => (
                <tr
                  key={quote.id}
                  style={{
                    borderBottom: idx < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                    background: selected.has(quote.id) ? '#eff6ff' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!selected.has(quote.id)) e.currentTarget.style.background = '#fafafa' }}
                  onMouseLeave={e => { if (!selected.has(quote.id)) e.currentTarget.style.background = 'transparent' }}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div
                      onClick={e => { e.stopPropagation(); toggleSelect(quote.id) }}
                      style={{
                        width: 16, height: 16, border: '1.5px solid',
                        borderColor: selected.has(quote.id) ? '#1e7ad6' : '#d1d5db',
                        borderRadius: 3, cursor: 'pointer',
                        background: selected.has(quote.id) ? '#1e7ad6' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      {selected.has(quote.id) && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#111827', fontSize: 14 }}>{quote.client}</td>
                  <td style={{ padding: '14px 16px', color: '#374151' }}>
                    <div>{quote.number}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{quote.title}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#374151', fontSize: 13 }}>
                    {quote.property}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#374151' }}>{quote.created}</td>
                  <td style={{ padding: '14px 16px' }}><StatusBadge status={quote.status} /></td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700, color: '#111827' }}>{fmt(quote.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
