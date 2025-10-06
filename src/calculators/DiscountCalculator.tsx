import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<string>('100');
  const [discountPercent, setDiscountPercent] = useState<string>('20');
  const [currency, setCurrency] = useState<string>('USD');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (price > 0 && discount >= 0) {
      const discountAmt = (price * discount) / 100;
      const final = price - discountAmt;
      
      setDiscountAmount(discountAmt);
      setFinalPrice(final);
      setSavings(discountAmt);
    }
  };

  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountPercent]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const seo = {
    title: "Discount Calculator – Calculate Discounts & Sale Prices Easily",
    description:
      "Find discounted prices fast with this simple discount calculator. Calculate percentage off, final sale price, and total savings instantly.",
    keywords:
      "discount calculator, sale price calculator, percentage off calculator, savings calculator, price discount tool",
    canonical: "https://quickncalc.com/discount/",
  };
  
  const relatedTools = [
    { name: 'GST / VAT Calculator', path: '/gst-vat', description: 'Calculate tax amounts' },
    { name: 'Currency Converter', path: '/currency', description: 'Convert between currencies' },
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'Calculate compound interest' },
    { name: 'Savings Goal Calculator', path: '/savings-goal', description: 'Plan your savings goals' },
  ];

  const faqs = [
    {
      question: 'How do I calculate percentage discount?',
      answer: 'To calculate percentage discount, multiply the original price by the discount percentage and divide by 100. Then subtract this amount from the original price.',
    },
    {
      question: 'What is the difference between discount amount and final price?',
      answer: 'Discount amount is how much money you save, while final price is what you actually pay after the discount is applied.',
    },
    {
      question: 'Can I calculate multiple discounts?',
      answer: 'For multiple discounts, apply them sequentially. For example, if you have 20% off then additional 10% off, apply 20% first, then 10% on the reduced price.',
    },
    {
      question: 'How do I compare different discount offers?',
      answer: 'Calculate the final price for each offer and compare. Sometimes a higher percentage discount on a higher original price may not be the best deal.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Percentage Discount Calculator"
      description="Calculate discounts and savings on any purchase. Find out how much you save with percentage discounts and determine final prices after discounts."
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
              Original Price ({currencySymbol})
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="20"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[10, 15, 20, 25, 30, 50].map((discount) => (
                <button
                  key={discount}
                  onClick={() => setDiscountPercent(discount.toString())}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {discount}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Discount Calculation</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Original Price:</span>
                <span className="font-medium">
                  {currencySymbol}{parseFloat(originalPrice || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount ({discountPercent}%):</span>
                <span className="font-medium text-red-600">
                  -{currencySymbol}{discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600 font-semibold">Final Price:</span>
                <span className="font-bold text-lg text-green-600">
                  {currencySymbol}{finalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="bg-green-100 p-3 rounded-md text-center">
                <span className="text-green-800 font-semibold">
                  You Save: {currencySymbol}{savings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
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
              onClick={() => navigator.share?.({ title: 'Discount Calculation', text: `You save ${currencySymbol}${savings.toFixed(2)} (${discountPercent}% off)` })}
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

export default DiscountCalculator;