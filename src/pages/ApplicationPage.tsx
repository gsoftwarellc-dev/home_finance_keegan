import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronLeft, ChevronRight, Check, Shield, Lock, Phone, Mail, MapPin } from 'lucide-react';
import type { FormData } from '../types';
import { usePropertyLookup } from '../hooks/usePropertyLookup';
import Step1Project from '../components/steps/Step1Project';
import Step2Location from '../components/steps/Step2Location';
import Step3Financial from '../components/steps/Step3Financial';
import Step4Contact from '../components/steps/Step4Contact';

const applyStyles = `
  .apply-header-inner { height: 68px; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; }
  .apply-header-center { display: flex; flex-direction: column; align-items: center; }
  .apply-header-trust { display: flex; align-items: center; gap: 20px; }
  .apply-step-connector { width: 64px; }
  .apply-card-pad { padding: 40px 40px 16px; }
  .apply-card-footer-pad { padding: 20px 40px 32px; }
  .apply-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
  .apply-footer-bottom { flex-direction: row; justify-content: space-between; }
  @media (max-width: 768px) {
    .apply-header-inner { height: 56px !important; padding: 0 16px !important; }
    .apply-header-center { display: none !important; }
    .apply-header-trust { display: none !important; }
    .apply-step-connector { width: 28px !important; }
    .apply-card-pad { padding: 24px 20px 12px !important; }
    .apply-card-footer-pad { padding: 16px 20px 24px !important; }
    .apply-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
  }
  @media (max-width: 480px) {
    .apply-step-connector { width: 16px !important; }
    .apply-footer-grid { grid-template-columns: 1fr !important; }
    .apply-footer-bottom { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 10px !important; }
    .apply-card-footer-pad { flex-direction: column-reverse !important; gap: 12px !important; }
    .apply-card-footer-pad button { width: 100% !important; justify-content: center !important; }
  }
`;

const STEPS = [
  { label: 'Project Details', short: 'Project' },
  { label: 'Your Location', short: 'Location' },
  { label: 'Finances', short: 'Finances' },
  { label: 'Review & Submit', short: 'Review' },
];

const defaultForm: FormData = {
  projectType: '', projectCost: '', startTimeline: '',
  hasContractor: '', contractorName: '',
  fullName: '', phone: '', email: '',
  zipCode: '', city: '', state: '',
  creditScore: '', annualIncome: '', employmentStatus: '',
  homeOwnership: '', loanAmount: '', monthlyPayment: '', hasBankruptcy: '',
};

export default function ApplicationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [direction, setDirection] = useState(1);
  const { data: propertyData, status: propertyStatus, error: propertyError, lookup: triggerLookup } = usePropertyLookup();

  const update = (fields: Partial<FormData>) => setForm((f) => ({ ...f, ...fields }));

  const next = () => {
    if (step < 3) { setDirection(1); setStep((s) => s + 1); }
    // Pass property data to matching page so lender logic can use equity
    else navigate('/matching', { state: { form, propertyData } });
  };

  const back = () => {
    if (step === 0) navigate('/');
    else { setDirection(-1); setStep((s) => s - 1); }
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 56 : -56, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -56 : 56, opacity: 0 }),
  };

  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <style>{applyStyles}</style>

      {/* ── HEADER ── */}
      <header style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      }}>
        <div className="apply-header-inner" style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          padding: '0 32px', height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Left: back + logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={back} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: '1.5px solid #e2e8f0',
              borderRadius: 8, cursor: 'pointer',
              padding: '7px 14px', fontSize: 13, fontWeight: 600,
              color: '#475569', transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#2563eb';
              (e.currentTarget as HTMLButtonElement).style.color = '#2563eb';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
              (e.currentTarget as HTMLButtonElement).style.color = '#475569';
            }}
            >
              <ChevronLeft size={15} />
              {step === 0 ? 'Home' : 'Back'}
            </button>

            <div style={{ width: 1, height: 28, backgroundColor: '#e2e8f0' }} />

            <button onClick={() => navigate('/')} style={{
              display: 'flex', alignItems: 'center', gap: 9,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
              }}>
                <Home size={17} color="#fff" />
              </div>
              <span style={{ fontWeight: 900, fontSize: 17, color: '#0f172a' }}>
                HomeFinance<span style={{ color: '#2563eb' }}>Pro</span>
              </span>
            </button>
          </div>

          {/* Center: step label */}
          <div className="apply-header-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Step {step + 1} of {STEPS.length}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginTop: 1 }}>
              {STEPS[step].label}
            </span>
          </div>

          {/* Right: trust badges */}
          <div className="apply-header-trust" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[
              { icon: Shield, label: 'No Hard Pull' },
              { icon: Lock, label: 'Encrypted' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon size={14} color="#22c55e" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar — full width under header */}
        <div style={{ height: 3, backgroundColor: '#f1f5f9' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #2563eb, #60a5fa)', borderRadius: '0 4px 4px 0' }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Step indicator dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
            {STEPS.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <motion.div
                    animate={{
                      backgroundColor: i < step ? '#22c55e' : i === step ? '#2563eb' : '#e2e8f0',
                      scale: i === step ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800,
                      color: i <= step ? '#fff' : '#94a3b8',
                      boxShadow: i === step ? '0 0 0 4px rgba(37,99,235,0.15)' : 'none',
                    }}
                  >
                    {i < step ? <Check size={14} /> : i + 1}
                  </motion.div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: i === step ? '#2563eb' : i < step ? '#22c55e' : '#94a3b8',
                    whiteSpace: 'nowrap',
                  }}>{s.short}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="apply-step-connector" style={{
                    width: 64, height: 2, borderRadius: 99, marginBottom: 18,
                    backgroundColor: i < step ? '#22c55e' : '#e2e8f0',
                    transition: 'background-color 0.3s',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 24,
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
            overflow: 'hidden',
          }}>
            {/* Card top accent */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #2563eb, #60a5fa, #a78bfa)' }} />

            <div style={{ overflow: 'hidden' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.24, ease: 'easeInOut' }}
                  className="apply-card-pad" style={{ padding: '40px 40px 16px' }}
                >
                  {step === 0 && <Step1Project form={form} update={update} onNext={next} />}
                  {step === 1 && <Step2Location form={form} update={update} onNext={next}
                    propertyStatus={propertyStatus} propertyData={propertyData}
                    propertyError={propertyError} triggerLookup={triggerLookup} />}
                  {step === 2 && <Step3Financial form={form} update={update} onNext={next} />}
                  {step === 3 && <Step4Contact form={form} update={update} onNext={next} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card footer nav */}
            <div className="apply-card-footer-pad" style={{
              padding: '20px 40px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 12,
            }}>
              <button onClick={back} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: '1.5px solid #e2e8f0',
                borderRadius: 10, cursor: 'pointer',
                padding: '11px 20px', fontSize: 14, fontWeight: 600, color: '#475569',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#94a3b8';
                (e.currentTarget as HTMLButtonElement).style.color = '#1e293b';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
                (e.currentTarget as HTMLButtonElement).style.color = '#475569';
              }}
              >
                <ChevronLeft size={15} />
                {step === 0 ? 'Back to Home' : 'Previous Step'}
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={next}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#fff', border: 'none', cursor: 'pointer',
                    fontWeight: 800, fontSize: 15,
                    padding: '13px 32px', borderRadius: 12,
                    boxShadow: '0 4px 16px rgba(37,99,235,0.35)',
                  }}
                >
                  {step === 3 ? '🎯 See My Financing Options' : 'Continue'}
                  {step < 3 && <ChevronRight size={16} />}
                </motion.button>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>
                  {step < 3 ? `${STEPS.length - step - 1} step${STEPS.length - step - 1 !== 1 ? 's' : ''} remaining` : 'No hard credit check'}
                </span>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 32,
            marginTop: 24, flexWrap: 'wrap',
          }}>
            {[
              { icon: Shield, text: 'No Hard Credit Pull' },
              { icon: Lock, text: '256-bit Encrypted' },
              { icon: Check, text: 'No Obligation' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon size={13} color="#22c55e" />
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 11, color: '#cbd5e1', marginTop: 12 }}>
            By continuing you agree to our Terms of Service. Estimated options are not a credit decision.
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        backgroundColor: '#0f172a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Main footer */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px 32px' }}>
          <div className="apply-footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Home size={17} color="#fff" />
                </div>
                <span style={{ fontWeight: 900, fontSize: 17, color: '#f1f5f9' }}>
                  HomeFinance<span style={{ color: '#3b82f6' }}>Pro</span>
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.8, maxWidth: 280, margin: '0 0 20px' }}>
                Helping homeowners find the right financing — fast, free, and without the hassle.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: Mail, text: 'hello@homefinancepro.com' },
                  { icon: Phone, text: '1-800-HOME-FIN' },
                  { icon: MapPin, text: 'United States (All States)' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon size={13} color="#60a5fa" />
                    <span style={{ fontSize: 12, color: '#e2e8f0' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Company</div>
              {['About Us', 'How It Works', 'Lender Partners', 'Careers', 'Press'].map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: 13, color: '#cbd5e1', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >{link}</a>
              ))}
            </div>

            {/* Projects */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Projects</div>
              {['Pool Construction', 'Home Remodeling', 'Roofing', 'HVAC Systems', 'Outdoor Living', 'Kitchens & Baths'].map(link => (
                <a key={link} href="#" onClick={e => { e.preventDefault(); navigate('/apply'); }} style={{ display: 'block', fontSize: 13, color: '#cbd5e1', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >{link}</a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Legal</div>
              {['Privacy Policy', 'Terms of Service', 'NMLS Disclosure', 'Cookie Policy', 'Accessibility'].map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: 13, color: '#cbd5e1', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >{link}</a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '36px 0 24px' }} />

          {/* Bottom bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#e2e8f0' }}>© 2026 HomeFinancePro. All rights reserved. NMLS #0000000. Equal Housing Lender.</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {[Shield, Lock, Check].map((Icon, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 8,
                  backgroundColor: 'rgba(37,99,235,0.2)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={14} color="#93c5fd" />
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 16, lineHeight: 1.7 }}>
            <strong style={{ color: '#e2e8f0' }}>Disclaimer:</strong> Estimated options are not a guarantee of credit or final loan approval. Final approval, rates, and terms are subject to lender underwriting and verification. Not a commitment to lend.
          </p>
        </div>
      </footer>
    </div>
  );
}
