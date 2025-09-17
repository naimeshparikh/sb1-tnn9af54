import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import GrowthChart from '../components/GrowthChart';

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentSavings, setCurrentSavings] = useState<string>('50000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('1000');
  const [expectedReturn, setExpectedReturn] = useState<string>('7');
  const [retirementGoal, setRetirementGoal] = useState<string>('1000000');
  const [currency, setCurrency] = useState<string>('USD');
  const [projectedSavings, setProjectedSavings] = useState<number>(0);
  const [monthlyNeeded, setMonthlyNeeded] = useState<number>(0);
  const [shortfall, setShortfall] = useState<number>(0);
  const [showChart, setShowChart] = useState<boolean>(false);

  const calculateRetirement = () => {
    const current = parseFloat(currentAge);
    const retirement = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const returnRate = parseFloat(expectedReturn) / 100 / 12;
    const goal = parseFloat(retirementGoal);
    const yearsToRetirement = retirement - current;
    const monthsToRetirement = yearsToRetirement * 12;

    if (current < retirement && returnRate >= 0 && monthsToRetirement > 0) {
      // Future value of current savings
      const futureCurrentSavings = savings * Math.pow(1 + returnRate, monthsToRetirement);
      
      // Future value of monthly contributions (annuity)
      const futureMonthlyContributions = monthly * ((Math.pow(1 + returnRate, monthsToRetirement) - 1) / returnRate);
      
      // Total projected savings
      const totalProjected = futureCurrentSavings + futureMonthlyContributions;
      
      // Calculate shortfall
      const gap = goal - totalProjected;
      
      // Calculate monthly amount needed to reach goal
      const monthlyToReachGoal = (goal - futureCurrentSavings) / ((Math.pow(1 + returnRate, monthsToRetirement) - 1) / returnRate);

      setProjectedSavings(totalProjected);
      setShortfall(gap);
      setMonthlyNeeded(monthlyToReachGoal);
    }
  };

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, retirementGoal]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const yearsToRetirement = parseFloat(retirementAge) - parseFloat(currentAge);

  const seo = {
    title: 'Retirement Calculator with Growth Projection - Plan Your Retirement Savings | QuicknCalc',
    description: 'Calculate retirement savings with detailed growth projections. Free retirement planning calculator with charts showing your savings growth over time.',
    keywords: 'retirement calculator, retirement planning, retirement savings, pension calculator, 401k calculator, retirement goal planning, retirement growth chart',
    canonical: 'https://quickncalc.com/retirement/',
  };

  const relatedTools = [
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'See how money grows over time' },
    { name: 'SIP Calculator', path: '/sip', description: 'Plan systematic investments' },
    { name: 'Savings Goal Calculator', path: '/savings-goal', description: 'Plan for specific savings goals' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan payments' },
  ];

  const faqs = [
    {
      question: 'How much should I save for retirement?',
      answer: 'Financial experts recommend saving 10-15% of your income for retirement. A common rule is to have 10-12 times your final working year\'s salary saved by retirement.',
    },
    {
      question: 'What is a realistic return rate for retirement investments?',
      answer: 'Historically, stock markets have returned about 7-10% annually over long periods. A conservative estimate of 6-8% is often used for retirement planning, accounting for inflation and market volatility.',
    },
    {
      question: 'When should I start saving for retirement?',
      answer: 'The earlier you start, the better, due to compound interest. Starting in your 20s gives you a significant advantage, but it\'s never too late to begin saving for retirement.',
    },
    {
      question: 'What if I\'m behind on retirement savings?',
      answer: 'If you\'re behind, consider increasing contributions, working longer, reducing expected retirement expenses, or consulting a financial advisor for personalized strategies.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Retirement Calculator with Growth Projection"
      description="Plan your retirement savings with detailed growth projections. See if you're on track to meet your retirement goals with year-by-year savings breakdown."
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement Age
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="65"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Retirement Savings ({currencySymbol})
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution ({currencySymbol})
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="7"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[5, 6, 7, 8, 9, 10].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setExpectedReturn(rate.toString())}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Goal ({currencySymbol})
            </label>
            <input
              type="number"
              value={retirementGoal}
              onChange={(e) => setRetirementGoal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1000000"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Retirement Projection</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Years to Retirement:</span>
                <span className="font-medium">{yearsToRetirement} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projected Savings:</span>
                <span className="font-bold text-lg text-purple-600">
                  {currencySymbol}{projectedSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Retirement Goal:</span>
                <span className="font-medium">
                  {currencySymbol}{parseFloat(retirementGoal || '0').toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shortfall/Surplus:</span>
                <span className={`font-medium ${shortfall < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {shortfall < 0 ? '+' : '-'}{currencySymbol}{Math.abs(shortfall).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Retirement Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monthly to Reach Goal:</span>
                <span className="font-medium">{currencySymbol}{monthlyNeeded.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Monthly:</span>
                <span>{currencySymbol}{parseFloat(monthlyContribution || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Goal Achievement:</span>
                <span className={`${shortfall <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {((projectedSavings / parseFloat(retirementGoal || '1')) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Expected Return:</span>
                <span>{expectedReturn}% per year</span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-md ${shortfall <= 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            <p className="text-sm">
              {shortfall <= 0 
                ? '✓ You\'re on track to meet your retirement goal!' 
                : '⚠ You may need to save more or adjust your retirement plans to meet your goal.'}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              {showChart ? 'Hide' : 'Show'} Growth Projection
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Retirement Plan', text: `Projected Savings: ${currencySymbol}${projectedSavings.toFixed(0)}` })}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
        </div>

        {showChart && yearsToRetirement > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <GrowthChart
              principal={parseFloat(currentSavings || '0')}
              monthlyContribution={parseFloat(monthlyContribution || '0')}
              annualRate={parseFloat(expectedReturn || '0')}
              years={yearsToRetirement}
              currencySymbol={currencySymbol}
              title="Retirement Savings Growth Projection"
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default RetirementCalculator;