import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const LoanAffordabilityCalculator: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<string>('75000');
  const [monthlyDebts, setMonthlyDebts] = useState<string>('500');
  const [downPayment, setDownPayment] = useState<string>('50000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [currency, setCurrency] = useState<string>('USD');
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);
  const [maxHomePrice, setMaxHomePrice] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState<number>(0);

  const calculateAffordability = () => {
    const income = parseFloat(annualIncome);
    const debts = parseFloat(monthlyDebts);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const years = parseFloat(loanTerm);
    const months = years * 12;

    if (income > 0 && rate > 0 && months > 0) {
      const monthlyIncome = income / 12;
      const maxDebtRatio = 0.28; // 28% of gross monthly income for housing
      const maxTotalDebtRatio = 0.36; // 36% for total debt
      
      // Calculate maximum monthly payment based on income
      const maxMonthlyForHousing = monthlyIncome * maxDebtRatio;
      const maxMonthlyForTotal = monthlyIncome * maxTotalDebtRatio;
      const maxMonthlyPayment = Math.min(maxMonthlyForHousing, maxMonthlyForTotal - debts);

      // Calculate maximum loan amount based on payment capacity
      const maxLoan = (maxMonthlyPayment * (Math.pow(1 + rate, months) - 1)) / (rate * Math.pow(1 + rate, months));
      const maxHome = maxLoan + down;
      
      const currentDebtRatio = ((debts + maxMonthlyPayment) / monthlyIncome) * 100;

      setMaxLoanAmount(maxLoan);
      setMaxHomePrice(maxHome);
      setMonthlyPayment(maxMonthlyPayment);
      setDebtToIncomeRatio(currentDebtRatio);
    }
  };

  useEffect(() => {
    calculateAffordability();
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const seo = {
    title: "Loan Affordability Calculator – How Much Loan Can You Afford?",
    description:
      "Find out how much loan you can afford with this free calculator. Estimate affordable loan amount based on your income, expenses, and interest rate.",
    keywords:
      "loan affordability calculator, how much loan can I afford, home loan eligibility, income-based loan calculator",
    canonical: "https://quickncalc.com/loan-affordability/",
  };
  const relatedTools = [
    { name: 'Mortgage Calculator', path: '/mortgage', description: 'Calculate mortgage payments' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
    { name: 'Property Profit Calculator', path: '/property-profit', description: 'Analyze property investments' },
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'Calculate compound interest' },
  ];

  const faqs = [
    {
      question: 'What debt-to-income ratio do lenders prefer?',
      answer: 'Most lenders prefer a debt-to-income ratio of 36% or less, with housing costs not exceeding 28% of your gross monthly income. Some lenders may accept higher ratios with strong credit.',
    },
    {
      question: 'What counts as monthly debt?',
      answer: 'Include all recurring monthly payments: credit cards, car loans, student loans, personal loans, and other installment debts. Don\'t include utilities, groceries, or other variable expenses.',
    },
    {
      question: 'How does down payment affect affordability?',
      answer: 'A larger down payment reduces the loan amount needed, which can help you afford a more expensive home with the same monthly payment, and may help you avoid PMI.',
    },
    {
      question: 'Should I borrow the maximum amount I qualify for?',
      answer: 'Not necessarily. Consider your lifestyle, savings goals, emergency fund, and other financial priorities. Leave room for unexpected expenses and future financial goals.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Loan Affordability Calculator"
      description="Determine how much you can afford to borrow based on your income, existing debts, and down payment. Make informed decisions about your home purchase budget."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income ({currencySymbol})
            </label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="75000"
            />
            <p className="text-xs text-gray-500 mt-1">Gross income before taxes</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Debt Payments ({currencySymbol})
            </label>
            <input
              type="number"
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
            <p className="text-xs text-gray-500 mt-1">Credit cards, car loans, student loans, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment ({currencySymbol})
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per year)
            </label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="6.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (years)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Affordability Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Max Home Price:</span>
                <span className="font-bold text-lg text-green-600">
                  {currencySymbol}{maxHomePrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Loan Amount:</span>
                <span className="font-medium">
                  {currencySymbol}{maxLoanAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="font-medium text-blue-600">
                  {currencySymbol}{monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Debt-to-Income Ratio:</span>
                <span className={`font-medium ${debtToIncomeRatio <= 36 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {debtToIncomeRatio.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Financial Guidelines</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monthly Income:</span>
                <span>{currencySymbol}{(parseFloat(annualIncome || '0') / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Housing Ratio (28% max):</span>
                <span className={`${(monthlyPayment / (parseFloat(annualIncome || '1') / 12)) * 100 <= 28 ? 'text-green-600' : 'text-red-600'}`}>
                  {((monthlyPayment / (parseFloat(annualIncome || '1') / 12)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Debt Ratio (36% max):</span>
                <span className={`${debtToIncomeRatio <= 36 ? 'text-green-600' : 'text-red-600'}`}>
                  {debtToIncomeRatio.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Down Payment:</span>
                <span>{((parseFloat(downPayment || '0') / maxHomePrice) * 100).toFixed(1)}% of home price</span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-md ${debtToIncomeRatio <= 36 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            <p className="text-sm">
              {debtToIncomeRatio <= 36 
                ? '✓ Your debt-to-income ratio meets most lenders\' guidelines.' 
                : '⚠ Your debt-to-income ratio may be too high for some lenders. Consider reducing debts or increasing income.'}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Loan Affordability', text: `Max Home Price: ${currencySymbol}${maxHomePrice.toFixed(0)}` })}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default LoanAffordabilityCalculator;