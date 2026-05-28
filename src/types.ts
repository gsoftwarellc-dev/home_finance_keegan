export interface FormData {
  // Step 1 - Project
  projectType: string;
  projectCost: string;
  startTimeline: string;
  hasContractor: string;
  contractorName: string;

  // Step 2 - Location
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  city: string;
  state: string;

  // Step 3 - Financial
  creditScore: string;
  annualIncome: string;
  employmentStatus: string;
  homeOwnership: string;
  loanAmount: string;
  monthlyPayment: string;
  hasBankruptcy: string;
}

export interface LoanOption {
  id: string;
  tag: string;
  tagColor: string;
  lenderName: string;
  monthlyPayment: number;
  loanAmount: number;
  term: number;
  interestRate: string;
  approvalLikelihood: 'High' | 'Medium' | 'Low';
  bestFor: string;
  nextStep: string;
}
