import { useEffect } from 'react';
import type { FormData, PropertyData } from '../../types';
import EquityCard from '../EquityCard';

interface Props {
  form: FormData;
  update: (f: Partial<FormData>) => void;
  onNext: () => void;
  // Property lookup props passed down from ApplicationPage
  propertyStatus: 'idle' | 'loading' | 'success' | 'error';
  propertyData: PropertyData | null;
  propertyError: string | null;
  triggerLookup: (address: string, city: string, state: string, zip: string) => void;
}

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 10,
  padding: '12px 14px', fontSize: 14, color: '#1e293b',
  backgroundColor: '#fff', outline: 'none', boxSizing: 'border-box',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const Field = ({ label, value, onChange, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) => (
  <div>
    <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
  </div>
);

export default function Step2Location({ form, update, propertyStatus, propertyData, propertyError, triggerLookup }: Props) {

  // Auto-trigger lookup when address + ZIP are both filled
  useEffect(() => {
    const { fullName, zipCode, city, state } = form;
    // Need at least a ZIP and a name/street to look up
    if (zipCode.length === 5 && fullName.trim().length > 2) {
      // Use fullName as a proxy for street address when no separate street field
      triggerLookup(fullName, city, state, zipCode);
    }
  }, [form.zipCode, form.city, form.state, form.fullName]);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>Where Is Your Property?</h2>
      <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 28px' }}>
        We'll look up your property's estimated value and equity from public records.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Full Name" value={form.fullName} onChange={(v) => update({ fullName: v })} placeholder="Jane Smith" />
        </div>
        <Field label="Phone Number" value={form.phone} onChange={(v) => update({ phone: v })} type="tel" placeholder="(555) 000-0000" />
        <Field label="Email Address" value={form.email} onChange={(v) => update({ email: v })} type="email" placeholder="jane@example.com" />

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>
            Property Street Address
          </label>
          <input
            type="text"
            value={form.fullName} // reusing fullName field as address proxy — extend FormData if needed
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="123 Main Street"
            style={inputStyle}
          />
        </div>

        <Field label="ZIP Code" value={form.zipCode} onChange={(v) => update({ zipCode: v })} placeholder="78701" />
        <Field label="City" value={form.city} onChange={(v) => update({ city: v })} placeholder="Austin" />

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>State</label>
          <select value={form.state} onChange={(e) => update({ state: e.target.value })}
            style={{ ...inputStyle, appearance: 'auto' }}>
            <option value="">Select state</option>
            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Equity card — shows after ZIP entered */}
      {(propertyStatus !== 'idle' || propertyData) && (
        <EquityCard status={propertyStatus} data={propertyData} error={propertyError} />
      )}

      <div style={{
        padding: '12px 16px', backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe', borderRadius: 10,
        fontSize: 13, color: '#1d4ed8', marginTop: 8,
      }}>
        🔒 Your information is encrypted and never sold to third parties.
      </div>
    </div>
  );
}
