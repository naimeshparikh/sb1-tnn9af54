import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import AmortizationTable from '../components/AmortizationTable';
import YearsMonthsInput from '../components/YearsMonthsInput';

const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('60000');
  const [loanTermYears, setLoanTermYears] = useState<string>('30');
  const [loanTermMonths, setLoanTermMonths] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [currency, setCurrency] = useState<string>('USD');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [showTable, setShowTable] = useState<boolean>(false);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const totalMonths = parseFloat(loanTermYears || '0') * 12 + parseFloat(loanTermMonths || '0');
    const rate = parseFloat(interestRate) / 100 / 12;

    if (price > 0 && down >= 0 && totalMonths > 0 && rate > 0) {
      const loan = price - down;
      const monthly = (loan * rate * Math.pow(1 + rate, totalMonths)) / (Math.pow(1 + rate, totalMonths) - 1);
      const total = monthly * totalMonths;
      const interest = total - loan;

      setLoanAmount(loan);
      setMonthlyPayment(monthly);
      setTotalPayment(total);
      setTotalInterest(interest);
    }
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTermYears, loanTermMonths, interestRate]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const downPaymentPercent = ((parseFloat(downPayment || '0') / parseFloat(homePrice || '1')) * 100).toFixed(1);
  const totalMonths = parseFloat(loanTermYears || '0') * 12 + parseFloat(loanTermMonths || '0');

  const seo = {
    title: "Mortgage Calculator – Home Loan Payments & Interest Breakdown",
    description:
      "Plan your home loan better with this free mortgage calculator. Get EMI, interest breakdown, and total repayment instantly.",
    keywords:
      "mortgage calculator, home loan calculator, emi calculator, mortgage payment calculator, house loan calculator",
    canonical: "https://quickncalc.com/mortgage/",
  };

  const relatedTools = [
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
    { name: 'Loan Affordability Calculator', path: '/loan-affordability', description: 'Check borrowing capacity' },
    { name: 'Property Profit Calculator', path: '/property-profit', description: 'Analyze property investment returns' },
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'Calculate compound interest' },
  ];

  const faqs = [
    {
      question: 'How much down payment do I need?',
      answer: 'Down payments typically range from 3% to 20% of the home price. A 20% down payment helps you avoid PMI (Private Mortgage Insurance) and reduces monthly payments.',
    },
    {
      question: 'What is included in my monthly mortgage payment?',
      answer: 'Monthly payments typically include principal, interest, property taxes, homeowners insurance (PITI), and possibly PMI if your down payment is less than 20%.',
    },
    {
      question: 'How do interest rates affect my payment?',
      answer: 'Higher interest rates increase your monthly payment and total interest paid. Even a 1% difference in rate can significantly impact your total cost over the loan term.',
    },
    {
      question: 'Should I choose a 15-year or 30-year mortgage?',
      answer: '30-year mortgages have lower monthly payments but higher total interest. 15-year mortgages have higher monthly payments but you pay much less interest overall.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Mortgage Calculator with Amortization Table"
      description="Calculate your monthly mortgage payments with detailed amortization schedule. See how different down payments and loan terms affect your home buying costs."
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
              Home Price ({currencySymbol})
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="300000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment ({currencySymbol}) - {downPaymentPercent}%
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="60000"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[5, 10, 15, 20].map((percent) => (
                <button
                  key={percent}
                  onClick={() => setDownPayment(((parseFloat(homePrice || '0') * percent) / 100).toString())}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>

          <YearsMonthsInput
            years={loanTermYears}
            months={loanTermMonths}
            onYearsChange={setLoanTermYears}
            onMonthsChange={setLoanTermMonths}
            label="Loan Term"
          />

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
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mortgage Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-medium">
                  {currencySymbol}{loanAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="font-bold text-lg text-blue-600">
                  {currencySymbol}{monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-medium text-red-600">
                  {currencySymbol}{totalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Payment:</span>
                <span className="font-medium">
                  {currencySymbol}{totalPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Loan Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Home Price:</span>
                <span>{currencySymbol}{parseFloat(homePrice || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Down Payment:</span>
                <span>{currencySymbol}{parseFloat(downPayment || '0').toLocaleString()} ({downPaymentPercent}%)</span>
              </div>
              <div className="flex justify-between">
                <span>Loan Term:</span>
                <span>{loanTermYears} years {loanTermMonths} months</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Rate:</span>
                <span>{interestRate}% per year</span>
              </div>
              <div className="flex justify-between">
                <span>Interest/Principal Ratio:</span>
                <span>{(totalInterest / loanAmount).toFixed(2)}:1</span>
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
              onClick={() => navigator.share?.({ title: 'Mortgage Calculation', text: `Monthly Payment: ${currencySymbol}${monthlyPayment.toFixed(2)}` })}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
        </div>

        {showTable && totalMonths > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md overflow-hidden">
            <AmortizationTable
              loanAmount={loanAmount}
              monthlyPayment={monthlyPayment}
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

export default MortgageCalculator;