import { useState } from 'react'
import { Plus, X } from 'lucide-react'

function deriveMetrics(s) {
  const totalCost = s.laborCost + s.materialsCost + s.travelCost + s.equipmentCost + s.overhead
  const marginDollar = s.avgSellPrice - totalCost
  const marginPct = s.avgSellPrice > 0 ? Math.round((marginDollar / s.avgSellPrice) * 100) : 0
  const suggestedPrice = Math.round(totalCost / (1 - s.targetMargin / 100))
  let status
  if (marginPct >= s.targetMargin) status = 'Healthy'
  else if (marginPct > 0) status = 'At Risk'
  else status = 'Loss'
  return { totalCost, marginDollar, marginPct, status, suggestedPrice }
}

function StatusBadge({ status }) {
  const map = {
    Healthy: { bg: '#dcfce7', color: '#15803d' },
    'At Risk': { bg: '#fef3c7', color: '#d97706' },
    Loss: { bg: '#fef2f2', color: '#b91c1c' },
  }
  const { bg, color } = map[status] || map['At Risk']
  return (
    <span style={{
      background: bg, color, borderRadius: 20,
      padding: '3px 10px', fontSize: 12, fontWeight: 600,
    }}>
      {status}
    </span>
  )
}

function emptyServiceForm() {
  return {
    name: '',
    avgSellPrice: 0,
    laborCost: 0,
    materialsCost: 0,
    travelCost: 0,
    equipmentCost: 0,
    overhead: 0,
    targetMargin: 25,
  }
}

function AddServiceDrawer({ onSave, onClose }) {
  const [form, setForm] = useState(emptyServiceForm())
  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const fields = [
    { field: 'avgSellPrice', label: 'Avg Sell Price', prefix: '$' },
    { field: 'laborCost', label: 'Labor Cost', prefix: '$' },
    { field: 'materialsCost', label: 'Materials Cost', prefix: '$' },
    { field: 'travelCost', label: 'Travel Cost', prefix: '$' },
    { field: 'equipmentCost', label: 'Equipment Cost', prefix: '$' },
    { field: 'overhead', label: 'Overhead', prefix: '$' },
    { field: 'targetMargin', label: 'Target Margin (%)', prefix: '%', suffix: true },
  ]

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
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#111827' }}>Add Service</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Service Name
            </label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Deck Staining"
              style={{
                width: '100%', border: '1px solid #d1d5db', borderRadius: 6,
                padding: '8px 12px', fontSize: 14, color: '#111827',
              }}
            />
          </div>

          {fields.map(({ field, label, prefix, suffix }) => (
            <div key={field} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                {label}
              </label>
              <div style={{ position: 'relative' }}>
                {!suffix && (
                  <span style={{
                    position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                    color: '#6b7280', fontSize: 13, pointerEvents: 'none',
                  }}>{prefix}</span>
                )}
                <input
                  type="number"
                  value={form[field]}
                  onChange={e => set(field, Number(e.target.value))}
                  min={0}
                  style={{
                    width: '100%', border: '1px solid #d1d5db', borderRadius: 6,
                    padding: suffix ? '8px 12px' : '8px 12px 8px 24px', fontSize: 14,
                  }}
                />
                {suffix && (
                  <span style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    color: '#6b7280', fontSize: 13, pointerEvents: 'none',
                  }}>{prefix}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: '16px 24px', borderTop: '1px solid #e5e7eb',
          display: 'flex', gap: 10, justifyContent: 'flex-end',
        }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            onClick={() => { onSave(form); onClose() }}
            disabled={!form.name.trim()}
            style={{ opacity: form.name.trim() ? 1 : 0.5 }}
          >
            Add Service
          </button>
        </div>
      </div>
    </>
  )
}

export default function ProfitabilityLayer({ services, updateService, addService }) {
  const [selectedId, setSelectedId] = useState(null)
  const [editState, setEditState] = useState(null)
  const [showAddDrawer, setShowAddDrawer] = useState(false)

  const selected = selectedId ? services.find(s => s.id === selectedId) : null

  const openDetail = (svc) => {
    setSelectedId(svc.id)
    setEditState({
      laborCost: svc.laborCost,
      materialsCost: svc.materialsCost,
      travelCost: svc.travelCost,
      equipmentCost: svc.equipmentCost,
      overhead: svc.overhead,
    })
  }

  const closeDetail = () => {
    setSelectedId(null)
    setEditState(null)
  }

  const liveMetrics = selected && editState
    ? deriveMetrics({ ...selected, ...editState })
    : null

  const setEdit = (field, val) =>
    setEditState(e => ({ ...e, [field]: Number(val) }))

  const saveChanges = () => {
    updateService(selected.id, { ...selected, ...editState })
    closeDetail()
  }

  return (
    <div className="page-content">
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111827', marginBottom: 4 }}>Servicing Costs</h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>Review and adjust service economics. Click a row to edit cost breakdown.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowAddDrawer(true)}
          style={{ gap: 8, flexShrink: 0 }}
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedId ? '1fr 400px' : '1fr',
        gap: 20,
        alignItems: 'start',
      }}>
        {/* Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6', background: '#fafafa' }}>
                {['Service', 'Avg Sell Price', 'Est. Cost', 'Margin $', 'Margin %', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#6b7280' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map(svc => {
                const m = svc.id === selectedId && editState
                  ? deriveMetrics({ ...svc, ...editState })
                  : deriveMetrics(svc)
                const isSelected = svc.id === selectedId
                return (
                  <tr
                    key={svc.id}
                    onClick={() => openDetail(svc)}
                    style={{
                      borderBottom: '1px solid #f3f4f6',
                      background: isSelected ? '#eff6ff' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#f9fafb' }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: 14, color: '#111827' }}>
                      {svc.name}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>
                      ${svc.avgSellPrice}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>
                      ${m.totalCost}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: m.marginDollar >= 0 ? '#111827' : '#b91c1c' }}>
                      {m.marginDollar >= 0 ? `$${m.marginDollar}` : `-$${Math.abs(m.marginDollar)}`}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: m.marginPct >= svc.targetMargin ? '#15803d' : m.marginPct > 0 ? '#d97706' : '#b91c1c' }}>
                      {m.marginPct}%
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <StatusBadge status={m.status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selected && editState && liveMetrics && (
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>{selected.name}</h3>
              <StatusBadge status={liveMetrics.status} />
            </div>

            {/* Live margin summary */}
            <div style={{
              background: '#f9fafb', borderRadius: 8, padding: '12px 16px', marginBottom: 20,
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Sell Price</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>${selected.avgSellPrice}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Est. Cost</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#374151' }}>${liveMetrics.totalCost}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Margin</div>
                <div style={{
                  fontSize: 18, fontWeight: 800,
                  color: liveMetrics.marginPct >= selected.targetMargin ? '#15803d' : liveMetrics.marginPct > 0 ? '#d97706' : '#b91c1c',
                }}>
                  {liveMetrics.marginPct}%
                </div>
              </div>
            </div>

            {/* Warning if below suggested price */}
            {selected.avgSellPrice < liveMetrics.suggestedPrice && (
              <div style={{
                background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 6,
                padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#92400e',
              }}>
                ⚠ Sell price (${selected.avgSellPrice}) is below suggested minimum (${liveMetrics.suggestedPrice}) for {selected.targetMargin}% margin target.
              </div>
            )}

            {/* Editable cost fields */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Cost Breakdown</div>
              {[
                { field: 'laborCost', label: 'Labor' },
                { field: 'materialsCost', label: 'Materials' },
                { field: 'travelCost', label: 'Travel' },
                { field: 'equipmentCost', label: 'Equipment' },
                { field: 'overhead', label: 'Overhead' },
              ].map(({ field, label }) => (
                <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <label style={{ fontSize: 13, color: '#374151', width: 90, flexShrink: 0 }}>{label}</label>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <span style={{
                      position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                      color: '#6b7280', fontSize: 13, pointerEvents: 'none',
                    }}>$</span>
                    <input
                      type="number"
                      value={editState[field]}
                      onChange={e => setEdit(field, e.target.value)}
                      min={0}
                      style={{
                        width: '100%', border: '1px solid #d1d5db', borderRadius: 6,
                        padding: '7px 10px 7px 22px', fontSize: 13,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" onClick={closeDetail} style={{ flex: 1, justifyContent: 'center' }}>
                Cancel
              </button>
              <button className="btn-primary" onClick={saveChanges} style={{ flex: 1, justifyContent: 'center' }}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddDrawer && (
        <AddServiceDrawer
          onSave={addService}
          onClose={() => setShowAddDrawer(false)}
        />
      )}
    </div>
  )
}
