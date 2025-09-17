import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import AmortizationTable from '../components/AmortizationTable';
import YearsMonthsInput from '../components/YearsMonthsInput';

const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('10');
  const [tenureYears, setTenureYears] = useState<string>('5');
  const [tenureMonths, setTenureMonths] = useState<string>('0');
  const [currency, setCurrency] = useState<string>('USD');
  const [emi, setEmi] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [showTable, setShowTable] = useState<boolean>(false);

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(tenureYears || '0') * 12 + parseFloat(tenureMonths || '0');

    if (principal > 0 && rate > 0 && months > 0) {
      const emiValue = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      const totalAmountValue = emiValue * months;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(emiValue);
      setTotalAmount(totalAmountValue);
      setTotalInterest(totalInterestValue);
    }
  };

  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, tenureYears, tenureMonths]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const totalMonths = parseFloat(tenureYears || '0') * 12 + parseFloat(tenureMonths || '0');

  const seo = {
    title: 'EMI Calculator with Amortization Table - Calculate Loan EMI Online | QuicknCalc',
    description: 'Calculate your loan EMI (Equated Monthly Installment) with detailed amortization schedule. Free EMI calculator for home loans, personal loans, car loans with charts and tables.',
    keywords: 'EMI calculator, loan EMI, equated monthly installment, amortization table, home loan EMI, personal loan calculator, car loan EMI, mortgage calculator',
    canonical: 'https://quickncalc.com/emi/',
  };

  const relatedTools = [
    { name: 'Mortgage Calculator', path: '/mortgage', description: 'Calculate mortgage payments and schedules' },
    { name: 'Loan Affordability Calculator', path: '/loan-affordability', description: 'Check how much you can borrow' },
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'Calculate compound interest growth' },
    { name: 'SIP Calculator', path: '/sip', description: 'Plan your SIP investments' },
  ];

  const faqs = [
    {
      question: 'What is EMI?',
      answer: 'EMI stands for Equated Monthly Installment. It is the fixed amount you pay to the lender every month until the loan is fully repaid.',
    },
    {
      question: 'How is EMI calculated?',
      answer: 'EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the principal amount, r is the monthly interest rate, and n is the number of months.',
    },
    {
      question: 'Can I prepay my loan to reduce EMI?',
      answer: 'Yes, most lenders allow loan prepayment. You can either reduce the EMI amount or the tenure. Check with your lender for prepayment charges.',
    },
    {
      question: 'What factors affect my EMI amount?',
      answer: 'EMI depends on three main factors: loan amount (principal), interest rate, and loan tenure. Higher principal or interest rate increases EMI, while longer tenure reduces it.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Loan EMI Calculator with Amortization Table"
      description="Calculate your monthly loan EMI (Equated Monthly Installment) with detailed amortization schedule showing principal vs interest breakdown over time."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
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
              Loan Amount ({currencySymbol})
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10.5"
            />
          </div>

          <YearsMonthsInput
            years={tenureYears}
            months={tenureMonths}
            onYearsChange={setTenureYears}
            onMonthsChange={setTenureMonths}
            label="Loan Tenure"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">EMI Calculation Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly EMI:</span>
                <span className="font-semibold text-lg text-blue-600">
                  {currencySymbol}{emi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">
                  {currencySymbol}{totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-medium text-red-600">
                  {currencySymbol}{totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Tenure:</span>
                <span className="font-medium">
                  {tenureYears} years {tenureMonths} months ({totalMonths} months)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Loan Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Principal Amount:</span>
                <span>{currencySymbol}{parseFloat(loanAmount || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Rate:</span>
                <span>{interestRate}% per annum</span>
              </div>
              <div className="flex justify-between">
                <span>Total Payments:</span>
                <span>{totalMonths} payments</span>
              </div>
              <div className="flex justify-between">
                <span>Interest/Principal Ratio:</span>
                <span>{(totalInterest / parseFloat(loanAmount || '1')).toFixed(2)}:1</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowTable(!showTable)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showTable ? 'Hide' : 'Show'} Amortization Table
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'EMI Calculation', text: `Monthly EMI: ${currencySymbol}${emi.toFixed(2)}` })}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
        </div>

        {showTable && totalMonths > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <AmortizationTable
              loanAmount={parseFloat(loanAmount || '0')}
              monthlyPayment={emi}
              interestRate={parseFloat(interestRate || '0')}
              tenure={totalMonths}
              currencySymbol={currencySymbol}
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default EmiCalculator;