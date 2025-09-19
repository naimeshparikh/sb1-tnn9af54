import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const PercentageCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'basic' | 'increase' | 'decrease' | 'change'>('basic');
  
  // Basic percentage calculation
  const [number, setNumber] = useState<string>('50');
  const [percentage, setPercentage] = useState<string>('20');
  const [basicResult, setBasicResult] = useState<number>(0);
  
  // Percentage increase/decrease
  const [originalValue, setOriginalValue] = useState<string>('100');
  const [newValue, setNewValue] = useState<string>('120');
  const [changeResult, setChangeResult] = useState<number>(0);
  
  // Percentage change calculation
  const [value1, setValue1] = useState<string>('80');
  const [value2, setValue2] = useState<string>('100');
  const [percentageChange, setPercentageChange] = useState<number>(0);

  const calculateBasic = () => {
    const num = parseFloat(number);
    const perc = parseFloat(percentage);
    if (!isNaN(num) && !isNaN(perc)) {
      setBasicResult((num * perc) / 100);
    }
  };

  const calculateChange = () => {
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(original) && !isNaN(newVal) && original !== 0) {
      const change = ((newVal - original) / original) * 100;
      setChangeResult(change);
    }
  };

  const calculatePercentageChange = () => {
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);
    if (!isNaN(val1) && !isNaN(val2) && val1 !== 0) {
      const change = ((val2 - val1) / val1) * 100;
      setPercentageChange(change);
    }
  };

  useEffect(() => {
    calculateBasic();
  }, [number, percentage]);

  useEffect(() => {
    calculateChange();
  }, [originalValue, newValue]);

  useEffect(() => {
    calculatePercentageChange();
  }, [value1, value2]);

  const seo = {
    title: 'Percentage Calculator - Calculate Percentage Increase, Decrease & More | QuicknCalc',
    description: 'Free percentage calculator for all your percentage needs. Calculate percentage of a number, percentage increase, decrease, and percentage change with instant results.',
    keywords: 'percentage calculator, percent calculator, percentage increase, percentage decrease, percentage change, percent of number, math calculator',
    canonical: 'https://quickncalc.com/percentage/',
  };

  const relatedTools = [
    { name: 'Grade Calculator', path: '/grade', description: 'Calculate final grades with weights' },
    { name: 'Discount Calculator', path: '/discount', description: 'Calculate discounts and savings' },
    { name: 'GST / VAT Calculator', path: '/gst-vat', description: 'Calculate tax amounts' },
    { name: 'Weighted Average Calculator', path: '/weighted-average', description: 'Calculate weighted averages' },
  ];

  const faqs = [
    {
      question: 'How do you calculate percentage of a number?',
      answer: 'To find a percentage of a number, multiply the number by the percentage and divide by 100. For example, 20% of 50 = (50 × 20) ÷ 100 = 10.',
    },
    {
      question: 'What\'s the difference between percentage increase and decrease?',
      answer: 'Percentage increase shows how much a value has grown, while percentage decrease shows how much it has shrunk. Both use the formula: ((New Value - Original Value) / Original Value) × 100.',
    },
    {
      question: 'How do you calculate percentage change?',
      answer: 'Percentage change = ((New Value - Old Value) / Old Value) × 100. A positive result indicates an increase, while a negative result indicates a decrease.',
    },
    {
      question: 'Can percentage change be negative?',
      answer: 'Yes! A negative percentage change indicates a decrease. For example, if a price drops from $100 to $80, the percentage change is -20%.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Percentage Calculator"
      description="Calculate percentages easily with our comprehensive percentage calculator. Find percentage of numbers, calculate increases, decreases, and percentage changes."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setCalculationType('basic')}
            className={`px-4 py-2 rounded-md transition-colors ${
              calculationType === 'basic' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Percentage of Number
          </button>
          <button
            onClick={() => setCalculationType('change')}
            className={`px-4 py-2 rounded-md transition-colors ${
              calculationType === 'change' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Percentage Change
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {calculationType === 'basic' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">What is X% of Y?</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Of Number
                  </label>
                  <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50"
                  />
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg text-gray-600">
                    {percentage}% of {number} =
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {basicResult.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            )}

            {calculationType === 'change' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Percentage Change</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Value
                  </label>
                  <input
                    type="number"
                    value={originalValue}
                    onChange={(e) => setOriginalValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Value
                  </label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="120"
                  />
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg text-gray-600">
                    Change from {originalValue} to {newValue}
                  </div>
                  <div className={`text-3xl font-bold ${changeResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {changeResult >= 0 ? '+' : ''}{changeResult.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {changeResult >= 0 ? 'Increase' : 'Decrease'} of {Math.abs(parseFloat(newValue) - parseFloat(originalValue)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Quick Examples</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                {calculationType === 'basic' ? (
                  <>
                    <div>• 25% of 200 = 50</div>
                    <div>• 15% of 80 = 12</div>
                    <div>• 75% of 120 = 90</div>
                  </>
                ) : (
                  <>
                    <div>• From 100 to 120 = +20% increase</div>
                    <div>• From 200 to 150 = -25% decrease</div>
                    <div>• From 50 to 75 = +50% increase</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Common Percentage Calculations</h4>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-2 font-medium text-gray-700 border-b pb-2">
                  <span>Percentage</span>
                  <span>Of 100</span>
                  <span>Of 200</span>
                </div>
                {[10, 15, 20, 25, 30, 50, 75].map(perc => (
                  <div key={perc} className="grid grid-cols-3 gap-2">
                    <span>{perc}%</span>
                    <span>{perc}</span>
                    <span>{perc * 2}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Percentage Formulas</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Percentage of a number:</strong>
                  <div className="text-gray-600 mt-1">(Number × Percentage) ÷ 100</div>
                </div>
                <div>
                  <strong>Percentage change:</strong>
                  <div className="text-gray-600 mt-1">((New - Old) ÷ Old) × 100</div>
                </div>
                <div>
                  <strong>Find what % X is of Y:</strong>
                  <div className="text-gray-600 mt-1">(X ÷ Y) × 100</div>
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
                onClick={() => {
                  const result = calculationType === 'basic' 
                    ? `${percentage}% of ${number} = ${basicResult.toFixed(2)}`
                    : `Change: ${changeResult >= 0 ? '+' : ''}${changeResult.toFixed(2)}%`;
                  navigator.share?.({ title: 'Percentage Calculation', text: result });
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Share Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PercentageCalculator;