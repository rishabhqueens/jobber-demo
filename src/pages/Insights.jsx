import { useState } from 'react'
import { ChevronRight, Calendar, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'

// ─── Demo data ───────────────────────────────────────────────────────────────

const monthlyRevenue = [
  { month: 'Apr', short: 'Apr', revenue: 1820, jobs: 6 },
  { month: 'May', short: 'May', revenue: 2640, jobs: 9 },
  { month: 'Jun', short: 'Jun', revenue: 3150, jobs: 11 },
  { month: 'Jul', short: 'Jul', revenue: 2780, jobs: 8 },
  { month: 'Aug', short: 'Aug', revenue: 4220, jobs: 14 },
  { month: 'Sep', short: 'Sep', revenue: 3870, jobs: 13 },
  { month: 'Oct', short: 'Oct', revenue: 5140, jobs: 17 },
  { month: 'Nov', short: 'Nov', revenue: 4620, jobs: 15 },
  { month: 'Dec', short: 'Dec', revenue: 5830, jobs: 19 },
  { month: 'Jan', short: 'Jan', revenue: 3940, jobs: 12 },
  { month: 'Feb', short: 'Feb', revenue: 3390, jobs: 11 },
  { month: 'Mar', short: 'Mar', revenue: 4750, jobs: 16 },
]

const totalRevenue = monthlyRevenue.reduce((s, d) => s + d.revenue, 0)
const prevTotalRevenue = 38200
const revenueGrowth = (((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100).toFixed(1)

const revenueByCategory = [
  { label: 'Lawn care',            value: 12400, pct: 28, color: '#3d8b37' },
  { label: 'Property maintenance', value: 9800,  pct: 22, color: '#16a34a' },
  { label: 'Snow removal',         value: 7600,  pct: 17, color: '#4ade80' },
  { label: 'Fertilization',        value: 6200,  pct: 14, color: '#86efac' },
  { label: 'Consulting',           value: 5100,  pct: 11, color: '#bbf7d0' },
  { label: 'Other',                value: 3060,  pct: 8,  color: '#d1fae5' },
]

const topClients = [
  { name: 'Daniel Brooks',  jobs: 14, revenue: 8420, growth: 12.4 },
  { name: 'Geof Goons',    jobs: 11, revenue: 5840, growth: -3.2 },
  { name: 'Sarah Chen',     jobs: 9,  revenue: 4380, growth: 22.1 },
  { name: 'Olivia Green',   jobs: 8,  revenue: 3110, growth: 8.7 },
]

const jobStats = [
  { label: 'Completed',   value: 131, color: '#3d8b37', pct: 73 },
  { label: 'In Progress', value: 24,  color: '#f59e0b', pct: 13 },
  { label: 'Scheduled',   value: 19,  color: '#3b82f6', pct: 11 },
  { label: 'Cancelled',   value: 6,   color: '#ef4444', pct: 3  },
]
const totalJobs = jobStats.reduce((s, d) => s + d.value, 0)

const quotePipeline = [
  { label: 'Created',  value: 58, color: '#6b7280' },
  { label: 'Sent',     value: 41, color: '#3b82f6' },
  { label: 'Approved', value: 28, color: '#3d8b37' },
  { label: 'Declined', value: 9,  color: '#ef4444' },
]

const receivables = [
  { client: 'Daniel Brooks', amount: 380.00, due: 'Overdue 14 days', urgent: true },
  { client: 'Olivia Green',  amount: 245.00, due: 'Due Mar 30, 2026', urgent: false },
  { client: 'Geof Goons',   amount: 100.80, due: 'Overdue 5 days',  urgent: true },
  { client: 'Sarah Chen',    amount: 620.00, due: 'Due Apr 8, 2026',  urgent: false },
]

const projectedIncome = [
  { month: 'Mar 2026', expected: 4750, received: 2100 },
  { month: 'Apr 2026', expected: 5200, received: 0    },
  { month: 'May 2026', expected: 4800, received: 0    },
]

// ─── Chart components ─────────────────────────────────────────────────────────

function BarChart({ data, highlight }) {
  const max = Math.max(...data.map(d => d.revenue))
  const chartH = 140
  const barW = 42
  const gap = 12
  const padL = 8
  const totalW = data.length * (barW + gap) - gap + padL * 2

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH + 48}`} width="100%" style={{ overflow: 'visible' }}>
      {/* Horizontal grid lines */}
      {[0.25, 0.5, 0.75, 1].map(pct => (
        <line
          key={pct}
          x1={padL} x2={totalW - padL}
          y1={chartH - pct * chartH} y2={chartH - pct * chartH}
          stroke="#f3f4f6" strokeWidth="1"
        />
      ))}
      {data.map((d, i) => {
        const x = padL + i * (barW + gap)
        const h = Math.max((d.revenue / max) * chartH, 4)
        const y = chartH - h
        const isHighlight = d.month === highlight
        return (
          <g key={d.month}>
            {/* Bar shadow */}
            <rect x={x + 2} y={y + 2} width={barW} height={h} fill="rgba(0,0,0,0.04)" rx={4} />
            {/* Bar */}
            <rect
              x={x} y={y} width={barW} height={h}
              fill={isHighlight ? '#2f7029' : '#3d8b37'} rx={4}
              opacity={isHighlight ? 1 : 0.82}
            />
            {/* Revenue label above bar */}
            <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="500">
              ${(d.revenue / 1000).toFixed(1)}k
            </text>
            {/* Month label */}
            <text x={x + barW / 2} y={chartH + 18} textAnchor="middle" fontSize="11" fill="#9ca3af">
              {d.month}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Sparkline({ values, color = '#3d8b37', height = 36, width = 100 }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function DonutChart({ segments, size = 120 }) {
  const r = 42
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  let offset = 0
  const total = segments.reduce((s, d) => s + d.pct, 0)

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="16" />
      {segments.map((seg) => {
        const dash = (seg.pct / total) * circumference
        const gap = circumference - dash
        const el = (
          <circle
            key={seg.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="16"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        )
        offset += dash
        return el
      })}
    </svg>
  )
}

function FunnelBar({ label, value, max, color, total }) {
  const pct = Math.round((value / total) * 100)
  const barPct = (value / max) * 100
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13 }}>
        <span style={{ color: '#374151', fontWeight: 500 }}>{label}</span>
        <span style={{ color: '#111827', fontWeight: 700 }}>{value} <span style={{ color: '#9ca3af', fontWeight: 400 }}>({pct}%)</span></span>
      </div>
      <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${barPct}%`, background: color, borderRadius: 4, transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}

// ─── Heatmap (reused from Dashboard) ─────────────────────────────────────────

function RevenueHeatmap() {
  return (
    <div style={{ position: 'relative', background: '#b8d8e8', borderRadius: 6, overflow: 'hidden', height: 340 }}>
      <svg width="100%" height="100%" viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
        <rect x="0" y="0" width="1200" height="340" fill="#a8d4e8" />
        <polygon points="0,0 1200,0 1200,120 900,110 700,130 500,140 300,160 100,200 0,240" fill="#d4e8c0" />
        <polygon points="0,0 0,240 100,200 150,170 80,140 0,100" fill="#cce0b5" />
        <polygon points="0,0 200,0 200,80 100,100 0,100" fill="#c8dbb0" />
        <polygon points="200,0 600,0 600,60 400,70 300,90 200,80" fill="#d4e8c0" />
        <polygon points="600,0 900,0 900,50 750,65 680,80 600,60" fill="#cce0b5" />
        <polygon points="900,0 1200,0 1200,40 1050,60 900,50" fill="#d4e8c0" />
        <ellipse cx="350" cy="60" rx="120" ry="40" fill="#c0d8a8" opacity="0.5" />
        <ellipse cx="700" cy="40" rx="90" ry="30" fill="#c8e0b0" opacity="0.4" />
        {/* Revenue heat blobs */}
        <circle cx="720" cy="155" r="28" fill="#5c6bc0" opacity="0.55" />
        <circle cx="670" cy="185" r="18" fill="#3949ab" opacity="0.5" />
        <circle cx="600" cy="160" r="14" fill="#9fa8da" opacity="0.5" />
        <circle cx="455" cy="195" r="10" fill="#c5cae9" opacity="0.5" />
        <circle cx="300" cy="200" r="8" fill="#c5cae9" opacity="0.4" />
        {/* Roads */}
        <path d="M 150 200 Q 400 180 600 160 Q 750 145 900 130" stroke="#c8c8c8" strokeWidth="3" fill="none" />
        <path d="M 0 230 Q 200 210 400 190 Q 600 170 800 150 Q 950 135 1100 120" stroke="#d4c48a" strokeWidth="3.5" fill="none" />
        <path d="M 300 100 Q 500 85 700 80 Q 850 78 1000 70" stroke="#c8c8c8" strokeWidth="2.5" fill="none" />
        <path d="M 0 60 Q 80 80 100 150 Q 110 200 120 250" stroke="#c8c8c8" strokeWidth="2.5" fill="none" />
        <path d="M 0 280 Q 100 260 200 240 Q 280 220 350 200" stroke="#c8c8c8" strokeWidth="2" fill="none" />
        <path d="M 250 170 Q 350 160 450 155 Q 550 150 650 148" stroke="#c8c8c8" strokeWidth="2" fill="none" />
        <line x1="450" y1="130" x2="450" y2="220" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="600" y1="120" x2="600" y2="200" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="300" y1="150" x2="300" y2="250" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="750" y1="120" x2="750" y2="200" stroke="#d1d5db" strokeWidth="1.5" />
        {[
          { x: 85, y: 58, num: '97' }, { x: 148, y: 58, num: '97' }, { x: 275, y: 85, num: '6' },
          { x: 405, y: 62, num: '6' }, { x: 620, y: 62, num: '5' }, { x: 685, y: 62, num: '5' },
          { x: 720, y: 78, num: '407' }, { x: 865, y: 83, num: '403' }, { x: 455, y: 163, num: '5' },
        ].map(({ x, y, num }) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 12} y={y - 9} width={24} height={18} rx={3} fill="white" stroke="#d1d5db" strokeWidth="1" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#555">{num}</text>
          </g>
        ))}
        {[
          { x: 700, y: 160, name: 'Burlington', big: true }, { x: 960, y: 175, name: 'HAMILTON' },
          { x: 906, y: 120, name: 'BRONTE' }, { x: 855, y: 137, name: 'SHOREACRES' },
          { x: 1020, y: 100, name: 'WEST OAKVILLE' }, { x: 600, y: 108, name: 'Highview Survey' },
          { x: 265, y: 168, name: 'WESTOVER' }, { x: 430, y: 148, name: 'FLAMBOROUGH' },
          { x: 165, y: 103, name: 'VALENS' }, { x: 397, y: 73, name: 'CARLISLE' },
          { x: 155, y: 182, name: 'ROCKTON' }, { x: 447, y: 220, name: 'MILLGROVE' },
          { x: 647, y: 185, name: 'ALDERSHOT' }, { x: 660, y: 198, name: 'BURLINGTON BEACH' },
          { x: 820, y: 103, name: 'ELIZABETH GARDENS' },
        ].map(({ x, y, name, big }) => (
          <text key={name} x={x} y={y} textAnchor="middle" fontSize={big ? 14 : 9}
            fontWeight={big ? 700 : 500} fill={big ? '#1a2b3c' : '#555'} letterSpacing="0.5">
            {name}
          </text>
        ))}
        <rect x="10" y="315" width="80" height="18" rx="2" fill="rgba(255,255,255,0.7)" />
        <text x="50" y="328" textAnchor="middle" fontSize="9" fill="#555" fontStyle="italic">Google</text>
        <text x="900" y="335" fontSize="9" fill="#666">Keyboard shortcuts   Map data ©2026 Google   Terms   Report a map error</text>
      </svg>
      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 24, right: 16, background: '#fff',
        border: '1px solid #e5e7eb', borderRadius: 6, padding: '12px 14px',
        fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 130,
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

// ─── Sub-page sections ────────────────────────────────────────────────────────

function OverviewTab() {
  const sparkVals = monthlyRevenue.map(d => d.revenue)
  return (
    <div>
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          {
            label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(1)}k`,
            sub: `+${revenueGrowth}% vs last year`, up: true,
            spark: sparkVals, color: '#3d8b37',
          },
          {
            label: 'Avg Invoice Value', value: '$285',
            sub: '+8.2% vs last year', up: true,
            spark: [220, 240, 255, 270, 280, 265, 290, 285, 310, 295, 280, 285], color: '#3d8b37',
          },
          {
            label: 'Jobs Completed', value: `${totalJobs}`,
            sub: '+14.3% vs last year', up: true,
            spark: [6, 9, 11, 8, 14, 13, 17, 15, 19, 12, 11, 16], color: '#3d8b37',
          },
          {
            label: 'New Clients', value: '4',
            sub: '-1 vs last year', up: false,
            spark: [3, 5, 4, 6, 3, 7, 5, 4, 6, 3, 2, 4], color: '#f59e0b',
          },
        ].map(({ label, value, sub, up, spark, color }) => (
          <div key={label} className="metric-card">
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 4 }}>{value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              {up ? <TrendingUp size={13} color="#15803d" /> : <TrendingDown size={13} color="#b91c1c" />}
              <span style={{ fontSize: 12, color: up ? '#15803d' : '#b91c1c', fontWeight: 600 }}>{sub}</span>
            </div>
            <Sparkline values={spark} color={color} width={120} height={36} />
          </div>
        ))}
      </div>

      {/* Revenue heatmap */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#111827' }}>Revenue heatmap</h2>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, background: 'none',
            border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 10px',
            fontSize: 12, color: '#3d8b37', cursor: 'pointer', textDecoration: 'underline',
          }}>
            <Calendar size={12} /> Feb 1, 2026 - Feb 28, 2026
          </button>
        </div>
        <RevenueHeatmap />
      </div>

      {/* Revenue trend + Category split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>Monthly Revenue</h3>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>Apr 2025 – Mar 2026</span>
          </div>
          <BarChart data={monthlyRevenue} highlight="Mar" />
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Revenue by Category</h3>
          {revenueByCategory.map(({ label, value, pct, color }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
                  <span style={{ color: '#374151' }}>{label}</span>
                </div>
                <span style={{ color: '#111827', fontWeight: 600 }}>
                  ${value.toLocaleString()} <span style={{ color: '#9ca3af', fontWeight: 400 }}>({pct}%)</span>
                </span>
              </div>
              <div style={{ height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct * 2.5}%`, background: color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cashflow section */}
      <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Cashflow</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <CashflowReceivables />
        <CashflowProjected />
        <CashflowPaymentTime />
      </div>
    </div>
  )
}

function CashflowReceivables() {
  const total = receivables.reduce((s, r) => s + r.amount, 0)
  const overdue = receivables.filter(r => r.urgent).reduce((s, r) => s + r.amount, 0)
  return (
    <div className="metric-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Receivables</div>
        <ChevronRight size={16} color="#9ca3af" />
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, color: '#111827', marginBottom: 4 }}>
        ${total.toFixed(2)}
      </div>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
        {receivables.length} clients owe you
      </div>
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>Overdue</span>
          <span style={{ fontWeight: 700, color: '#ef4444' }}>${overdue.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
          <span style={{ color: '#6b7280' }}>Current</span>
          <span style={{ fontWeight: 600, color: '#374151' }}>${(total - overdue).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

function CashflowProjected() {
  return (
    <div className="metric-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Projected Income</div>
        <ChevronRight size={16} color="#9ca3af" />
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, color: '#111827', marginBottom: 4 }}>$14,750</div>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>Next 30 days</div>
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
        {projectedIncome.map(({ month, expected, received }) => (
          <div key={month} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
              <span style={{ color: '#374151' }}>{month}</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>${expected.toLocaleString()}</span>
            </div>
            <div style={{ height: 5, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(received / expected) * 100}%`, background: '#3d8b37', borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CashflowPaymentTime() {
  const times = [38, 32, 29, 41, 27, 33, 28, 24, 31, 26, 22, 28]
  const avg = Math.round(times.reduce((s, v) => s + v, 0) / times.length)
  return (
    <div className="metric-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Invoice payment time</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Past 30 days</div>
        </div>
        <ChevronRight size={16} color="#9ca3af" />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 30, fontWeight: 900, color: '#111827' }}>{avg}</span>
        <span style={{ fontSize: 16, color: '#6b7280' }}>days</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, background: '#dcfce7', color: '#15803d', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>
          <TrendingDown size={11} /> 4 days faster
        </span>
      </div>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>avg days to payment</div>
      <Sparkline values={times} width={200} height={40} />
    </div>
  )
}

function RevenueTab() {
  return (
    <div>
      {/* Big revenue number */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue',      value: `$${(totalRevenue / 1000).toFixed(1)}k`, sub: `+${revenueGrowth}% vs last year`, up: true },
          { label: 'Avg Invoice Value',  value: '$285', sub: '+8.2% vs last year', up: true },
          { label: 'Highest Month',      value: '$5,830', sub: 'December 2025', up: null },
        ].map(({ label, value, sub, up }) => (
          <div key={label} className="metric-card">
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#111827', marginBottom: 4 }}>{value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              {up !== null && (up
                ? <TrendingUp size={13} color="#15803d" />
                : <TrendingDown size={13} color="#b91c1c" />
              )}
              <span style={{ color: up ? '#15803d' : up === null ? '#9ca3af' : '#b91c1c', fontWeight: 600 }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full year bar chart */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>Revenue over time</h3>
          <div className="filter-chip" style={{ fontSize: 12 }}>Apr 2025 – Mar 2026</div>
        </div>
        <BarChart data={monthlyRevenue} highlight="Dec" />
      </div>

      {/* Revenue by category + Top clients */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Revenue by Service</h3>
          {revenueByCategory.map(({ label, value, pct, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{label}</span>
              <span style={{ fontSize: 13, color: '#9ca3af' }}>{pct}%</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#111827', minWidth: 70, textAlign: 'right' }}>${value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Top Clients by Revenue</h3>
          {topClients.map(({ name, jobs, revenue, growth }) => (
            <div key={name} style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
              paddingBottom: 14, borderBottom: '1px solid #f3f4f6',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#f0fdf4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#15803d', flexShrink: 0,
              }}>
                {name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{jobs} jobs</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>${revenue.toLocaleString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', fontSize: 11 }}>
                  {growth > 0
                    ? <><ArrowUpRight size={11} color="#15803d" /><span style={{ color: '#15803d' }}>+{growth}%</span></>
                    : <><ArrowDownRight size={11} color="#b91c1c" /><span style={{ color: '#b91c1c' }}>{growth}%</span></>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CashflowTab() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <CashflowReceivables />
        <CashflowProjected />
        <CashflowPaymentTime />
      </div>

      {/* Receivables detail table */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>Outstanding Invoices</h3>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>{receivables.length} invoices</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Client', 'Due date', 'Amount', 'Status'].map((h, i) => (
                <th key={h} style={{ padding: '8px 12px', fontWeight: 600, color: '#6b7280', fontSize: 12, textAlign: i >= 2 ? 'right' : 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {receivables.map(({ client, amount, due, urgent }) => (
              <tr key={client} style={{ borderBottom: '1px solid #f9fafb' }}>
                <td style={{ padding: '12px 12px', fontWeight: 600, color: '#111827', fontSize: 13 }}>{client}</td>
                <td style={{ padding: '12px 12px', fontSize: 13, color: urgent ? '#b91c1c' : '#6b7280' }}>{due}</td>
                <td style={{ padding: '12px 12px', textAlign: 'right', fontWeight: 700, fontSize: 13, color: '#111827' }}>${amount.toFixed(2)}</td>
                <td style={{ padding: '12px 12px', textAlign: 'right' }}>
                  <span style={{
                    background: urgent ? '#fef2f2' : '#f0fdf4',
                    color: urgent ? '#b91c1c' : '#15803d',
                    borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600,
                  }}>
                    {urgent ? 'Overdue' : 'Current'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Heatmap */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>Revenue heatmap</h3>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, background: 'none',
            border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 10px',
            fontSize: 12, color: '#3d8b37', cursor: 'pointer', textDecoration: 'underline',
          }}>
            <Calendar size={12} /> Feb 1, 2026 - Feb 28, 2026
          </button>
        </div>
        <RevenueHeatmap />
      </div>
    </div>
  )
}

function WorkTab() {
  const conversionRate = Math.round((quotePipeline[2].value / quotePipeline[0].value) * 100)
  return (
    <div>
      {/* Job stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Jobs', value: totalJobs, sub: '+14.3% vs last year', up: true },
          { label: 'Completed', value: 131, sub: `${Math.round(131/totalJobs*100)}% completion rate`, up: true },
          { label: 'Avg Job Value', value: '$340', sub: '+6.1% vs last year', up: true },
          { label: 'Quotes Won', value: `${conversionRate}%`, sub: 'Conversion rate', up: null },
        ].map(({ label, value, sub, up }) => (
          <div key={label} className="metric-card">
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 4 }}>{value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
              {up !== null && (up ? <TrendingUp size={12} color="#15803d" /> : null)}
              <span style={{ color: up ? '#15803d' : '#9ca3af', fontWeight: up ? 600 : 400 }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Donut + Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Job status donut */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Jobs by Status</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <DonutChart segments={jobStats} size={120} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#111827' }}>{totalJobs}</div>
                <div style={{ fontSize: 10, color: '#9ca3af' }}>total</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {jobStats.map(({ label, value, color, pct }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{label}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>{value}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af', minWidth: 32, textAlign: 'right' }}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote funnel */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Quote Pipeline</h3>
          {quotePipeline.map(({ label, value, color }) => (
            <FunnelBar key={label} label={label} value={value} max={quotePipeline[0].value} color={color} total={quotePipeline[0].value} />
          ))}
          <div style={{
            marginTop: 16, padding: '12px 16px', background: '#f0fdf4', borderRadius: 8,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, color: '#15803d', fontWeight: 600 }}>Conversion rate</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#15803d' }}>{conversionRate}%</span>
          </div>
        </div>
      </div>

      {/* Jobs by month */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Jobs Completed per Month</h3>
        <svg viewBox="0 0 780 140" width="100%" style={{ overflow: 'visible' }}>
          {/* Grid */}
          {[5, 10, 15, 20].map(v => {
            const y = 120 - (v / 20) * 110
            return <g key={v}>
              <line x1="0" x2="780" y1={y} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text x="-4" y={y + 4} textAnchor="end" fontSize="10" fill="#d1d5db">{v}</text>
            </g>
          })}
          {monthlyRevenue.map((d, i) => {
            const x = i * 65 + 10
            const barH = (d.jobs / 20) * 110
            const y = 120 - barH
            return (
              <g key={d.month}>
                <rect x={x} y={y} width={44} height={barH} fill="#3d8b37" rx={3} opacity="0.8" />
                <text x={x + 22} y={133} textAnchor="middle" fontSize="10" fill="#9ca3af">{d.month}</text>
                <text x={x + 22} y={y - 4} textAnchor="middle" fontSize="10" fill="#6b7280">{d.jobs}</text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

function ClientsTab() {
  const newClientsPerMonth = [2, 4, 3, 5, 2, 6, 4, 3, 5, 2, 1, 4]
  const retentionRate = 91
  return (
    <div>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Active Clients', value: '4', sub: 'In your account' },
          { label: 'New Clients (YTD)',    value: '41', sub: '+22% vs last year' },
          { label: 'Retention Rate',       value: `${retentionRate}%`, sub: '-1.2% vs last year' },
          { label: 'Avg Revenue / Client', value: '$11.1k', sub: 'Past 12 months' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="metric-card">
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* New clients bar + Top clients table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>New Clients per Month</h3>
          <svg viewBox="0 0 520 140" width="100%" style={{ overflow: 'visible' }}>
            {[2, 4, 6].map(v => {
              const y = 110 - (v / 6) * 100
              return <line key={v} x1="0" x2="520" y1={y} y2={y} stroke="#f3f4f6" strokeWidth="1" />
            })}
            {newClientsPerMonth.map((v, i) => {
              const x = i * 43 + 4
              const barH = (v / 6) * 100
              const y = 110 - barH
              return (
                <g key={i}>
                  <rect x={x} y={y} width={33} height={barH} fill="#3b82f6" rx={3} opacity="0.8" />
                  <text x={x + 16} y={124} textAnchor="middle" fontSize="10" fill="#9ca3af">
                    {monthlyRevenue[i].month}
                  </text>
                  {v > 0 && <text x={x + 16} y={y - 4} textAnchor="middle" fontSize="10" fill="#6b7280">{v}</text>}
                </g>
              )
            })}
          </svg>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Client Leaderboard</h3>
          {topClients.map(({ name, jobs, revenue, growth }, i) => (
            <div key={name} style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
              paddingBottom: 14, borderBottom: i < topClients.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: i === 0 ? '#fef3c7' : i === 1 ? '#f3f4f6' : '#fff7ed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: i === 0 ? '#d97706' : i === 1 ? '#6b7280' : '#c2410c',
                flexShrink: 0, border: '1px solid rgba(0,0,0,0.06)',
              }}>
                {i + 1}
              </div>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#f0fdf4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#15803d', flexShrink: 0,
              }}>
                {name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{jobs} jobs completed</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>${revenue.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: growth > 0 ? '#15803d' : '#b91c1c' }}>
                  {growth > 0 ? '+' : ''}{growth}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention indicator */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Client Retention</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <DonutChart
              segments={[
                { label: 'Retained', pct: retentionRate, color: '#3d8b37' },
                { label: 'Churned',  pct: 100 - retentionRate, color: '#f3f4f6' },
              ]}
              size={120}
            />
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#111827' }}>{retentionRate}%</div>
              <div style={{ fontSize: 9, color: '#9ca3af' }}>retained</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
              <strong>91%</strong> of clients returned for repeat service this year.
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#3d8b37' }}>37</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Returning clients</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#ef4444' }}>4</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Churned clients</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#3b82f6' }}>41</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>New clients (YTD)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Profitability Tab ────────────────────────────────────────────────────────

function deriveMetrics(s) {
  const totalCost = s.laborCost + s.materialsCost + s.travelCost + s.equipmentCost + s.overhead
  const marginDollar = s.avgSellPrice - totalCost
  const marginPct = s.avgSellPrice > 0 ? Math.round((marginDollar / s.avgSellPrice) * 100) : 0
  return { totalCost, marginDollar, marginPct }
}

function ProfitabilityTab({ services }) {
  const withMetrics = (services || []).map(s => ({ ...s, ...deriveMetrics(s) }))

  const overallMargin = withMetrics.length > 0
    ? Math.round(withMetrics.reduce((s, m) => s + m.marginPct, 0) / withMetrics.length)
    : 0
  const totalRevenue = withMetrics.reduce((s, m) => s + m.avgSellPrice, 0)
  const totalProfit = withMetrics.reduce((s, m) => s + m.marginDollar, 0)
  const belowTarget = withMetrics.filter(m => m.marginPct < m.targetMargin).length
  const discountImpact = 142 // mock value

  const statusColor = (m) =>
    m.marginPct >= m.targetMargin ? '#3d8b37' : m.marginPct > 0 ? '#f59e0b' : '#ef4444'

  const sortedByMargin = [...withMetrics].sort((a, b) => b.marginDollar - a.marginDollar).slice(0, 5)
  const lowMarginAlerts = withMetrics.filter(m => m.marginPct < m.targetMargin)

  const mockTrend = [18, 22, 19, 24, 21, 26, 23, 25, 22, 24, 27, 25]

  const discountImpactRows = [
    { name: 'Spring Promo', mode: 'Automatic', value: '10%', impact: '$68' },
    { name: 'Referral Reward', mode: 'Preset', value: '$25', impact: '$50' },
    { name: 'Lawn Service', mode: 'Automatic', value: '15%', impact: '$24' },
  ]

  return (
    <div>
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Overall Margin %', value: `${overallMargin}%`, color: '#3d8b37', description: 'Avg across all active services' },
          { label: 'Revenue vs Est. Profit', value: `$${totalRevenue} / $${totalProfit}`, color: '#374151', description: 'Total billings vs net after costs' },
          { label: 'Services Below Target', value: `${belowTarget} ⚠`, color: '#d97706', description: 'Services not meeting margin goal ⚠' },
          { label: 'Discount Impact', value: `-$${discountImpact}`, color: '#b91c1c', description: 'Est. revenue lost to active discounts this month' },
        ].map(({ label, value, color, description }) => (
          <div key={label} className="metric-card">
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color, marginBottom: 6 }}>{value}</div>
            <div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.4 }}>{description}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Margin by Service bar chart */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Margin by Service</h3>
          {withMetrics.map(m => (
            <div key={m.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: '#374151', fontWeight: 500 }}>{m.name}</span>
                <span style={{ fontWeight: 700, color: statusColor(m) }}>{m.marginPct}%</span>
              </div>
              <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 4, transition: 'width 0.4s',
                  width: `${Math.max(m.marginPct, 0)}%`,
                  background: statusColor(m),
                }} />
              </div>
              <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 1 }}>
                Target: {m.targetMargin}%
              </div>
            </div>
          ))}
        </div>

        {/* Margin trend sparkline */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 8 }}>Margin Trend</h3>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Apr 2025 – Mar 2026</div>
          <Sparkline values={mockTrend} color="#3d8b37" width={280} height={60} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginTop: 8 }}>
            <span>Apr</span><span>Jul</span><span>Oct</span><span>Jan</span><span>Mar</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Low Margin Alerts */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Low Margin Alerts</h3>
          {lowMarginAlerts.length === 0 ? (
            <div style={{ fontSize: 13, color: '#9ca3af' }}>All services are above target margin.</div>
          ) : (
            lowMarginAlerts.map(m => (
              <div key={m.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px', borderRadius: 6, marginBottom: 8,
                background: '#fef3c7', border: '1px solid #fde68a',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: '#b45309' }}>Target: {m.targetMargin}% | Actual: {m.marginPct}%</div>
                </div>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#b91c1c' }}>{m.marginPct}%</span>
              </div>
            ))
          )}
        </div>

        {/* Top Profitable Services */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Top Profitable Services</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                {['Service', 'Sell Price', 'Margin $', 'Margin %'].map(h => (
                  <th key={h} style={{ padding: '6px 8px', fontSize: 11, fontWeight: 700, color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedByMargin.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                  <td style={{ padding: '10px 8px', fontSize: 13, fontWeight: 600, color: '#111827' }}>{m.name}</td>
                  <td style={{ padding: '10px 8px', fontSize: 13, color: '#374151' }}>${m.avgSellPrice}</td>
                  <td style={{ padding: '10px 8px', fontSize: 13, fontWeight: 700, color: '#15803d' }}>${m.marginDollar}</td>
                  <td style={{ padding: '10px 8px', fontSize: 13, color: statusColor(m) }}>{m.marginPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discount Impact */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Discount Impact</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Rule', 'Mode', 'Value', 'Est. Monthly Impact'].map(h => (
                <th key={h} style={{ padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {discountImpactRows.map(r => (
              <tr key={r.name} style={{ borderBottom: '1px solid #f9fafb' }}>
                <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: '#111827' }}>{r.name}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, color: '#374151' }}>{r.mode}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, color: '#374151' }}>{r.value}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 700, color: '#b91c1c' }}>-{r.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Jobber AI Insights */}
      <div style={{
        background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
        border: '1px solid #fde68a',
        borderRadius: 12,
        padding: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 18 }}>✦</span>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#92400e', margin: 0 }}>Jobber AI Insights</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              border: '#3d8b37',
              bg: '#f0fdf4',
              icon: '📈',
              text: <><strong>Discounts driving bookings:</strong> Spring Promo (10%) added an est. 3 Lawn Mowing jobs in Mar → +$255 revenue. Net impact: +$113 after discount cost.</>,
            },
            {
              border: '#3d8b37',
              bg: '#f0fdf4',
              icon: '✅',
              text: <><strong>Net positive ROI on discounts:</strong> Despite -$142 in discounts issued, new bookings generated +$397 additional revenue — a 2.8× return.</>,
            },
            {
              border: '#f59e0b',
              bg: '#fffbeb',
              icon: '⚠',
              text: <><strong>At-risk service alert:</strong> Window Cleaning margin is 24% — $8 below target. Raising price by $8 would restore target margin without losing clients.</>,
            },
            {
              border: '#3b82f6',
              bg: '#eff6ff',
              icon: '💡',
              text: <><strong>Recommendation:</strong> Extend Spring Promo through April: 4 more projected bookings worth ~$340. Estimated discount cost: $34. Net gain: +$306.</>,
            },
          ].map((insight, i) => (
            <div key={i} style={{
              background: insight.bg,
              borderLeft: `4px solid ${insight.border}`,
              borderRadius: 6,
              padding: '12px 16px',
              fontSize: 13,
              color: '#374151',
              lineHeight: 1.5,
              display: 'flex',
              gap: 10,
            }}>
              <span style={{ flexShrink: 0, fontSize: 15 }}>{insight.icon}</span>
              <span>{insight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Insights page ───────────────────────────────────────────────────────

const TABS = ['Overview', 'Revenue', 'Cashflow', 'Work', 'Clients', 'Profitability']

export default function Insights({ services }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [dateRange, setDateRange] = useState('Apr 2025 – Mar 2026')

  return (
    <div className="page-content">
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111827' }}>Insights</h1>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#fff', border: '1px solid #d1d5db', borderRadius: 6,
          padding: '8px 14px', fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500,
        }}>
          <Calendar size={14} color="#6b7280" />
          {dateRange}
        </button>
      </div>

      {/* Tab nav */}
      <div style={{
        display: 'flex', borderBottom: '1px solid #e5e7eb',
        marginBottom: 28, gap: 0,
      }}>
        {TABS.map(tab => {
          const active = tab === activeTab
          const isProfitability = tab === 'Profitability'
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              title={isProfitability ? 'New: AI-powered margin insights' : undefined}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: active ? '2.5px solid #3d8b37' : '2.5px solid transparent',
                padding: '10px 20px',
                fontWeight: active ? 700 : 500,
                fontSize: 14,
                color: active ? '#3d8b37' : isProfitability ? '#3d8b37' : '#6b7280',
                cursor: 'pointer',
                marginBottom: -1,
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                opacity: isProfitability && !active ? 0.85 : 1,
              }}
            >
              {isProfitability && (
                <span style={{
                  display: 'inline-block',
                  width: 7, height: 7,
                  borderRadius: '50%',
                  background: '#3d8b37',
                  animation: 'pulse-dot 2.2s ease-in-out infinite',
                  flexShrink: 0,
                }} />
              )}
              {tab}
              {isProfitability && (
                <span style={{
                  background: '#fbbf24', color: '#7c2d12', borderRadius: 3,
                  padding: '1px 5px', fontSize: 9, fontWeight: 800,
                }}>NEW</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'Overview'       && <OverviewTab />}
      {activeTab === 'Revenue'        && <RevenueTab />}
      {activeTab === 'Cashflow'       && <CashflowTab />}
      {activeTab === 'Work'           && <WorkTab />}
      {activeTab === 'Clients'        && <ClientsTab />}
      {activeTab === 'Profitability'  && <ProfitabilityTab services={services} />}
    </div>
  )
}
