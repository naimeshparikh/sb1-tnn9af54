import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const PropertyProfitCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<string>('200000');
  const [salePrice, setSalePrice] = useState<string>('250000');
  const [purchaseCosts, setPurchaseCosts] = useState<string>('5000');
  const [sellingCosts, setSellingCosts] = useState<string>('7500');
  const [improvementCosts, setImprovementCosts] = useState<string>('10000');
  const [holdingPeriod, setHoldingPeriod] = useState<string>('5');
  const [currency, setCurrency] = useState<string>('USD');
  const [profit, setProfit] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);
  const [annualizedReturn, setAnnualizedReturn] = useState<number>(0);

  const calculateProfit = () => {
    const purchase = parseFloat(purchasePrice);
    const sale = parseFloat(salePrice);
    const purchaseCost = parseFloat(purchaseCosts);
    const sellingCost = parseFloat(sellingCosts);
    const improvement = parseFloat(improvementCosts);
    const years = parseFloat(holdingPeriod);

    if (purchase > 0 && sale > 0 && years > 0) {
      const totalCosts = purchase + purchaseCost + sellingCost + improvement;
      const netProfit = sale - totalCosts;
      const returnOnInvestment = (netProfit / totalCosts) * 100;
      const annualized = (Math.pow(sale / totalCosts, 1 / years) - 1) * 100;

      setProfit(netProfit);
      setRoi(returnOnInvestment);
      setAnnualizedReturn(annualized);
    }
  };

  useEffect(() => {
    calculateProfit();
  }, [purchasePrice, salePrice, purchaseCosts, sellingCosts, improvementCosts, holdingPeriod]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const seo = {
    title: 'Property Investment Profit Calculator | QuicknCalc',
    description: 'Calculate real estate investment returns, ROI, and annualized profits. Free property profit calculator with all costs included for accurate investment analysis.',
    keywords: 'property profit calculator, real estate investment calculator, property ROI, real estate returns, investment property calculator',
    canonical: 'https://quickncalc.com/property-profit/',
  };

  const relatedTools = [
    { name: 'Mortgage Calculator', path: '/mortgage', description: 'Calculate mortgage payments' },
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'Calculate compound interest' },
    { name: 'Loan Affordability Calculator', path: '/loan-affordability', description: 'Check borrowing capacity' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
  ];

  const faqs = [
    {
      question: 'What costs should I include in property investment calculations?',
      answer: 'Include purchase price, closing costs, agent fees, legal fees, inspection costs, improvements/renovations, selling costs, and any taxes or fees.',
    },
    {
      question: 'What is a good ROI for real estate investment?',
      answer: 'A good ROI varies by location and market conditions, but generally 8-12% annual returns are considered good for rental properties, while flipping may target 15-20%.',
    },
    {
      question: 'How do I calculate annualized returns?',
      answer: 'Annualized return is calculated using the compound annual growth rate (CAGR) formula: (Ending Value/Beginning Value)^(1/years) - 1.',
    },
    {
      question: 'Should I include rental income in this calculation?',
      answer: 'This calculator focuses on capital gains from buying and selling. For rental properties, add net rental income to get total return on investment.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Investment Property Profit Calculator"
      description="Calculate your real estate investment returns including all costs. Analyze property profits, ROI, and annualized returns to make informed investment decisions."
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
              Purchase Price ({currencySymbol})
            </label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="200000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sale Price ({currencySymbol})
            </label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="250000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Costs ({currencySymbol})
            </label>
            <input
              type="number"
              value={purchaseCosts}
              onChange={(e) => setPurchaseCosts(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
            <p className="text-xs text-gray-500 mt-1">Closing costs, legal fees, inspections, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selling Costs ({currencySymbol})
            </label>
            <input
              type="number"
              value={sellingCosts}
              onChange={(e) => setSellingCosts(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="7500"
            />
            <p className="text-xs text-gray-500 mt-1">Agent fees, marketing, legal costs, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Improvement/Renovation Costs ({currencySymbol})
            </label>
            <input
              type="number"
              value={improvementCosts}
              onChange={(e) => setImprovementCosts(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Holding Period (years)
            </label>
            <input
              type="number"
              step="0.1"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Investment:</span>
                <span className="font-medium">
                  {currencySymbol}{(parseFloat(purchasePrice || '0') + parseFloat(purchaseCosts || '0') + parseFloat(sellingCosts || '0') + parseFloat(improvementCosts || '0')).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sale Price:</span>
                <span className="font-medium">
                  {currencySymbol}{parseFloat(salePrice || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600 font-semibold">Net Profit/Loss:</span>
                <span className={`font-bold text-lg ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profit >= 0 ? '+' : ''}{currencySymbol}{profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Return Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total ROI:</span>
                <span className={`font-medium ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roi.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Annualized Return:</span>
                <span className={`font-medium ${annualizedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {annualizedReturn.toFixed(2)}% per year
                </span>
              </div>
              <div className="flex justify-between">
                <span>Holding Period:</span>
                <span>{holdingPeriod} years</span>
              </div>
              <div className="flex justify-between">
                <span>Total Costs:</span>
                <span>{((parseFloat(purchaseCosts || '0') + parseFloat(sellingCosts || '0') + parseFloat(improvementCosts || '0')) / parseFloat(purchasePrice || '1') * 100).toFixed(1)}% of purchase price</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Property Investment Analysis', text: `Net Profit: ${currencySymbol}${profit.toFixed(2)} (${roi.toFixed(2)}% ROI)` })}
              className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PropertyProfitCalculator;