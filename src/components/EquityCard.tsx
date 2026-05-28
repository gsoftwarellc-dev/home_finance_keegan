import { motion, AnimatePresence } from 'framer-motion';
import { Home, TrendingUp, AlertCircle, Loader, Building, CheckCircle } from 'lucide-react';
import type { PropertyData } from '../types';

const fmt = (n: number) => '$' + n.toLocaleString();
const pct = (part: number, whole: number) => whole > 0 ? Math.round((part / whole) * 100) : 0;

interface Props {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: PropertyData | null;
  error: string | null;
}

export default function EquityCard({ status, data, error }: Props) {
  return (
    <AnimatePresence mode="wait">
      {status === 'loading' && (
        <motion.div key="loading"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{
            margin: '20px 0', padding: '20px 24px',
            background: 'linear-gradient(135deg, #eff6ff, #f0f9ff)',
            border: '1.5px solid #bfdbfe', borderRadius: 16,
            display: 'flex', alignItems: 'center', gap: 14,
          }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader size={20} color="#2563eb" />
          </motion.div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e40af' }}>Looking up your property…</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Checking public records for home value & equity</div>
          </div>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div key="error"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{
            margin: '20px 0', padding: '16px 20px',
            backgroundColor: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <AlertCircle size={18} color="#ef4444" />
          <span style={{ fontSize: 13, color: '#b91c1c' }}>{error}</span>
        </motion.div>
      )}

      {status === 'success' && data && (
        <motion.div key="success"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ margin: '24px 0' }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            borderRadius: '16px 16px 0 0',
            padding: '18px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                backgroundColor: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Home size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#fff' }}>Property Found</div>
                <div style={{ fontSize: 11, color: '#93c5fd', marginTop: 1 }}>{data.address}</div>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              backgroundColor: 'rgba(74,222,128,0.2)',
              border: '1px solid rgba(74,222,128,0.4)',
              borderRadius: 99, padding: '4px 10px',
            }}>
              <CheckCircle size={11} color="#4ade80" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80' }}>
                {data.source === 'demo' ? 'Demo Data' : 'Live Data'}
              </span>
            </div>
          </div>

          {/* Body */}
          <div style={{
            backgroundColor: '#fff',
            border: '1.5px solid #e2e8f0', borderTop: 'none',
            borderRadius: '0 0 16px 16px',
            overflow: 'hidden',
          }}>
            {/* 3 key metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid #f1f5f9' }}>
              {[
                {
                  label: 'Estimated Home Value',
                  value: data.estimatedValue ? fmt(data.estimatedValue) : 'N/A',
                  sub: 'Based on public records',
                  color: '#0f172a', icon: Building,
                },
                {
                  label: 'Est. Remaining Mortgage',
                  value: data.remainingBalance ? fmt(data.remainingBalance) : 'N/A',
                  sub: 'Estimated from lien records',
                  color: '#64748b', icon: TrendingUp,
                },
                {
                  label: 'Your Estimated Equity',
                  value: data.equity ? fmt(data.equity) : 'N/A',
                  sub: data.estimatedValue ? `${pct(data.equity ?? 0, data.estimatedValue)}% of home value` : '',
                  color: '#16a34a', icon: CheckCircle,
                },
              ].map(({ label, value, sub, color, icon: Icon }, i) => (
                <div key={label} style={{
                  padding: '20px 16px', textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid #f1f5f9' : 'none',
                }}>
                  <Icon size={16} color={color} style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 20, fontWeight: 900, color, marginBottom: 4 }}>{value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Equity bar */}
            {data.estimatedValue && data.equity && (
              <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 6 }}>
                  <span>Mortgage Balance</span>
                  <span>Equity <strong style={{ color: '#16a34a' }}>{pct(data.equity, data.estimatedValue)}%</strong></span>
                </div>
                <div style={{ height: 8, backgroundColor: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 99,
                    background: 'linear-gradient(90deg, #2563eb, #4ade80)',
                    width: `${pct(data.equity, data.estimatedValue)}%`,
                    marginLeft: `${pct(data.remainingBalance ?? 0, data.estimatedValue)}%`,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
                  <span>{data.remainingBalance ? fmt(data.remainingBalance) : '—'} owed</span>
                  <span>{data.estimatedValue ? fmt(data.estimatedValue) : '—'} total value</span>
                </div>
              </div>
            )}

            {/* Max borrowable highlight */}
            {data.maxBorrowable && data.maxBorrowable > 0 && (
              <div style={{
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 8,
              }}>
                <div>
                  <div style={{ fontSize: 12, color: '#15803d', fontWeight: 700 }}>
                    💰 You may qualify for up to
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                    Based on 80% LTV — standard home equity lending limit
                  </div>
                </div>
                <div style={{
                  fontSize: 24, fontWeight: 900, color: '#15803d',
                  backgroundColor: 'rgba(22,163,74,0.1)',
                  border: '1.5px solid rgba(22,163,74,0.2)',
                  borderRadius: 12, padding: '8px 18px',
                }}>
                  {fmt(data.maxBorrowable)}
                </div>
              </div>
            )}

            {/* Property details */}
            {(data.yearBuilt || data.sqft || data.bedrooms) && (
              <div style={{
                padding: '12px 24px',
                display: 'flex', gap: 20, flexWrap: 'wrap',
                borderTop: '1px solid #f1f5f9',
              }}>
                {[
                  data.yearBuilt && { label: 'Built', value: data.yearBuilt },
                  data.sqft && { label: 'Sq Ft', value: data.sqft.toLocaleString() },
                  data.bedrooms && { label: 'Beds', value: data.bedrooms },
                  data.bathrooms && { label: 'Baths', value: data.bathrooms },
                  data.lastSalePrice && { label: 'Last Sale', value: fmt(data.lastSalePrice) },
                ].filter(Boolean).map((item: any) => (
                  <div key={item.label} style={{ fontSize: 12 }}>
                    <span style={{ color: '#94a3b8' }}>{item.label}: </span>
                    <span style={{ fontWeight: 700, color: '#334155' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ padding: '10px 24px', backgroundColor: '#fafafa', borderTop: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 10, color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                {data.source === 'demo'
                  ? '⚠️ Demo data shown — connect ATTOM_API_KEY in Vercel environment variables for live property records.'
                  : 'Estimated values sourced from public property records. Actual home value and mortgage balance may differ. Not a formal appraisal.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
