import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);

  const calculateCalories = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseFloat(age);
    const activity = parseFloat(activityLevel);

    if (w > 0 && h > 0 && a > 0) {
      // Convert imperial to metric if needed
      if (unit === 'imperial') {
        w = w * 0.453592; // lbs to kg
        h = h * 2.54; // inches to cm
      }

      // Calculate BMR using Mifflin-St Jeor Equation
      let bmrValue: number;
      if (gender === 'male') {
        bmrValue = (10 * w) + (6.25 * h) - (5 * a) + 5;
      } else {
        bmrValue = (10 * w) + (6.25 * h) - (5 * a) - 161;
      }

      // Calculate TDEE
      const tdeeValue = bmrValue * activity;

      setBmr(bmrValue);
      setTdee(tdeeValue);
    }
  };

  useEffect(() => {
    calculateCalories();
  }, [age, gender, weight, height, activityLevel, unit]);

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little/no exercise)' },
    { value: '1.375', label: 'Light activity (light exercise 1-3 days/week)' },
    { value: '1.55', label: 'Moderate activity (moderate exercise 3-5 days/week)' },
    { value: '1.725', label: 'High activity (hard exercise 6-7 days/week)' },
    { value: '1.9', label: 'Very high activity (very hard exercise, physical job)' },
  ];

  const goals = [
    { name: 'Weight Loss (1 lb/week)', calories: tdee - 500, description: '500 cal deficit' },
    { name: 'Weight Loss (2 lbs/week)', calories: tdee - 1000, description: '1000 cal deficit' },
    { name: 'Maintain Weight', calories: tdee, description: 'No deficit/surplus' },
    { name: 'Weight Gain (1 lb/week)', calories: tdee + 500, description: '500 cal surplus' },
    { name: 'Weight Gain (2 lbs/week)', calories: tdee + 1000, description: '1000 cal surplus' },
  ];

  const seo = {
    title: "Calorie Calculator – Daily Calorie Needs & Weight Goal Planner",
    description:
      "Calculate how many calories you need daily to maintain, lose, or gain weight. Free calorie calculator with BMR and TDEE results.",
    keywords:
      "calorie calculator, daily calorie needs, BMR calculator, TDEE calculator, calorie intake calculator, weight loss calorie calculator",
    canonical: "https://quickncalc.com/calorie/",
  };

  const relatedTools = [
    { name: 'BMI Calculator', path: '/bmi', description: 'Calculate body mass index' },
    { name: 'Body Fat Calculator', path: '/body-fat', description: 'Estimate body fat percentage' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
    { name: 'Pregnancy Due Date Calculator', path: '/due-date', description: 'Calculate pregnancy due date' },
  ];

  const faqs = [
    {
      question: 'What is TDEE?',
      answer: 'TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, including your basal metabolic rate (BMR) plus calories burned through physical activity.',
    },
    {
      question: 'What is BMR?',
      answer: 'BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic physiological functions like breathing, circulation, and cell production while at rest.',
    },
    {
      question: 'How accurate are these calculations?',
      answer: 'These calculations provide a good starting point, but individual metabolisms can vary. Monitor your progress and adjust calorie intake as needed based on your results.',
    },
    {
      question: 'How much of a calorie deficit is safe for weight loss?',
      answer: 'A deficit of 500-1000 calories per day is generally considered safe for weight loss of 1-2 pounds per week. Very low calorie diets should be supervised by healthcare professionals.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Calorie (TDEE) Calculator"
      description="Calculate your daily calorie needs based on your age, gender, weight, height, and activity level. Find the right calorie intake for your fitness goals."
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
                Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={unit === 'metric' ? '175' : '69'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calorie Calculation</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">BMR (Base Metabolism):</span>
                <span className="font-medium">
                  {Math.round(bmr).toLocaleString()} calories/day
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600 font-semibold">TDEE (Total Daily):</span>
                <span className="font-bold text-lg text-orange-600">
                  {Math.round(tdee).toLocaleString()} calories/day
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Calorie Goals</h4>
            <div className="space-y-3 text-sm">
              {goals.map((goal, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{goal.name}</div>
                    <div className="text-gray-500 text-xs">{goal.description}</div>
                  </div>
                  <span className={`font-medium px-2 py-1 rounded text-xs ${
                    goal.calories < tdee ? 'bg-blue-100 text-blue-800' :
                    goal.calories === tdee ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {Math.round(Math.max(1200, goal.calories)).toLocaleString()} cal
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Never go below 1200 calories/day without medical supervision</li>
              <li>• These are estimates - adjust based on your progress</li>
              <li>• Consult healthcare providers for personalized advice</li>
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
              onClick={() => navigator.share?.({ title: 'Calorie Calculation', text: `Daily calorie needs: ${Math.round(tdee)} calories (BMR: ${Math.round(bmr)})` })}
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

export default CalorieCalculator;