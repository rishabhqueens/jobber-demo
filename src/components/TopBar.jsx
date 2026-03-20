import { Search, Sparkles, Bell, HelpCircle, Settings } from 'lucide-react'

export default function TopBar({ page, navigate }) {
  const breadcrumb = getBreadcrumb(page)

  return (
    <div style={{
      height: 56,
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      zIndex: 10,
    }}>
      {/* Brand + breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <button
          onClick={() => navigate('dashboard')}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: 700,
            fontSize: 15,
            color: '#111827',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Rishabh Organics
        </button>
        {breadcrumb && (
          <>
            <span style={{ color: '#d1d5db', margin: '0 12px', fontSize: 18 }}>|</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>{breadcrumb}</span>
          </>
        )}
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          padding: '6px 10px',
          width: 180,
        }}>
          <Search size={14} color="#9ca3af" />
          <input
            placeholder="Search"
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: '#374151',
              fontSize: 13,
              flex: 1,
            }}
          />
          <div style={{
            background: '#e5e7eb',
            borderRadius: 3,
            padding: '1px 5px',
            fontSize: 11,
            color: '#9ca3af',
            fontFamily: 'monospace',
          }}>
            /
          </div>
        </div>

        {/* Icons */}
        {[
          { Icon: Sparkles, label: 'AI Assistant' },
          { Icon: Bell, label: 'Notifications' },
          { Icon: HelpCircle, label: 'Help' },
          { Icon: Settings, label: 'Settings' },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            title={label}
            style={{
              width: 34,
              height: 34,
              borderRadius: 6,
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Icon size={18} strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </div>
  )
}

function getBreadcrumb(page) {
  if (page === 'invoices/new') return 'New Invoice'
  if (page === 'invoices/editor') return 'Invoice Editor'
  if (page === 'quotes/new-template') return 'New Template'
  if (page === 'discount-rules') return 'Discount Rules'
  if (page === 'profitability-layer') return 'Profitability Layer'
  return null
}
