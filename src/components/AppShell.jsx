import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { Receipt, Tag, BarChart2, TrendingUp } from 'lucide-react'

const QUICK_TABS = [
  { id: 'invoices/new', label: 'New Invoice', icon: Receipt, accent: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  { id: 'discount-rules', label: 'Discount Rules', icon: Tag, accent: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  { id: 'insights', label: 'Analytics', icon: BarChart2, accent: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  { id: 'profitability-layer', label: 'Profitability', icon: TrendingUp, accent: '#3d8b37', bg: '#f0fdf4', border: '#bbf7d0' },
]

function QuickNav({ page, navigate }) {
  return (
    <div style={{
      height: 40,
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 4,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', marginRight: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Quick Nav
      </span>
      {QUICK_TABS.map(({ id, label, icon: Icon, accent, bg, border }) => {
        const isActive = page === id || page.startsWith(id.split('/')[0] + '/')
        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 6,
              border: `1px solid ${isActive ? border : '#e5e7eb'}`,
              background: isActive ? bg : 'transparent',
              color: isActive ? accent : '#6b7280',
              fontWeight: isActive ? 700 : 500,
              fontSize: 12, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.background = bg
                e.currentTarget.style.color = accent
                e.currentTarget.style.borderColor = border
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#6b7280'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }
            }}
          >
            <Icon size={12} />
            {label}
            {(id === 'invoices/new' || id === 'insights') && (
              <span style={{
                background: '#fbbf24', color: '#7c2d12', borderRadius: 3,
                padding: '0 4px', fontSize: 9, fontWeight: 800, lineHeight: '14px',
              }}>NEW</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function AppShell({ page, navigate, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar page={page} navigate={navigate} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <TopBar page={page} navigate={navigate} />
          <QuickNav page={page} navigate={navigate} />
          <div style={{ flex: 1, overflow: 'auto', background: '#f4f5f7' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
