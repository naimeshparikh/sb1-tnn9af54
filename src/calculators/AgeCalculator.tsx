import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1990-01-01');
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
  }>({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
    totalWeeks: 0,
    totalMonths: 0,
  });

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth <= current) {
      let years = current.getFullYear() - birth.getFullYear();
      let months = current.getMonth() - birth.getMonth();
      let days = current.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      const totalDays = Math.floor((current.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalMonths = years * 12 + months;

      setAge({
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths,
      });
    }
  };

  useEffect(() => {
    calculateAge();
  }, [birthDate, currentDate]);

  const seo = {
    title: "Age Calculator – Calculate Your Exact Age in Years, Months, Days",
    description:
      "Find your exact age in years, months, days, and even hours with this simple age calculator. Perfect for birthdays or official forms.",
    keywords:
      "age calculator, calculate age, date of birth calculator, birthday calculator, how old am I calculator",
    canonical: "https://quickncalc.com/age/",
  };

  const relatedTools = [
    { name: 'Pregnancy Due Date Calculator', path: '/due-date', description: 'Calculate pregnancy due date' },
    { name: 'Currency Converter', path: '/currency', description: 'Convert between currencies' },
    { name: 'BMI Calculator', path: '/bmi', description: 'Calculate body mass index' },
    { name: 'Savings Goal Calculator', path: '/savings-goal', description: 'Plan your savings goals' },
  ];

  const faqs = [
    {
      question: 'How is age calculated exactly?',
      answer: 'Age is calculated by finding the difference between the birth date and current date, accounting for leap years and varying month lengths for precise results.',
    },
    {
      question: 'Why is my age different in days vs years?',
      answer: 'Years can be 365 or 366 days (leap years), and months have different numbers of days. The calculator accounts for these variations to give exact results.',
    },
    {
      question: 'Can I calculate age for future dates?',
      answer: 'Yes, you can set the current date to any future date to see how old you will be at that time, useful for planning or milestone calculations.',
    },
    {
      question: 'What if I was born in a leap year?',
      answer: 'The calculator automatically accounts for leap years, ensuring accurate age calculations regardless of whether you were born in a leap year.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days. Find out how many days you've been alive, how many weeks have passed, and other interesting age statistics."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculate Age On
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setCurrentDate(new Date().toISOString().split('T')[0])}
              className="mt-2 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
            >
              Use Today's Date
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Calculation</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{age.years}</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{age.months}</div>
                <div className="text-sm text-gray-600">Months</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{age.days}</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Detailed Age Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Days:</span>
                <span className="font-medium">{age.totalDays.toLocaleString()} days</span>
              </div>
              <div className="flex justify-between">
                <span>Total Weeks:</span>
                <span className="font-medium">{age.totalWeeks.toLocaleString()} weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Total Months:</span>
                <span className="font-medium">{age.totalMonths} months</span>
              </div>
              <div className="flex justify-between">
                <span>Total Hours:</span>
                <span className="font-medium">{(age.totalDays * 24).toLocaleString()} hours</span>
              </div>
              <div className="flex justify-between">
                <span>Total Minutes:</span>
                <span className="font-medium">{(age.totalDays * 24 * 60).toLocaleString()} minutes</span>
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
              onClick={() => navigator.share?.({ title: 'Age Calculation', text: `Age: ${age.years} years, ${age.months} months, ${age.days} days` })}
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

export default AgeCalculator;