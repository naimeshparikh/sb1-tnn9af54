import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('30');
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [neck, setNeck] = useState<string>('37');
  const [waist, setWaist] = useState<string>('85');
  const [hip, setHip] = useState<string>('95');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bodyFatPercent, setBodyFatPercent] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');

  const calculateBodyFat = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    let n = parseFloat(neck);
    let wa = parseFloat(waist);
    let hi = parseFloat(hip);

    if (w > 0 && h > 0 && n > 0 && wa > 0) {
      // Convert imperial to metric if needed
      if (unit === 'imperial') {
        w = w * 0.453592; // lbs to kg
        h = h * 2.54; // inches to cm
        n = n * 2.54; // inches to cm
        wa = wa * 2.54; // inches to cm
        hi = hi * 2.54; // inches to cm
      }

      let bodyFat: number;

      // US Navy Method
      if (gender === 'male') {
        bodyFat = 86.010 * Math.log10(wa - n) - 70.041 * Math.log10(h) + 36.76;
      } else {
        if (hi > 0) {
          bodyFat = 163.205 * Math.log10(wa + hi - n) - 97.684 * Math.log10(h) - 78.387;
        } else {
          bodyFat = 0;
        }
      }

      bodyFat = Math.max(0, Math.min(50, bodyFat));
      setBodyFatPercent(bodyFat);

      // Determine category
      let cat = '';
      let color = '';
      const a = parseFloat(age);

      if (gender === 'male') {
        if (bodyFat < 6) {
          cat = 'Essential Fat';
          color = 'text-blue-600';
        } else if (bodyFat < 14) {
          cat = 'Athletes';
          color = 'text-green-600';
        } else if (bodyFat < 18) {
          cat = 'Fitness';
          color = 'text-green-500';
        } else if (bodyFat < 25) {
          cat = 'Average';
          color = 'text-yellow-600';
        } else {
          cat = 'Obese';
          color = 'text-red-600';
        }
      } else {
        if (bodyFat < 14) {
          cat = 'Essential Fat';
          color = 'text-blue-600';
        } else if (bodyFat < 21) {
          cat = 'Athletes';
          color = 'text-green-600';
        } else if (bodyFat < 25) {
          cat = 'Fitness';
          color = 'text-green-500';
        } else if (bodyFat < 32) {
          cat = 'Average';
          color = 'text-yellow-600';
        } else {
          cat = 'Obese';
          color = 'text-red-600';
        }
      }

      setCategory(cat);
      setCategoryColor(color);
    }
  };

  useEffect(() => {
    calculateBodyFat();
  }, [gender, age, weight, height, neck, waist, hip, unit]);

  const seo = {
    title: "Body Fat Calculator – Estimate Body Fat % Using Measurements",
    description:
      "Estimate your body fat percentage using waist, neck, and height measurements. Free body fat calculator for men and women with health category results.",
    keywords:
      "body fat calculator, body fat percentage calculator, fat estimator, lean body mass calculator, fitness calculator",
    canonical: "https://quickncalc.com/body-fat/",
  };
  const relatedTools = [
    { name: 'BMI Calculator', path: '/bmi', description: 'Calculate body mass index' },
    { name: 'Calorie Calculator', path: '/calorie', description: 'Calculate daily calorie needs' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
    { name: 'Pregnancy Due Date Calculator', path: '/due-date', description: 'Calculate pregnancy due date' },
  ];

  const faqs = [
    {
      question: 'How accurate is the US Navy body fat method?',
      answer: 'The US Navy method is reasonably accurate for most people, with an error margin of about 3-4%. It\'s less accurate for very muscular or very lean individuals.',
    },
    {
      question: 'How should I measure my body parts?',
      answer: 'Use a flexible tape measure. Neck: just below the larynx, Waist: at the narrowest point (men) or at the navel (women), Hips: at the widest point (women only).',
    },
    {
      question: 'What are healthy body fat ranges?',
      answer: 'For men: 6-24% is generally healthy. For women: 16-30% is generally healthy. Athletes typically have lower ranges, while essential fat minimums are ~3% (men) and ~10% (women).',
    },
    {
      question: 'Is body fat percentage better than BMI?',
      answer: 'Body fat percentage can be more informative than BMI because it accounts for muscle mass. BMI may classify muscular individuals as overweight when they actually have healthy body compositions.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Body Fat Calculator"
      description="Estimate your body fat percentage using the US Navy method. Get detailed analysis with health categories and recommendations based on your measurements."
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={unit === 'metric' ? '175' : '69'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Neck Circumference ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              step="0.1"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={unit === 'metric' ? '37' : '14.5'}
            />
            <p className="text-xs text-gray-500 mt-1">Measure just below the larynx (Adam's apple)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waist Circumference ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              step="0.1"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={unit === 'metric' ? '85' : '33.5'}
            />
            <p className="text-xs text-gray-500 mt-1">
              {gender === 'male' ? 'Measure at the narrowest point' : 'Measure at the navel level'}
            </p>
          </div>

          {gender === 'female' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hip Circumference ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                step="0.1"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={unit === 'metric' ? '95' : '37.5'}
              />
              <p className="text-xs text-gray-500 mt-1">Measure at the widest point</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Fat Analysis</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {bodyFatPercent.toFixed(1)}%
                </div>
                <div className={`text-lg font-semibold ${categoryColor}`}>
                  {category}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">{gender === 'male' ? 'Male' : 'Female'} Body Fat Categories</h4>
            <div className="space-y-2 text-sm">
              {gender === 'male' ? (
                <>
                  <div className="flex justify-between">
                    <span>Essential Fat</span>
                    <span className="text-blue-600">2-5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Athletes</span>
                    <span className="text-green-600">6-13%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fitness</span>
                    <span className="text-green-500">14-17%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average</span>
                    <span className="text-yellow-600">18-24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Obese</span>
                    <span className="text-red-600">25%+</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>Essential Fat</span>
                    <span className="text-blue-600">10-13%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Athletes</span>
                    <span className="text-green-600">14-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fitness</span>
                    <span className="text-green-500">21-24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average</span>
                    <span className="text-yellow-600">25-31%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Obese</span>
                    <span className="text-red-600">32%+</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">📏 Measurement Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Measure in the morning before eating</li>
              <li>• Use a flexible, non-stretching tape measure</li>
              <li>• Keep the tape parallel to the floor</li>
              <li>• Don't pull the tape too tight or too loose</li>
              <li>• Take measurements 2-3 times for accuracy</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
            <button
              onClick={() => navigator.share?.({ title: 'Body Fat Calculation', text: `Body Fat: ${bodyFatPercent.toFixed(1)}% (${category})` })}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;