import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { generateLoanOptions } from '../lenderLogic';
import type { FormData, PropertyData } from '../types';

const MESSAGES = [
  'Checking available financing programs…',
  'Analyzing your property equity…',
  'Comparing loan terms and rates…',
  'Verifying lender availability in your area…',
  'Preparing your personalized results…',
];

export default function MatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = (location.state?.form ?? {}) as FormData;
  const propertyData = (location.state?.propertyData ?? null) as PropertyData | null;
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1)), 700);
    const progTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progTimer);
          clearInterval(msgTimer);
          const options = generateLoanOptions(form, propertyData);
          setTimeout(() => navigate('/results', { state: { form, options, propertyData } }), 400);
          return 100;
        }
        return p + 2;
      });
    }, 70);
    return () => { clearInterval(msgTimer); clearInterval(progTimer); };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480, width: '100%' }}>

        {/* Pulsing rings */}
        <div style={{ position: 'relative', width: 128, height: 128, margin: '0 auto 40px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div key={i} style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid rgba(147,197,253,0.4)',
            }}
              animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
          <div style={{
            position: 'absolute', inset: 16,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.25)',
                borderTopColor: '#fff',
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p key={msgIndex}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 32 }}
          >
            {MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div style={{
          height: 6, backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 99, overflow: 'hidden', marginBottom: 12, marginLeft: 32, marginRight: 32,
        }}>
          <motion.div style={{ height: '100%', backgroundColor: '#fff', borderRadius: 99, width: `${progress}%` }} />
        </div>
        <p style={{ color: '#93c5fd', fontSize: 14, marginBottom: 40 }}>{progress}% complete</p>

        {/* Lender badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {['GL Finance', 'LendTree', 'SwiftFund', 'FHA Title'].map((name) => (
            <motion.div key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: progress > 30 ? 1 : 0, scale: progress > 30 ? 1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8, padding: '8px 14px',
                color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600,
              }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
