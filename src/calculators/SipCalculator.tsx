import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import GrowthChart from '../components/GrowthChart';

const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('5000');
  const [annualReturn, setAnnualReturn] = useState<string>('12');
  const [tenure, setTenure] = useState<string>('10');
  const [currency, setCurrency] = useState<string>('USD');
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [wealthGained, setWealthGained] = useState<number>(0);
  const [showChart, setShowChart] = useState<boolean>(false);

  const calculateSip = () => {
    const monthly = parseFloat(monthlyInvestment);
    const rate = parseFloat(annualReturn) / 100 / 12;
    const months = parseFloat(tenure) * 12;

    if (monthly > 0 && rate > 0 && months > 0) {
      const maturity = monthly * (((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate));
      const totalInvest = monthly * months;
      const wealth = maturity - totalInvest;

      setMaturityAmount(maturity);
      setTotalInvestment(totalInvest);
      setWealthGained(wealth);
    }
  };

  useEffect(() => {
    calculateSip();
  }, [monthlyInvestment, annualReturn, tenure]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const seo = {
    title: 'SIP Calculator with Growth Chart - Calculate SIP Returns | QuicknCalc',
    description: 'Calculate SIP (Systematic Investment Plan) returns with detailed growth charts and tables. Free SIP calculator showing year-by-year investment growth.',
    keywords: 'SIP calculator, systematic investment plan, mutual fund calculator, SIP returns, investment calculator, SIP growth chart',
    canonical: 'https://quickncalc.com/sip/',
  };

  const relatedTools = [
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'Calculate compound interest growth' },
    { name: 'Retirement Calculator', path: '/retirement', description: 'Plan for retirement' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
    { name: 'Savings Goal Calculator', path: '/savings-goal', description: 'Plan your savings goals' },
  ];

  const faqs = [
    {
      question: 'What is SIP?',
      answer: 'SIP (Systematic Investment Plan) is a method of investing in mutual funds where you invest a fixed amount regularly (monthly/quarterly) instead of a lump sum.',
    },
    {
      question: 'How does SIP work?',
      answer: 'SIP works on the principle of rupee cost averaging and compounding. Regular investments help average out market volatility and compound returns over time.',
    },
    {
      question: 'What is a good SIP return rate?',
      answer: 'Historical equity mutual fund returns in India have averaged 12-15% annually over long periods. However, returns can vary and past performance doesn\'t guarantee future results.',
    },
    {
      question: 'Can I change my SIP amount?',
      answer: 'Yes, most mutual funds allow you to increase, decrease, or pause your SIP. Some funds also offer step-up SIPs where the amount increases annually.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="SIP Calculator with Growth Chart"
      description="Calculate your SIP (Systematic Investment Plan) returns with detailed growth visualization. See how regular investing builds wealth over time with year-by-year breakdown."
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
              Monthly Investment ({currencySymbol})
            </label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[8, 10, 12, 15, 18].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setAnnualReturn(rate.toString())}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Period (years)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SIP Investment Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Investment:</span>
                <span className="font-medium">
                  {currencySymbol}{totalInvestment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wealth Gained:</span>
                <span className="font-medium text-green-600">
                  {currencySymbol}{wealthGained.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600 font-semibold">Maturity Amount:</span>
                <span className="font-bold text-lg text-purple-600">
                  {currencySymbol}{maturityAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Investment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monthly SIP:</span>
                <span>{currencySymbol}{parseFloat(monthlyInvestment || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Investment Period:</span>
                <span>{tenure} years ({parseFloat(tenure || '0') * 12} months)</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Return:</span>
                <span>{annualReturn}% per annum</span>
              </div>
              <div className="flex justify-between">
                <span>Total Return:</span>
                <span className="text-green-600">
                  {((wealthGained / totalInvestment) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
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
              onClick={() => navigator.share?.({ title: 'SIP Calculation', text: `Maturity Amount: ${currencySymbol}${maturityAmount.toFixed(0)}` })}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
        </div>

        {showChart && parseFloat(tenure || '0') > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <GrowthChart
              principal={0}
              monthlyContribution={parseFloat(monthlyInvestment || '0')}
              annualRate={parseFloat(annualReturn || '0')}
              years={parseFloat(tenure || '0')}
              currencySymbol={currencySymbol}
              title="SIP Investment Growth Over Time"
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SipCalculator;