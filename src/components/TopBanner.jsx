export default function TopBanner() {
  return (
    <div style={{
      background: '#ddeef8',
      borderBottom: '1px solid #c8dff0',
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Jobber circle icon */}
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: '#0f7ec0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        <span style={{ fontSize: 13, color: '#1a2b3c', fontWeight: 500 }}>
          14 days left in trial
        </span>
      </div>
      <button style={{
        background: 'transparent',
        border: '1.5px solid #3d8b37',
        color: '#3d8b37',
        borderRadius: 6,
        padding: '5px 14px',
        fontWeight: 700,
        fontSize: 13,
        cursor: 'pointer',
      }}>
        Choose Plan
      </button>
    </div>
  )
}
