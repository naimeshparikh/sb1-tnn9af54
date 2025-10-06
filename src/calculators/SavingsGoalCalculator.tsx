import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import GrowthChart from '../components/GrowthChart';

const SavingsGoalCalculator: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState<string>('50000');
  const [targetDate, setTargetDate] = useState<string>('2029-12-31');
  const [currentSavings, setCurrentSavings] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('4');
  const [currency, setCurrency] = useState<string>('USD');
  const [monthlyRequired, setMonthlyRequired] = useState<number>(0);
  const [totalMonths, setTotalMonths] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [showChart, setShowChart] = useState<boolean>(false);

  const calculateSavingsGoal = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings);
    const rate = parseFloat(interestRate) / 100 / 12;
    const target = new Date(targetDate);
    const today = new Date();
    const months = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30.44));

    if (goal > 0 && months > 0) {
      setTotalMonths(months);
      
      if (rate > 0) {
        // Future value of current savings
        const futureCurrentSavings = current * Math.pow(1 + rate, months);
        
        // Amount still needed
        const amountNeeded = goal - futureCurrentSavings;
        
        // Monthly payment needed (PMT calculation)
        const monthlyPayment = amountNeeded / ((Math.pow(1 + rate, months) - 1) / rate);
        
        // Total interest earned
        const totalContributions = monthlyPayment * months;
        const interest = goal - current - totalContributions;
        
        setMonthlyRequired(Math.max(0, monthlyPayment));
        setTotalInterest(interest);
      } else {
        // Simple calculation without interest
        const amountNeeded = goal - current;
        const monthlyPayment = amountNeeded / months;
        
        setMonthlyRequired(Math.max(0, monthlyPayment));
        setTotalInterest(0);
      }
    }
  };

  useEffect(() => {
    calculateSavingsGoal();
  }, [goalAmount, targetDate, currentSavings, interestRate]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const yearsToGoal = (totalMonths / 12).toFixed(1);

  const seo = {
    title: "Savings Goal Calculator – Plan & Track Your Savings Target",
    description:
      "Figure out how much to save monthly to reach your goals. This savings goal calculator helps you plan for vacations, big purchases, and financial milestones.",
    keywords:
      "savings goal calculator, savings target calculator, money saving calculator, financial goal planner, saving plan calculator",
    canonical: "https://quickncalc.com/savings-goal/",
  };

  const relatedTools = [
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'See how money grows over time' },
    { name: 'Retirement Calculator', path: '/retirement', description: 'Plan for retirement savings' },
    { name: 'SIP Calculator', path: '/sip', description: 'Plan systematic investments' },
    { name: 'Currency Converter', path: '/currency', description: 'Convert between currencies' },
  ];

  const faqs = [
    {
      question: 'How do I set realistic savings goals?',
      answer: 'Start by reviewing your income and expenses to determine how much you can realistically save each month. Set specific, measurable, achievable, relevant, and time-bound (SMART) goals.',
    },
    {
      question: 'Should I include interest in my savings calculations?',
      answer: 'Yes, if you\'re saving in interest-bearing accounts or investments. Even small interest rates can significantly impact your savings over time through compound growth.',
    },
    {
      question: 'What if I can\'t afford the monthly amount?',
      answer: 'Consider extending your timeline, reducing your goal amount, or finding ways to increase your income or reduce expenses. Any amount saved consistently is better than nothing.',
    },
    {
      question: 'Where should I keep my savings?',
      answer: 'For short-term goals (under 2 years), use high-yield savings accounts. For longer-term goals, consider CDs, money market accounts, or low-risk investments for better returns.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Savings Goal Calculator"
      description="Figure out how to save for your financial goals with this money saving goal calculator. Whether you're planning for a vacation, emergency fund, or major purchase, this savings target calculator shows you exactly how much to save each month. Get a clear savings plan with projections that help you reach your money saving goals on time."
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
              Savings Goal ({currencySymbol})
            </label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[10000, 25000, 50000, 100000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setGoalAmount(amount.toString())}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {currencySymbol}{amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Savings ({currencySymbol})
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per year)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="4"
            />
            <p className="text-xs text-gray-500 mt-1">Leave as 0 for no interest calculations</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Plan</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Required:</span>
                <span className="font-bold text-lg text-blue-600">
                  {currencySymbol}{monthlyRequired.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time to Goal:</span>
                <span className="font-medium">{totalMonths} months ({yearsToGoal} years)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Savings:</span>
                <span className="font-medium">
                  {currencySymbol}{parseFloat(currentSavings || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Earned:</span>
                <span className="font-medium text-green-600">
                  {currencySymbol}{totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Goal Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Target Amount:</span>
                <span>{currencySymbol}{parseFloat(goalAmount || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Starting Amount:</span>
                <span>{currencySymbol}{parseFloat(currentSavings || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount to Save:</span>
                <span>{currencySymbol}{(parseFloat(goalAmount || '0') - parseFloat(currentSavings || '0')).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Contributions:</span>
                <span>{currencySymbol}{(monthlyRequired * totalMonths).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Progress:</span>
                <span>{((parseFloat(currentSavings || '0') / parseFloat(goalAmount || '1')) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">💡 Savings Tip</h4>
            <p className="text-sm text-green-700">
              Set up automatic transfers to your savings account on payday. This "pay yourself first" approach makes saving effortless and consistent.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showChart ? 'Hide' : 'Show'} Growth Chart
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Plan
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Savings Goal Plan', text: `Save ${currencySymbol}${monthlyRequired.toFixed(2)} monthly to reach ${currencySymbol}${goalAmount} goal` })}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Share Plan
            </button>
          </div>
        </div>
        </div>

        {showChart && totalMonths > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md overflow-hidden">
            <GrowthChart
              principal={parseFloat(currentSavings || '0')}
              monthlyContribution={monthlyRequired}
              annualRate={parseFloat(interestRate || '0')}
              years={totalMonths / 12}
              currencySymbol={currencySymbol}
              title="Savings Goal Progress Over Time"
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SavingsGoalCalculator;