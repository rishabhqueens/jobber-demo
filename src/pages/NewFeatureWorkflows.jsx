import { Receipt, Tag, AlertCircle, Sparkles, ArrowRight, Layers, FileText, ExternalLink, ListTree } from 'lucide-react'

const FEATURES = [
  {
    id: 'invoicing',
    icon: Receipt,
    title: 'New Invoicing',
    target: 'invoices',
    cta: 'Open Billing',
    problem: [
      'Service businesses bill across many job types — recurring visits, parts, labor, change orders — and stitch them together by hand at month-end.',
      'Errors, duplicate invoices, and slow collections directly hit cash flow.',
    ],
    helps: [
      'A single Billing inbox splits work into Work Not Invoiced, Unpaid Invoices, and Paid Invoices so techs and ops see the same status.',
      'One-click Create Invoice carries job line items, taxes, and customer details forward — no re-keying.',
      'Date-range filters and Excel export make collections and reconciliation a five-minute task instead of a half-day.',
    ],
    subFeatures: [
      {
        icon: Layers,
        title: 'Standard or Tiered invoice',
        body: 'Pick Standard for a single line-item invoice, or Tiered to bill across multiple stages of a job (deposit → progress → final). The tiered editor reconciles stage amounts against the project total automatically.',
      },
      {
        icon: ListTree,
        title: 'Break down the price of an item',
        body: 'Expand any line item into labor, materials, travel, equipment, and permit/disposal rows. The unit price auto-sums from the breakdown, and a per-item toggle controls whether the customer sees the breakdown or just the rolled-up price.',
      },
      {
        icon: ExternalLink,
        title: 'Pass an external invoice to the client',
        body: 'Drop in third-party costs (a sub-contractor PDF, a parts vendor receipt) as a pass-through line. The amount is excluded from your taxes and discounts and shows up on the customer invoice as a separate, attributed line.',
      },
      {
        icon: FileText,
        title: 'Save as draft or send',
        body: 'Stage work in a draft until billing is ready. Drafts land under "Work Not Invoiced"; once sent, they move into "Unpaid Invoices" and feed the totals on the Billing page.',
      },
    ],
  },
  {
    id: 'discounts',
    icon: Tag,
    title: 'Global Discount Rules',
    target: 'discount-rules',
    cta: 'Open Discounts',
    problem: [
      'Promos and customer-segment pricing live in spreadsheets, sticky notes, and individual reps\' heads.',
      'When a campaign launches or expires, every invoice and quote has to be touched manually — and rules silently drift out of sync.',
    ],
    helps: [
      'One place to define discounts that apply automatically across invoices, quotes, and jobs — by date range, service type, or customer segment.',
      'Stacking and exclusion controls prevent surprise margin hits when multiple promos overlap.',
      'Schedule, draft, or activate rules so seasonal campaigns turn on and off without operator intervention.',
    ],
  },
]

function Section({ icon, eyebrow, items }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {icon}
        <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {eyebrow}
        </span>
      </div>
      <ul style={{ paddingLeft: 22, margin: 0, color: '#374151', fontSize: 14, lineHeight: 1.6 }}>
        {items.map((t, i) => <li key={i} style={{ marginBottom: 6 }}>{t}</li>)}
      </ul>
    </div>
  )
}

function FeatureCard({ feature, navigate }) {
  const Icon = feature.icon
  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
      padding: 28, display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, background: '#eff6ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={22} color="#1e7ad6" />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#1e7ad6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            New feature
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>{feature.title}</div>
        </div>
      </div>

      <Section
        icon={<AlertCircle size={16} color="#b91c1c" />}
        eyebrow="What's the problem"
        items={feature.problem}
      />

      <Section
        icon={<Sparkles size={16} color="#1e7ad6" />}
        eyebrow="How this feature helps"
        items={feature.helps}
      />

      {feature.subFeatures && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              What's inside
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {feature.subFeatures.map((sf, i) => {
              const SfIcon = sf.icon
              return (
                <div key={i} style={{
                  display: 'flex', gap: 12,
                  background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8,
                  padding: '12px 14px',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, background: '#eff6ff',
                    border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <SfIcon size={14} color="#1e7ad6" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 2 }}>{sf.title}</div>
                    <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{sf.body}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <button className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: 14, padding: '10px 18px' }}
        onClick={() => navigate(feature.target)}>
        {feature.cta} <ArrowRight size={14} />
      </button>
    </div>
  )
}

export default function NewFeatureWorkflows({ navigate }) {
  return (
    <div className="page-content" style={{ maxWidth: 1100 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Read Here</h1>
        <div style={{ fontSize: 14, color: '#6b7280' }}>
          What's new in ServiceTitan — what each feature solves and how it helps your team.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 20 }}>
        {FEATURES.map(f => <FeatureCard key={f.id} feature={f} navigate={navigate} />)}
      </div>
    </div>
  )
}
