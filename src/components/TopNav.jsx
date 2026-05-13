import { useState, useEffect, useRef } from 'react'
import { Calendar, ChevronDown, Settings, Receipt, BookOpen, Tag } from 'lucide-react'
import logo from '../assets/servicetitan-logo.png'

const NAV = [
  { id: 'billing', label: 'Billing', icon: Receipt, target: 'invoices', isNew: true },
  { id: 'discounts', label: 'Discounts', icon: Tag, target: 'discount-rules', isNew: true },
  { id: 'readhere', label: 'Read Here', icon: BookOpen, target: 'feature-workflows', highlight: true },
  { id: 'calendar', label: 'Calendar', icon: Calendar, target: 'dashboard' },
  {
    id: 'manage', label: 'Manage', dropdown: [
      { label: 'Dashboard', target: 'dashboard' },
      { label: 'Servicing Costs', target: 'profitability-layer' },
    ],
  },
  {
    id: 'reports', label: 'Reports', dropdown: [
      { label: 'Insights', target: 'insights' },
      { label: 'Profitability', target: 'profitability-layer' },
    ],
  },
  {
    id: 'sales', label: 'Sales', dropdown: [
      { label: 'Quotes', target: 'quotes' },
      { label: 'New Quote Template', target: 'quotes/new-template' },
    ],
  },
]

const PAGE_TO_TOP = {
  'dashboard': 'calendar',
  'profitability-layer': 'manage',
  'discount-rules': 'discounts',
  'insights': 'reports',
  'quotes': 'sales',
  'quotes/new-template': 'sales',
  'invoices': 'billing',
  'invoices/new': 'billing',
  'feature-workflows': 'readhere',
}

export default function TopNav({ page, navigate }) {
  const [openMenu, setOpenMenu] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const activeTop = PAGE_TO_TOP[page]

  const handleClick = (item) => {
    if (item.dropdown) {
      setOpenMenu(openMenu === item.id ? null : item.id)
    } else {
      setOpenMenu(null)
      navigate(item.target)
    }
  }

  return (
    <div ref={navRef} style={{
      height: 56,
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 24,
      flexShrink: 0,
      position: 'relative',
      zIndex: 50,
    }}>
      <button
        onClick={() => navigate('dashboard')}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
        }}
      >
        <img src={logo} alt="ServiceTitan" style={{ height: 24, display: 'block' }} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#374151', fontSize: 13, fontWeight: 600 }}>
        <span style={{
          width: 22, height: 22, borderRadius: 4, background: '#111827',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700,
        }}>SR</span>
        Say Rishabh
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 12 }}>
        {NAV.map(item => {
          const Icon = item.icon
          const isActive = activeTop === item.id
          const isOpen = openMenu === item.id
          return (
            <div key={item.id} style={{ position: 'relative' }}>
              <button
                onClick={() => handleClick(item)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  height: item.highlight ? 32 : 56, padding: item.highlight ? '0 12px' : '0 12px',
                  margin: item.highlight ? '0 4px' : 0,
                  background: item.highlight
                    ? (isActive ? '#1e7ad6' : '#eff6ff')
                    : 'transparent',
                  border: item.highlight ? '1.5px solid #1e7ad6' : 'none',
                  borderRadius: item.highlight ? 16 : 0,
                  borderBottom: !item.highlight && isActive ? '2px solid #1e7ad6' : item.highlight ? '1.5px solid #1e7ad6' : '2px solid transparent',
                  color: item.highlight
                    ? (isActive ? '#fff' : '#1e7ad6')
                    : (isActive ? '#1e7ad6' : '#374151'),
                  fontWeight: item.highlight ? 700 : (isActive ? 700 : 500),
                  fontSize: item.highlight ? 13 : 14,
                  cursor: 'pointer',
                  animation: item.highlight ? 'glow-border 2.4s ease-in-out infinite' : 'none',
                }}
              >
                {Icon && <Icon size={item.highlight ? 13 : 14} />}
                {item.label}
                {item.isNew && (
                  <span style={{
                    background: '#fbbf24', color: '#7c2d12', borderRadius: 3,
                    padding: '1px 5px', fontSize: 9, fontWeight: 800, lineHeight: '14px',
                    letterSpacing: '0.04em',
                  }}>NEW</span>
                )}
                {item.highlight && (
                  <span style={{
                    background: '#fbbf24', color: '#7c2d12', borderRadius: 3,
                    padding: '1px 5px', fontSize: 9, fontWeight: 800, lineHeight: '14px',
                    letterSpacing: '0.04em',
                  }}>NEW</span>
                )}
                {item.dropdown && <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />}
              </button>
              {item.dropdown && isOpen && (
                <div style={{
                  position: 'absolute', top: 56, left: 0,
                  background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  minWidth: 200, padding: 4,
                }}>
                  {item.dropdown.map(opt => (
                    <button
                      key={opt.target}
                      onClick={() => { setOpenMenu(null); navigate(opt.target) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '8px 12px', background: 'transparent', border: 'none',
                        borderRadius: 4, color: '#374151', fontSize: 13, fontWeight: 500,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, color: '#374151', fontSize: 13, fontWeight: 500 }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none', cursor: 'pointer', color: '#374151',
        }}>
          <Settings size={14} /> Settings
        </button>
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer', color: '#374151',
        }}>Logout</button>
      </div>
    </div>
  )
}
