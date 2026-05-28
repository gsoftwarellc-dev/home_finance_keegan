import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Home, Calendar, ArrowRight } from 'lucide-react';
import type { FormData, LoanOption } from '../types';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = (location.state?.form ?? {}) as FormData;
  const selectedOption = (location.state?.selectedOption ?? null) as LoanOption | null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#2563eb', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Home size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>HomeFinance<span style={{ color: '#2563eb' }}>Pro</span></span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 580, margin: '0 auto', padding: '60px 24px' }}>

        {/* Success icon */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{
            width: 96, height: 96, backgroundColor: '#f0fdf4',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle size={52} color="#22c55e" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
            Your Request Has Been Submitted!
          </h1>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>
            {form.fullName ? `${form.fullName}, your` : 'Your'} financing request has been received and is being reviewed.
          </p>
        </motion.div>

        {/* Selected option */}
        {selectedOption && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{
              backgroundColor: '#fff', border: '2px solid #bfdbfe',
              borderRadius: 16, padding: 24, marginBottom: 20,
            }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Selected Option
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: '#0f172a' }}>{selectedOption.lenderName}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{selectedOption.tag}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>${selectedOption.monthlyPayment.toLocaleString()}/mo</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{selectedOption.term} months · {selectedOption.interestRate}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next steps */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: '0 0 20px' }}>What Happens Next</h2>
          {[
            { icon: Mail, bg: '#eff6ff', color: '#2563eb', title: 'Check Your Email', desc: `A confirmation and lender contact details have been sent to ${form.email || 'your email address'}.` },
            { icon: Phone, bg: '#f0fdf4', color: '#16a34a', title: 'Lender Will Contact You', desc: 'A lending specialist will reach out within 1 business day to discuss next steps.' },
            { icon: Calendar, bg: '#faf5ff', color: '#7c3aed', title: 'Final Approval Process', desc: 'The lender will review your full application. Final approval is subject to income and identity verification.' },
          ].map(({ icon: Icon, bg, color, title, desc }) => (
            <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
              <div style={{ width: 42, height: 42, backgroundColor: bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#1e293b', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contractor notice */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          style={{
            backgroundColor: '#fffbeb', border: '1px solid #fde68a',
            borderRadius: 12, padding: '14px 18px', marginBottom: 28,
            fontSize: 13, color: '#92400e', lineHeight: 1.6,
          }}>
          <strong>Contractor Notice:</strong> If you're working with a contractor, they may receive a copy of this pre-qualification request.
          {form.contractorName && <> <strong>{form.contractorName}</strong> has been noted on your application.</>}
        </motion.div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/results', { state: location.state })} style={{
            flex: 1, padding: '14px', border: '2px solid #e2e8f0', borderRadius: 12,
            backgroundColor: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 14, color: '#475569',
          }}>
            View All Options
          </button>
          <button onClick={() => navigate('/')} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px', backgroundColor: '#2563eb', color: '#fff',
            border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 14,
          }}>
            Back to Home <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
