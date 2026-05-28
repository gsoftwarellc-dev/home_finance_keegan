import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  Home,
  Waves,
  Hammer,
  Wind,
  TreePine,
  CheckCircle,
  Shield,
  Clock,
  Users,
  ChevronRight,
  Star,
  Wrench,
  ClipboardList,
  Search,
  BarChart2,
  Handshake,
} from 'lucide-react';

const projects = [
  { icon: Waves, label: 'Pool Construction' },
  { icon: Home, label: 'Home Remodeling' },
  { icon: Hammer, label: 'Roofing' },
  { icon: Wind, label: 'HVAC Systems' },
  { icon: TreePine, label: 'Outdoor Living' },
  { icon: Wrench, label: 'Kitchens & Baths' },
];


const avatars = [
  'https://i.pravatar.cc/64?img=1',
  'https://i.pravatar.cc/64?img=2',
  'https://i.pravatar.cc/64?img=3',
  'https://i.pravatar.cc/64?img=4',
  'https://i.pravatar.cc/64?img=5',
  'https://i.pravatar.cc/64?img=6',
  'https://i.pravatar.cc/64?img=7',
  'https://i.pravatar.cc/64?img=8',
  'https://i.pravatar.cc/64?img=9',
  'https://i.pravatar.cc/64?img=10',
  'https://i.pravatar.cc/64?img=11',
  'https://i.pravatar.cc/64?img=12',
];

const testimonials = [
  { name: 'Ashley Johnson', project: 'Pool Construction', text: 'Found a $42,000 pool financing option in under 5 minutes. The process was simple and professional.', stars: 5, avatar: avatars[0] },
  { name: 'Matthew Carter', project: 'Home Remodeling', text: 'They matched me with a lender another broker couldn\'t find. The rate was way better than I expected.', stars: 5, avatar: avatars[1] },
  { name: 'Sarah Williams', project: 'HVAC Installation', text: 'HVAC financing was handled quickly. HomeFinancePro helped me avoid a bad deal and get the right loan.', stars: 5, avatar: avatars[2] },
  { name: 'Brian Anderson', project: 'Roofing', text: 'The roofing loan comparison page was incredibly clear. I knew exactly what I was signing up for.', stars: 5, avatar: avatars[3] },
  { name: 'Jessica Miller', project: 'Outdoor Living', text: 'Clear quote, fair process, and no guesswork. My outdoor kitchen project got funded in 3 days.', stars: 5, avatar: avatars[4] },
  { name: 'Daniel Thompson', project: 'Kitchen Remodel', text: 'The side-by-side loan comparison made it so easy to pick the right payment plan for our kitchen.', stars: 5, avatar: avatars[5] },
  { name: 'Lauren Cooper', project: 'Bathroom Renovation', text: 'Got pre-qualified in minutes with no hard credit pull. My contractor was thrilled we could start so fast.', stars: 5, avatar: avatars[6] },
  { name: 'Michael Reynolds', project: 'Home Addition', text: 'HomeFinancePro diagnosed my financing needs quickly and had me funded faster than expected.', stars: 5, avatar: avatars[7] },
  { name: 'Emily Harris', project: 'Pool Construction', text: 'I applied from my phone in 4 minutes. Three lender options appeared — I picked the best one instantly.', stars: 5, avatar: avatars[8] },
  { name: 'Chris Bennett', project: 'Solar Installation', text: 'Never thought financing a solar project would be this smooth. Low rate, fast approval, great experience.', stars: 5, avatar: avatars[9] },
  { name: 'Rachel Foster', project: 'HVAC Replacement', text: 'The lender matched me perfectly based on my credit. Monthly payment fits my budget exactly.', stars: 5, avatar: avatars[10] },
  { name: 'Kevin Morris', project: 'Deck & Patio', text: 'Submitted my info on a Sunday night and had financing options in my inbox by Monday morning.', stars: 5, avatar: avatars[11] },
];

const VerifiedBadge = () => (
  <svg width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <defs>
      <linearGradient id="metaBlue" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#19AFFF"/>
        <stop offset="100%" stopColor="#0062E0"/>
      </linearGradient>
    </defs>
    {/* Outer shield/badge shape — 12-point star via polygon */}
    <path
      d="M20 2
         l3.5 3.5 4.8-1.2 1.2 4.8 4.8 1.2-1.2 4.8 3.5 3.5-3.5 3.5
         1.2 4.8-4.8 1.2-1.2 4.8-4.8-1.2-3.5 3.5-3.5-3.5-4.8 1.2
         -1.2-4.8-4.8-1.2 1.2-4.8-3.5-3.5 3.5-3.5-1.2-4.8 4.8-1.2
         1.2-4.8 4.8 1.2Z"
      fill="url(#metaBlue)"
    />
    {/* White checkmark */}
    <polyline
      points="13,21 18,26 28,15"
      fill="none"
      stroke="#fff"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Testimonial = typeof testimonials[0];

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <div style={{
      width: 340, flexShrink: 0,
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: 18,
      padding: '24px 26px',
      userSelect: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <img src={t.avatar} alt={t.name} style={{
          width: 52, height: 52, borderRadius: '50%',
          objectFit: 'cover', flexShrink: 0,
          border: '2px solid #334155',
        }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: '#f1f5f9' }}>{t.name}</span>
            <VerifiedBadge />
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{t.project}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
        {Array.from({ length: t.stars }).map((_, si) => (
          <Star key={si} size={15} fill="#fbbf24" color="#fbbf24" />
        ))}
      </div>
      <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{t.text}</p>
    </div>
  );
}

function MarqueeRow({ items, dir, baseSpeed, row }: {
  items: Testimonial[]; dir: 1 | -1; baseSpeed: number; row: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(baseSpeed);
  const rafRef = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const CARD_W = 340 + 20; // card + gap
    const half = items.length / 2 * CARD_W; // px width of one set

    // Initialise px position
    let px = dir === -1 ? -half : 0;

    function step() {
      // Smoothly blend toward target speed
      const target = activeRef.current ? baseSpeed * 3.5 : baseSpeed;
      speedRef.current += (target - speedRef.current) * 0.06;

      px -= dir * speedRef.current;

      // Seamless loop
      if (dir === 1 && px <= -half) px += half;
      if (dir === -1 && px >= 0) px -= half;

      if (track) track.style.transform = `translateX(${px}px)`;
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    const on  = () => { activeRef.current = true; };
    const off = () => { activeRef.current = false; };

    track.parentElement?.addEventListener('mouseenter', on);
    track.parentElement?.addEventListener('mouseleave', off);
    track.parentElement?.addEventListener('touchstart', on, { passive: true });
    track.parentElement?.addEventListener('touchend', off);

    return () => {
      cancelAnimationFrame(rafRef.current);
      track.parentElement?.removeEventListener('mouseenter', on);
      track.parentElement?.removeEventListener('mouseleave', off);
      track.parentElement?.removeEventListener('touchstart', on);
      track.parentElement?.removeEventListener('touchend', off);
    };
  }, []);

  return (
    <div style={{ overflow: 'hidden', marginBottom: row < 2 ? 20 : 0 }}>
      <div ref={trackRef} style={{ display: 'flex', gap: 20, width: 'max-content', padding: '4px 0', willChange: 'transform' }}>
        {items.map((t, i) => <ReviewCard key={`${t.name}-${i}`} t={t} />)}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        /* NAV */
        .hfp-nav-links { display: flex; align-items: center; gap: 32px; }
        .hfp-nav-cta { display: block; }
        /* HERO */
        .hfp-hero { padding: 80px 24px 0; }
        .hfp-hero-h1 { font-size: clamp(36px, 6vw, 68px); }
        /* STATS */
        .hfp-stats { grid-template-columns: repeat(3,1fr); }
        /* PROJECT GRID */
        .hfp-projects-grid { grid-template-columns: repeat(3,1fr); gap: 20px; }
        /* HOW IT WORKS */
        .hfp-timeline-line { display: block; }
        .hfp-timeline-item { justify-content: flex-start; margin-bottom: 56px; }
        .hfp-timeline-card { width: 44%; }
        .hfp-timeline-node { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); }
        .hfp-timeline-arrow { display: block; }
        /* BENEFITS */
        .hfp-benefits-grid { grid-template-columns: repeat(4,1fr); gap: 24px; }
        /* TESTIMONIALS rows */
        .hfp-marquee-row { margin-bottom: 20px; }
        /* FOOTER */
        .hfp-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        .hfp-footer-bottom { flex-direction: row; }
        .hfp-footer-bottom-links { flex-direction: row; flex-wrap: nowrap; }
        /* FLOATING CTA */
        .hfp-float { bottom: 32px; right: 32px; }

        @media (max-width: 1024px) {
          .hfp-benefits-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hfp-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 768px) {
          .hfp-nav-links { display: none !important; }
          .hfp-nav-cta { font-size: 13px !important; padding: 8px 14px !important; }
          .hfp-hero { padding: 48px 20px 0 !important; }
          .hfp-stats { grid-template-columns: repeat(3,1fr) !important; }
          .hfp-stats-val { font-size: 22px !important; }
          .hfp-projects-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
          .hfp-project-card { padding: 20px 12px !important; }
          .hfp-timeline-line { display: none !important; }
          .hfp-timeline-item { justify-content: center !important; flex-direction: column !important; align-items: center !important; margin-bottom: 32px !important; }
          .hfp-timeline-card { width: 100% !important; }
          .hfp-timeline-node { position: static !important; transform: none !important; margin-bottom: 16px !important; order: -1; }
          .hfp-timeline-arrow { display: none !important; }
          .hfp-benefits-grid { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
          .hfp-benefit-card { padding: 24px 18px !important; }
          .hfp-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .hfp-float { bottom: 16px !important; right: 16px !important; }
        }
        @media (max-width: 480px) {
          .hfp-projects-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hfp-benefits-grid { grid-template-columns: 1fr !important; }
          .hfp-footer-grid { grid-template-columns: 1fr !important; }
          .hfp-footer-bottom { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 12px !important; }
          .hfp-footer-bottom-links { flex-wrap: wrap !important; justify-content: center !important; gap: 12px !important; }
          .hfp-float-btn { font-size: 13px !important; padding: 11px 16px !important; }
          .hfp-cta-section h2 { font-size: 28px !important; }
        }
      `}</style>

      {/* ── FLOATING CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="hfp-float"
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 999,
        }}
      >
        <motion.button
          onClick={() => navigate('/apply')}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(37,99,235,0)',
              '0 0 0 12px rgba(37,99,235,0.2)',
              '0 0 0 0 rgba(37,99,235,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            backgroundColor: '#2563eb', color: '#fff',
            border: 'none', cursor: 'pointer',
            fontWeight: 800, fontSize: 15,
            padding: '14px 26px', borderRadius: 50,
            boxShadow: '0 8px 32px rgba(37,99,235,0.45)',
            fontFamily: 'Inter, system-ui, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: '#4ade80',
            boxShadow: '0 0 6px #4ade80',
            flexShrink: 0,
          }} />
          Check My Options
          <ChevronRight size={17} />
        </motion.button>
      </motion.div>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36, height: 36, backgroundColor: '#2563eb',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Home size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>
              HomeFinance<span style={{ color: '#2563eb' }}>Pro</span>
            </span>
          </div>

          <div className="hfp-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{
              fontSize: 16, color: '#0f172a', textDecoration: 'none', fontWeight: 600,
            }}>Home</a>
            {['#how-it-works', '#projects', '#testimonials'].map((href, i) => (
              <a key={href} href={href} style={{
                fontSize: 16, color: '#0f172a', textDecoration: 'none', fontWeight: 600,
              }}>
                {['How It Works', 'Project Types', 'Reviews'][i]}
              </a>
            ))}
          </div>

          <motion.button
            onClick={() => navigate('/apply')}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(37,99,235,0)',
                '0 0 0 8px rgba(37,99,235,0.18)',
                '0 0 0 0 rgba(37,99,235,0)',
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            style={{
              backgroundColor: '#2563eb', color: '#fff',
              border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 14,
              padding: '11px 22px', borderRadius: 10,
              position: 'relative',
            }}
          >
            Check My Options
          </motion.button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)',
        color: '#fff',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Decorative background circles */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-120px',
          width: 480, height: 480, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '80px', left: '-80px',
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />

        {/* Centred content — grows to fill available space */}
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '60px 24px 40px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 820, width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <span style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#bfdbfe',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '6px 18px', borderRadius: 999,
                marginBottom: 28,
              }}>
                Home Improvement Financing
              </span>

              <h1 style={{
                fontSize: 'clamp(40px, 6.5vw, 72px)',
                fontWeight: 900, lineHeight: 1.08,
                margin: '0 0 28px',
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>
                Find Financing Options<br />
                <span style={{ color: '#93c5fd' }}>for Your Home Project</span>
              </h1>

              <p style={{
                fontSize: 'clamp(17px, 2vw, 21px)',
                color: '#bfdbfe', lineHeight: 1.7,
                maxWidth: 580, margin: '0 auto 44px',
              }}>
                Answer a few questions and see estimated financing options from multiple lenders — in minutes. No hard credit check required.
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/apply')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: '#fff', color: '#1d4ed8',
                  border: 'none', cursor: 'pointer',
                  fontWeight: 800, fontSize: 18,
                  padding: '18px 44px', borderRadius: 14,
                  boxShadow: '0 24px 48px rgba(0,0,0,0.28)',
                  marginBottom: 20,
                }}
              >
                Check My Options
                <ChevronRight size={22} />
              </motion.button>

              <p style={{ color: '#93c5fd', fontSize: 14, margin: 0 }}>
                Free &nbsp;•&nbsp; No hard credit pull &nbsp;•&nbsp; Results in 60 seconds
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats bar — pinned to bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {[
            { value: '$500M+', label: 'Financing Facilitated' },
            { value: '50,000+', label: 'Homeowners Helped' },
            { value: '4.9 / 5', label: 'Average Rating' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '32px 16px', textAlign: 'center',
              backgroundColor: i === 1 ? 'rgba(255,255,255,0.07)' : 'transparent',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: '#93c5fd', fontSize: 13, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── PROJECT TYPES ── */}
      <section id="projects" className="hfp-section-pad" style={{
        minHeight: '100vh',
        backgroundColor: '#f0f4ff',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -160, right: -160,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -120, left: -120,
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <span style={{
              display: 'inline-block',
              backgroundColor: '#dbeafe', color: '#1d4ed8',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999,
              marginBottom: 20,
            }}>
              What We Finance
            </span>
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 900, color: '#0f172a',
              margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              We Finance Any Home Project
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', color: '#64748b', margin: 0, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
              From pools to full renovations — find the right loan for your project. Click any category to get started.
            </p>
          </motion.div>

          {/* Cards grid — 3 cols top, 3 cols bottom */}
          <div className="hfp-projects-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {projects.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(37,99,235,0.14)' }}
                onClick={() => navigate('/apply')}
                style={{
                  backgroundColor: '#fff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: 20,
                  padding: '40px 28px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', gap: 0,
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Subtle corner accent */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 80, height: 80, borderRadius: '0 20px 0 80px',
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  opacity: 0.6,
                }} />

                <div style={{
                  width: 64, height: 64,
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  borderRadius: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                  boxShadow: '0 4px 12px rgba(37,99,235,0.12)',
                }}>
                  <Icon size={30} color="#2563eb" />
                </div>

                <div style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24, lineHeight: 1.5 }}>
                  Get pre-qualified in minutes. No hard credit pull.
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 700, color: '#2563eb',
                  marginTop: 'auto',
                }}>
                  Check options <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: 52 }}
          >
            <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: 20 }}>
              Don't see your project type? We finance most home improvement work.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/apply')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#2563eb', color: '#fff',
                border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: 15,
                padding: '14px 32px', borderRadius: 12,
                boxShadow: '0 8px 24px rgba(37,99,235,0.28)',
              }}
            >
              See All Financing Options
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{
        minHeight: '100vh',
        backgroundColor: '#060d1f',
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 60%)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <span style={{
              display: 'inline-block',
              backgroundColor: 'rgba(37,99,235,0.2)', color: '#60a5fa',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '6px 18px', borderRadius: 999,
              marginBottom: 20, border: '1px solid rgba(37,99,235,0.3)',
            }}>
              Simple Process
            </span>
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900,
              color: '#f1f5f9', margin: '0 0 16px', letterSpacing: '-0.02em',
            }}>
              How It Works
            </h2>
            <p style={{ fontSize: 18, color: '#64748b', margin: 0 }}>
              From project idea to funded — in minutes.
            </p>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>

            {/* Vertical center line */}
            <div className="hfp-timeline-line" style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.6) 10%, rgba(37,99,235,0.6) 90%, transparent)',
              transform: 'translateX(-50%)',
              zIndex: 0,
            }} />

            {[
              {
                icon: ClipboardList,
                title: 'Tell Us About Your Project',
                desc: 'Share your project type, estimated cost, and when you want to start. Takes under 2 minutes.',
                side: 'left',
              },
              {
                icon: Search,
                title: 'We Match You With Lenders',
                desc: 'Our system instantly scans available programs and matches your profile to the best lenders in your area.',
                side: 'right',
              },
              {
                icon: BarChart2,
                title: 'Compare Your Options',
                desc: 'Review side-by-side loan offers — monthly payment, rate, term, and approval likelihood all clearly displayed.',
                side: 'left',
              },
              {
                icon: Handshake,
                title: 'Select & Get Funded',
                desc: 'Choose your preferred option. A lending specialist reaches out within 1 business day to finalize everything.',
                side: 'right',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              const isLeft = item.side === 'left';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="hfp-timeline-item"
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    alignItems: 'center',
                    marginBottom: 56,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {/* Card — takes up ~44% width on each side */}
                  <div className="hfp-timeline-card" style={{
                    width: '44%',
                    backgroundColor: '#0f1f3d',
                    border: '1px solid rgba(37,99,235,0.25)',
                    borderRadius: 20,
                    padding: '32px 30px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                    position: 'relative',
                  }}>
                    {/* Icon box */}
                    <div style={{
                      width: 48, height: 48,
                      backgroundColor: 'rgba(37,99,235,0.15)',
                      border: '1px solid rgba(37,99,235,0.3)',
                      borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 20,
                    }}>
                      <Icon size={22} color="#60a5fa" />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9', margin: '0 0 10px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                      {item.desc}
                    </p>

                    {/* Connector arrow pointing toward center line */}
                    <div className="hfp-timeline-arrow" style={{
                      position: 'absolute',
                      top: '50%',
                      [isLeft ? 'right' : 'left']: -12,
                      transform: 'translateY(-50%)',
                      width: 0, height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      [isLeft ? 'borderLeft' : 'borderRight']: '12px solid rgba(37,99,235,0.25)',
                    }} />
                  </div>

                  {/* Number node on center line */}
                  <div className="hfp-timeline-node" style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                  }}>
                    {/* Outer glow ring */}
                    <motion.div
                      animate={{ boxShadow: ['0 0 0 0px rgba(37,99,235,0.4)', '0 0 0 10px rgba(37,99,235,0)', '0 0 0 0px rgba(37,99,235,0)'] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
                      style={{
                        width: 52, height: 52, borderRadius: '50%',
                        backgroundColor: '#0f1f3d',
                        border: '2px solid #2563eb',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 17, fontWeight: 900, color: '#60a5fa',
                      }}
                    >
                      {i + 1}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ padding: '80px 0', backgroundColor: '#0f172a', overflow: 'hidden', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56, padding: '0 24px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'rgba(37,99,235,0.3)', color: '#93c5fd',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999,
            marginBottom: 20,
          }}>
            Customer Reviews
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
            color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em',
          }}>
            What Homeowners Are Saying
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>
            Trusted by 50,000+ homeowners across the country
          </p>
        </div>

        {/* 3 rows — LTR, RTL, LTR */}
        {[
          { items: [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)], dir: 1 as const,  speed: 0.6, row: 0 },
          { items: [...testimonials.slice(4, 8), ...testimonials.slice(4, 8)], dir: -1 as const, speed: 0.5, row: 1 },
          { items: [...testimonials.slice(8, 12), ...testimonials.slice(8, 12)], dir: 1 as const, speed: 0.7, row: 2 },
        ].map(({ items, dir, speed, row }) => (
          <MarqueeRow key={row} items={items} dir={dir} baseSpeed={speed} row={row} />
        ))}

        {/* Edge fades */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 140,
          background: 'linear-gradient(to right, #0f172a 40%, transparent)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 140,
          background: 'linear-gradient(to left, #0f172a 40%, transparent)',
          pointerEvents: 'none', zIndex: 2,
        }} />
      </section>

      {/* ── BENEFITS ── */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        padding: '100px 40px',
        background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1b4b 50%, #0a1535 100%)',
      }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-15%', left: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '-10%', right: '-8%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <span style={{
              display: 'inline-block',
              background: 'rgba(99,102,241,0.2)', color: '#a5b4fc',
              border: '1px solid rgba(99,102,241,0.35)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '6px 18px', borderRadius: 999,
              marginBottom: 20,
            }}>Why Choose Us</span>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              Why Homeowners Choose Us
            </h2>
            <p style={{ fontSize: 18, color: '#475569', margin: '0 auto', maxWidth: 500 }}>
              Built around your needs — fast, free, and transparent.
            </p>
          </motion.div>

          <div className="hfp-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: Clock, title: 'Results in Minutes', desc: 'Answer a few questions and see real financing options instantly — no waiting, no callbacks.', stat: '~2 min', statLabel: 'avg. completion time', accent: '#3b82f6', glow: 'rgba(59,130,246,0.15)' },
              { icon: Shield, title: 'No Hard Credit Pull', desc: "Checking your options won't affect your credit score. We use a soft inquiry only.", stat: '0 pts', statLabel: 'credit score impact', accent: '#22c55e', glow: 'rgba(34,197,94,0.12)' },
              { icon: Users, title: 'Multiple Lenders', desc: 'We match you with multiple competing lenders so you always get the best rate available.', stat: '20+', statLabel: 'lender programs', accent: '#a855f7', glow: 'rgba(168,85,247,0.12)' },
              { icon: CheckCircle, title: 'Free to Use', desc: 'No fees, no obligations, no fine print. Just transparent financing options tailored for you.', stat: '$0', statLabel: 'cost to apply', accent: '#f59e0b', glow: 'rgba(245,158,11,0.12)' },
            ].map(({ icon: Icon, title, desc, stat, statLabel, accent, glow }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: `0 24px 60px ${glow}` }}
                style={{ position: 'relative', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px 30px', overflow: 'hidden', transition: 'box-shadow 0.3s' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: '24px 24px 0 0' }} />
                <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.06)', border: `1px solid ${accent}40`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <Icon size={24} color={accent} />
                </div>
                <h3 style={{ fontWeight: 800, color: '#f1f5f9', fontSize: 18, margin: '0 0 12px' }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7, margin: '0 0 28px' }}>{desc}</p>
                <div style={{ display: 'inline-flex', flexDirection: 'column', background: `${accent}18`, border: `1px solid ${accent}30`, borderRadius: 12, padding: '10px 16px' }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: accent, lineHeight: 1 }}>{stat}</span>
                  <span style={{ fontSize: 11, color: '#64748b', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: 18, color: '#bfdbfe', margin: '0 0 36px' }}>
            See what you may qualify for — no commitment required.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/apply')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#fff', color: '#1d4ed8',
              border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 17,
              padding: '16px 40px', borderRadius: 12,
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
              marginBottom: 16,
            }}
          >
            See What You Qualify For
            <ChevronRight size={20} />
          </motion.button>
          <p style={{ color: '#93c5fd', fontSize: 13, margin: 0 }}>
            Free &nbsp;•&nbsp; Takes ~2 minutes &nbsp;•&nbsp; No hard credit pull
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        backgroundColor: '#060d1f',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        {/* Main footer body */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 48px' }}>
          <div className="hfp-footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48,
          }}>

            {/* Brand column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
                }}>
                  <Home size={20} color="#fff" />
                </div>
                <span style={{ fontWeight: 900, fontSize: 20, color: '#f1f5f9' }}>
                  HomeFinance<span style={{ color: '#3b82f6' }}>Pro</span>
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.8, maxWidth: 300, margin: '0 0 28px' }}>
                Helping homeowners find the right financing for every project — fast, free, and without the hassle.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                  { label: 'Twitter/X', path: 'M4 4l16 16M20 4 4 20' },
                  { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                  { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.403a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.163.46.347 1.26.403 2.43.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.43a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.46.163-1.26.347-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.403a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.163-.46-.347-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.43A4.9 4.9 0 0 1 3.79 2.947a4.9 4.9 0 0 1 1.772-1.153c.46-.163 1.26-.347 2.43-.403C9.257 1.334 9.636 1.322 12 1.322m0-1.159C8.756 .163 8.348.176 7.052.24 5.75.303 4.8.504 3.965.81a6.06 6.06 0 0 0-2.19 1.426A6.06 6.06 0 0 0 .349 4.426C.043 5.26-.158 6.21-.22 7.513-.285 8.81-.298 9.218-.298 12.163s.013 3.353.078 4.65c.063 1.302.264 2.252.57 3.087a6.06 6.06 0 0 0 1.426 2.19 6.06 6.06 0 0 0 2.19 1.426c.836.306 1.785.507 3.088.57 1.297.065 1.705.078 4.65.078s3.352-.013 4.65-.078c1.302-.063 2.252-.264 3.087-.57a6.06 6.06 0 0 0 2.19-1.426 6.06 6.06 0 0 0 1.426-2.19c.306-.835.507-1.785.57-3.087.065-1.297.078-1.705.078-4.65s-.013-3.353-.078-4.65c-.063-1.302-.264-2.252-.57-3.087a6.06 6.06 0 0 0-1.426-2.19 6.06 6.06 0 0 0-2.19-1.426C18.415.504 17.465.303 16.163.24 14.866.176 14.457.163 11.513.163H12z M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
                ].map(({ label, path }) => (
                  <a key={label} href="#" title={label} style={{
                    width: 38, height: 38,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(37,99,235,0.3)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Company links */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Company</div>
              {['About Us', 'How It Works', 'Lender Partners', 'Careers', 'Press'].map(link => (
                <a key={link} href="#" style={{
                  display: 'block', fontSize: 14, color: '#cbd5e1',
                  textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >{link}</a>
              ))}
            </div>

            {/* Project types */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Project Types</div>
              {['Pool Construction', 'Home Remodeling', 'Roofing', 'HVAC Systems', 'Outdoor Living', 'Kitchens & Baths'].map(link => (
                <a key={link} href="#" onClick={(e) => { e.preventDefault(); navigate('/apply'); }} style={{
                  display: 'block', fontSize: 14, color: '#cbd5e1',
                  textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >{link}</a>
              ))}
            </div>

            {/* Contact + newsletter */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Contact</div>
              {[
                { icon: '📧', text: 'hello@homefinancepro.com' },
                { icon: '📞', text: '1-800-HOME-FIN' },
                { icon: '📍', text: 'United States (All States)' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}

              {/* Mini newsletter */}
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Stay Updated</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="email"
                    placeholder="Your email"
                    style={{
                      flex: 1, padding: '10px 12px',
                      backgroundColor: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 8, fontSize: 13, color: '#fff',
                      outline: 'none',
                    }}
                  />
                  <button style={{
                    backgroundColor: '#2563eb', color: '#fff',
                    border: 'none', borderRadius: 8, padding: '0 14px',
                    cursor: 'pointer', fontWeight: 700, fontSize: 13,
                    flexShrink: 0,
                  }}>Go</button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '48px 0 28px' }} />

          {/* Bottom bar */}
          <div className="hfp-footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ fontSize: 12, color: '#e2e8f0', margin: 0 }}>
              © 2026 HomeFinancePro. All rights reserved.
            </p>
            <div className="hfp-footer-bottom-links" style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service', 'NMLS Disclosure', 'Cookie Policy'].map(link => (
                <a key={link} href="#" style={{
                  fontSize: 12, color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >{link}</a>
              ))}
            </div>
          </div>

          {/* Legal disclaimer */}
          <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 20, lineHeight: 1.7, maxWidth: 900 }}>
            <strong style={{ color: '#e2e8f0' }}>Disclaimer:</strong> HomeFinancePro is a financing marketplace mockup for demonstration purposes only.
            Estimated options displayed are not a guarantee of credit or final loan approval.
            Final approval, rates, and terms are subject to lender underwriting and verification. Not a commitment to lend.
            NMLS #0000000. Equal Housing Lender.
          </p>
        </div>
      </footer>
    </div>
  );
}
