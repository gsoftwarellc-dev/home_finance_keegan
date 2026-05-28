import { Shield, Lock, CheckCircle } from 'lucide-react';
import type { FormData } from '../../types';

interface Props { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; }

export default function Step4Contact({ form }: Props) {
  const rows = [
    { label: 'Name', value: form.fullName },
    { label: 'Email', value: form.email },
    { label: 'Phone', value: form.phone },
    { label: 'Location', value: form.city && form.state ? `${form.city}, ${form.state} ${form.zipCode}` : '' },
    { label: 'Project Type', value: form.projectType },
    { label: 'Estimated Cost', value: form.projectCost },
    { label: 'Loan Amount', value: form.loanAmount },
    { label: 'Credit Score', value: form.creditScore },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>Almost Done!</h2>
      <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 24px' }}>
        Review your details and submit to see your financing options.
      </p>

      {/* Summary */}
      <div style={{
        backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
        borderRadius: 12, padding: '16px 20px', marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          Application Summary
        </div>
        {rows.map(({ label, value }) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '7px 0', borderBottom: '1px solid #f1f5f9',
            fontSize: 14,
          }}>
            <span style={{ color: '#64748b' }}>{label}</span>
            <span style={{ fontWeight: 600, color: '#1e293b', textTransform: 'capitalize' }}>{value || '—'}</span>
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { icon: Shield, text: 'Secure & Encrypted', color: '#166534', bg: '#f0fdf4', border: '#bbf7d0' },
          { icon: Lock, text: 'No Hard Credit Pull', color: '#1e40af', bg: '#eff6ff', border: '#bfdbfe' },
          { icon: CheckCircle, text: 'No Obligation', color: '#065f46', bg: '#ecfdf5', border: '#a7f3d0' },
        ].map(({ icon: Icon, text, color, bg, border }) => (
          <div key={text} style={{
            backgroundColor: bg, border: `1px solid ${border}`,
            borderRadius: 10, padding: '12px 8px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center',
          }}>
            <Icon size={16} color={color} />
            <span style={{ fontSize: 12, fontWeight: 600, color }}>{text}</span>
          </div>
        ))}
      </div>

      <div style={{
        padding: '14px 16px', backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe', borderRadius: 10,
        fontSize: 12, color: '#1e40af', lineHeight: 1.6,
      }}>
        By submitting, you agree to be contacted by licensed lenders. Estimated options shown are not a guarantee of credit.
        Final approval is subject to lender underwriting and verification.
      </div>
    </div>
  );
}
