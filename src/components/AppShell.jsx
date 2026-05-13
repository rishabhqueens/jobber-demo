import TopNav from './TopNav'

export default function AppShell({ page, navigate, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopNav page={page} navigate={navigate} />
      <div style={{ flex: 1, overflow: 'auto', background: '#f4f5f7' }}>
        {children}
      </div>
    </div>
  )
}
