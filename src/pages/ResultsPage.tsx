import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight, Clock, TrendingDown, Zap, Building, ArrowLeft, Star, Info, Home } from 'lucide-react';
import type { FormData, LoanOption, PropertyData } from '../types';
import EquityCard from '../components/EquityCard';

const tagConfig: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  blue:   { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe', icon: Star },
  green:  { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0', icon: TrendingDown },
  amber:  { bg: '#fffbeb', text: '#92400e', border: '#fde68a', icon: Zap },
  purple: { bg: '#faf5ff', text: '#6b21a8', border: '#e9d5ff', icon: Building },
};

const lhConfig = {
  High:   { bg: '#f0fdf4', text: '#166534', bar: '#22c55e', pct: '80%' },
  Medium: { bg: '#fffbeb', text: '#92400e', bar: '#f59e0b', pct: '50%' },
  Low:    { bg: '#fef2f2', text: '#991b1b', bar: '#ef4444', pct: '25%' },
};

function LoanCard({ option, onSelect, index }: { option: LoanOption; onSelect: () => void; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const tag = tagConfig[option.tagColor] || tagConfig.blue;
  const TagIcon = tag.icon;
  const lh = lhConfig[option.approvalLikelihood];
  const isTop = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.35 }}
      style={{
        backgroundColor: '#fff',
        border: isTop ? '2px solid #2563eb' : '2px solid #e2e8f0',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: isTop ? '0 8px 32px rgba(37,99,235,0.12)' : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {isTop && (
        <div style={{
          backgroundColor: '#2563eb', color: '#fff',
          textAlign: 'center', padding: '8px 0',
          fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          ✦ Recommended Option
        </div>
      )}

      <div style={{ padding: 24 }}>
        {/* Tag + approval */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99,
              backgroundColor: tag.bg, color: tag.text, border: `1px solid ${tag.border}`,
              marginBottom: 8,
            }}>
              <TagIcon size={11} />
              {option.tag}
            </span>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{option.lenderName}</div>
          </div>
          <div style={{
            fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
            backgroundColor: lh.bg, color: lh.text,
          }}>
            {option.approvalLikelihood} Approval
          </div>
        </div>

        {/* Key metrics */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8, padding: '16px 0',
          borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9',
          marginBottom: 16, textAlign: 'center',
        }}>
          {[
            { val: `$${option.monthlyPayment.toLocaleString()}`, sub: '/ month' },
            { val: `$${(option.loanAmount / 1000).toFixed(0)}K`, sub: 'Loan Amount' },
            { val: `${option.term}`, sub: 'Months' },
          ].map(({ val, sub }) => (
            <div key={sub}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a' }}>{val}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Rate */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 12 }}>
          <span style={{ color: '#64748b' }}>Interest Rate</span>
          <span style={{ fontWeight: 700, color: '#1e293b' }}>{option.interestRate} APR</span>
        </div>

        {/* Approval bar */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
            <span>Approval Likelihood</span>
            <span style={{ fontWeight: 700, color: lh.text }}>{option.approvalLikelihood}</span>
          </div>
          <div style={{ height: 5, backgroundColor: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: lh.bar, width: lh.pct, borderRadius: 99 }} />
          </div>
        </div>

        {/* Expand */}
        <button onClick={() => setExpanded(e => !e)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 12, fontWeight: 600, color: '#2563eb', padding: 0, marginBottom: 16,
        }}>
          <Info size={13} />
          {expanded ? 'Hide details' : 'View details'}
        </button>

        {expanded && (
          <div style={{
            backgroundColor: '#f8fafc', borderRadius: 10, padding: '14px 16px',
            marginBottom: 16, fontSize: 13,
          }}>
            {[
              { icon: CheckCircle, color: '#22c55e', text: `Best for: ${option.bestFor}` },
              { icon: Clock, color: '#3b82f6', text: `Next step: ${option.nextStep}` },
              { icon: Info, color: '#94a3b8', text: `Est. total repayment: $${(option.monthlyPayment * option.term).toLocaleString()}` },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <Icon size={15} color={color} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: '#334155', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        )}

        <button onClick={onSelect} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          backgroundColor: isTop ? '#2563eb' : '#0f172a',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontWeight: 700, fontSize: 14, padding: '14px', borderRadius: 10,
        }}>
          Select This Option
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = (location.state?.form ?? {}) as FormData;
  const options = (location.state?.options ?? []) as LoanOption[];
  const propertyData = (location.state?.propertyData ?? null) as PropertyData | null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#2563eb', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Home size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>HomeFinance<span style={{ color: '#2563eb' }}>Pro</span></span>
          </button>
          <button onClick={() => navigate('/apply')} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, color: '#64748b', fontWeight: 500,
          }}>
            <ArrowLeft size={16} /> Edit Application
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
            color: '#166534', fontSize: 13, fontWeight: 700,
            padding: '6px 16px', borderRadius: 99, marginBottom: 16,
          }}>
            <CheckCircle size={15} />
            {options.length} Financing Options Found
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
            Your Personalized Financing Options
          </h1>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>
            Based on your {form.projectType || 'project'} in {form.city || 'your area'}{form.state ? `, ${form.state}` : ''}.
          </p>
        </motion.div>

        {/* Summary bar */}
        <div style={{
          backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
          padding: '14px 20px', marginBottom: 32,
          display: 'flex', flexWrap: 'wrap', gap: 20,
        }}>
          {[
            { label: 'Project', value: form.projectType },
            { label: 'Loan Amount', value: form.loanAmount },
            { label: 'Credit Score', value: form.creditScore },
            { label: 'Location', value: form.state ? `${form.city}, ${form.state}` : '' },
          ].map(({ label, value }) => value ? (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <span style={{ color: '#94a3b8' }}>{label}:</span>
              <span style={{ fontWeight: 700, color: '#1e293b', textTransform: 'capitalize' }}>{value}</span>
            </div>
          ) : null)}
        </div>

        {/* Equity summary if property data available */}
        {propertyData && (
          <EquityCard status="success" data={propertyData} error={null} />
        )}

        {/* Cards grid */}
        {options.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24, marginBottom: 36,
          }}>
            {options.map((opt, i) => (
              <LoanCard key={opt.id} option={opt} index={i}
                onSelect={() => navigate('/confirmation', { state: { form, selectedOption: opt } })} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: '#64748b', fontSize: 16 }}>No options found. Please adjust your application details.</p>
            <button onClick={() => navigate('/apply')} style={{
              marginTop: 16, background: 'none', border: 'none', cursor: 'pointer',
              color: '#2563eb', fontWeight: 600, fontSize: 15,
            }}>Go Back</button>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12,
          padding: '18px 24px', fontSize: 13, color: '#1e40af', lineHeight: 1.7, textAlign: 'center',
        }}>
          <strong>Important:</strong> These are estimated pre-qualification options based on the information you provided.
          Final approval, exact rates, and terms are subject to lender underwriting and verification.
          This is not a commitment to lend.
        </div>
      </div>
    </div>
  );
}
