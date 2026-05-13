import { useState } from 'react'
import { GripVertical, Trash2, Upload, Plus, X } from 'lucide-react'

function emptyLineItem(optional = false) {
  return {
    id: Date.now() + Math.random(),
    name: '',
    description: '',
    qty: 1,
    unitCost: 0,
    unitPrice: 0,
    optional,
    type: 'line',
  }
}

function emptyTextBlock() {
  return { id: Date.now() + Math.random(), type: 'text', content: '' }
}

function fmt(n) {
  return `$${Number(n).toFixed(2)}`
}

export default function NewQuoteTemplate({ navigate, addQuote }) {
  const [templateName, setTemplateName] = useState('')
  const [title, setTitle] = useState('')
  const [intro, setIntro] = useState('')
  const [showIntro, setShowIntro] = useState(false)
  const [items, setItems] = useState([emptyLineItem()])
  const [deposit, setDeposit] = useState(null)
  const [showDeposit, setShowDeposit] = useState(false)

  const lineItems = items.filter(i => i.type === 'line')

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const addLineItem = (optional = false) => {
    setItems(prev => [...prev, emptyLineItem(optional)])
  }

  const addTextBlock = () => {
    setItems(prev => [...prev, emptyTextBlock()])
  }

  const subtotal = lineItems.reduce((sum, item) => sum + (Number(item.qty) * Number(item.unitPrice)), 0)
  const total = subtotal

  const handleSave = () => {
    addQuote({
      client: 'New Client',
      clientId: null,
      title: templateName || 'Untitled Template',
      property: '—',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Draft',
      total,
    })
    navigate('quotes')
  }

  return (
    <div className="page-content" style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827' }}>New Template</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={() => navigate('quotes')}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Template</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Template name + Title */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ borderRight: '1px solid #e5e7eb' }}>
            <input
              value={templateName}
              onChange={e => setTemplateName(e.target.value)}
              placeholder="Template name"
              style={{
                width: '100%', border: 'none', borderRadius: 0,
                padding: '18px 20px', fontSize: 15, color: '#111827',
                outline: 'none',
              }}
            />
          </div>
          <div>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              style={{
                width: '100%', border: 'none', borderRadius: 0,
                padding: '18px 20px', fontSize: 15, color: '#111827',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Add section / Introduction */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setShowIntro(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: '1px solid #e5e7eb', borderRadius: 6,
              padding: '7px 14px', fontSize: 13, color: '#374151', cursor: 'pointer',
              fontWeight: 500,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <Plus size={14} /> Add Section
          </button>
          {!showIntro && (
            <button
              onClick={() => setShowIntro(true)}
              style={{
                background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6,
                padding: '7px 14px', fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500,
              }}
            >
              Introduction
            </button>
          )}
          {showIntro && (
            <span style={{ fontSize: 13, color: '#9ca3af' }}>Introduction section added ↓</span>
          )}
        </div>

        {/* Introduction block */}
        {showIntro && (
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>Introduction</span>
              <button onClick={() => setShowIntro(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                <X size={16} />
              </button>
            </div>
            <textarea
              value={intro}
              onChange={e => setIntro(e.target.value)}
              placeholder="Add an introduction to your quote..."
              rows={4}
              style={{
                width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                padding: '10px 14px', fontSize: 14, resize: 'vertical',
                color: '#374151', background: '#fff',
              }}
            />
          </div>
        )}

        {/* Product / Service section */}
        <div style={{ padding: '24px 20px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 20 }}>Product / Service</h3>

          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '36px 1fr 100px 120px 120px 120px 36px',
            gap: 8,
            padding: '0 0 8px 0',
            borderBottom: '1px solid #f3f4f6',
            marginBottom: 12,
          }}>
            <div />
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280' }}>Name</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textAlign: 'center' }}>Quantity</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textAlign: 'right' }}>Unit cost</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textAlign: 'right' }}>Unit price</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textAlign: 'right' }}>Total</div>
            <div />
          </div>

          {/* Line items */}
          {items.map((item) => {
            if (item.type === 'text') {
              return (
                <div key={item.id} style={{ marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ paddingTop: 10 }}>
                    <GripVertical size={16} color="#d1d5db" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Text block
                    </div>
                    <textarea
                      value={item.content}
                      onChange={e => updateItem(item.id, 'content', e.target.value)}
                      placeholder="Add text..."
                      rows={3}
                      style={{
                        width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                        padding: '10px 12px', fontSize: 14, resize: 'vertical',
                        color: '#374151', background: '#fff',
                      }}
                    />
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', paddingTop: 10 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            }

            const lineTotal = Number(item.qty) * Number(item.unitPrice)
            return (
              <div key={item.id} style={{ marginBottom: 16 }}>
                {item.optional && (
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px', paddingLeft: 44 }}>
                    Optional
                  </div>
                )}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '36px 1fr 100px 120px 120px 120px 36px',
                  gap: 8,
                  alignItems: 'start',
                  padding: item.optional ? '12px 12px 12px' : 0,
                  background: item.optional ? '#fafff9' : 'transparent',
                  border: item.optional ? '1px dashed #86efac' : 'none',
                  borderRadius: item.optional ? 6 : 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    <GripVertical size={16} color="#d1d5db" />
                  </div>

                  {/* Name */}
                  <div>
                    <input
                      value={item.name}
                      onChange={e => updateItem(item.id, 'name', e.target.value)}
                      placeholder="Name"
                      style={{
                        width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                        padding: '8px 12px', fontSize: 14, color: '#111827',
                      }}
                    />
                  </div>

                  {/* Qty */}
                  <div>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={e => updateItem(item.id, 'qty', e.target.value)}
                      min={0}
                      style={{
                        width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                        padding: '8px 8px', fontSize: 14, textAlign: 'center', color: '#111827',
                      }}
                    />
                  </div>

                  {/* Unit cost */}
                  <div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: 13 }}>$</span>
                      <input
                        type="number"
                        value={item.unitCost}
                        onChange={e => updateItem(item.id, 'unitCost', e.target.value)}
                        min={0} step={0.01}
                        style={{
                          width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                          padding: '8px 8px 8px 20px', fontSize: 14, textAlign: 'right', color: '#111827',
                        }}
                      />
                    </div>
                  </div>

                  {/* Unit price */}
                  <div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: 13 }}>$</span>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={e => updateItem(item.id, 'unitPrice', e.target.value)}
                        min={0} step={0.01}
                        style={{
                          width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                          padding: '8px 8px 8px 20px', fontSize: 14, textAlign: 'right', color: '#111827',
                        }}
                      />
                    </div>
                  </div>

                  {/* Total */}
                  <div style={{ paddingTop: 10, textAlign: 'right' }}>
                    <span style={{ color: '#6b7280', fontSize: 13, marginRight: 2 }}>$</span>
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{lineTotal.toFixed(2)}</span>
                  </div>

                  {/* Remove */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10 }}>
                    {items.filter(i => i.type === 'line').length > 1 && (
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}>
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Description + Upload image */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 12, marginTop: 8, paddingLeft: 44 }}>
                  <textarea
                    value={item.description}
                    onChange={e => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Description"
                    rows={3}
                    style={{
                      width: '100%', border: '1px solid #e5e7eb', borderRadius: 6,
                      padding: '10px 12px', fontSize: 13, resize: 'vertical',
                      color: '#374151', background: '#fff', minHeight: 72,
                    }}
                  />
                  <div style={{
                    border: '1px dashed #d1d5db', borderRadius: 6, padding: '16px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 8, background: '#fafafa', cursor: 'pointer', minHeight: 72,
                  }}>
                    <button style={{
                      background: '#fff', border: '1px solid #d1d5db', borderRadius: 6,
                      padding: '6px 14px', fontSize: 13, fontWeight: 600, color: '#374151',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <Upload size={13} /> Upload Image
                    </button>
                    <span style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
                      Select or drag an image here to upload
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Action buttons + Totals row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24, alignItems: 'start' }}>
            {/* Left: Add buttons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ fontSize: 13, padding: '8px 14px' }}
                onClick={() => addLineItem(false)}>
                New line item
              </button>
              <button
                onClick={() => addLineItem(true)}
                style={{
                  background: 'transparent', border: '1px solid #1e7ad6', color: '#1e7ad6',
                  borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                New optional line item
              </button>
              <button
                onClick={addTextBlock}
                style={{
                  background: 'transparent', border: '1px solid #d1d5db', color: '#374151',
                  borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                New text
              </button>
            </div>

            {/* Right: Totals */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb', fontSize: 14 }}>
                <span style={{ color: '#374151' }}>Subtotal</span>
                <span style={{ fontWeight: 500, color: '#111827' }}>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb', fontSize: 15 }}>
                <span style={{ fontWeight: 800, color: '#111827' }}>Total</span>
                <span style={{ fontWeight: 800, color: '#111827' }}>{fmt(total)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 14 }}>
                <span style={{ color: '#374151' }}>Required deposit</span>
                {showDeposit ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#6b7280' }}>$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={deposit || ''}
                      onChange={e => setDeposit(e.target.value)}
                      autoFocus
                      style={{
                        width: 90, border: '1px solid #e5e7eb', borderRadius: 4,
                        padding: '4px 8px', fontSize: 13, textAlign: 'right',
                      }}
                    />
                    <button onClick={() => { setShowDeposit(false); setDeposit(null) }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button className="btn-ghost" style={{ fontSize: 13 }} onClick={() => setShowDeposit(true)}>
                    Add Required Deposit
                  </button>
                )}
              </div>
              {deposit && showDeposit && (
                <div style={{ textAlign: 'right', fontSize: 12, color: '#9ca3af' }}>
                  Deposit: {fmt(deposit)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
