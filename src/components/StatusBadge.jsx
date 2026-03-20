const config = {
  'Draft':            { bg: '#f3f4f6', text: '#374151', dot: '#9ca3af' },
  'Sent':             { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  'Past due':         { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' },
  'Paid':             { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  'Approved':         { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  'Awaiting response':{ bg: '#fffbeb', text: '#92400e', dot: '#f59e0b' },
  'Changes requested':{ bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' },
}

export default function StatusBadge({ status }) {
  const { bg, text, dot } = config[status] || config['Draft']
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: bg,
      color: text,
      borderRadius: 20,
      padding: '3px 10px',
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}
