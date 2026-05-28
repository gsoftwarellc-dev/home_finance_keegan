import type { FormData, LoanOption } from './types';

export function generateLoanOptions(form: FormData): LoanOption[] {
  const amount = parseInt(form.loanAmount.replace(/\D/g, '')) || 35000;
  const creditBand = form.creditScore;

  const isGoodCredit = ['720-759', '760-799', '800+'].includes(creditBand);
  const isFairCredit = ['680-719', '640-679'].includes(creditBand);

  const options: LoanOption[] = [];

  // Option 1: Best Overall
  if (isGoodCredit || isFairCredit) {
    options.push({
      id: 'best-overall',
      tag: 'Best Overall Match',
      tagColor: 'blue',
      lenderName: 'Greenlight Home Finance',
      monthlyPayment: Math.round((amount / 120) * 1.46),
      loanAmount: amount,
      term: 120,
      interestRate: isGoodCredit ? '6.99% – 8.99%' : '9.99% – 12.99%',
      approvalLikelihood: isGoodCredit ? 'High' : 'Medium',
      bestFor: 'Pool construction or large home improvement projects',
      nextStep: 'Submit a full application online in under 10 minutes.',
    });
  }

  // Option 2: Lowest Monthly Payment
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

  // Option 3: Fast Approval
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

  // Option 4: FHA / Government-backed (if homeowner)
  if (form.homeOwnership === 'own') {
    options.push({
      id: 'gov-backed',
      tag: 'Government-Backed',
      tagColor: 'purple',
      lenderName: 'FHA Title I Improvement',
      monthlyPayment: Math.round((amount * 0.9 / 240) * 1.38),
      loanAmount: Math.round(amount * 0.9),
      term: 240,
      interestRate: '5.50% – 7.00%',
      approvalLikelihood: isGoodCredit ? 'High' : 'Medium',
      bestFor: 'Homeowners who want the lowest possible interest rate',
      nextStep: 'Connect with an FHA-approved lender near you.',
    });
  }

  return options;
}
