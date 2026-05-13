import { useState } from 'react'
import { Search, Calendar, X, BarChart2, Plus } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'

function fmt(n) {
  return `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const TABS = [
  { id: 'unbilled', label: 'Work Not Invoiced', match: ['Draft'] },
  { id: 'unpaid',   label: 'Unpaid Invoices',   match: ['Sent', 'Past due', 'Awaiting response'] },
  { id: 'paid',     label: 'Paid Invoices',     match: ['Paid'] },
]

export default function Invoices({ invoices, navigate }) {
  const [tab, setTab] = useState('unpaid')
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [pastDueOnly, setPastDueOnly] = useState(false)
  const [showCallout, setShowCallout] = useState(true)

  const activeTab = TABS.find(t => t.id === tab)
  const filtered = invoices.filter(inv => {
    if (!activeTab.match.includes(inv.status)) return false
    if (pastDueOnly && inv.status !== 'Past due') return false
    if (!search) return true
    return [inv.client, inv.number, inv.subject, inv.status]
      .some(v => v.toLowerCase().includes(search.toLowerCase()))
  })

  const totalAmount = filtered.reduce((s, i) => s + i.balance, 0)

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111827' }}>Billing</h1>

        {showCallout && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8,
            padding: '12px 14px', maxWidth: 420, marginRight: 16, position: 'relative',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 6, background: '#fff',
              border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <BarChart2 size={18} color="#1e7ad6" />
            </div>
            <div style={{ fontSize: 13, color: '#1e3a5f', lineHeight: 1.4, paddingRight: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>Take your billing to the next level.</div>
              Learn more about <a href="#" onClick={e => e.preventDefault()} style={{ color: '#1e7ad6', fontWeight: 600 }}>how to get started with invoicing</a>!
            </div>
            <button
              onClick={() => setShowCallout(false)}
              style={{ position: 'absolute', top: 6, right: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <button className="btn-primary" style={{ fontSize: 14, padding: '10px 18px', whiteSpace: 'nowrap' }}
          onClick={() => navigate('invoices/new')}>
          <Plus size={14} /> Create Invoice
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, borderBottom: '1px solid #e5e7eb', paddingBottom: 0 }}>
        {TABS.map(t => {
          const isActive = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '4px 4px 0 0',
                border: 'none',
                background: isActive ? '#1e7ad6' : 'transparent',
                color: isActive ? '#fff' : '#374151',
                fontWeight: isActive ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer',
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Total */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Total amount:</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>{fmt(totalAmount)}</div>
      </div>

      {/* Filter row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, marginBottom: 4 }}>Invoice date range</div>
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            style={{
              padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6,
              background: '#fff', color: '#111827', fontSize: 13, minWidth: 180,
            }}
          >
            {['Last 30 days', 'Last 90 days', 'Year to date', 'All time'].map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, marginBottom: 4 }}>Search</div>
          <div className="search-input">
            <Search size={14} color="#9ca3af" />
            <input
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', height: 34 }}>
          <input
            type="checkbox"
            checked={pastDueOnly}
            onChange={e => setPastDueOnly(e.target.checked)}
            style={{ width: 14, height: 14 }}
          />
          Show past due only
        </label>

        <button className="btn-secondary" style={{ height: 34, fontSize: 13 }}>
          Export to Excel
        </button>
      </div>

      {/* Table / empty state */}
      {filtered.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>
          No invoices found.
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6', background: '#fafbfc' }}>
                {['Client', 'Invoice', 'Due date', 'Subject', 'Status', 'Total', 'Balance'].map((col, i) => (
                  <th key={col} style={{
                    padding: '10px 16px',
                    fontWeight: 600,
                    color: '#6b7280',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    textAlign: i >= 5 ? 'right' : 'left',
                    whiteSpace: 'nowrap',
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, idx) => (
                <tr
                  key={inv.id}
                  style={{
                    borderBottom: idx < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#111827', fontSize: 14 }}>{inv.client}</td>
                  <td style={{ padding: '14px 16px', color: '#1e7ad6', fontWeight: 600 }}>{inv.number}</td>
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
      )}
    </div>
  )
}
