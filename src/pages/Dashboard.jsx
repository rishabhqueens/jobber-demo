import { useState } from 'react'
import { ArrowRight, ChevronRight, Tag, TrendingUp } from 'lucide-react'

const workflowCards = [
  {
    label: 'Requests',
    topColor: '#d97706',
    count: 0,
    countSub: null,
    status: 'New',
    details: [
      { label: 'Assessments complete', value: '(0)' },
      { label: 'Overdue', value: '(0)' },
    ],
    icon: '📥',
  },
  {
    label: 'Quotes',
    topColor: '#9b1c1c',
    count: 1,
    countSub: '$50',
    status: 'Approved',
    details: [
      { label: 'Draft', value: '(0)' },
      { label: 'Changes requested', value: '(0)' },
    ],
    icon: '🔍',
    arrow: true,
  },
  {
    label: 'Jobs',
    topColor: '#15803d',
    count: 0,
    countSub: null,
    status: 'Requires invoicing',
    details: [
      { label: 'Active', value: '(0)' },
      { label: 'Action required', value: '(0)' },
    ],
    icon: '🔧',
    arrow: true,
  },
  {
    label: 'Invoices',
    topColor: '#1d4ed8',
    count: 0,
    countSub: null,
    status: 'Awaiting payment',
    details: [
      { label: 'Draft (1)', value: '$101' },
      { label: 'Past due (0)', value: '' },
    ],
    icon: '💵',
  },
]

function WorkflowCard({ card }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      flex: 1,
      overflow: 'hidden',
      minWidth: 0,
    }}>
      {/* Colored top bar */}
      <div style={{ height: 4, background: card.topColor }} />
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: '#6b7280',
          fontSize: 13,
          marginBottom: 12,
          fontWeight: 500,
        }}>
          <span>{card.icon}</span>
          <span>{card.label}</span>
          {card.arrow && <ChevronRight size={14} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: '#111827', lineHeight: 1 }}>
            {card.count}
          </span>
          {card.countSub && (
            <span style={{ fontSize: 14, color: '#6b7280', fontWeight: 400 }}>{card.countSub}</span>
          )}
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 12 }}>
          {card.status}
        </div>
        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {card.details.map(d => (
            <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6b7280' }}>
              <span>{d.label}</span>
              <span style={{ fontWeight: d.value && d.value !== '' ? 500 : 400 }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CashflowCard({ title, subtitle, main, sub, sub2 }) {
  return (
    <div className="metric-card" style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{subtitle}</div>}
        </div>
        <ChevronRight size={16} color="#9ca3af" />
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>{main}</div>
        {sub && <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{sub}</div>}
        {sub2 && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{sub2}</div>}
      </div>
    </div>
  )
}

// Static SVG heatmap (Burlington/Hamilton Ontario area)
function RevenueHeatmap() {
  return (
    <div style={{ position: 'relative', background: '#b8d8e8', borderRadius: 6, overflow: 'hidden', height: 340 }}>
      <svg width="100%" height="100%" viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
        {/* Lake Ontario — bottom right */}
        <rect x="0" y="0" width="1200" height="340" fill="#a8d4e8" />

        {/* Land masses */}
        <polygon points="0,0 1200,0 1200,120 900,110 700,130 500,140 300,160 100,200 0,240" fill="#d4e8c0" />
        <polygon points="0,0 0,240 100,200 150,170 80,140 0,100" fill="#cce0b5" />
        <polygon points="0,0 200,0 200,80 100,100 0,100" fill="#c8dbb0" />
        <polygon points="200,0 600,0 600,60 400,70 300,90 200,80" fill="#d4e8c0" />
        <polygon points="600,0 900,0 900,50 750,65 680,80 600,60" fill="#cce0b5" />
        <polygon points="900,0 1200,0 1200,40 1050,60 900,50" fill="#d4e8c0" />

        {/* Fields / terrain variation */}
        <ellipse cx="350" cy="60" rx="120" ry="40" fill="#c0d8a8" opacity="0.5" />
        <ellipse cx="700" cy="40" rx="90" ry="30" fill="#c8e0b0" opacity="0.4" />
        <rect x="80" y="20" width="80" height="60" rx="4" fill="#c0d5aa" opacity="0.4" />

        {/* Major roads/highways */}
        {/* Highway 403 */}
        <path d="M 150 200 Q 400 180 600 160 Q 750 145 900 130" stroke="#c8c8c8" strokeWidth="3" fill="none" />
        {/* QEW */}
        <path d="M 0 230 Q 200 210 400 190 Q 600 170 800 150 Q 950 135 1100 120" stroke="#d4c48a" strokeWidth="3.5" fill="none" />
        {/* Highway 407 */}
        <path d="M 300 100 Q 500 85 700 80 Q 850 78 1000 70" stroke="#c8c8c8" strokeWidth="2.5" fill="none" />
        {/* Highway 97 */}
        <path d="M 0 60 Q 80 80 100 150 Q 110 200 120 250" stroke="#c8c8c8" strokeWidth="2.5" fill="none" />
        {/* Highway 8 */}
        <path d="M 0 280 Q 100 260 200 240 Q 280 220 350 200" stroke="#c8c8c8" strokeWidth="2" fill="none" />
        {/* Highway 5 */}
        <path d="M 250 170 Q 350 160 450 155 Q 550 150 650 148" stroke="#c8c8c8" strokeWidth="2" fill="none" />
        {/* Local roads */}
        <line x1="450" y1="130" x2="450" y2="220" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="600" y1="120" x2="600" y2="200" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="300" y1="150" x2="300" y2="250" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="750" y1="120" x2="750" y2="200" stroke="#d1d5db" strokeWidth="1.5" />

        {/* Highway markers */}
        {[
          { x: 85, y: 58, num: '97' },
          { x: 148, y: 58, num: '97' },
          { x: 275, y: 85, num: '6' },
          { x: 405, y: 62, num: '6' },
          { x: 620, y: 62, num: '5' },
          { x: 685, y: 62, num: '5' },
          { x: 720, y: 78, num: '407' },
          { x: 865, y: 83, num: '403' },
          { x: 112, y: 265, num: '8' },
          { x: 455, y: 163, num: '5' },
        ].map(({ x, y, num }) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 12} y={y - 9} width={24} height={18} rx={3} fill="white" stroke="#d1d5db" strokeWidth="1" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#555">{num}</text>
          </g>
        ))}

        {/* Highway 8 sign */}
        <g>
          <rect x="88" y="271" width="20" height="16" rx="3" fill="white" stroke="#d1d5db" strokeWidth="1" />
          <text x="98" y="283" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#555">8</text>
        </g>

        {/* City labels */}
        {[
          { x: 700, y: 160, name: 'Burlington', big: true },
          { x: 960, y: 170, name: 'HAMILTON' },
          { x: 906, y: 120, name: 'BRONTE' },
          { x: 855, y: 137, name: 'SHOREACRES' },
          { x: 820, y: 103, name: 'ELIZABETH\nGARDENS' },
          { x: 1020, y: 100, name: 'WEST OAKVILLE' },
          { x: 600, y: 108, name: 'Highview\nSurvey' },
          { x: 265, y: 168, name: 'WESTOVER' },
          { x: 430, y: 148, name: 'FLAMBOROUGH' },
          { x: 165, y: 103, name: 'VALENS' },
          { x: 397, y: 73, name: 'CARLISLE' },
          { x: 155, y: 182, name: 'ROCKTON' },
          { x: 447, y: 220, name: 'MILLGROVE' },
          { x: 647, y: 180, name: 'ALDERSHOT' },
          { x: 660, y: 196, name: 'BURLINGTON\nBEACH' },
        ].map(({ x, y, name, big }) => (
          <text key={name} x={x} y={y} textAnchor="middle" fontSize={big ? 14 : 10}
            fontWeight={big ? 700 : 500} fill={big ? '#1a2b3c' : '#555'} letterSpacing="0.5">
            {name}
          </text>
        ))}

        {/* Google watermark area */}
        <rect x="10" y="315" width="80" height="18" rx="2" fill="rgba(255,255,255,0.7)" />
        <text x="50" y="328" textAnchor="middle" fontSize="9" fill="#555" fontStyle="italic">Google</text>
        <text x="1100" y="335" fontSize="9" fill="#666">Map data ©2026 Google</text>
      </svg>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        right: 16,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        padding: '12px 14px',
        fontSize: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        minWidth: 130,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 8, color: '#111827' }}>Revenue</div>
        {[
          { color: '#e8eaf6', label: '$0 - $250' },
          { color: '#c5cae9', label: '$250 - $500' },
          { color: '#9fa8da', label: '$500 - $750' },
          { color: '#5c6bc0', label: '$750 - $1,000' },
          { color: '#3949ab', label: '$1,000+' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 14, height: 14, background: color, borderRadius: 2, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
            <span style={{ color: '#374151' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureSpotlight({ navigate }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const dismiss = () => {
    localStorage.setItem('featureSpotlightDismissed', 'true')
    setDismissed(true)
  }

  return (
    <div style={{ marginBottom: 32, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#6b7280' }}>✦ What's New in ServiceTitan</span>
        <button
          onClick={dismiss}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#9ca3af', padding: '2px 4px', fontSize: 16, lineHeight: 1,
            marginLeft: 'auto',
          }}
          title="Dismiss"
        >
          ×
        </button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Discount Rules card */}
        <div style={{
          flex: 1, background: '#fff', border: '1px solid #e5e7eb',
          borderLeft: '4px solid #f59e0b', borderRadius: 8, padding: '16px 20px',
          display: 'flex', alignItems: 'flex-start', gap: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: '#fef3c7',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Tag size={20} color="#f59e0b" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>Discount Rules</div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 10 }}>
              Automate discounts based on date, service, or client — no manual overrides needed.
            </div>
            <button
              onClick={() => navigate('discount-rules')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#f59e0b', fontWeight: 700, fontSize: 13, padding: 0,
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              Try it →
            </button>
          </div>
        </div>

        {/* Profitability Layer card */}
        <div style={{
          flex: 1, background: '#fff', border: '1px solid #e5e7eb',
          borderLeft: '4px solid #1e7ad6', borderRadius: 8, padding: '16px 20px',
          display: 'flex', alignItems: 'flex-start', gap: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: '#eff6ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <TrendingUp size={20} color="#1e7ad6" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>Profitability Layer</div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 10 }}>
              See real margin data per service and spot under-priced jobs before they cost you.
            </div>
            <button
              onClick={() => navigate('profitability-layer')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#1e7ad6', fontWeight: 700, fontSize: 13, padding: 0,
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              Explore →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ navigate }) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="page-content">
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderBottom: '1px solid #e5e7eb', width: 'fit-content' }}>
        {['First Steps', 'Dashboard'].map(tab => {
          const key = tab.toLowerCase().replace(' ', '-')
          const isActive = (tab === 'Dashboard' && activeTab === 'dashboard') || (tab === 'First Steps' && activeTab === 'first-steps')
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab === 'Dashboard' ? 'dashboard' : 'first-steps')}
              style={{
                background: 'transparent',
                border: '1px solid transparent',
                borderBottom: isActive ? '2px solid #1e7ad6' : '2px solid transparent',
                borderRadius: isActive ? '6px 6px 0 0' : '6px 6px 0 0',
                borderColor: isActive ? '#e5e7eb' : 'transparent',
                borderBottomColor: isActive ? '#1e7ad6' : 'transparent',
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 14,
                color: isActive ? '#1e7ad6' : '#6b7280',
                cursor: 'pointer',
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>{dateStr}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#111827' }}>{greeting}, Rishabh</div>
      </div>

      {/* Feature Spotlight */}
      {!localStorage.getItem('featureSpotlightDismissed') && (
        <FeatureSpotlight navigate={navigate} />
      )}

      {/* Workflow section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Workflow</h2>
        <div style={{ display: 'flex', gap: 1, borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          {workflowCards.map((card, i) => (
            <div key={card.label} style={{ flex: 1, minWidth: 0 }}>
              <WorkflowCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Two column layout: Appointments + Business Performance */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Today's appointments</h2>
          <div className="card" style={{ padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14 }}>
            No appointments scheduled for today
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Business Performance</h2>
          <div className="card" style={{ padding: 20 }}>
            {[
              { label: 'Revenue this month', value: '$0', sub: '0% vs last month' },
              { label: 'Jobs completed', value: '0', sub: '0% vs last month' },
              { label: 'New clients', value: '4', sub: 'This month' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#374151', fontSize: 14 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{item.sub}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Heatmap */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>Revenue heatmap</h2>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 12,
            color: '#1e7ad6',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}>
            📅 Feb 1, 2026 - Feb 28, 2026
          </button>
        </div>
        <RevenueHeatmap />
      </div>

      {/* Cashflow */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Cashflow</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <CashflowCard title="Receivables" main="$0" sub="0 clients owe you" />
          <CashflowCard title="Projected Income" main="$—" sub="Due today" />
          <CashflowCard title="Invoice payment time" subtitle="Past 30 days" main="—%" />
        </div>
      </div>
    </div>
  )
}
