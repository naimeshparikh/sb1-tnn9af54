import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import GrowthChart from '../components/GrowthChart';

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('10000');
  const [rate, setRate] = useState<string>('8');
  const [time, setTime] = useState<string>('10');
  const [compound, setCompound] = useState<string>('1');
  const [currency, setCurrency] = useState<string>('USD');
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [showChart, setShowChart] = useState<boolean>(false);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);

    if (p > 0 && r >= 0 && t > 0 && n > 0) {
      const fv = p * Math.pow((1 + r / n), n * t);
      const interest = fv - p;

      setFutureValue(fv);
      setTotalInterest(interest);
    }
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, compound]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const seo = {
    title: 'Compound Interest Calculator with Interactive Growth Charts & Tables | QuicknCalc',
    description: 'Calculate compound interest with detailed interactive growth visualization and year-by-year breakdown tables. See how your investments grow over time with comprehensive charts showing the power of compounding.',
    keywords: 'compound interest calculator, compound growth, investment calculator, interest compounding, future value calculator, growth chart, compound interest table, investment visualization, compounding frequency',
    canonical: 'https://quickncalc.com/compound-interest/',
  };

  const relatedTools = [
    { name: 'SIP Calculator', path: '/sip', description: 'Plan your SIP investments' },
    { name: 'Retirement Calculator', path: '/retirement', description: 'Plan for retirement' },
    { name: 'Savings Goal Calculator', path: '/savings-goal', description: 'Plan your savings goals' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
  ];

  const faqs = [
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It\'s "interest on interest" that makes your money grow exponentially.',
    },
    {
      question: 'How does compounding frequency affect returns?',
      answer: 'More frequent compounding (daily vs annual) results in higher returns because interest is calculated and added more often, creating more opportunities for growth.',
    },
    {
      question: 'What is the rule of 72?',
      answer: 'The rule of 72 estimates how long it takes to double your money: divide 72 by the interest rate. For example, at 8% interest, your money doubles in approximately 9 years (72/8=9).',
    },
    {
      question: 'Should I choose compound interest over simple interest?',
      answer: 'Always choose compound interest for investments as it generates higher returns. However, for loans, simple interest is better as you pay less total interest.',
    },
  ];

  const compoundOptions = [
    { value: '365', label: 'Daily' },
    { value: '12', label: 'Monthly' },
    { value: '4', label: 'Quarterly' },
    { value: '2', label: 'Semi-annually' },
    { value: '1', label: 'Annually' },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Compound Interest Calculator with Growth Chart"
      description="Calculate how your money grows with compound interest and visualize the growth over time with interactive charts and detailed year-by-year breakdown tables. See the power of compounding with comprehensive analysis."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="calculator-grid grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="compound-currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="compound-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="calculator-select"
              aria-label="Select currency for compound interest calculations"
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
            <label htmlFor="compound-principal" className="block text-sm font-medium text-gray-700 mb-2">
              Principal Amount ({currencySymbol})
            </label>
            <input
              id="compound-principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="calculator-input"
              placeholder="10000"
              aria-describedby="compound-principal-help"
            />
            <div id="compound-principal-help" className="sr-only">Enter the initial amount you want to invest</div>
          </div>

          <div>
            <label htmlFor="compound-rate" className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              id="compound-rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="calculator-input"
              placeholder="8"
              aria-describedby="compound-rate-help"
            />
            <div id="compound-rate-help" className="sr-only">Enter the annual interest rate percentage</div>
          </div>

          <div>
            <label htmlFor="compound-time" className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (years)
            </label>
            <input
              id="compound-time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="calculator-input"
              placeholder="10"
              aria-describedby="compound-time-help"
            />
            <div id="compound-time-help" className="sr-only">Enter the number of years for investment</div>
          </div>

          <div>
            <label htmlFor="compound-frequency" className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              id="compound-frequency"
              value={compound}
              onChange={(e) => setCompound(e.target.value)}
              className="calculator-select"
              aria-label="Select how often interest is compounded"
            >
              {compoundOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 md:p-6 rounded-lg border border-green-200">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Investment Growth</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal Amount:</span>
                <span className="font-medium">
                  {currencySymbol}{parseFloat(principal || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest Earned:</span>
                <span className="font-medium text-green-600">
                  {currencySymbol}{totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600 font-semibold">Future Value:</span>
                <span className="font-bold text-lg text-green-600">
                  {currencySymbol}{futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
            <h4 className="font-semibold mb-3 text-base md:text-lg">Investment Summary</h4>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex justify-between">
                <span>Growth Multiple:</span>
                <span className="font-medium">{(futureValue / parseFloat(principal || '1')).toFixed(2)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Total Return:</span>
                <span className="text-green-600 font-medium">
                  {((totalInterest / parseFloat(principal || '1')) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Compounding:</span>
                <span>{compoundOptions.find(o => o.value === compound)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Period:</span>
                <span>{time} years</span>
              </div>
            </div>
          </div>

          <div className="calculator-button-group flex flex-row space-x-2 md:space-x-4">
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
              aria-label={`${showChart ? 'Hide' : 'Show'} compound interest growth chart and table`}
            >
              {showChart ? 'Hide' : 'Show'} Growth Chart
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 calculator-button-secondary"
              aria-label="Print compound interest calculation results"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Compound Interest', text: `Future Value: ${currencySymbol}${futureValue.toFixed(2)}` })}
              className="flex-1 calculator-button-primary"
              aria-label="Share compound interest calculation results"
            >
              Share Results
            </button>
          </div>
        </div>
        </div>

        {showChart && parseFloat(time || '0') > 0 && (
          <div className="calculator-card overflow-hidden">
            <GrowthChart
              principal={parseFloat(principal || '0')}
              monthlyContribution={0}
              annualRate={parseFloat(rate || '0')}
              years={parseFloat(time || '0')}
              currencySymbol={currencySymbol}
              title="Compound Interest Growth Over Time"
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;