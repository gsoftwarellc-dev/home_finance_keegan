import type { FormData } from '../../types';

interface Props { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; }

const sel: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 10,
  padding: '12px 14px', fontSize: 14, color: '#1e293b',
  backgroundColor: '#fff', outline: 'none', appearance: 'auto', boxSizing: 'border-box',
};

const creditRanges = ['Under 580','580-619','620-639','640-679','680-719','720-759','760-799','800+','Not sure'];
const incomeRanges = ['Under $30,000','$30,000 – $50,000','$50,000 – $75,000','$75,000 – $100,000','$100,000 – $150,000','$150,000+'];
const employmentStatuses = ['Full-time employed','Part-time employed','Self-employed','Retired','Unemployed'];
const loanAmounts = ['Under $10,000','$10,000 – $20,000','$20,000 – $35,000','$35,000 – $50,000','$50,000 – $75,000','$75,000+'];
const monthlyPayments = ['Under $200/mo','$200 – $400/mo','$400 – $600/mo','$600 – $800/mo','$800+/mo'];

const Sel = ({ label, value, onChange, options, placeholder, note }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; note?: string;
}) => (
  <div>
    <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>{label}</label>
    {note && <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 6px' }}>{note}</p>}
    <select value={value} onChange={(e) => onChange(e.target.value)} style={sel}>
      <option value="">{placeholder || 'Select an option'}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default function Step3Financial({ form, update }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>Financial Information</h2>
      <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 28px' }}>
        This helps us match you with programs you're most likely to qualify for.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Sel label="Estimated Credit Score" value={form.creditScore} onChange={(v) => update({ creditScore: v })} options={creditRanges} placeholder="Select range" note="Soft check — no impact on your score." />
        <Sel label="Annual Household Income" value={form.annualIncome} onChange={(v) => update({ annualIncome: v })} options={incomeRanges} placeholder="Select range" />
        <Sel label="Employment Status" value={form.employmentStatus} onChange={(v) => update({ employmentStatus: v })} options={employmentStatuses} placeholder="Select status" />

        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 8 }}>Home Ownership</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ id: 'own', label: 'I Own' }, { id: 'rent', label: 'I Rent' }, { id: 'other', label: 'Other' }].map(opt => (
              <button key={opt.id} type="button" onClick={() => update({ homeOwnership: opt.id })} style={{
                flex: 1, padding: '11px 6px',
                border: form.homeOwnership === opt.id ? '2px solid #2563eb' : '2px solid #e2e8f0',
                backgroundColor: form.homeOwnership === opt.id ? '#eff6ff' : '#fff',
                borderRadius: 10, cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                color: form.homeOwnership === opt.id ? '#1d4ed8' : '#475569',
                transition: 'all 0.15s',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <Sel label="Estimated Loan Amount Needed" value={form.loanAmount} onChange={(v) => update({ loanAmount: v })} options={loanAmounts} placeholder="Select range" />
        <Sel label="Preferred Monthly Payment" value={form.monthlyPayment} onChange={(v) => update({ monthlyPayment: v })} options={monthlyPayments} placeholder="Select range" />

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 10 }}>
            Any previous bankruptcy or major credit issues?
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Yes', 'No'].map(opt => (
              <button key={opt} type="button" onClick={() => update({ hasBankruptcy: opt })} style={{
                flex: 1, padding: '12px 8px',
                border: form.hasBankruptcy === opt ? '2px solid #2563eb' : '2px solid #e2e8f0',
                backgroundColor: form.hasBankruptcy === opt ? '#eff6ff' : '#fff',
                borderRadius: 10, cursor: 'pointer',
                fontSize: 14, fontWeight: 600,
                color: form.hasBankruptcy === opt ? '#1d4ed8' : '#475569',
                transition: 'all 0.15s',
              }}>{opt}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
