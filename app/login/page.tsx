'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'

const DEMO_USERS = [
  { label: 'Warehouse Manager', email: 'james.pierre@uscem.lc' },
  { label: 'CFO',               email: 'sandra.felix@uscem.lc' },
  { label: 'Purchasing',        email: 'paul.emmanuel@uscem.lc' },
  { label: 'Warehouse Clerk',   email: 'marie.joseph@uscem.lc' },
  { label: 'Chairman',          email: 'anne.c@uscem.lc' },
]

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [pw, setPw]           = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 400))
    const ok = login(email, pw)
    if (ok) router.push('/dashboard')
    else { setError('Invalid credentials. Try password: demo'); setLoading(false) }
  }

  const quickLogin = (e: string) => { setEmail(e); setPw('demo'); setError('') }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#F4F6F5' }}>
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        {/* Hero */}
        <div className="safe-top" style={{ background: '#0F6E56', paddingBottom: '40px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 40px)' }}>
          <div className="flex flex-col items-center px-6">
            <div style={{ width: 64, height: 64, background: '#fff', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 26, fontWeight: 500, color: '#0F6E56', letterSpacing: '-1px' }}>UC</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 500, margin: '0 0 4px', letterSpacing: '-0.5px' }}>URCP</h1>
            <p style={{ color: '#9FE1CB', fontSize: 13, margin: 0, textAlign: 'center' }}>USCEM Resource Control Platform</p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 px-5 py-7 animate-in">
          {/* Org pill */}
          <div className="flex justify-center mb-6">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 20, padding: '4px 14px 4px 6px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: '#fff' }}>U</div>
              <span style={{ fontSize: 13, color: '#444' }}>USCEM Group · St. Lucia</span>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label style={{ fontSize: 12, fontWeight: 500, color: '#666', display: 'block', marginBottom: 6 }}>Email address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="name@uscem.lc" autoComplete="email" required
                style={{ width: '100%', height: 48, border: `1px solid ${error ? '#E24B4A' : 'rgba(0,0,0,0.15)'}`, borderRadius: 10, padding: '0 14px', fontSize: 16, outline: 'none', background: '#fff', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = '#0F6E56'}
                onBlur={e => e.target.style.borderColor = error ? '#E24B4A' : 'rgba(0,0,0,0.15)'}
              />
            </div>

            <div className="mb-5" style={{ position: 'relative' }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#666', display: 'block', marginBottom: 6 }}>Password</label>
              <input
                type={showPw ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)}
                placeholder="Password" autoComplete="current-password" required
                style={{ width: '100%', height: 48, border: `1px solid ${error ? '#E24B4A' : 'rgba(0,0,0,0.15)'}`, borderRadius: 10, padding: '0 44px 0 14px', fontSize: 16, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#0F6E56'}
                onBlur={e => e.target.style.borderColor = error ? '#E24B4A' : 'rgba(0,0,0,0.15)'}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 12, top: 30, background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#888', display: 'flex' }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FCEBEB', border: '0.5px solid #F09595', borderRadius: 8, padding: '10px 12px', marginBottom: 16 }}>
                <AlertCircle size={15} color="#A32D2D" />
                <span style={{ fontSize: 13, color: '#791F1F' }}>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', height: 50, background: loading ? '#5DCAA5' : '#0F6E56', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginBottom: 20 }}>
              {loading ? <span style={{ opacity: 0.8 }}>Signing in…</span> : <><LogIn size={18} /><span>Sign in</span></>}
            </button>
          </form>

          {/* Demo quick-login */}
          <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '8px 14px 6px', fontSize: 11, fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              Demo accounts — tap to select
            </div>
            {DEMO_USERS.map(u => (
              <button key={u.email} onClick={() => quickLogin(u.email)} type="button"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', background: email === u.email ? '#E1F5EE' : 'transparent', border: 'none', borderBottom: '0.5px solid rgba(0,0,0,0.05)', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: 13, fontWeight: email === u.email ? 500 : 400, color: email === u.email ? '#0F6E56' : '#333' }}>{u.label}</span>
                <span style={{ fontSize: 11, color: '#999' }}>{u.email.split('@')[0]}</span>
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 20 }}>
            All accounts use password: <strong style={{ color: '#555' }}>demo</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
