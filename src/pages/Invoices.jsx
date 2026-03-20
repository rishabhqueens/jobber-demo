import { useState, useRef, useEffect } from 'react'
import { Search, ChevronUp, ChevronDown, MoreHorizontal, Calendar } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'

function fmt(n) {
  return n === 0 ? '$0' : `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function Invoices({ invoices, navigate }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showMoreActions, setShowMoreActions] = useState(false)
  const moreRef = useRef(null)

  const filtered = invoices.filter(inv => {
    const matchSearch = !search || [inv.client, inv.number, inv.subject, inv.status]
      .some(v => v.toLowerCase().includes(search.toLowerCase()))
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter
    return matchSearch && matchStatus
  })

  // Overview stats
  const pastDue = invoices.filter(i => i.status === 'Past due')
  const sent = invoices.filter(i => i.status === 'Sent')
  const draft = invoices.filter(i => i.status === 'Draft')
  const pastDueTotal = pastDue.reduce((s, i) => s + i.balance, 0)
  const sentTotal = sent.reduce((s, i) => s + i.balance, 0)
  const draftTotal = draft.reduce((s, i) => s + i.balance, 0)
  const allTotal = invoices.reduce((s, i) => s + i.total, 0)
  const avgInvoice = invoices.length ? allTotal / invoices.length : 0

  useEffect(() => {
    function handler(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setShowMoreActions(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111827' }}>Invoices</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', position: 'relative' }}>
          <button className="btn-primary" style={{ fontSize: 15, padding: '10px 20px' }}
            onClick={() => navigate('invoices/new')}>
            New Invoice
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
                {[
                  { icon: '📄', label: 'Batch Create Invoices' },
                  { icon: '📧', label: 'Batch Deliver Invoices' },
                ].map(({ icon, label }) => (
                  <button key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    width: '100%', padding: '12px 16px', background: 'none', border: 'none',
                    textAlign: 'left', cursor: 'pointer', color: '#374151', fontSize: 14,
                    transition: 'background 0.1s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ fontSize: 16 }}>{icon}</span> {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        <div className="metric-card" style={{ flex: 1.2 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#111827' }}>Overview</div>
          {[
            { dot: '#ef4444', label: `Past due (${pastDue.length})`, value: fmt(pastDueTotal) },
            { dot: '#f59e0b', label: `Sent but not due (${sent.length})`, value: fmt(sentTotal) },
            { dot: '#6b7280', label: `Draft (${draft.length})`, value: fmt(draftTotal) },
          ].map(({ dot, label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot }} />
                <span style={{ color: '#374151' }}>{label}</span>
              </div>
              <span style={{ color: '#374151', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="metric-card" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Issued</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Past 30 days</div>
            </div>
            <ChevronUp size={16} color="#9ca3af" />
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              {sent.length} <span style={{ background: '#f3f4f6', borderRadius: 4, padding: '2px 8px', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>0%</span>
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>$0</div>
          </div>
        </div>

        <div className="metric-card" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Average invoice</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Past 30 days</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              {fmt(avgInvoice)} <span style={{ background: '#f3f4f6', borderRadius: 4, padding: '2px 8px', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>0%</span>
            </div>
          </div>
        </div>

        <div className="metric-card" style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Invoice payment time</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Last 30 days</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>—</span>
            <span style={{ background: '#f3f4f6', borderRadius: 4, padding: '2px 8px', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>—%</span>
          </div>
        </div>

        <div className="metric-card" style={{ flex: 1.2, background: '#fff' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 8 }}>Want free business advice for your industry?</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
            Jobber Academy has a massive library of content to grow your business. Let us recommend some.
          </div>
          <button style={{ background: 'none', border: 'none', color: '#3d8b37', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            ✦ Learn more with Jobber AI
          </button>
        </div>
      </div>

      {/* Table section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>All invoices</h2>
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
          <div style={{ flex: 1 }} />
          <div className="search-input" style={{ width: 220 }}>
            <Search size={14} color="#9ca3af" />
            <input
              placeholder="Search invoices..."
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
                {['Client', 'Invoice...', 'Due date', 'Subject', 'Status', 'Total', 'Balance'].map((col, i) => (
                  <th key={col} style={{
                    padding: '12px 16px',
                    fontWeight: 600,
                    color: '#6b7280',
                    fontSize: 13,
                    textAlign: i >= 5 ? 'right' : 'left',
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: i >= 5 ? 'flex-end' : 'flex-start' }}>
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
                    No invoices found
                  </td>
                </tr>
              ) : filtered.map((inv, idx) => (
                <tr
                  key={inv.id}
                  style={{
                    borderBottom: idx < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#111827', fontSize: 14 }}>{inv.client}</td>
                  <td style={{ padding: '14px 16px', color: '#374151' }}>{inv.number}</td>
                  <td style={{ padding: '14px 16px', color: '#374151' }}>{inv.dueDate}</td>
                  <td style={{ padding: '14px 16px', color: '#374151' }}>{inv.subject}</td>
                  <td style={{ padding: '14px 16px' }}><StatusBadge status={inv.status} /></td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: '#111827' }}>{fmt(inv.total)}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: '#111827' }}>{fmt(inv.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
