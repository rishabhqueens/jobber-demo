import {
  Plus, Home, Inbox, Users, Calendar, Wrench, FileText,
  Receipt, Megaphone, MessageSquare, BarChart2, CreditCard,
  Clock, Star, ChevronRight, Tag, TrendingUp,
} from 'lucide-react'

const SIDEBAR_W = 60

const navItems = [
  { icon: Home, id: 'dashboard', label: 'Dashboard' },
  { icon: Inbox, id: null, label: 'Requests' },
  { icon: Users, id: null, label: 'Clients' },
  { icon: Calendar, id: null, label: 'Schedule' },
  { icon: Wrench, id: null, label: 'Jobs' },
  { icon: FileText, id: 'quotes', label: 'Quotes' },
  { icon: Receipt, id: 'invoices', label: 'Invoices', isNew: true },
]

const bottomItems = [
  { icon: Megaphone, id: null,                   label: 'Marketing' },
  { icon: MessageSquare, id: null,               label: 'Messages' },
  { icon: BarChart2, id: 'insights',             label: 'Insights', isNew: true },
  { icon: CreditCard, id: null,                  label: 'Payments' },
  { icon: Clock, id: null,                       label: 'Timesheets' },
  { icon: Star, id: null,                        label: 'Reviews' },
  { icon: Tag, id: 'discount-rules',             label: 'Discount Rules', isNew: true },
  { icon: TrendingUp, id: 'profitability-layer', label: 'Profitability', isNew: true },
]

function SidebarIcon({ icon: Icon, active, onClick, label, isNew }) {
  const isClickable = !!onClick
  const color = active
    ? '#fff'
    : isNew && !active
      ? 'rgba(255, 200, 80, 0.85)'
      : isClickable
        ? 'rgba(255,255,255,0.65)'
        : 'rgba(255,255,255,0.28)'

  const bgColor = active
    ? 'rgba(255,255,255,0.12)'
    : isNew
      ? 'rgba(255, 200, 80, 0.06)'
      : 'transparent'

  return (
    <button
      title={label}
      onClick={onClick}
      style={{
        width: SIDEBAR_W,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgColor,
        border: 'none',
        borderLeft: active ? '3px solid #6ee05a' : '3px solid transparent',
        color,
        cursor: isClickable ? 'pointer' : 'not-allowed',
        transition: 'all 0.15s',
        flexShrink: 0,
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (!active && isClickable) {
          e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
          e.currentTarget.style.background = isNew ? 'rgba(255, 200, 80, 0.12)' : 'rgba(255,255,255,0.07)'
        }
      }}
      onMouseLeave={e => {
        if (!active && isClickable) {
          e.currentTarget.style.color = isNew ? 'rgba(255, 200, 80, 0.85)' : 'rgba(255,255,255,0.65)'
          e.currentTarget.style.background = isNew ? 'rgba(255, 200, 80, 0.06)' : 'transparent'
        }
      }}
    >
      <Icon size={20} strokeWidth={1.8} />
      {/* Pulsing dot only for isNew items */}
      {isNew && !active && (
        <span style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#6ee05a',
          animation: 'pulse-dot 2.2s ease-in-out infinite',
        }} />
      )}
    </button>
  )
}

export default function Sidebar({ page, navigate }) {
  return (
    <div style={{
      width: SIDEBAR_W,
      background: '#0e1f2e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
      borderRight: '1px solid rgba(255,255,255,0.06)',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Brand icon */}
      <div style={{
        width: SIDEBAR_W,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          width: 34,
          height: 34,
          background: '#1a3a5c',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7" stroke="#5bc4f5" strokeWidth="2.5"/>
            <circle cx="10" cy="10" r="3" fill="#5bc4f5"/>
          </svg>
        </div>
      </div>

      {/* Create button */}
      <button
        title="Create"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#3d8b37',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          marginBottom: 8,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <Plus size={18} />
      </button>

      {/* Main nav */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
        {navItems.map(({ icon, id, label, isNew }) => (
          <SidebarIcon
            key={label}
            icon={icon}
            label={label}
            active={id && (page === id || page.startsWith(id + '/'))}
            onClick={id ? () => navigate(id) : undefined}
            isNew={isNew}
          />
        ))}
      </div>

      {/* Separator */}
      <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />

      {/* Bottom nav */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
        {bottomItems.map(({ icon, id, label, isNew }) => (
          <SidebarIcon
            key={label}
            icon={icon}
            label={label}
            active={id && page === id}
            onClick={id ? () => navigate(id) : undefined}
            isNew={isNew}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Separator */}
      <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />

      {/* Expand */}
      <SidebarIcon icon={ChevronRight} label="Expand" active={false} />
    </div>
  )
}
