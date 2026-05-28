import type { FormData, LoanOption, PropertyData } from './types';

export function generateLoanOptions(form: FormData, property?: PropertyData | null): LoanOption[] {
  // Determine loan amount — prefer real equity-derived max, fall back to form input
  const formAmountStr = form.loanAmount.replace(/\D/g, '');
  const formAmount = parseInt(formAmountStr) || 35000;

  // If we have real property data, use equity-constrained max
  const equityMax = property?.maxBorrowable ?? null;
  const amount = equityMax ? Math.min(formAmount, equityMax) : formAmount;

  const creditBand = form.creditScore;
  const isGoodCredit = ['720-759', '760-799', '800+'].includes(creditBand);
  const isFairCredit = ['680-719', '640-679'].includes(creditBand);
  const hasBankruptcy = form.hasBankruptcy === 'Yes';
  const isHomeowner = form.homeOwnership === 'own';

  // LTV ratio — affects rate if we have real property data
  const ltv = property?.estimatedValue
    ? Math.round(((property.remainingBalance ?? 0) + amount) / property.estimatedValue * 100)
    : null;

  const options: LoanOption[] = [];

  // ── Option 1: Best Overall Match ──
  if (!hasBankruptcy && (isGoodCredit || isFairCredit)) {
    const rate = isGoodCredit
      ? ltv && ltv < 70 ? '5.99% – 7.99%' : '6.99% – 8.99%'
      : '9.99% – 12.99%';
    options.push({
      id: 'best-overall',
      tag: 'Best Overall Match',
      tagColor: 'blue',
      lenderName: 'Greenlight Home Finance',
      monthlyPayment: Math.round((amount / 120) * 1.46),
      loanAmount: amount,
      term: 120,
      interestRate: rate,
      approvalLikelihood: isGoodCredit ? 'High' : 'Medium',
      bestFor: property
        ? `${form.projectType || 'home'} project — matches your ${property.equity ? '$' + property.equity.toLocaleString() : ''} equity position`
        : 'Pool construction or large home improvement projects',
      nextStep: 'Submit a full application online in under 10 minutes.',
    });
  }

  // ── Option 2: Lowest Monthly Payment ──
  options.push({
    id: 'lowest-payment',
    tag: 'Lowest Monthly Payment',
    tagColor: 'green',
    lenderName: 'LendingTree Home Equity',
    monthlyPayment: Math.round((amount / 180) * 1.42),
    loanAmount: amount,
    term: 180,
    interestRate: isGoodCredit ? '7.49% – 9.49%' : '10.99% – 14.99%',
    approvalLikelihood: isGoodCredit ? 'High' : isFairCredit ? 'Medium' : 'Low',
    bestFor: 'Customers who want lower monthly payments with a longer term',
    nextStep: 'Schedule a call with a lending specialist.',
  });

  // ── Option 3: Fast Approval ──
  options.push({
    id: 'fast-approval',
    tag: 'Fast Approval',
    tagColor: 'amber',
    lenderName: 'SwiftFund Home Loans',
    monthlyPayment: Math.round((amount * 0.85 / 84) * 1.55),
    loanAmount: Math.round(amount * 0.85),
    term: 84,
    interestRate: isGoodCredit ? '8.49% – 10.49%' : '12.49% – 16.99%',
    approvalLikelihood: 'High',
    bestFor: 'Customers who need quick funding and project start',
    nextStep: 'Get a decision in as little as 24 hours.',
  });

  // ── Option 4: Home Equity / HELOC (only if homeowner with equity data) ──
  if (isHomeowner && property?.equity && property.equity > amount) {
    const helocAmount = Math.min(amount, property.maxBorrowable ?? amount);
    options.push({
      id: 'heloc',
      tag: 'Home Equity Line (HELOC)',
      tagColor: 'purple',
      lenderName: 'Equity First Lending',
      monthlyPayment: Math.round((helocAmount / 120) * 1.28),
      loanAmount: helocAmount,
      term: 120,
      interestRate: isGoodCredit ? '5.25% – 6.75%' : '7.50% – 9.00%',
      approvalLikelihood: isGoodCredit ? 'High' : 'Medium',
      bestFor: `Leverage your ${property.equity ? '$' + Math.round(property.equity / 1000) + 'K' : ''} home equity for the lowest possible rate`,
      nextStep: 'Apply for a HELOC — draw funds as needed, pay interest only on what you use.',
    });
  }

  // ── Option 5: FHA Title I (fallback for lower credit) ──
  if (isHomeowner && !isGoodCredit && !isFairCredit && !hasBankruptcy) {
    options.push({
      id: 'fha',
      tag: 'Government-Backed',
      tagColor: 'purple',
      lenderName: 'FHA Title I Improvement',
      monthlyPayment: Math.round((Math.min(amount, 25000) / 240) * 1.38),
      loanAmount: Math.min(amount, 25000),
      term: 240,
      interestRate: '5.50% – 7.00%',
      approvalLikelihood: 'Medium',
      bestFor: 'Homeowners who want a government-backed low-rate option',
      nextStep: 'Connect with an FHA-approved lender near you.',
    });
  }

  return options;
}
