import type { VercelRequest, VercelResponse } from '@vercel/node';

// Amortization helper — estimates remaining balance from original loan
function estimateRemainingBalance(
  originalAmount: number,
  annualRate: number,
  termMonths: number,
  monthsElapsed: number,
): number {
  const r = annualRate / 12 / 100;
  if (r === 0) return Math.max(0, originalAmount - (originalAmount / termMonths) * monthsElapsed);
  const payment = (originalAmount * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
  const remaining = originalAmount * Math.pow(1 + r, monthsElapsed) - payment * ((Math.pow(1 + r, monthsElapsed) - 1) / r);
  return Math.max(0, Math.round(remaining));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { address, city, state, zipCode } = req.body || {};
  if (!address || !zipCode) return res.status(400).json({ error: 'Address and ZIP code are required' });

  // Use env var if set, otherwise fall back to the hardcoded trial key
  const ATTOM_KEY = process.env.ATTOM_API_KEY || '825fcc853efc710d975086d588600441';

  // ── If no real API key, return realistic mock data ──
  if (!ATTOM_KEY || ATTOM_KEY === 'demo') {
    return res.status(200).json(generateMockData(address, zipCode));
  }

  try {
    // 1. ATTOM property detail + AVM
    const attomUrl = `https://api.attomdata.com/propertyapi/v1.0.0/avm/detail?address1=${encodeURIComponent(address)}&address2=${encodeURIComponent(`${city || ''} ${state || ''} ${zipCode}`)}&accept=application/json`;

    const attomRes = await fetch(attomUrl, {
      headers: {
        apikey: ATTOM_KEY,
        Accept: 'application/json',
      },
    });

    if (!attomRes.ok) {
      // Graceful fallback to mock if ATTOM fails
      return res.status(200).json(generateMockData(address, zipCode));
    }

    const attomData = await attomRes.json();
    const prop = attomData?.property?.[0];

    if (!prop) return res.status(200).json(generateMockData(address, zipCode));

    // Extract AVM value
    const estimatedValue = prop?.avm?.amount?.value || prop?.assessment?.assessed?.assdttlvalue || null;

    // Extract mortgage lien info
    const loan = prop?.mortgage?.amount || null;
    const loanDate = prop?.mortgage?.recordingdate || null;
    const loanRate = prop?.mortgage?.interestrate || 6.5;

    let remainingBalance: number | null = null;
    if (loan && loanDate) {
      const originationDate = new Date(loanDate);
      const monthsElapsed = Math.floor((Date.now() - originationDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const termMonths = 360; // assume 30yr
      remainingBalance = estimateRemainingBalance(loan, loanRate, termMonths, monthsElapsed);
    }

    const equity = estimatedValue && remainingBalance !== null
      ? estimatedValue - remainingBalance
      : estimatedValue
        ? Math.round(estimatedValue * 0.45) // rough equity estimate if no lien data
        : null;

    const maxBorrowable = estimatedValue
      ? Math.round(estimatedValue * 0.8) - (remainingBalance ?? Math.round(estimatedValue * 0.55))
      : null;

    return res.status(200).json({
      found: true,
      source: 'attom',
      address: `${address}, ${city || ''} ${state || ''} ${zipCode}`,
      estimatedValue,
      remainingBalance,
      equity,
      maxBorrowable: Math.max(0, maxBorrowable ?? 0),
      yearBuilt: prop?.summary?.yearbuilt || null,
      bedrooms: prop?.building?.rooms?.beds || null,
      bathrooms: prop?.building?.rooms?.bathstotal || null,
      sqft: prop?.building?.size?.livingsize || null,
      lastSalePrice: prop?.sale?.amount?.saleamt || null,
      lastSaleDate: prop?.sale?.salesearchdate || null,
    });
  } catch {
    return res.status(200).json(generateMockData(address, zipCode));
  }
}

// ── Realistic mock data seeded from ZIP code ──
function generateMockData(address: string, zipCode: string) {
  const seed = zipCode.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const base = 220000 + (seed % 30) * 12000;
  const estimatedValue = base + Math.floor(Math.sin(seed) * 15000 + 15000);
  const originalLoan = Math.round(estimatedValue * 0.8);
  const monthsElapsed = 48 + (seed % 60);
  const remainingBalance = estimateRemainingBalance(originalLoan, 6.5, 360, monthsElapsed);
  const equity = estimatedValue - remainingBalance;
  const maxBorrowable = Math.max(0, Math.round(estimatedValue * 0.8) - remainingBalance);

  return {
    found: true,
    source: 'demo',
    address: `${address}, ${zipCode}`,
    estimatedValue,
    remainingBalance,
    equity,
    maxBorrowable,
    yearBuilt: 1995 + (seed % 25),
    bedrooms: 3 + (seed % 3),
    bathrooms: 2 + (seed % 2),
    sqft: 1600 + (seed % 1200),
    lastSalePrice: Math.round(estimatedValue * 0.72),
    lastSaleDate: `${2018 + (seed % 5)}-${String(1 + (seed % 12)).padStart(2, '0')}-15`,
  };
}
