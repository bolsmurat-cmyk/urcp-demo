'use client'
import { useState, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { PRODUCTS, getInventoryForProduct, ORGS, getOrg } from '@/lib/mockData'
import { ArrowLeft, Check, Sparkles, ChevronRight, Minus, Plus } from 'lucide-react'

const STEPS = ['Product', 'Route', 'Quantity', 'Confirm']

function TransferContent() {
  const router = useRouter()
  const params = useSearchParams()
  const preselect = params.get('product') ?? ''

  const [step,    setStep]    = useState(preselect ? 1 : 0)
  const [prodId,  setProdId]  = useState(preselect)
  const [fromOrg, setFromOrg] = useState('')
  const [toOrg,   setToOrg]   = useState('')
  const [qty,     setQty]     = useState(20)
  const [note,    setNote]    = useState('')
  const [done,    setDone]    = useState(false)

  const product = useMemo(() => PRODUCTS.find(p => p.id === prodId), [prodId])
  const inv     = useMemo(() => prodId ? getInventoryForProduct(prodId) : [], [prodId])

  const fromInv = inv.find(i => i.org_id === fromOrg)
  const maxQty  = fromInv ? fromInv.transferable : 0
  const unitCost = fromInv?.avg_cost ?? 0
  const xferValue = qty * unitCost

  // System recommendation: pick highest transferable as source, lowest qty as dest
  const sorted = [...inv].sort((a,b) => b.transferable - a.transferable)
  const recFrom = sorted[0]
  const recTo   = [...inv].filter(i => i.org_id !== recFrom?.org_id).sort((a,b) => a.qty - b.qty)[0]
  const saving  = recTo ? qty * unitCost : 0

  const go = (n: number) => { if (n >= 0 && n < STEPS.length) setStep(n) }

  const submit = () => {
    setDone(true)
    setTimeout(() => router.push('/dashboard'), 2200)
  }

  if (done) return (
    <AppShell>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80dvh', padding: 32 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Check size={36} color="#0F6E56" />
        </div>
        <div style={{ fontSize: 22, fontWeight: 500, color: '#1a1a1a', marginBottom: 8 }}>Transfer submitted</div>
        <div style={{ fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 6 }}>TRF-2026-0043 · Awaiting approval</div>
        <div style={{ fontSize: 14, color: '#999', textAlign: 'center' }}>{qty} units · {getOrg(fromOrg)?.name} → {getOrg(toOrg)?.name}</div>
      </div>
    </AppShell>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#fff', padding: '12px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button onClick={() => step > 0 ? go(step-1) : router.back()}
            style={{ width: 34, height: 34, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={16} color="#555" />
          </button>
          <span style={{ fontSize: 17, fontWeight: 500 }}>New transfer</span>
        </div>
        {/* Step bar */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length-1 ? 1 : undefined }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: i < step ? '#0F6E56' : i === step ? '#0F6E56' : '#F4F6F5', border: i < step || i === step ? 'none' : '0.5px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: i <= step ? '#fff' : '#aaa' }}>
                  {i < step ? <Check size={12} /> : i+1}
                </div>
                <span style={{ fontSize: 11, color: i === step ? '#0F6E56' : '#aaa', fontWeight: i === step ? 500 : 400 }}>{s}</span>
              </div>
              {i < STEPS.length-1 && <div style={{ flex: 1, height: '0.5px', background: i < step ? '#0F6E56' : 'rgba(0,0,0,0.1)', margin: '0 6px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 14 }} className="animate-in">

        {/* STEP 0: Select product */}
        {step === 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Select product</div>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              {PRODUCTS.filter(p => p.status === 'Approved').map((p, idx, arr) => {
                const totalXfer = getInventoryForProduct(p.id).reduce((s,i) => s + i.transferable, 0)
                return (
                  <button key={p.id} onClick={() => { setProdId(p.id); go(1) }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: prodId === p.id ? '#E1F5EE' : 'none', border: 'none', borderBottom: idx < arr.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#999' }}>{p.code} · {p.category}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: totalXfer > 0 ? '#0F6E56' : '#aaa' }}>{totalXfer} transferable</div>
                    </div>
                    <ChevronRight size={16} color="#ccc" />
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* STEP 1: Route */}
        {step === 1 && product && (
          <>
            {/* Selected product */}
            <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Product</div>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🔍</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{product.name}</div>
                <div style={{ fontSize: 11, color: '#999' }}>{product.code} · {inv.reduce((s,i) => s+i.qty,0)} units across {inv.length} orgs</div>
              </div>
              <button onClick={() => go(0)} style={{ fontSize: 12, color: '#0F6E56', background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
            </div>

            {/* Recommendation */}
            {recFrom && recTo && (
              <div style={{ background: '#fff', border: '1.5px solid #0F6E56', borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ background: '#E1F5EE', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} color="#085041" />
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#085041' }}>System recommendation</span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  {[
                    { label: 'Best source',      value: `${recFrom.org.name} (${recFrom.transferable} avail.)` },
                    { label: 'Destination need', value: `${recTo.org.name} — only ${recTo.qty} left`, red: true },
                    { label: 'Est. transfer cost', value: '$0 (internal)' },
                    { label: 'vs. purchasing new', value: `Save $${(qty * unitCost).toFixed(0)} (${qty} units)`, green: true },
                  ].map(({ label, value, red, green }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                      <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: red ? '#A32D2D' : green ? '#0F6E56' : '#1a1a1a' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* From */}
            <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Transfer from</div>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
              {inv.filter(i => i.transferable > 0).map((i, idx, arr) => (
                <button key={i.id} onClick={() => { setFromOrg(i.org_id); if (!toOrg) setToOrg(inv.find(x => x.org_id !== i.org_id)?.org_id ?? '') }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: fromOrg === i.org_id ? '#E1F5EE' : 'none', border: 'none', borderBottom: idx < arr.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: i.org.color }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{i.org.name}</div>
                    <div style={{ fontSize: 11, color: '#999' }}>{i.warehouse.name} · {i.transferable} transferable</div>
                  </div>
                  {fromOrg === i.org_id && <Check size={18} color="#0F6E56" />}
                </button>
              ))}
            </div>

            {/* To */}
            <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Transfer to</div>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 20 }}>
              {inv.filter(i => i.org_id !== fromOrg).map((i, idx, arr) => (
                <button key={i.id} onClick={() => setToOrg(i.org_id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: toOrg === i.org_id ? '#E1F5EE' : 'none', border: 'none', borderBottom: idx < arr.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: i.org.color }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{i.org.name}</div>
                    <div style={{ fontSize: 11, color: i.qty <= 10 ? '#A32D2D' : '#999', fontWeight: i.qty <= 10 ? 500 : 400 }}>{i.warehouse.name} · {i.qty} in stock{i.qty <= 10 ? ' ⚠' : ''}</div>
                  </div>
                  {toOrg === i.org_id && <Check size={18} color="#0F6E56" />}
                </button>
              ))}
            </div>

            <button onClick={() => go(2)} disabled={!fromOrg || !toOrg}
              style={{ width: '100%', height: 50, background: fromOrg && toOrg ? '#0F6E56' : '#ccc', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: fromOrg && toOrg ? 'pointer' : 'not-allowed' }}>
              Continue
            </button>
          </>
        )}

        {/* STEP 2: Quantity */}
        {step === 2 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Quantity</div>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '14px 14px', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>Units to transfer</div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>Max: {maxQty} units available</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <button onClick={() => setQty(Math.max(1, qty-1))}
                    style={{ width: 34, height: 34, borderRadius: 8, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Minus size={16} color="#555" />
                  </button>
                  <span style={{ fontSize: 22, fontWeight: 500, minWidth: 32, textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => setQty(Math.min(maxQty || 99, qty+1))}
                    style={{ width: 34, height: 34, borderRadius: 8, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0F6E56' }}>
                    <Plus size={16} color="#0F6E56" />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F9FAF9', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: 12, color: '#999' }}>Transfer value</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>${xferValue.toFixed(2)} ({qty} × ${unitCost.toFixed(2)})</span>
              </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Reference / Notes</div>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', marginBottom: 20, overflow: 'hidden' }}>
              <textarea value={note} onChange={e => setNote(e.target.value)}
                placeholder="e.g. TRF-2026-0043 · Marquis Phase 2 electrical install…"
                style={{ width: '100%', padding: '12px 14px', fontSize: 14, color: '#1a1a1a', background: 'none', border: 'none', outline: 'none', resize: 'none', minHeight: 72, boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>

            <button onClick={() => go(3)}
              style={{ width: '100%', height: 50, background: '#0F6E56', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
              Review transfer
            </button>
          </>
        )}

        {/* STEP 3: Confirm */}
        {step === 3 && product && (
          <>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Review & confirm</div>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
              {[
                { label: 'Product',    value: product.name },
                { label: 'From',       value: getOrg(fromOrg)?.name ?? '—' },
                { label: 'To',         value: getOrg(toOrg)?.name  ?? '—' },
                { label: 'Quantity',   value: `${qty} ${product.unit}s` },
                { label: 'Value',      value: `$${xferValue.toFixed(2)}` },
                { label: 'Reference',  value: note || 'No reference provided' },
              ].map(({ label, value }, idx, arr) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '11px 14px', borderBottom: idx < arr.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <span style={{ fontSize: 12, color: '#999', minWidth: 90 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', textAlign: 'right', maxWidth: 200, wordBreak: 'break-word' }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#FAEEDA', border: '0.5px solid rgba(186,117,23,0.2)', borderRadius: 12, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#854F0B' }}>
              This transfer will be submitted for approval. The Warehouse Manager or CFO must approve before stock moves.
            </div>

            <button onClick={submit}
              style={{ width: '100%', height: 50, background: '#0F6E56', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
              Submit for approval
            </button>
            <button onClick={() => go(2)}
              style={{ width: '100%', height: 44, background: '#fff', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 12, fontSize: 14, color: '#555', cursor: 'pointer' }}>
              Back to edit
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function TransferPage() {
  return (
    <AppShell>
      <Suspense fallback={<div style={{ padding: 24, color: '#999' }}>Loading…</div>}>
        <TransferContent />
      </Suspense>
    </AppShell>
  )
}
