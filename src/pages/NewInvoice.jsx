import { useState } from 'react'
import {
  Search, User, ChevronDown, GripVertical, Trash2, Eye, X,
  Receipt, Layers, ChevronRight, Paperclip, Plus,
} from 'lucide-react'
import { clients } from '../data/mockData'

function fmt(n) {
  return `$${Number(n).toFixed(2)}`
}

function emptyLineItem() {
  return {
    id: Date.now() + Math.random(),
    name: '',
    description: '',
    qty: 1,
    unitPrice: 0,
    breakdownOpen: false,
    breakdown: [],
    showBreakdownToCustomer: true,
    isExternal: false,
    externalLink: '',
  }
}

function emptyBreakdownRow() {
  return {
    id: Date.now() + Math.random(),
    category: 'Labor',
    label: '',
    amount: 0,
    note: '',
    receiptData: null,
    showToCustomer: true,
  }
}

const BREAKDOWN_CATEGORIES = ['Labor', 'Materials', 'Travel', 'Equipment', 'Permit/Disposal', 'Custom']

// ── NEW badge ─────────────────────────────────────────────────────────────────

function NewBadge() {
  return (
    <span style={{
      background: '#fbbf24', color: '#7c2d12', borderRadius: 4,
      padding: '1px 6px', fontSize: 10, fontWeight: 800, marginLeft: 6,
    }}>NEW</span>
  )
}

// ── Step 0: Type Selector ─────────────────────────────────────────────────────

function TypeSelector({ onSelect }) {
  const types = [
    {
      id: 'standard',
      icon: Receipt,
      title: 'Standard Invoice',
      description: 'A single invoice with line items, discounts, and payment terms.',
    },
    {
      id: 'milestone',
      icon: Layers,
      title: 'Milestone Invoice',
      description: 'Split payments into stages tied to project milestones.',
    },
  ]

  return (
    <div className="page-content" style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111827', marginBottom: 8 }}>New Invoice</h1>
      <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 32 }}>Choose the invoice type to get started.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {types.map(({ id, icon: Icon, title, description }) => {
          const [hovered, setHovered] = useState(false)
          return (
            <div
              key={id}
              onClick={() => onSelect(id)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                background: '#fff',
                border: `2px solid ${hovered ? '#3d8b37' : '#e5e7eb'}`,
                borderRadius: 12,
                padding: 28,
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: '#f0fdf4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon size={24} color="#3d8b37" />
              </div>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#111827', marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 1: Choose client ─────────────────────────────────────────────────────

function ClientSelect({ onSelect, onBack }) {
  const [search, setSearch] = useState('')

  const filtered = clients.filter(c =>
    !search || [c.name, c.org, c.phone].some(v => v.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page-content" style={{ maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn-secondary" onClick={onBack} style={{ fontSize: 13 }}>← Back</button>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827' }}>Select Client</h1>
      </div>
      <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 24 }}>
        Which client would you like to create this invoice for?
      </p>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
          <div className="search-input" style={{ flex: 1 }}>
            <Search size={16} color="#9ca3af" />
            <input
              placeholder="Search clients..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              style={{ fontSize: 14 }}
            />
          </div>
          <span style={{ color: '#9ca3af', fontSize: 14 }}>or</span>
          <button className="btn-primary" style={{ fontSize: 14, padding: '10px 20px', whiteSpace: 'nowrap' }}>
            + Create New Client
          </button>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#3d8b37', marginBottom: 8 }}>Active</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((client, i) => (
            <div
              key={client.id}
              onClick={() => onSelect(client)}
              style={{
                display: 'flex', alignItems: 'center', padding: '16px 12px',
                borderTop: i === 0 ? '1px solid #f3f4f6' : 'none',
                borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: '#e5e7eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginRight: 14, flexShrink: 0,
              }}>
                <User size={18} color="#9ca3af" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>
                  {client.name} ({client.org})
                </div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                  {client.properties} {client.properties === 1 ? 'Property' : 'Properties'} | {client.phone}
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>Activity {client.activity}</div>
              <ChevronDown size={16} color="#9ca3af" style={{ marginLeft: 12 }} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', color: '#9ca3af' }}>No clients found</div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Price Breakdown — split into toggle + panel ───────────────────────────────

function PriceBreakdownToggle({ item, onChange }) {
  return (
    <button
      className="btn-ghost"
      style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, whiteSpace: 'nowrap' }}
      onClick={() => onChange({ ...item, breakdownOpen: !item.breakdownOpen })}
    >
      {item.breakdownOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      Break down price<NewBadge />
    </button>
  )
}

function PriceBreakdownPanel({ item, onChange }) {
  const [showReceipt, setShowReceipt] = useState(null)
  const [receiptAdded, setReceiptAdded] = useState({})

  const addRow = () => onChange({ ...item, breakdown: [...item.breakdown, emptyBreakdownRow()] })

  const updateRow = (rowId, field, val) => {
    onChange({ ...item, breakdown: item.breakdown.map(r => r.id === rowId ? { ...r, [field]: val } : r) })
  }

  const removeRow = (rowId) => {
    onChange({ ...item, breakdown: item.breakdown.filter(r => r.id !== rowId) })
  }

  const applyReceipt = (rowId, mode) => {
    const mockAmount = 34.50
    const markup = mode === 'markup' ? Math.round(mockAmount * 1.15 * 100) / 100 : mockAmount
    updateRow(rowId, 'amount', markup)
    updateRow(rowId, 'receiptData', { vendor: 'Home Depot', date: 'Mar 15, 2026', amount: mockAmount, category: 'Materials' })
    setReceiptAdded(prev => ({ ...prev, [rowId]: mode }))
    setShowReceipt(null)
  }

  const autoUnitPrice = item.breakdown.length > 0
    ? item.breakdown.reduce((sum, r) => sum + Number(r.amount), 0)
    : null

  return (
    <div style={{ marginTop: 8, border: '1px solid #e5e7eb', borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '130px 1fr 80px 1fr 28px',
        gap: 6, padding: '8px 10px', background: '#fafafa',
        borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 700, color: '#6b7280',
      }}>
        <div>Category</div><div>Label</div><div>Amount</div><div>Note</div><div />
      </div>

      {item.breakdown.map(row => (
        <div key={row.id}>
          <div style={{
            display: 'grid', gridTemplateColumns: '130px 1fr 80px 1fr 28px',
            gap: 6, padding: '6px 10px', borderBottom: '1px solid #f3f4f6', alignItems: 'center',
          }}>
            <select
              value={row.category}
              onChange={e => updateRow(row.id, 'category', e.target.value)}
              style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '3px 5px', fontSize: 11 }}
            >
              {BREAKDOWN_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={row.label} onChange={e => updateRow(row.id, 'label', e.target.value)}
              placeholder="Label"
              style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '3px 6px', fontSize: 11, width: '100%' }} />
            <input type="number" value={row.amount} onChange={e => updateRow(row.id, 'amount', e.target.value)}
              min={0}
              style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '3px 6px', fontSize: 11, width: '100%' }} />
            <input value={row.note} onChange={e => updateRow(row.id, 'note', e.target.value)}
              placeholder="Note"
              style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '3px 6px', fontSize: 11, width: '100%' }} />
            <button onClick={() => removeRow(row.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 2 }}>
              <Trash2 size={11} />
            </button>
          </div>

          {row.category === 'Materials' && (
            <div style={{ padding: '5px 10px', background: '#fffbf0', borderBottom: '1px solid #f3f4f6' }}>
              {row.receiptData ? (
                <div style={{ fontSize: 11, color: '#374151' }}>
                  <span style={{ background: '#dcfce7', color: '#15803d', borderRadius: 10, padding: '2px 8px', marginRight: 8 }}>
                    ✓ Receipt attached
                  </span>
                  {row.receiptData.vendor} · {row.receiptData.date} · ${row.receiptData.amount}
                  {receiptAdded[row.id] === 'markup' && (
                    <span style={{ color: '#d97706', marginLeft: 6 }}>+15% markup applied</span>
                  )}
                </div>
              ) : showReceipt === row.id ? (
                <div style={{ fontSize: 11 }}>
                  <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: 6, padding: '8px 12px', marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, color: '#374151', marginBottom: 3 }}>Extracted Receipt Data</div>
                    <div style={{ color: '#6b7280' }}>Vendor: Home Depot · Date: Mar 15, 2026 · Amount: $34.50</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-secondary" style={{ fontSize: 10, padding: '3px 8px' }} onClick={() => applyReceipt(row.id, 'reference')}>Reference only</button>
                    <button className="btn-secondary" style={{ fontSize: 10, padding: '3px 8px' }} onClick={() => applyReceipt(row.id, 'add')}>Add to invoice</button>
                    <button className="btn-primary" style={{ fontSize: 10, padding: '3px 8px' }} onClick={() => applyReceipt(row.id, 'markup')}>Add with markup (15%)</button>
                    <button onClick={() => setShowReceipt(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={12} /></button>
                  </div>
                </div>
              ) : (
                <button className="btn-ghost" style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
                  onClick={() => setShowReceipt(row.id)}>
                  <Paperclip size={10} /> Attach vendor receipt
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      <div style={{ padding: '6px 10px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="btn-ghost" style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 3 }} onClick={addRow}>
          <Plus size={11} /> Add row
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Show to customer</span>
          <button
            onClick={() => onChange({ ...item, showBreakdownToCustomer: !item.showBreakdownToCustomer })}
            style={{
              width: 32, height: 18, borderRadius: 9, border: 'none', cursor: 'pointer',
              background: item.showBreakdownToCustomer ? '#3d8b37' : '#d1d5db', position: 'relative',
            }}
          >
            <span style={{
              position: 'absolute', top: 1, left: item.showBreakdownToCustomer ? 14 : 1,
              width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
            }} />
          </button>
        </div>
      </div>

      {autoUnitPrice !== null && (
        <div style={{ padding: '5px 10px', background: '#f0fdf4', fontSize: 11, color: '#15803d' }}>
          Auto-sum: ${autoUnitPrice.toFixed(2)} (unit price is read-only)
        </div>
      )}
    </div>
  )
}

// ── Profitability Signal ──────────────────────────────────────────────────────

function ProfitSignal({ itemName, services, discountPct }) {
  if (!services || !itemName) return null
  const match = services.find(s =>
    s.name.toLowerCase().includes(itemName.toLowerCase()) ||
    itemName.toLowerCase().includes(s.name.toLowerCase())
  )
  if (!match) return null

  const totalCost = match.laborCost + match.materialsCost + match.travelCost + match.equipmentCost + match.overhead
  const effectiveSell = match.avgSellPrice * (1 - discountPct / 100)
  const margin = effectiveSell > 0 ? Math.round(((effectiveSell - totalCost) / effectiveSell) * 100) : 0
  const status = margin >= match.targetMargin ? 'Healthy' : margin > 0 ? 'At Risk' : 'Loss'
  const statusColor = status === 'Healthy' ? '#15803d' : status === 'At Risk' ? '#d97706' : '#b91c1c'

  return (
    <div style={{
      background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6,
      padding: '8px 12px', fontSize: 11, color: '#374151',
    }}>
      <div style={{ marginBottom: 4 }}>
        Sell: ${match.avgSellPrice} | Cost: ${totalCost} | Margin: {margin}%
        <span style={{ marginLeft: 6, color: statusColor, fontWeight: 700 }}>● {status}</span>
      </div>
      {margin < 15 && (
        <div style={{ color: '#d97706', fontWeight: 600 }}>⚠ Low margin warning</div>
      )}
    </div>
  )
}

// ── External Invoice Modal ────────────────────────────────────────────────────

function ExternalInvoiceModal({ onConfirm, onClose }) {
  const [showExtracted, setShowExtracted] = useState(false)
  const [chosenMode, setChosenMode] = useState(null)
  const [note, setNote] = useState('')
  const [retainLink, setRetainLink] = useState('')

  const mockData = {
    vendor: 'Acme Supplies',
    date: 'Mar 18, 2026',
    amount: 142.50,
    items: ['Irrigation supplies x4', 'Connectors x12', 'Hose reel x1'],
  }

  const getAmount = () => {
    if (chosenMode === 'markup') return Math.round(mockData.amount * 1.15 * 100) / 100
    if (chosenMode === 'client') return mockData.amount
    return 0
  }

  const handleConfirm = () => {
    onConfirm({
      name: `External: ${mockData.vendor}`,
      unitPrice: getAmount(),
      description: note || `External invoice from ${mockData.vendor} on ${mockData.date}`,
      isExternal: true,
      externalLink: retainLink,
      externalVendor: mockData.vendor,
    })
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: '#fff', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        zIndex: 201, width: 540, maxWidth: '90vw', padding: 28, maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: 0 }}>
            📎 Add External Invoice<NewBadge />
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        {!showExtracted ? (
          <div>
            <div
              onClick={() => setShowExtracted(true)}
              style={{
                border: '2px dashed #d1d5db', borderRadius: 8,
                padding: '32px 24px', textAlign: 'center', cursor: 'pointer',
                background: '#fafafa', marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#374151', marginBottom: 4 }}>
                Drop invoice file here or click to upload
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>PDF, PNG, JPG supported · Auto-extracts data</div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>
              or{' '}
              <button onClick={() => setShowExtracted(true)} className="btn-ghost" style={{ fontSize: 12 }}>
                use demo extracted data →
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Extracted data */}
            <div style={{
              background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8,
              padding: 14, marginBottom: 14,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Extracted Invoice Data</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div><div style={{ fontSize: 10, color: '#9ca3af' }}>Vendor</div><div style={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>{mockData.vendor}</div></div>
                <div><div style={{ fontSize: 10, color: '#9ca3af' }}>Date</div><div style={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>{mockData.date}</div></div>
                <div><div style={{ fontSize: 10, color: '#9ca3af' }}>Amount</div><div style={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>${mockData.amount}</div></div>
              </div>
              <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 4 }}>Items</div>
              {mockData.items.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: '#374151', marginBottom: 2 }}>• {item}</div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Add to invoice as:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { mode: 'client', label: 'Pass cost to client', desc: `$${mockData.amount} added — excluded from tax & discounts`, color: '#3d8b37' },
                  { mode: 'markup', label: 'Add with markup (15%)', desc: `$${(mockData.amount * 1.15).toFixed(2)} added — excluded from tax & discounts`, color: '#d97706' },
                  { mode: 'internal', label: 'Keep internal', desc: 'Reference only, not billed to client', color: '#6b7280' },
                ].map(opt => (
                  <div
                    key={opt.mode}
                    onClick={() => setChosenMode(opt.mode)}
                    style={{
                      border: `2px solid ${chosenMode === opt.mode ? opt.color : '#e5e7eb'}`,
                      borderRadius: 6, padding: '10px 14px', cursor: 'pointer',
                      background: chosenMode === opt.mode ? '#f9fafb' : '#fff',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>{opt.desc}</div>
                    </div>
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                      border: `2px solid ${chosenMode === opt.mode ? opt.color : '#d1d5db'}`,
                      background: chosenMode === opt.mode ? opt.color : '#fff',
                    }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Retain link — only shown when passing to client */}
            {(chosenMode === 'client' || chosenMode === 'markup') && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                  🔗 Retain original invoice link (optional)
                </label>
                <input
                  value={retainLink}
                  onChange={e => setRetainLink(e.target.value)}
                  placeholder="https://vendor-portal.com/invoice/12345"
                  style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}
                />
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                  If provided, the original vendor invoice will be linked for your client to view.
                </div>
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <input
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Optional note..."
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}
              />
            </div>

            {/* Tax/discount exclusion notice */}
            {(chosenMode === 'client' || chosenMode === 'markup') && (
              <div style={{
                background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6,
                padding: '8px 12px', marginBottom: 14, fontSize: 12, color: '#1e40af',
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <span>ℹ</span>
                <span>This amount will be added as a pass-through cost and <strong>excluded from discounts and taxes</strong>. It appears as a separate line item on the client invoice.</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={onClose}>Cancel</button>
              <button
                className="btn-primary"
                onClick={handleConfirm}
                disabled={!chosenMode || chosenMode === 'internal'}
                style={{ opacity: (!chosenMode || chosenMode === 'internal') ? 0.5 : 1 }}
              >
                Add to Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// ── Stage Invoice Editor (modal) ──────────────────────────────────────────────

function StageInvoiceEditor({ stage, services, onSave, onClose }) {
  const [lineItems, setLineItems] = useState([emptyLineItem()])

  const updateItemObj = (id, newItem) => setLineItems(prev => prev.map(i => i.id === id ? newItem : i))
  const updateItem = (id, field, value) => setLineItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))
  const removeItem = (id) => { if (lineItems.length > 1) setLineItems(prev => prev.filter(i => i.id !== id)) }
  const addItem = () => setLineItems(prev => [...prev, emptyLineItem()])

  const getUnitPrice = (item) => item.breakdown.length > 0
    ? item.breakdown.reduce((sum, r) => sum + Number(r.amount), 0)
    : Number(item.unitPrice)

  const total = lineItems.reduce((sum, item) => sum + Number(item.qty) * getUnitPrice(item), 0)

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300 }} />
      <div style={{
        position: 'fixed', top: '5%', left: '50%', transform: 'translateX(-50%)',
        background: '#fff', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        zIndex: 301, width: 800, maxWidth: '95vw', maxHeight: '90vh', overflow: 'auto',
        padding: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
              Configure Line Items — {stage.name || `Stage ${stage.stageNum}`}
            </h2>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Stage amount: {fmt(Number(stage.amount))}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Line items */}
        <div className="card" style={{ padding: 0, overflow: 'visible', marginBottom: 16 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '28px 1fr 90px 110px 90px 28px',
            gap: 0, padding: '10px 14px', borderBottom: '1px solid #f3f4f6', background: '#fafafa',
          }}>
            <div /><div style={{ fontWeight: 700, fontSize: 12, color: '#6b7280' }}>Product / Service</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: '#6b7280', textAlign: 'center' }}>Qty</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: '#6b7280', textAlign: 'right' }}>Unit Price</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: '#6b7280', textAlign: 'right' }}>Total</div>
            <div />
          </div>

          <div style={{ padding: '12px 14px' }}>
            {lineItems.map(item => {
              const effectiveUnitPrice = getUnitPrice(item)
              const lineTotal = Number(item.qty) * effectiveUnitPrice
              const readOnlyPrice = item.breakdown.length > 0

              return (
                <div key={item.id} style={{ marginBottom: 12 }}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '28px 1fr 90px 110px 90px 28px',
                    gap: 0, alignItems: 'start',
                  }}>
                    <div style={{ paddingTop: 8, display: 'flex', justifyContent: 'center' }}>
                      <GripVertical size={14} color="#d1d5db" />
                    </div>
                    <div style={{ paddingRight: 10 }}>
                      <input
                        value={item.name} onChange={e => updateItem(item.id, 'name', e.target.value)}
                        placeholder="Name"
                        style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 5, padding: '6px 10px', fontSize: 13, marginBottom: 4 }}
                      />
                      <textarea
                        value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Description" rows={2}
                        style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 5, padding: '6px 10px', fontSize: 12, resize: 'vertical', minHeight: 44 }}
                      />
                      <PriceBreakdownToggle item={item} onChange={updated => updateItemObj(item.id, updated)} />
                    </div>
                    <div style={{ paddingRight: 8 }}>
                      <input type="number" value={item.qty} onChange={e => updateItem(item.id, 'qty', e.target.value)}
                        min={0}
                        style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 5, padding: '6px 8px', fontSize: 13, textAlign: 'center' }}
                      />
                    </div>
                    <div style={{ paddingRight: 8 }}>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: 13 }}>$</span>
                        <input type="number" value={readOnlyPrice ? effectiveUnitPrice.toFixed(2) : item.unitPrice}
                          onChange={e => !readOnlyPrice && updateItem(item.id, 'unitPrice', e.target.value)}
                          readOnly={readOnlyPrice} min={0} step={0.01}
                          style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 5, padding: '6px 8px 6px 20px', fontSize: 13, textAlign: 'right', background: readOnlyPrice ? '#f9fafb' : '#fff' }}
                        />
                      </div>
                    </div>
                    <div style={{ paddingTop: 8, textAlign: 'right' }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: '#111827' }}>${lineTotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
                      {lineItems.length > 1 && (
                        <button onClick={() => removeItem(item.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 2 }}>
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                  {item.breakdownOpen && (
                    <div style={{ marginLeft: 28, marginRight: 0, marginTop: 6 }}>
                      <PriceBreakdownPanel item={item} onChange={updated => updateItemObj(item.id, updated)} />
                    </div>
                  )}
                </div>
              )
            })}

            <button className="btn-secondary" style={{ fontSize: 13, marginTop: 4 }} onClick={addItem}>
              + Add Line Item
            </button>
          </div>
        </div>

        {/* Total vs stage amount check */}
        <div style={{
          padding: '10px 16px', borderRadius: 6, marginBottom: 16,
          background: Math.abs(total - Number(stage.amount)) < 0.01 ? '#f0fdf4' : '#fef3c7',
          border: `1px solid ${Math.abs(total - Number(stage.amount)) < 0.01 ? '#bbf7d0' : '#fde68a'}`,
          fontSize: 13,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span style={{ color: Math.abs(total - Number(stage.amount)) < 0.01 ? '#15803d' : '#92400e', fontWeight: 600 }}>
            {Math.abs(total - Number(stage.amount)) < 0.01 ? '✓ Line items match stage amount' : '⚠ Line items do not match stage amount'}
          </span>
          <span style={{ fontWeight: 700 }}>Total: {fmt(total)} / Target: {fmt(Number(stage.amount))}</span>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => { onSave(lineItems); onClose() }}>
            Save Stage Invoice
          </button>
        </div>
      </div>
    </>
  )
}

// ── Standard Invoice Editor ───────────────────────────────────────────────────

function StandardEditor({ client, onSave, onSaveDraft, onBack, discountRules, services }) {
  const [lineItems, setLineItems] = useState([emptyLineItem()])
  const [showManualDiscount, setShowManualDiscount] = useState(false)
  const [manualDiscount, setManualDiscount] = useState(null)
  const [appliedPreset, setAppliedPreset] = useState(null)
  const [earlyPayEnabled, setEarlyPayEnabled] = useState(false)
  const [earlyPay, setEarlyPay] = useState({ type: 'percent', value: 5, days: 3 })
  const [autoDiscountEnabled, setAutoDiscountEnabled] = useState(true)
  const [activeDropdownId, setActiveDropdownId] = useState(null)
  const [showExternalModal, setShowExternalModal] = useState(false)
  const TAX_RATE = 0.12

  const updateItem = (id, field, value) => {
    setLineItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const updateItemObj = (id, newItem) => {
    setLineItems(prev => prev.map(item => item.id === id ? newItem : item))
  }

  const removeItem = (id) => {
    if (lineItems.length === 1) return
    setLineItems(prev => prev.filter(item => item.id !== id))
  }

  const addItem = () => setLineItems(prev => [...prev, emptyLineItem()])

  const getUnitPrice = (item) => {
    if (item.breakdown.length > 0) return item.breakdown.reduce((sum, r) => sum + Number(r.amount), 0)
    return Number(item.unitPrice)
  }

  // Split regular vs external line items
  const regularItems = lineItems.filter(i => !i.isExternal)
  const externalItems = lineItems.filter(i => i.isExternal)

  const subtotal = regularItems.reduce((sum, item) => sum + (Number(item.qty) * getUnitPrice(item)), 0)
  const externalTotal = externalItems.reduce((sum, item) => sum + (Number(item.qty) * getUnitPrice(item)), 0)

  const autoRule = discountRules
    ? discountRules.find(r => r.status === 'Active' && r.mode === 'Automatic' && r.appliesTo === 'Invoice')
    : null

  const autoDiscountAmt = autoRule && autoDiscountEnabled
    ? (autoRule.type === 'percent' ? subtotal * (autoRule.value / 100) : autoRule.value)
    : 0

  const presetRules = discountRules
    ? discountRules.filter(r => r.status === 'Active' && r.mode === 'Preset' && r.appliesTo === 'Invoice')
    : []

  const presetRule = appliedPreset ? presetRules.find(r => r.id === appliedPreset) : null
  const presetDiscountAmt = presetRule
    ? (presetRule.type === 'percent' ? subtotal * (presetRule.value / 100) : presetRule.value)
    : 0

  const manualDiscountAmt = manualDiscount ? Number(manualDiscount) : 0
  const totalDiscountAmt = autoDiscountAmt + presetDiscountAmt + manualDiscountAmt
  const totalDiscountPct = subtotal > 0 ? (totalDiscountAmt / subtotal) * 100 : 0
  const taxable = subtotal - totalDiscountAmt
  const tax = taxable * TAX_RATE
  // External items excluded from tax and discounts
  const total = taxable + tax + externalTotal

  const earlyPayAmt = earlyPayEnabled
    ? (earlyPay.type === 'percent' ? total * (earlyPay.value / 100) : earlyPay.value)
    : 0

  const handleExternalInvoiceConfirm = ({ name, unitPrice, description, isExternal, externalLink, externalVendor }) => {
    setLineItems(prev => [...prev, {
      ...emptyLineItem(),
      name, unitPrice, description, isExternal: true, externalLink, externalVendor,
    }])
    setShowExternalModal(false)
  }

  const handleServiceSelect = (itemId, svc) => {
    setLineItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, name: svc.name, unitPrice: svc.avgSellPrice } : item
    ))
    setActiveDropdownId(null)
  }

  return (
    <div className="page-content" style={{ maxWidth: 1200 }}>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn-secondary" onClick={onBack} style={{ fontSize: 13 }}>← Back</button>
          <div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 2 }}>Invoice for</div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111827' }}>{client.name}</h1>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{client.address}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={onSaveDraft}>Save Draft</button>
          <button className="btn-primary" onClick={onSave}>Create Invoice</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'visible' }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '36px 1fr 100px 120px 100px 170px 36px',
          gap: 0, padding: '10px 16px',
          borderBottom: '1px solid #f3f4f6', background: '#fafafa',
          borderRadius: '8px 8px 0 0',
        }}>
          <div />
          <div style={{ fontWeight: 700, fontSize: 13, color: '#374151' }}>Product / Service</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#374151', textAlign: 'center' }}>Qty.</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#374151', textAlign: 'right' }}>Unit Price</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#374151', textAlign: 'right' }}>Total</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#374151', textAlign: 'center' }}>Margin Signal</div>
          <div />
        </div>

        <div style={{ padding: 16, overflow: 'visible' }}>
          {lineItems.map((item) => {
            const effectiveUnitPrice = getUnitPrice(item)
            const lineTotal = Number(item.qty) * effectiveUnitPrice
            const readOnlyPrice = item.breakdown.length > 0
            const filteredServices = (services || []).filter(s =>
              !item.name || s.name.toLowerCase().includes(item.name.toLowerCase())
            )

            return (
              <div key={item.id} style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f9fafb' }}>
                {/* External line item banner */}
                {item.isExternal && (
                  <div style={{
                    background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6,
                    padding: '6px 12px', marginBottom: 6, fontSize: 11, color: '#1e40af',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span>📎 External pass-through — excluded from discounts & tax</span>
                    {item.externalLink && (
                      <a href={item.externalLink} target="_blank" rel="noreferrer"
                        style={{ color: '#1d4ed8', fontSize: 11, fontWeight: 600, textDecoration: 'underline' }}>
                        View original invoice ↗
                      </a>
                    )}
                  </div>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '36px 1fr 100px 120px 100px 170px 36px',
                  gap: 0, alignItems: 'start',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    <GripVertical size={16} color="#d1d5db" />
                  </div>

                  {/* Name + description column */}
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        value={item.name}
                        onChange={e => updateItem(item.id, 'name', e.target.value)}
                        onFocus={() => !item.isExternal && setActiveDropdownId(item.id)}
                        onBlur={() => setTimeout(() => setActiveDropdownId(null), 150)}
                        placeholder="Name"
                        readOnly={item.isExternal}
                        style={{
                          width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                          padding: '8px 12px', fontSize: 13, marginBottom: 6, color: '#111827',
                          background: item.isExternal ? '#f9fafb' : '#fff',
                        }}
                      />
                      {activeDropdownId === item.id && services && services.length > 0 && (
                        <div style={{
                          position: 'absolute', top: '100%', left: 0, right: 0,
                          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6,
                          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', zIndex: 50,
                          maxHeight: 200, overflowY: 'auto',
                        }}>
                          {filteredServices.length > 0 ? filteredServices.map(svc => (
                            <div
                              key={svc.id}
                              onMouseDown={() => handleServiceSelect(item.id, svc)}
                              style={{
                                padding: '8px 12px', cursor: 'pointer',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                fontSize: 13, borderBottom: '1px solid #f3f4f6',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                            >
                              <span style={{ fontWeight: 600, color: '#111827' }}>{svc.name}</span>
                              <span style={{ color: '#6b7280' }}>${svc.avgSellPrice}</span>
                            </div>
                          )) : (
                            <div style={{ padding: '10px 12px', fontSize: 13, color: '#9ca3af' }}>No match</div>
                          )}
                        </div>
                      )}
                    </div>
                    <textarea
                      value={item.description}
                      onChange={e => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Description"
                      rows={2}
                      readOnly={item.isExternal}
                      style={{
                        width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                        padding: '8px 12px', fontSize: 12, resize: 'vertical', color: '#374151', minHeight: 48,
                        background: item.isExternal ? '#f9fafb' : '#fff',
                      }}
                    />
                    {!item.isExternal && (
                      <div style={{ textAlign: 'right', marginTop: 4 }}>
                        <button className="btn-ghost" style={{ fontSize: 12 }}>Set Service Date</button>
                      </div>
                    )}
                  </div>

                  {/* Qty */}
                  <div style={{ paddingRight: 10 }}>
                    <input
                      type="number" value={item.qty}
                      onChange={e => updateItem(item.id, 'qty', e.target.value)}
                      min={0} readOnly={item.isExternal}
                      style={{
                        width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                        padding: '8px 10px', fontSize: 13, textAlign: 'center', color: '#111827',
                        background: item.isExternal ? '#f9fafb' : '#fff',
                      }}
                    />
                  </div>

                  {/* Unit Price + breakdown toggle */}
                  <div style={{ paddingRight: 10 }}>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                        color: '#6b7280', fontSize: 13, pointerEvents: 'none',
                      }}>$</span>
                      <input
                        type="number"
                        value={readOnlyPrice ? effectiveUnitPrice.toFixed(2) : item.unitPrice}
                        onChange={e => !readOnlyPrice && updateItem(item.id, 'unitPrice', e.target.value)}
                        readOnly={readOnlyPrice || item.isExternal}
                        min={0} step={0.01}
                        style={{
                          width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                          padding: '8px 10px 8px 20px', fontSize: 13, textAlign: 'right', color: '#111827',
                          background: (readOnlyPrice || item.isExternal) ? '#f9fafb' : '#fff',
                        }}
                      />
                    </div>
                    {/* Breakdown toggle — only for non-external items */}
                    {!item.isExternal && (
                      <PriceBreakdownToggle item={item} onChange={updated => updateItemObj(item.id, updated)} />
                    )}
                  </div>

                  {/* Total */}
                  <div style={{ paddingTop: 10, textAlign: 'right' }}>
                    <span style={{ color: '#6b7280', fontSize: 13, marginRight: 2 }}>$</span>
                    <span style={{ fontWeight: 600, fontSize: 13, color: item.isExternal ? '#1e40af' : '#111827' }}>
                      {lineTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Profitability signal */}
                  <div style={{ paddingLeft: 8 }}>
                    {!item.isExternal && (
                      <ProfitSignal itemName={item.name} services={services} discountPct={totalDiscountPct} />
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10 }}>
                    {lineItems.length > 1 && (
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Breakdown panel — OUTSIDE the grid, full width */}
                {item.breakdownOpen && !item.isExternal && (
                  <div style={{ marginLeft: 36, marginRight: 36, marginTop: 6 }}>
                    <PriceBreakdownPanel item={item} onChange={updated => updateItemObj(item.id, updated)} />
                  </div>
                )}
              </div>
            )
          })}

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button className="btn-primary" style={{ fontSize: 13 }} onClick={addItem}>
              + Add Line Item
            </button>
            <button
              className="btn-secondary"
              style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => setShowExternalModal(true)}
            >
              📎 Add External Invoice<NewBadge />
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', margin: '0 16px' }} />

        {/* Bottom section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* Left: Client view */}
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 10, borderRight: '1px solid #f3f4f6' }}>
            <Eye size={18} color="#6b7280" />
            <span style={{ fontSize: 14, color: '#374151' }}>Client view</span>
            <button className="btn-ghost" style={{ fontSize: 13 }}>Change</button>
          </div>

          {/* Right: Totals */}
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: '#374151' }}>Subtotal (billable)</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>{fmt(subtotal)}</span>
            </div>

            {/* Auto-applied discount with checkbox */}
            {autoRule && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <input
                  type="checkbox"
                  checked={autoDiscountEnabled}
                  onChange={e => setAutoDiscountEnabled(e.target.checked)}
                  style={{ width: 14, height: 14, cursor: 'pointer', accentColor: '#3d8b37' }}
                />
                <span style={{
                  background: autoDiscountEnabled ? '#dcfce7' : '#f3f4f6',
                  color: autoDiscountEnabled ? '#15803d' : '#9ca3af',
                  borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  ✓ Auto-applied: {autoRule.name} {autoRule.type === 'percent' ? `${autoRule.value}%` : `$${autoRule.value}`}
                </span>
                {autoDiscountEnabled && (
                  <span style={{ marginLeft: 'auto', fontWeight: 600, fontSize: 13, color: '#15803d' }}>
                    -{fmt(autoDiscountAmt)}
                  </span>
                )}
              </div>
            )}

            {/* Preset discount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, alignItems: 'center' }}>
              <span style={{ color: '#374151' }}>Discount</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {presetRules.length > 0 && (
                  <select
                    value={appliedPreset || ''}
                    onChange={e => setAppliedPreset(e.target.value ? Number(e.target.value) : null)}
                    style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: 12 }}
                  >
                    <option value="">Apply discount preset…</option>
                    {presetRules.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.type === 'percent' ? `${r.value}%` : `$${r.value}`})
                      </option>
                    ))}
                  </select>
                )}
                {showManualDiscount ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#6b7280' }}>$</span>
                    <input type="number" placeholder="0.00"
                      value={manualDiscount || ''} onChange={e => setManualDiscount(e.target.value)}
                      style={{ width: 80, border: '1px solid #e5e7eb', borderRadius: 4, padding: '4px 8px', fontSize: 13 }}
                      autoFocus />
                    <button onClick={() => { setShowManualDiscount(false); setManualDiscount(null) }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button className="btn-ghost" style={{ fontSize: 13 }} onClick={() => setShowManualDiscount(true)}>
                    + Manual
                  </button>
                )}
                {totalDiscountAmt > 0 && (
                  <span style={{ fontWeight: 600, color: '#ef4444' }}>-{fmt(totalDiscountAmt)}</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <button className="btn-ghost" style={{ fontSize: 13 }}>CST (12.0%)</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 500, color: '#111827' }}>{fmt(tax)}</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 0 }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* External pass-through line */}
            {externalTotal > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: '#374151' }}>External pass-through (no tax/discount)</span>
                <span style={{ fontWeight: 600, color: '#1e40af' }}>{fmt(externalTotal)}</span>
              </div>
            )}

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
              <span style={{ fontWeight: 800, color: '#111827' }}>Total</span>
              <span style={{ fontWeight: 800, color: '#111827' }}>{fmt(total)}</span>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#374151' }}>Deposits</span>
              <button className="btn-ghost" style={{ fontSize: 13 }}>Add Deposit</button>
            </div>

            {/* Early Pay Discount */}
            <div style={{ borderTop: '1px solid #e5e7eb', marginTop: 12, paddingTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: earlyPayEnabled ? 12 : 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  Early Pay Discount<NewBadge />
                </span>
                <button
                  onClick={() => setEarlyPayEnabled(!earlyPayEnabled)}
                  style={{
                    width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
                    background: earlyPayEnabled ? '#3d8b37' : '#d1d5db', position: 'relative', transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    position: 'absolute', top: 3, left: earlyPayEnabled ? 20 : 3,
                    width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                  }} />
                </button>
              </div>

              {earlyPayEnabled && (
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <select value={earlyPay.type} onChange={e => setEarlyPay(p => ({ ...p, type: e.target.value }))}
                      style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '6px 8px', fontSize: 13 }}>
                      <option value="percent">%</option>
                      <option value="fixed">$</option>
                    </select>
                    <input type="number" value={earlyPay.value}
                      onChange={e => setEarlyPay(p => ({ ...p, value: Number(e.target.value) }))}
                      min={0}
                      style={{ width: 70, border: '1px solid #d1d5db', borderRadius: 4, padding: '6px 8px', fontSize: 13 }} />
                    <span style={{ alignSelf: 'center', fontSize: 13, color: '#6b7280' }}>within</span>
                    <input type="number" value={earlyPay.days}
                      onChange={e => setEarlyPay(p => ({ ...p, days: Number(e.target.value) }))}
                      min={1}
                      style={{ width: 60, border: '1px solid #d1d5db', borderRadius: 4, padding: '6px 8px', fontSize: 13 }} />
                    <span style={{ alignSelf: 'center', fontSize: 13, color: '#6b7280' }}>days</span>
                  </div>

                  <div style={{
                    background: '#f0fdf4', borderRadius: 6, padding: '10px 14px', fontSize: 12,
                    color: '#374151', marginBottom: 8,
                  }}>
                    Pay within {earlyPay.days} days: <strong>{fmt(total - earlyPayAmt)}</strong>
                    {' '}| After {earlyPay.days} days: <strong>{fmt(total)}</strong>
                  </div>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: '#fef3c7', color: '#92400e', borderRadius: 20,
                    padding: '3px 10px', fontSize: 11, fontWeight: 600,
                  }}>
                    Offer expires in {earlyPay.days} days
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showExternalModal && (
        <ExternalInvoiceModal
          onConfirm={handleExternalInvoiceConfirm}
          onClose={() => setShowExternalModal(false)}
        />
      )}
    </div>
  )
}

// ── Milestone Invoice Editor ──────────────────────────────────────────────────

function emptyStage(num) {
  return { id: Date.now() + Math.random(), name: '', amount: 0, timing: 'Due now', note: '', stageNum: num, lineItems: null }
}

function MilestoneEditor({ client, onSave, onSaveDraft, onBack, services }) {
  const [jobValue, setJobValue] = useState(0)
  const [stages, setStages] = useState([emptyStage(1)])
  const [configuringStage, setConfiguringStage] = useState(null)

  const stageSum = stages.reduce((s, st) => s + Number(st.amount), 0)
  const diff = Number(jobValue) - stageSum
  const balanced = Math.abs(diff) < 0.01
  const allConfigured = stages.every(s => s.lineItems !== null)

  const addStage = () => setStages(prev => [...prev, emptyStage(prev.length + 1)])
  const removeStage = (id) => setStages(prev => prev.filter(s => s.id !== id))
  const updateStage = (id, field, val) => setStages(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s))

  const saveStageInvoice = (stageId, lineItems) => {
    setStages(prev => prev.map(s => s.id === stageId ? { ...s, lineItems } : s))
  }

  let running = 0
  const timeline = stages.map(st => {
    running += Number(st.amount)
    return { ...st, running }
  })

  return (
    <div className="page-content" style={{ maxWidth: 1200 }}>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn-secondary" onClick={onBack} style={{ fontSize: 13 }}>← Back</button>
          <div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 2 }}>Milestone Invoice for</div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111827' }}>{client.name}</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={onSaveDraft}>Save Draft</button>
          <button
            className="btn-primary"
            onClick={onSave}
            disabled={!allConfigured}
            style={{ opacity: allConfigured ? 1 : 0.5 }}
            title={!allConfigured ? 'Configure all stage invoices first' : ''}
          >
            Create Invoice
          </button>
        </div>
      </div>

      {!allConfigured && (
        <div style={{
          background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 6,
          padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#92400e',
        }}>
          ⚠ Configure the line items for each stage before saving.
          {' '}{stages.filter(s => s.lineItems !== null).length} / {stages.length} stages configured.
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
          Total Job Value
        </label>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>$</span>
          <input
            type="number" value={jobValue} onChange={e => setJobValue(e.target.value)}
            min={0} step={0.01}
            style={{ border: '1px solid #d1d5db', borderRadius: 6, padding: '10px 12px 10px 24px', fontSize: 16, width: 200 }}
          />
        </div>
      </div>

      {!balanced && stageSum > 0 && (
        <div style={{
          background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 6,
          padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#92400e',
        }}>
          ⚠ Stage total ({fmt(stageSum)}) {diff > 0 ? 'is short by' : 'exceeds job value by'} {fmt(Math.abs(diff))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
        {/* Stage list */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Payment Stages</h3>
          {stages.map((stage, i) => (
            <div key={stage.id} style={{
              border: `2px solid ${stage.lineItems ? '#bbf7d0' : '#e5e7eb'}`,
              borderRadius: 8, padding: 16, marginBottom: 12,
              background: stage.lineItems ? '#f0fdf4' : '#fff',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: stage.lineItems ? '#3d8b37' : '#f0fdf4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800,
                  color: stage.lineItems ? '#fff' : '#15803d', flexShrink: 0,
                }}>
                  {stage.lineItems ? '✓' : i + 1}
                </div>
                <input
                  value={stage.name} onChange={e => updateStage(stage.id, 'name', e.target.value)}
                  placeholder="Stage name"
                  style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 6, padding: '7px 12px', fontSize: 14, color: '#111827' }}
                />
                <div style={{ position: 'relative', width: 120 }}>
                  <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: 13 }}>$</span>
                  <input type="number" value={stage.amount}
                    onChange={e => updateStage(stage.id, 'amount', e.target.value)}
                    min={0} step={0.01}
                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '7px 10px 7px 22px', fontSize: 14 }}
                  />
                </div>
                {stages.length > 1 && (
                  <button onClick={() => removeStage(stage.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {['Due now', 'Selected date', 'Completion'].map(t => (
                  <button key={t} onClick={() => updateStage(stage.id, 'timing', t)} style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                    background: stage.timing === t ? '#3d8b37' : '#f3f4f6',
                    color: stage.timing === t ? '#fff' : '#374151',
                  }}>{t}</button>
                ))}
              </div>
              <input value={stage.note} onChange={e => updateStage(stage.id, 'note', e.target.value)}
                placeholder="Optional note"
                style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 10px', fontSize: 12, color: '#6b7280', marginBottom: 10 }}
              />
              {/* Configure invoice button */}
              <button
                onClick={() => setConfiguringStage(stage)}
                style={{
                  width: '100%', padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                  border: `1px solid ${stage.lineItems ? '#15803d' : '#d1d5db'}`,
                  background: stage.lineItems ? '#f0fdf4' : '#f9fafb',
                  color: stage.lineItems ? '#15803d' : '#374151', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <Receipt size={14} />
                {stage.lineItems
                  ? `✓ Invoice configured (${stage.lineItems.length} item${stage.lineItems.length !== 1 ? 's' : ''})`
                  : 'Configure Invoice →'}
              </button>
            </div>
          ))}
          <button className="btn-secondary" onClick={addStage} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
            <Plus size={14} /> Add Stage
          </button>

          <div style={{
            marginTop: 16, padding: '12px 16px',
            background: balanced ? '#f0fdf4' : '#fef3c7', borderRadius: 6,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: balanced ? '#15803d' : '#92400e' }}>
              {balanced ? '✓ Stages balanced' : '⚠ Stages unbalanced'}
            </span>
            <span style={{ fontSize: 14, fontWeight: 800 }}>{fmt(stageSum)} / {fmt(Number(jobValue))}</span>
          </div>
        </div>

        {/* Payment timeline */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Payment Timeline</h3>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 10, top: 12, bottom: 12, width: 2, background: '#e5e7eb' }} />
            {timeline.map((stage, i) => (
              <div key={stage.id} style={{ position: 'relative', marginBottom: 28 }}>
                <div style={{
                  position: 'absolute', left: -26, top: 2, width: 16, height: 16, borderRadius: '50%',
                  background: stage.lineItems ? '#3d8b37' : '#e5e7eb',
                  border: '2px solid #fff', boxShadow: `0 0 0 2px ${stage.lineItems ? '#3d8b37' : '#d1d5db'}`, zIndex: 1,
                }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                    Stage {i + 1}: {stage.name || '(Unnamed)'}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 1 }}>{stage.timing}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#3d8b37', marginTop: 4 }}>
                    {fmt(Number(stage.amount))}
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>Running total: {fmt(stage.running)}</div>
                  {stage.lineItems && (
                    <div style={{ fontSize: 11, color: '#15803d', marginTop: 2 }}>
                      ✓ {stage.lineItems.length} line item{stage.lineItems.length !== 1 ? 's' : ''} configured
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: -27, top: 2, width: 18, height: 18, borderRadius: '50%',
                background: balanced ? '#15803d' : '#f59e0b',
                border: '2px solid #fff', boxShadow: `0 0 0 2px ${balanced ? '#15803d' : '#f59e0b'}`, zIndex: 1,
              }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Total</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: balanced ? '#15803d' : '#d97706' }}>
                  {fmt(stageSum)}{balanced && <span style={{ fontSize: 12, marginLeft: 6 }}>✓</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Invoice Editor Modal */}
      {configuringStage && (
        <StageInvoiceEditor
          stage={configuringStage}
          services={services}
          onSave={(lineItems) => saveStageInvoice(configuringStage.id, lineItems)}
          onClose={() => setConfiguringStage(null)}
        />
      )}
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function NewInvoice({ navigate, addInvoice, discountRules, services }) {
  const [step, setStep] = useState(0)
  const [invoiceType, setInvoiceType] = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)

  const handleSave = (isDraft) => {
    const status = isDraft ? 'Draft' : 'Sent'
    addInvoice({
      client: selectedClient.name,
      clientId: selectedClient.id,
      dueDate: 'Net 30 days',
      subject: 'For Services Rendered',
      status,
      total: 0,
      balance: 0,
    })
    navigate('invoices')
  }

  if (step === 0) {
    return <TypeSelector onSelect={(type) => { setInvoiceType(type); setStep(1) }} />
  }

  if (step === 1) {
    return (
      <ClientSelect
        onSelect={(client) => { setSelectedClient(client); setStep(2) }}
        onBack={() => setStep(0)}
      />
    )
  }

  if (invoiceType === 'standard') {
    return (
      <StandardEditor
        client={selectedClient}
        onSave={() => handleSave(false)}
        onSaveDraft={() => handleSave(true)}
        onBack={() => setStep(1)}
        discountRules={discountRules}
        services={services}
      />
    )
  }

  return (
    <MilestoneEditor
      client={selectedClient}
      onSave={() => handleSave(false)}
      onSaveDraft={() => handleSave(true)}
      onBack={() => setStep(1)}
      services={services}
    />
  )
}
