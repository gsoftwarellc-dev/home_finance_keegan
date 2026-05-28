import { Waves, Home, Hammer, Wind, TreePine, Wrench } from 'lucide-react';
import type { FormData } from '../../types';

interface Props { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; }

const projectTypes = [
  { id: 'pool', label: 'Pool Construction', icon: Waves },
  { id: 'roofing', label: 'Roofing', icon: Hammer },
  { id: 'remodeling', label: 'Home Remodeling', icon: Home },
  { id: 'hvac', label: 'HVAC Installation', icon: Wind },
  { id: 'outdoor', label: 'Outdoor Living', icon: TreePine },
  { id: 'other', label: 'Other / General', icon: Wrench },
];

const costRanges = ['Under $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000 – $100,000','$100,000+'];
const timelines = ['Within 30 days','1 – 3 months','3 – 6 months','6+ months / Planning'];

const sel: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 10,
  padding: '12px 14px', fontSize: 14, color: '#1e293b',
  backgroundColor: '#fff', outline: 'none', appearance: 'auto',
};

export default function Step1Project({ form, update }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>Tell Us About Your Project</h2>
      <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 28px' }}>We'll use this to find the most relevant financing programs.</p>

      <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 12 }}>
        What type of project are you planning?
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
        {projectTypes.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => update({ projectType: id })} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            padding: '16px 8px', borderRadius: 12,
            border: form.projectType === id ? '2px solid #2563eb' : '2px solid #e2e8f0',
            backgroundColor: form.projectType === id ? '#eff6ff' : '#fff',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <Icon size={20} color={form.projectType === id ? '#2563eb' : '#94a3b8'} />
            <span style={{ fontSize: 12, fontWeight: 600, color: form.projectType === id ? '#1d4ed8' : '#475569', textAlign: 'center' }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Estimated project cost</label>
          <select value={form.projectCost} onChange={(e) => update({ projectCost: e.target.value })} style={sel}>
            <option value="">Select cost range</option>
            {costRanges.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>When do you want to start?</label>
          <select value={form.startTimeline} onChange={(e) => update({ startTimeline: e.target.value })} style={sel}>
            <option value="">Select timeline</option>
            {timelines.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 10 }}>
          Are you already working with a contractor?
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Yes', 'No', 'Still looking'].map(opt => (
            <button key={opt} type="button" onClick={() => update({ hasContractor: opt })} style={{
              flex: 1, padding: '11px 8px',
              border: form.hasContractor === opt ? '2px solid #2563eb' : '2px solid #e2e8f0',
              backgroundColor: form.hasContractor === opt ? '#eff6ff' : '#fff',
              borderRadius: 10, cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              color: form.hasContractor === opt ? '#1d4ed8' : '#475569',
              transition: 'all 0.15s',
            }}>{opt}</button>
          ))}
        </div>
      </div>

      {form.hasContractor === 'Yes' && (
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>
            Contractor / Company Name <span style={{ fontWeight: 400, color: '#94a3b8' }}>(optional)</span>
          </label>
          <input
            type="text" value={form.contractorName}
            onChange={(e) => update({ contractorName: e.target.value })}
            placeholder="e.g. Sunshine Pool & Spa"
            style={{ ...sel }}
          />
        </div>
      )}
    </div>
  );
}
