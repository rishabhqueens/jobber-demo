import { useState } from 'react'
import { Plus, Pencil, Trash2, X, ChevronLeft, Tag, Wrench, Users, ChevronDown } from 'lucide-react'

const FALLBACK_SERVICES = [
  { id: 1, name: 'Lawn Mowing' },
  { id: 2, name: 'Hedge Trimming' },
  { id: 3, name: 'Fertilization Treatment' },
  { id: 4, name: 'Snow Removal' },
  { id: 5, name: 'Window Cleaning' },
  { id: 6, name: 'Gutter Cleaning' },
  { id: 7, name: 'Pressure Washing' },
  { id: 8, name: 'Plumbing Repair' },
]

const FALLBACK_CLIENTS = [
  'Geof Goons',
  'Olivia Green',
  'Daniel Brooks',
  'Sarah Chen',
  'Jordan Moss',
  'Dr. Amy Tran',
  'Marcus Reid',
]

// ── Status chip ───────────────────────────────────────────────────────────────

function StatusChip({ status, onClick }) {
  const active = status === 'Active'
  return (
    <button
      onClick={onClick}
      style={{
        padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
        border: 'none', cursor: 'pointer',
        background: active ? '#dcfce7' : '#f3f4f6',
        color: active ? '#15803d' : '#6b7280',
      }}
    >
      {status}
    </button>
  )
}

// ── Summary stat card ─────────────────────────────────────────────────────────

function StatCard({ label, value, color }) {
  return (
    <div className="metric-card" style={{ flex: 1 }}>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: color || '#111827' }}>{value}</div>
    </div>
  )
}

// ── Step breadcrumb ───────────────────────────────────────────────────────────

const STEP_LABELS = ['Type', 'Configure', 'Exclusions', 'Preview', 'Save']

function StepNav({ step, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      <button
        onClick={onBack}
        style={{
          background: 'none', border: '1px solid #e5e7eb', borderRadius: 6,
          padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center',
          gap: 4, color: '#374151', fontSize: 13, fontWeight: 600,
        }}
      >
        <ChevronLeft size={14} /> Back
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {STEP_LABELS.map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              fontSize: 12, fontWeight: i <= step ? 700 : 400,
              color: i < step ? '#9ca3af' : i === step ? '#3d8b37' : '#d1d5db',
              padding: '4px 8px',
              background: i === step ? '#f0fdf4' : 'transparent',
              borderRadius: 4,
            }}>
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span style={{ color: '#d1d5db', fontSize: 12 }}>›</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Step 0: Type selector ─────────────────────────────────────────────────────

const TYPE_CARDS = [
  {
    id: 'date',
    icon: Tag,
    iconColor: '#3d8b37',
    iconBg: '#f0fdf4',
    title: 'Date-based Promotion',
    description: 'Run time-bound offers for a specific period.',
    example: '"10% off all invoices in March"',
  },
  {
    id: 'service',
    icon: Wrench,
    iconColor: '#3b82f6',
    iconBg: '#eff6ff',
    title: 'Service-based Discount',
    description: 'Discount specific service types automatically.',
    example: '"$20 off first HVAC tune-up"',
  },
  {
    id: 'segment',
    icon: Users,
    iconColor: '#8b5cf6',
    iconBg: '#f5f3ff',
    title: 'Customer Segment',
    description: 'Reward client lifecycle stages or groups.',
    example: '"5% off for returning clients"',
  },
]

function TypeStep({ onSelect }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Choose Discount Type</h2>
        <p style={{ fontSize: 14, color: '#6b7280' }}>Select the type of discount rule you want to create.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {TYPE_CARDS.map(({ id, icon: Icon, iconColor, iconBg, title, description, example }) => (
          <div
            key={id}
            onClick={() => onSelect(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: '#fff',
              border: `2px solid ${hovered === id ? '#3d8b37' : '#e5e7eb'}`,
              borderRadius: 12,
              padding: 24,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              <Icon size={22} color={iconColor} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111827', marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 10 }}>{description}</div>
            <div style={{
              display: 'inline-block', background: '#f3f4f6', borderRadius: 6,
              padding: '4px 10px', fontSize: 11, color: '#6b7280', fontStyle: 'italic',
            }}>
              {example}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Step 1: Configure ─────────────────────────────────────────────────────────

function FieldRow({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function InputStyle() {
  return {
    width: '100%', border: '1px solid #d1d5db', borderRadius: 6,
    padding: '9px 12px', fontSize: 14, color: '#111827',
  }
}

function SelectStyle() {
  return {
    border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 10px', fontSize: 13,
  }
}

function ValueInput({ form, set }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <select value={form.type} onChange={e => set('type', e.target.value)} style={SelectStyle()}>
        <option value="percent">%</option>
        <option value="fixed">$</option>
      </select>
      <input
        type="number" value={form.value} min={0}
        onChange={e => set('value', Number(e.target.value))}
        style={{ width: 100, border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 10px', fontSize: 14 }}
      />
    </div>
  )
}

function ModeField({ form, set }) {
  const modeDesc = {
    Automatic: 'Fires automatically — no manual trigger needed. Applied silently at invoice creation.',
    Preset: 'Must be manually applied from the invoice or quote screen before sending.',
  }
  return (
    <FieldRow label="Mode">
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        {['Automatic', 'Preset'].map(m => (
          <button key={m} onClick={() => set('mode', m)} style={{
            padding: '7px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: 'none',
            background: form.mode === m ? '#3d8b37' : '#f3f4f6',
            color: form.mode === m ? '#fff' : '#374151',
          }}>{m}</button>
        ))}
      </div>
      {form.mode && (
        <div style={{ fontSize: 12, color: '#6b7280', background: '#f9fafb', borderRadius: 6, padding: '7px 10px', border: '1px solid #e5e7eb' }}>
          {modeDesc[form.mode]}
        </div>
      )}
    </FieldRow>
  )
}

function DateStep({ form, set }) {
  return (
    <div>
      <FieldRow label="Rule Name">
        <input value={form.name} onChange={e => set('name', e.target.value)}
          placeholder="e.g. Spring Promo" style={InputStyle()} />
      </FieldRow>
      <FieldRow label="Discount Value">
        <ValueInput form={form} set={set} />
      </FieldRow>
      <FieldRow label="Apply To">
        <select value={form.appliesTo} onChange={e => set('appliesTo', e.target.value)} style={{ ...SelectStyle(), width: '100%' }}>
          <option>All invoices created in period</option>
          <option>Jobs scheduled in period</option>
          <option>Invoices sent in period</option>
        </select>
      </FieldRow>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FieldRow label="Start Date">
          <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)}
            style={InputStyle()} />
        </FieldRow>
        <FieldRow label="End Date">
          <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)}
            style={InputStyle()} />
        </FieldRow>
      </div>
      <FieldRow label="Scope">
        <select value={form.scope || 'all'} onChange={e => set('scope', e.target.value)} style={{ ...SelectStyle(), width: '100%' }}>
          <option value="all">All clients</option>
          <option value="selected">Only selected clients</option>
          <option value="exclude">Exclude selected clients</option>
        </select>
      </FieldRow>
      <ModeField form={form} set={set} />
    </div>
  )
}

const SERVICE_MATCH_OPTIONS = [
  { value: 'exactly', label: 'Exactly matching service', multi: false },
  { value: 'at_least_one', label: 'At least one of the matching services', multi: true },
  { value: 'at_least_two', label: 'At least two of the matching services', multi: true },
]

function ServiceConfigStep({ form, set, services }) {
  const matchMode = form.serviceMatch || 'exactly'
  const isMulti = SERVICE_MATCH_OPTIONS.find(o => o.value === matchMode)?.multi
  const serviceList = (services && services.length > 0) ? services : FALLBACK_SERVICES

  const selectedServices = form.selectedServices || []
  const toggleService = (name) => {
    if (!isMulti) {
      set('selectedServices', [name])
    } else {
      const already = selectedServices.includes(name)
      set('selectedServices', already ? selectedServices.filter(s => s !== name) : [...selectedServices, name])
    }
  }

  return (
    <div>
      <FieldRow label="Rule Name">
        <input value={form.name} onChange={e => set('name', e.target.value)}
          placeholder="e.g. Lawn Service Discount" style={InputStyle()} />
      </FieldRow>
      <FieldRow label="Discount Value">
        <ValueInput form={form} set={set} />
      </FieldRow>

      {/* Sentence-builder for apply logic */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
          Apply When
        </label>
        <div style={{
          background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8,
          padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 14, color: '#374151' }}>
            <span style={{ fontWeight: 500 }}>Apply when invoice contains</span>
            <select
              value={matchMode}
              onChange={e => { set('serviceMatch', e.target.value); set('selectedServices', []) }}
              style={{ ...SelectStyle(), fontWeight: 600, color: '#111827', background: '#fff' }}
            >
              {SERVICE_MATCH_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Service picker */}
          <div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
              {isMulti ? 'Select services (multiple allowed):' : 'Select service:'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {serviceList.map(svc => {
                const selected = selectedServices.includes(svc.name)
                return (
                  <button
                    key={svc.id}
                    onClick={() => toggleService(svc.name)}
                    style={{
                      padding: '5px 12px', borderRadius: 16, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      border: `2px solid ${selected ? '#3d8b37' : '#e5e7eb'}`,
                      background: selected ? '#f0fdf4' : '#fff',
                      color: selected ? '#3d8b37' : '#374151',
                      transition: 'all 0.1s',
                    }}
                  >
                    {selected ? '✓ ' : ''}{svc.name}
                  </button>
                )
              })}
            </div>
            {selectedServices.length > 0 && (
              <div style={{ fontSize: 12, color: '#3d8b37', marginTop: 6 }}>
                Selected: {selectedServices.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      <FieldRow label="Application Period">
        <div style={{ display: 'flex', gap: 8 }}>
          {['Always', 'Date-limited'].map(m => (
            <button key={m} onClick={() => set('period', m)} style={{
              padding: '7px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: 'none',
              background: (form.period || 'Always') === m ? '#3d8b37' : '#f3f4f6',
              color: (form.period || 'Always') === m ? '#fff' : '#374151',
            }}>{m}</button>
          ))}
        </div>
      </FieldRow>
      {form.period === 'Date-limited' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FieldRow label="Start Date">
            <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} style={InputStyle()} />
          </FieldRow>
          <FieldRow label="End Date">
            <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} style={InputStyle()} />
          </FieldRow>
        </div>
      )}
      <ModeField form={form} set={set} />
    </div>
  )
}

const SEGMENT_OPTIONS = [
  { value: 'new_customer', label: 'Every new customer', description: 'Applied to first-time clients on their first invoice.' },
  { value: 'nth_order', label: 'Every Nth order', description: 'Applied when a client reaches a specific order number.' },
  { value: 'postal_code', label: 'Customers from specific postal code', description: 'Applied to clients whose service address matches the postal code.' },
]

function SegmentConfigStep({ form, set }) {
  const segmentType = form.segmentType || 'new_customer'

  return (
    <div>
      <FieldRow label="Rule Name">
        <input value={form.name} onChange={e => set('name', e.target.value)}
          placeholder="e.g. VIP Repeat Client" style={InputStyle()} />
      </FieldRow>
      <FieldRow label="Discount Value">
        <ValueInput form={form} set={set} />
      </FieldRow>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 10 }}>
          Apply To
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SEGMENT_OPTIONS.map(opt => {
            const selected = segmentType === opt.value
            return (
              <div
                key={opt.value}
                onClick={() => set('segmentType', opt.value)}
                style={{
                  border: `2px solid ${selected ? '#3d8b37' : '#e5e7eb'}`,
                  borderRadius: 8, padding: '12px 16px', cursor: 'pointer',
                  background: selected ? '#f0fdf4' : '#fff', transition: 'all 0.1s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', marginTop: 2, flexShrink: 0,
                    border: `2px solid ${selected ? '#3d8b37' : '#d1d5db'}`,
                    background: selected ? '#3d8b37' : '#fff',
                  }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{opt.description}</div>
                  </div>
                </div>

                {/* Conditional inputs */}
                {selected && opt.value === 'nth_order' && (
                  <div style={{ marginTop: 10, marginLeft: 26 }} onClick={e => e.stopPropagation()}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>
                      Apply on every Nth order (N =)
                    </label>
                    <input
                      type="number" min={2} max={100}
                      value={form.nthOrder || 3}
                      onChange={e => set('nthOrder', Number(e.target.value))}
                      style={{ width: 80, border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 10px', fontSize: 14 }}
                    />
                    <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 8 }}>
                      e.g. 3 = applied on 3rd, 6th, 9th order
                    </span>
                  </div>
                )}
                {selected && opt.value === 'postal_code' && (
                  <div style={{ marginTop: 10, marginLeft: 26 }} onClick={e => e.stopPropagation()}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={form.postalCode || ''}
                      onChange={e => set('postalCode', e.target.value)}
                      placeholder="e.g. 90210"
                      style={{ width: 140, border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 10px', fontSize: 14 }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <FieldRow label="Validity">
        <div style={{ display: 'flex', gap: 8 }}>
          {['Always', 'Date range'].map(m => (
            <button key={m} onClick={() => set('validity', m)} style={{
              padding: '7px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: 'none',
              background: (form.validity || 'Always') === m ? '#3d8b37' : '#f3f4f6',
              color: (form.validity || 'Always') === m ? '#fff' : '#374151',
            }}>{m}</button>
          ))}
        </div>
      </FieldRow>
      {form.validity === 'Date range' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FieldRow label="Start Date">
            <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} style={InputStyle()} />
          </FieldRow>
          <FieldRow label="End Date">
            <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} style={InputStyle()} />
          </FieldRow>
        </div>
      )}
      <ModeField form={form} set={set} />
    </div>
  )
}

// ── Step 2: Exclusions ────────────────────────────────────────────────────────

function PillPicker({ label, options, selected, onToggle, hint }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
        {label}
      </label>
      {hint && <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{hint}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map(opt => {
          const active = selected.includes(opt)
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              style={{
                padding: '5px 12px', borderRadius: 16, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: `2px solid ${active ? '#ef4444' : '#e5e7eb'}`,
                background: active ? '#fef2f2' : '#fff',
                color: active ? '#b91c1c' : '#374151',
                transition: 'all 0.1s',
              }}
            >
              {active ? '✕ ' : ''}{opt}
            </button>
          )
        })}
      </div>
      {selected.length > 0 && (
        <div style={{ fontSize: 12, color: '#b91c1c', marginTop: 6 }}>
          Excluded: {selected.join(', ')}
        </div>
      )}
    </div>
  )
}

function ExclusionsStep({ form, set, services }) {
  const serviceList = (services && services.length > 0) ? services : FALLBACK_SERVICES
  const excludedClients = form.excludeClients || []
  const excludedServices = form.excludeServices || []

  const toggleClient = (name) => {
    const already = excludedClients.includes(name)
    set('excludeClients', already ? excludedClients.filter(c => c !== name) : [...excludedClients, name])
  }
  const toggleService = (name) => {
    const already = excludedServices.includes(name)
    set('excludeServices', already ? excludedServices.filter(s => s !== name) : [...excludedServices, name])
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Exclusions & Stacking</h2>
        <p style={{ fontSize: 14, color: '#6b7280' }}>Control which clients or services are excluded, and how this rule stacks with others.</p>
      </div>

      <PillPicker
        label="Exclude Clients"
        hint="Select clients who should never receive this discount."
        options={FALLBACK_CLIENTS}
        selected={excludedClients}
        onToggle={toggleClient}
      />

      <PillPicker
        label="Exclude Services"
        hint="Select services this discount should not apply to."
        options={serviceList.map(s => s.name)}
        selected={excludedServices}
        onToggle={toggleService}
      />

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>
          Discount Stacking
        </label>
        {[
          { value: 'stack', label: 'Stack all', description: 'This discount stacks with all other active discounts.' },
          { value: 'highest', label: 'Highest discount wins', description: 'Only the highest applicable discount is applied.' },
          { value: 'none', label: 'Cannot combine', description: 'This discount cannot be combined with any other.' },
        ].map(opt => (
          <div
            key={opt.value}
            onClick={() => set('stacking', opt.value)}
            style={{
              border: `2px solid ${(form.stacking || 'stack') === opt.value ? '#3d8b37' : '#e5e7eb'}`,
              borderRadius: 8, padding: '12px 16px', marginBottom: 8, cursor: 'pointer',
              background: (form.stacking || 'stack') === opt.value ? '#f0fdf4' : '#fff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                border: `2px solid ${(form.stacking || 'stack') === opt.value ? '#3d8b37' : '#d1d5db'}`,
                background: (form.stacking || 'stack') === opt.value ? '#3d8b37' : '#fff',
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{opt.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Step 3: Preview ───────────────────────────────────────────────────────────

const MOCK_INVOICES = [
  { client: 'Daniel Brooks', num: 4, original: 285.00 },
  { client: 'Sarah Mitchell', num: 7, original: 340.00 },
  { client: 'Raj Patel', num: 11, original: 195.00 },
  { client: 'Geof Goons', num: 2, original: 420.00 },
  { client: 'Emma Thornton', num: 15, original: 260.00 },
  { client: 'Mark Delacroix', num: 9, original: 310.00 },
  { client: 'Lucy Huang', num: 3, original: 185.00 },
  { client: 'Tom Fischer', num: 6, original: 390.00 },
  { client: 'Nadia Okafor', num: 18, original: 225.00 },
  { client: 'Carlos Mendes', num: 5, original: 275.00 },
  { client: 'Sofia Johansson', num: 22, original: 350.00 },
  { client: 'Ben Hartley', num: 14, original: 210.00 },
]

const MOCK_CLIENTS = ['Daniel Brooks', 'Sarah Mitchell', 'Raj Patel', 'Geof Goons', 'Emma Thornton', 'Mark Delacroix', 'Lucy Huang']

function ExpandablePreviewCard({ label, value, valueColor, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="metric-card"
      style={{ cursor: 'pointer', position: 'relative', transition: 'box-shadow 0.15s', userSelect: 'none' }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>{label}</div>
        <ChevronDown
          size={14}
          color="#9ca3af"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginTop: 2 }}
        />
      </div>
      <div style={{ fontSize: 24, fontWeight: 900, color: valueColor || '#111827' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Click to see details</div>
      {open && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
            background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)', marginTop: 4,
            padding: 14, maxHeight: 260, overflowY: 'auto',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

function PreviewStep({ form, selectedType }) {
  const discountLabel = form.type === 'percent' ? `${form.value}%` : `$${form.value}`
  const sampleOriginal = 285.00
  const discountAmt = form.type === 'percent' ? sampleOriginal * (form.value / 100) : Number(form.value)
  const sampleDiscounted = sampleOriginal - discountAmt
  const totalDiscountCost = (discountAmt * 12).toFixed(0)

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Preview Impact</h2>
        <p style={{ fontSize: 14, color: '#6b7280' }}>Estimated impact of this discount rule. Click any card to see details.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24, position: 'relative' }}>
        <ExpandablePreviewCard label="Est. Invoices Affected" value="~12">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Invoices that would be affected:</div>
          {MOCK_INVOICES.map(inv => {
            const disc = form.type === 'percent' ? inv.original * (form.value / 100) : Number(form.value)
            const final = inv.original - disc
            return (
              <div key={inv.num} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: 12,
              }}>
                <span style={{ color: '#374151' }}>{inv.client} · Invoice #{inv.num}</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: '#9ca3af', textDecoration: 'line-through' }}>${inv.original.toFixed(2)}</span>
                  <span style={{ fontWeight: 700, color: '#3d8b37' }}>→ ${final.toFixed(2)}</span>
                </div>
              </div>
            )
          })}
        </ExpandablePreviewCard>

        <ExpandablePreviewCard label="Clients in Scope" value="7">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Clients eligible for this discount:</div>
          {MOCK_CLIENTS.map(name => (
            <div key={name} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 0', borderBottom: '1px solid #f3f4f6', fontSize: 12,
            }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#3b82f6' }}>
                {name.split(' ').map(n => n[0]).join('')}
              </div>
              <span style={{ color: '#374151' }}>{name}</span>
            </div>
          ))}
          {form.excludeClients?.length > 0 && (
            <div style={{ marginTop: 8, padding: '6px 8px', background: '#fef3c7', borderRadius: 4, fontSize: 11, color: '#92400e' }}>
              Excluding: {form.excludeClients.join(', ')}
            </div>
          )}
        </ExpandablePreviewCard>

        <ExpandablePreviewCard label="Est. Discount Cost" value={`-$${totalDiscountCost}`} valueColor="#b91c1c">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Cost breakdown:</div>
          <div style={{ fontSize: 12, color: '#374151' }}>
            {[
              { label: 'Avg discount per invoice', val: `$${discountAmt.toFixed(2)}` },
              { label: 'Est. invoices affected', val: '12' },
              { label: 'Total discount given', val: `-$${totalDiscountCost}` },
              { label: 'Avg original invoice value', val: '$289.58' },
              { label: 'Avg discounted value', val: `$${(289.58 - discountAmt).toFixed(2)}` },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280' }}>{row.label}</span>
                <span style={{ fontWeight: 700, color: row.val.startsWith('-') ? '#b91c1c' : '#111827' }}>{row.val}</span>
              </div>
            ))}
          </div>
        </ExpandablePreviewCard>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Sample Invoice Preview</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Daniel Brooks · Invoice #4</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: '#9ca3af', textDecoration: 'line-through' }}>${sampleOriginal.toFixed(2)}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#3d8b37' }}>${sampleDiscounted.toFixed(2)}</span>
          </div>
        </div>
        <div style={{
          background: '#f0fdf4', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#15803d',
        }}>
          ✓ Discount applied: {form.name || 'New Rule'} — {discountLabel} off
        </div>
      </div>

      {form.excludeClients?.length > 0 && (
        <div style={{
          background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 6,
          padding: '10px 14px', fontSize: 13, color: '#92400e',
        }}>
          Excluding clients: {form.excludeClients.join(', ')}
        </div>
      )}
    </div>
  )
}

// ── Step 4: Save ──────────────────────────────────────────────────────────────

function SaveStep({ form, set, onSave }) {
  const [saveMode, setSaveMode] = useState('activate')
  const [scheduleDate, setScheduleDate] = useState('')

  const handleSave = () => {
    const finalForm = {
      ...form,
      status: saveMode === 'draft' ? 'Inactive' : 'Active',
      startDate: saveMode === 'schedule' ? scheduleDate : (form.startDate || ''),
      endDate: form.endDate || '',
    }
    onSave(finalForm)
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Save Rule</h2>
        <p style={{ fontSize: 14, color: '#6b7280' }}>Choose how to save your new discount rule.</p>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Rule Summary</div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 2 }}>
          <strong style={{ color: '#111827' }}>{form.name || 'Unnamed Rule'}</strong>
          {' '}&middot; {form.type === 'percent' ? `${form.value}%` : `$${form.value}`} off
          {' '}&middot; {form.mode || 'Automatic'}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Save as</div>
        {[
          { value: 'draft', label: 'Save as Draft', description: 'Rule will be saved but not active.' },
          { value: 'activate', label: 'Activate Now', description: 'Rule will be immediately active.' },
          { value: 'schedule', label: 'Schedule for date', description: 'Rule will activate on a specific date.' },
        ].map(opt => (
          <div
            key={opt.value}
            onClick={() => setSaveMode(opt.value)}
            style={{
              border: `2px solid ${saveMode === opt.value ? '#3d8b37' : '#e5e7eb'}`,
              borderRadius: 8, padding: '12px 16px', marginBottom: 8, cursor: 'pointer',
              background: saveMode === opt.value ? '#f0fdf4' : '#fff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%', marginTop: 2,
                border: `2px solid ${saveMode === opt.value ? '#3d8b37' : '#d1d5db'}`,
                background: saveMode === opt.value ? '#3d8b37' : '#fff',
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{opt.description}</div>
              </div>
            </div>
          </div>
        ))}

        {saveMode === 'schedule' && (
          <div style={{ marginTop: 12, marginLeft: 26 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Activation Date
            </label>
            <input
              type="date" value={scheduleDate}
              onChange={e => setScheduleDate(e.target.value)}
              style={{ border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 12px', fontSize: 14 }}
            />
          </div>
        )}
      </div>

      <button
        className="btn-primary"
        onClick={handleSave}
        disabled={!form.name?.trim()}
        style={{ width: '100%', justifyContent: 'center', opacity: form.name?.trim() ? 1 : 0.5 }}
      >
        {saveMode === 'draft' ? 'Save Draft' : saveMode === 'schedule' ? 'Schedule Rule' : 'Activate Rule'}
      </button>
    </div>
  )
}

// ── Create wizard overlay ─────────────────────────────────────────────────────

function emptyRuleForm() {
  return {
    name: '',
    type: 'percent',
    value: 10,
    appliesTo: 'Invoice',
    trigger: 'Date range',
    mode: 'Automatic',
    status: 'Active',
    startDate: '',
    endDate: '',
    stacking: 'stack',
    excludeClients: '',
    excludeServices: '',
  }
}

function CreateWizard({ onSave, onClose, services }) {
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState(null)
  const [form, setForm] = useState(emptyRuleForm())

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setStep(1)
  }

  const handleBack = () => {
    if (step === 0) {
      onClose()
    } else if (step === 1) {
      setStep(0)
      setSelectedType(null)
    } else {
      setStep(s => s - 1)
    }
  }

  const handleNext = () => setStep(s => s + 1)

  const handleSave = (finalForm) => {
    onSave({
      ...finalForm,
      appliesTo: finalForm.appliesTo?.includes('invoice') ? 'Invoice' : finalForm.appliesTo || 'Invoice',
      trigger: finalForm.trigger || 'Date range',
    })
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#fff', zIndex: 200,
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280' }}>Create Discount Rule</div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        <StepNav step={step} onBack={handleBack} />

        {step === 0 && <TypeStep onSelect={handleTypeSelect} />}

        {step === 1 && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Configure Rule</h2>
              <p style={{ fontSize: 14, color: '#6b7280' }}>Set up the details for your {selectedType} discount.</p>
            </div>
            {selectedType === 'date' && <DateStep form={form} set={set} />}
            {selectedType === 'service' && <ServiceConfigStep form={form} set={set} services={services} />}
            {selectedType === 'segment' && <SegmentConfigStep form={form} set={set} />}
            <button className="btn-primary" onClick={handleNext}
              disabled={!form.name?.trim()} style={{ opacity: form.name?.trim() ? 1 : 0.5 }}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <ExclusionsStep form={form} set={set} services={services} />
            <button className="btn-primary" onClick={handleNext}>Continue →</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <PreviewStep form={form} selectedType={selectedType} />
            <button className="btn-primary" onClick={handleNext}>Continue →</button>
          </div>
        )}

        {step === 4 && (
          <SaveStep form={form} set={set} onSave={handleSave} />
        )}
      </div>
    </div>
  )
}

// ── Old-style rule drawer (for editing existing rules) ────────────────────────

function RuleDrawer({ rule, onSave, onClose }) {
  const [form, setForm] = useState({ ...rule })
  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 100 }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 380,
        background: '#fff', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        zIndex: 101, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid #e5e7eb',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#111827' }}>Edit Rule</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <FieldRow label="Rule Name">
            <input value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="e.g. Spring Promo" style={InputStyle()} />
          </FieldRow>

          <div style={{
            background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8,
            padding: 16, marginBottom: 20,
          }}>
            <div style={{ fontSize: 13, color: '#374151', marginBottom: 12, fontWeight: 600 }}>Rule Builder</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: '#6b7280' }}>When</span>
              <select value={form.appliesTo} onChange={e => set('appliesTo', e.target.value)}
                style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: 13 }}>
                <option>Invoice</option><option>Quote</option><option>Job</option>
              </select>
              <span style={{ color: '#6b7280' }}>matches</span>
              <select value={form.trigger} onChange={e => set('trigger', e.target.value)}
                style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: 13 }}>
                <option>Date range</option><option>Service type</option><option>Customer tag</option>
              </select>
              <span style={{ color: '#6b7280' }}>apply</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input type="number" value={form.value} onChange={e => set('value', e.target.value)} min={0}
                  style={{ width: 64, border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: 13 }} />
                <select value={form.type} onChange={e => set('type', e.target.value)}
                  style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: 13 }}>
                  <option value="percent">%</option><option value="fixed">$</option>
                </select>
              </div>
              <span style={{ color: '#6b7280' }}>as</span>
              <select value={form.mode} onChange={e => set('mode', e.target.value)}
                style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: 13 }}>
                <option>Automatic</option><option>Preset</option>
              </select>
            </div>
          </div>

          {form.trigger === 'Date range' && (
            <FieldRow label="Date Range">
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)}
                  style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 10px', fontSize: 13 }} />
                <span style={{ alignSelf: 'center', color: '#6b7280' }}>to</span>
                <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)}
                  style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 10px', fontSize: 13 }} />
              </div>
            </FieldRow>
          )}

          <FieldRow label="Status">
            <div style={{ display: 'flex', gap: 8 }}>
              {['Active', 'Inactive'].map(s => (
                <button key={s} onClick={() => set('status', s)} style={{
                  padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                  border: form.status === s ? 'none' : '1px solid #d1d5db', cursor: 'pointer',
                  background: form.status === s ? (s === 'Active' ? '#dcfce7' : '#f3f4f6') : '#fff',
                  color: form.status === s ? (s === 'Active' ? '#15803d' : '#6b7280') : '#374151',
                }}>{s}</button>
              ))}
            </div>
          </FieldRow>
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => { onSave(form); onClose() }}
            disabled={!form.name.trim()} style={{ opacity: form.name.trim() ? 1 : 0.5 }}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function DiscountRules({ discountRules, addDiscountRule, updateDiscountRule, deleteDiscountRule, services }) {
  const [view, setView] = useState('list')
  const [editingRule, setEditingRule] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)

  const openEdit = (rule) => { setEditingRule(rule); setEditDrawerOpen(true) }
  const closeEdit = () => { setEditDrawerOpen(false); setEditingRule(null) }

  const handleSaveEdit = (form) => {
    updateDiscountRule(form.id, form)
    closeEdit()
  }

  const handleSaveNew = (form) => {
    addDiscountRule(form)
    setView('list')
  }

  const toggleStatus = (rule) => {
    updateDiscountRule(rule.id, { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' })
  }

  const activeCount = discountRules.filter(r => r.status === 'Active').length
  const scheduledCount = discountRules.filter(r => r.startDate && r.status === 'Active').length
  const autoAppliedCount = discountRules.filter(r => r.mode === 'Automatic' && r.status === 'Active').length

  if (view === 'create') {
    return (
      <CreateWizard
        onSave={handleSaveNew}
        onClose={() => setView('list')}
        services={services || []}
      />
    )
  }

  return (
    <div className="page-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111827', marginBottom: 4 }}>Discount Rules</h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>Manage automatic and preset discounts applied to invoices, quotes, and jobs.</p>
        </div>
        <button className="btn-primary" onClick={() => setView('create')} style={{ gap: 8 }}>
          <Plus size={16} /> Create Discount Rule
        </button>
      </div>

      {/* Summary bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <StatCard label="Active Rules" value={activeCount} color="#15803d" />
        <StatCard label="Scheduled" value={scheduledCount} color="#3b82f6" />
        <StatCard label="Auto-applied This Month" value={autoAppliedCount} color="#111827" />
        <StatCard label="Revenue Impact" value="-$142" color="#b91c1c" />
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6', background: '#fafafa' }}>
              {['Rule', 'Type', 'Value', 'Applies To', 'Trigger', 'Mode', 'Status', 'Date Range', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#6b7280', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {discountRules.map(rule => (
              <tr key={rule.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: 14, color: '#111827' }}>{rule.name}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>
                  {rule.type === 'percent' ? 'Percentage' : 'Fixed'}
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#111827' }}>
                  {rule.type === 'percent' ? `${rule.value}%` : `$${rule.value}`}
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{rule.appliesTo}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{rule.trigger}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{rule.mode}</td>
                <td style={{ padding: '14px 16px' }}>
                  <StatusChip status={rule.status} onClick={() => toggleStatus(rule)} />
                </td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: '#9ca3af' }}>
                  {rule.startDate && rule.endDate ? `${rule.startDate} – ${rule.endDate}` : '—'}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(rule)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }} title="Edit">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => deleteDiscountRule(rule.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {discountRules.length === 0 && (
              <tr>
                <td colSpan={9} style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
                  No discount rules yet. Click "Create Discount Rule" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editDrawerOpen && editingRule && (
        <RuleDrawer rule={editingRule} onSave={handleSaveEdit} onClose={closeEdit} />
      )}
    </div>
  )
}
