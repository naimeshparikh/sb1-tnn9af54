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
    title: 'Compound Interest Calculator with Growth Chart - Calculate Compound Growth | QuicknCalc',
    description: 'Calculate compound interest with detailed growth visualization. See how your investments grow over time with year-by-year breakdown and charts.',
    keywords: 'compound interest calculator, compound growth, investment calculator, interest compounding, future value calculator, growth chart',
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
      description="Calculate how your money grows with compound interest and visualize the growth over time. See the power of compounding with detailed charts and tables."
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
              Principal Amount ({currencySymbol})
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="8"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (years)
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              value={compound}
              onChange={(e) => setCompound(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Growth</h3>
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

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Investment Summary</h4>
            <div className="space-y-2 text-sm">
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

          <div className="flex space-x-4">
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              {showChart ? 'Hide' : 'Show'} Growth Chart
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Compound Interest', text: `Future Value: ${currencySymbol}${futureValue.toFixed(2)}` })}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
        </div>

        {showChart && parseFloat(time || '0') > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
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