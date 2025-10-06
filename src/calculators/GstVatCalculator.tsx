import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const GstVatCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [taxRate, setTaxRate] = useState<string>('18');
  const [calculationType, setCalculationType] = useState<'inclusive' | 'exclusive'>('exclusive');
  const [currency, setCurrency] = useState<string>('USD');
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [baseAmount, setBaseAmount] = useState<number>(0);

  const calculateTax = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(taxRate);

    if (principal > 0 && rate >= 0) {
      if (calculationType === 'exclusive') {
        const tax = (principal * rate) / 100;
        const total = principal + tax;
        setBaseAmount(principal);
        setTaxAmount(tax);
        setTotalAmount(total);
      } else {
        const base = principal / (1 + rate / 100);
        const tax = principal - base;
        setBaseAmount(base);
        setTaxAmount(tax);
        setTotalAmount(principal);
      }
    }
  };

  useEffect(() => {
    calculateTax();
  }, [amount, taxRate, calculationType]);

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
  }[currency] || '$';

  const seo = {
    title: "GST & VAT Calculator – Add or Remove Tax Instantly | QuicknCalc",
    description:
      "Easily calculate GST or VAT for your products and services. Add or remove tax amounts, view net and gross values instantly.",
    keywords:
      "gst calculator, vat calculator, tax calculator, add gst, remove gst, goods and services tax calculator, vat percentage calculator",
    canonical: "https://quickncalc.com/gst-vat/",
  };  

  const relatedTools = [
    { name: 'Percentage Discount Calculator', path: '/discount', description: 'Calculate discounts and savings' },
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'Calculate compound interest growth' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
    { name: 'Currency Converter', path: '/currency', description: 'Convert between currencies' },
  ];

  const faqs = [
    {
      question: 'What is the difference between GST and VAT?',
      answer: 'GST (Goods and Services Tax) is a comprehensive indirect tax, while VAT (Value Added Tax) is applied at each stage of production. GST has largely replaced VAT in many countries.',
    },
    {
      question: 'How do I calculate tax-inclusive vs tax-exclusive amounts?',
      answer: 'Tax-exclusive means tax is added to the base amount. Tax-inclusive means the total amount already includes tax, and you extract the tax portion from it.',
    },
    {
      question: 'What are common GST/VAT rates?',
      answer: 'Rates vary by country and product type. Common rates include 0% (exempt), 5% (essential goods), 12% (standard goods), 18% (most goods), and 28% (luxury items).',
    },
    {
      question: 'Can I use this for sales tax calculation?',
      answer: 'Yes, this calculator works for any percentage-based tax including sales tax, GST, VAT, and other indirect taxes.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="GST / VAT Calculator"
      description="Calculate GST, VAT, and sales tax amounts easily. Support for both tax-inclusive and tax-exclusive calculations with multiple currencies and custom tax rates."
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
              Calculation Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="exclusive"
                  checked={calculationType === 'exclusive'}
                  onChange={(e) => setCalculationType(e.target.value as 'exclusive')}
                  className="mr-2"
                />
                Tax Exclusive
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="inclusive"
                  checked={calculationType === 'inclusive'}
                  onChange={(e) => setCalculationType(e.target.value as 'inclusive')}
                  className="mr-2"
                />
                Tax Inclusive
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {calculationType === 'exclusive' ? 'Base Amount' : 'Total Amount'} ({currencySymbol})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="18"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[0, 5, 12, 18, 28].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setTaxRate(rate.toString())}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Calculation Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Amount:</span>
                <span className="font-medium">
                  {currencySymbol}{baseAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax Amount:</span>
                <span className="font-semibold text-lg text-red-600">
                  {currencySymbol}{taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-lg text-green-600">
                  {currencySymbol}{totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
              onClick={() => navigator.share?.({ title: 'Tax Calculation', text: `Tax Amount: ${currencySymbol}${taxAmount.toFixed(2)}` })}
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

export default GstVatCalculator;