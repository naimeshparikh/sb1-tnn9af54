import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const exchangeRates: { [key: string]: number } = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.73,
    'JPY': 110,
    'CAD': 1.25,
    'AUD': 1.35,
    'CHF': 0.92,
    'CNY': 6.45,
    'INR': 74,
    'BRL': 5.20,
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  ];

  const convertCurrency = () => {
    const amt = parseFloat(amount);
    if (amt > 0) {
      const fromRate = exchangeRates[fromCurrency] || 1;
      const toRate = exchangeRates[toCurrency] || 1;
      const rate = toRate / fromRate;
      const converted = amt * rate;
      
      setExchangeRate(rate);
      setConvertedAmount(converted);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const fromCurrencyInfo = currencies.find(c => c.code === fromCurrency);
  const toCurrencyInfo = currencies.find(c => c.code === toCurrency);

  const seo = {
    title: 'Currency Converter - Convert Between World Currencies | QuicknCalc',
    description: 'Free currency converter supporting major world currencies. Convert USD, EUR, GBP, JPY and more with real-time exchange rates.',
    keywords: 'currency converter, exchange rate calculator, USD to EUR, currency exchange, foreign exchange calculator',
    canonical: 'https://quickncalc.com/currency/',
  };

  const relatedTools = [
    { name: 'Discount Calculator', path: '/discount', description: 'Calculate discounts and savings' },
    { name: 'GST / VAT Calculator', path: '/gst-vat', description: 'Calculate tax amounts' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
    { name: 'Savings Goal Calculator', path: '/savings-goal', description: 'Plan savings goals' },
  ];

  const faqs = [
    {
      question: 'How often are exchange rates updated?',
      answer: 'In real applications, exchange rates are updated multiple times throughout the day. This demo uses fixed rates for illustration purposes.',
    },
    {
      question: 'Are these rates suitable for actual transactions?',
      answer: 'No, these are demonstration rates. For actual transactions, always check with your bank or financial institution for current rates and fees.',
    },
    {
      question: 'Do banks charge fees for currency conversion?',
      answer: 'Yes, most banks and financial institutions charge fees for currency conversion, which can range from 1-4% of the transaction amount.',
    },
    {
      question: 'What affects exchange rates?',
      answer: 'Exchange rates fluctuate based on economic factors like inflation, interest rates, political stability, trade balances, and market speculation.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Currency Converter"
      description="Convert between major world currencies with our easy-to-use currency converter. Get quick conversions for travel, business, or personal finance."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Currency
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
              title="Swap currencies"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Currency
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Quick conversions:</span>
            {[1, 10, 100, 1000].map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value.toString())}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Result</h3>
            <div className="text-center space-y-4">
              <div className="text-lg">
                <span className="font-medium">{fromCurrencyInfo?.symbol}{parseFloat(amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-gray-600 mx-2">=</span>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {toCurrencyInfo?.symbol}{convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">
                {fromCurrency} to {toCurrency}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Exchange Rate Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>1 {fromCurrency} =</span>
                <span className="font-medium">{exchangeRate.toFixed(4)} {toCurrency}</span>
              </div>
              <div className="flex justify-between">
                <span>1 {toCurrency} =</span>
                <span className="font-medium">{(1 / exchangeRate).toFixed(4)} {fromCurrency}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span>Conversion:</span>
                  <span>{fromCurrency} → {toCurrency}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">📋 Disclaimer</h4>
            <p className="text-sm text-yellow-700">
              These are demonstration exchange rates and should not be used for actual financial transactions. 
              Always check current rates with your bank or financial institution.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Currency Conversion', text: `${fromCurrencyInfo?.symbol}${amount} = ${toCurrencyInfo?.symbol}${convertedAmount.toFixed(2)}` })}
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

export default CurrencyConverter;