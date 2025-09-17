import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const BmiCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w > 0 && h > 0) {
      let bmiValue: number;
      
      if (unit === 'metric') {
        bmiValue = w / Math.pow(h / 100, 2);
      } else {
        bmiValue = (w / Math.pow(h, 2)) * 703;
      }

      setBmi(bmiValue);

      let cat = '';
      let color = '';
      
      if (bmiValue < 18.5) {
        cat = 'Underweight';
        color = 'text-blue-600';
      } else if (bmiValue < 25) {
        cat = 'Normal weight';
        color = 'text-green-600';
      } else if (bmiValue < 30) {
        cat = 'Overweight';
        color = 'text-yellow-600';
      } else {
        cat = 'Obese';
        color = 'text-red-600';
      }

      setCategory(cat);
      setCategoryColor(color);
    }
  };

  useEffect(() => {
    calculateBmi();
  }, [weight, height, unit]);

  const seo = {
    title: 'BMI Calculator - Calculate Body Mass Index | QuicknCalc',
    description: 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with metric and imperial units. Check if your weight is healthy for your height.',
    keywords: 'BMI calculator, body mass index, BMI chart, healthy weight, weight calculator, obesity calculator',
    canonical: 'https://quickncalc.com/bmi/',
  };

  const relatedTools = [
    { name: 'Calorie Calculator', path: '/calorie', description: 'Calculate daily calorie needs' },
    { name: 'Body Fat Calculator', path: '/body-fat', description: 'Estimate body fat percentage' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
    { name: 'Pregnancy Due Date Calculator', path: '/due-date', description: 'Calculate pregnancy due date' },
  ];

  const faqs = [
    {
      question: 'What is BMI?',
      answer: 'BMI (Body Mass Index) is a measure that uses height and weight to determine if your weight is healthy. It\'s calculated by dividing weight in kilograms by height in meters squared.',
    },
    {
      question: 'What are the BMI categories?',
      answer: 'BMI categories are: Underweight (below 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), and Obese (30 and above).',
    },
    {
      question: 'Is BMI accurate for everyone?',
      answer: 'BMI is a useful screening tool but doesn\'t directly measure body fat. It may not be accurate for athletes with high muscle mass or elderly people with low muscle mass.',
    },
    {
      question: 'Should I be concerned about my BMI?',
      answer: 'BMI is just one indicator of health. Consult with a healthcare professional for personalized advice about your weight and overall health.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to determine if your weight is in a healthy range. Easy-to-use calculator with both metric and imperial units."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit System
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="metric"
                  checked={unit === 'metric'}
                  onChange={(e) => setUnit(e.target.value as 'metric')}
                  className="mr-2"
                />
                Metric (kg, cm)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="imperial"
                  checked={unit === 'imperial'}
                  onChange={(e) => setUnit(e.target.value as 'imperial')}
                  className="mr-2"
                />
                Imperial (lbs, inches)
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={unit === 'metric' ? '70' : '154'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={unit === 'metric' ? '170' : '67'}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">BMI Results</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {bmi.toFixed(1)}
                </div>
                <div className={`text-lg font-semibold ${categoryColor}`}>
                  {category}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">BMI Categories</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Underweight</span>
                <span className="text-blue-600">Below 18.5</span>
              </div>
              <div className="flex justify-between">
                <span>Normal weight</span>
                <span className="text-green-600">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between">
                <span>Overweight</span>
                <span className="text-yellow-600">25.0 - 29.9</span>
              </div>
              <div className="flex justify-between">
                <span>Obese</span>
                <span className="text-red-600">30.0 and above</span>
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
              onClick={() => navigator.share?.({ title: 'BMI Calculation', text: `BMI: ${bmi.toFixed(1)} (${category})` })}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default BmiCalculator;