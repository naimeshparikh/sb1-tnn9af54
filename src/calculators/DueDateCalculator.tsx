import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const DueDateCalculator: React.FC = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('2024-01-01');
  const [cycleLength, setCycleLength] = useState<string>('28');
  const [dueDate, setDueDate] = useState<string>('');
  const [weeksPregnant, setWeeksPregnant] = useState<number>(0);
  const [daysPregnant, setDaysPregnant] = useState<number>(0);
  const [trimester, setTrimester] = useState<string>('');
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  const calculateDueDate = () => {
    const lastPeriod = new Date(lastPeriodDate);
    const cycle = parseInt(cycleLength);

    if (lastPeriod && cycle > 0) {
      // Calculate due date (280 days from LMP)
      const due = new Date(lastPeriod);
      due.setDate(due.getDate() + 280);
      
      // Current date
      const today = new Date();
      
      // Days pregnant
      const daysPg = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
      const weeksPg = Math.floor(daysPg / 7);
      
      // Trimester calculation
      let tri = '';
      if (weeksPg < 13) tri = 'First Trimester';
      else if (weeksPg < 27) tri = 'Second Trimester';
      else tri = 'Third Trimester';
      
      // Days remaining
      const remaining = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      setDueDate(due.toISOString().split('T')[0]);
      setDaysPregnant(Math.max(0, daysPg));
      setWeeksPregnant(Math.max(0, weeksPg));
      setTrimester(tri);
      setDaysRemaining(Math.max(0, remaining));
    }
  };

  useEffect(() => {
    calculateDueDate();
  }, [lastPeriodDate, cycleLength]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const seo = {
    title: "Due Date Calculator – Estimate Pregnancy Due Date & Timeline",
    description:
      "Find your estimated due date quickly using this free pregnancy due date calculator. Calculate based on your last period or conception date.",
    keywords:
      "due date calculator, pregnancy calculator, estimated delivery date, baby due date, pregnancy timeline calculator",
    canonical: "https://quickncalc.com/due-date/",
  };
  const relatedTools = [
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
    { name: 'BMI Calculator', path: '/bmi', description: 'Calculate body mass index' },
    { name: 'Calorie Calculator', path: '/calorie', description: 'Calculate daily calorie needs' },
    { name: 'Body Fat Calculator', path: '/body-fat', description: 'Estimate body fat percentage' },
  ];

  const faqs = [
    {
      question: 'How accurate is the due date calculator?',
      answer: 'Due date calculators provide an estimate. Only about 5% of babies are born on their exact due date. Most babies arrive within 2 weeks before or after the estimated date.',
    },
    {
      question: 'What if I don\'t remember my last menstrual period?',
      answer: 'If you don\'t remember your LMP, your doctor can estimate your due date using an early ultrasound, which is most accurate when done in the first trimester.',
    },
    {
      question: 'How is the due date calculated?',
      answer: 'The due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period. This is based on a 28-day cycle with ovulation on day 14.',
    },
    {
      question: 'What are the different trimesters?',
      answer: 'First trimester: weeks 1-12, Second trimester: weeks 13-26, Third trimester: weeks 27-40. Each trimester has different developmental milestones and symptoms.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Pregnancy Due Date Calculator"
      description="Calculate your baby's due date and track your pregnancy progress. Find out which trimester you're in and how many weeks pregnant you are."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Day of Last Menstrual Period
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Cycle Length (days)
            </label>
            <select
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="21">21 days</option>
              <option value="22">22 days</option>
              <option value="23">23 days</option>
              <option value="24">24 days</option>
              <option value="25">25 days</option>
              <option value="26">26 days</option>
              <option value="27">27 days</option>
              <option value="28">28 days (average)</option>
              <option value="29">29 days</option>
              <option value="30">30 days</option>
              <option value="31">31 days</option>
              <option value="32">32 days</option>
              <option value="33">33 days</option>
              <option value="34">34 days</option>
              <option value="35">35 days</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Most women have cycles between 21-35 days</p>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-pink-800 mb-2">📱 Important Note</h4>
            <p className="text-sm text-pink-700">
              This calculator provides an estimate only. For accurate pregnancy dating and care, 
              please consult with your healthcare provider and consider an early ultrasound.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pregnancy Information</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Estimated Due Date</div>
                <div className="text-xl font-bold text-pink-600">
                  {dueDate ? formatDate(dueDate) : 'Enter your LMP date'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{weeksPregnant}</div>
                  <div className="text-sm text-gray-600">Weeks Pregnant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{daysPregnant}</div>
                  <div className="text-sm text-gray-600">Days Pregnant</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Pregnancy Timeline</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current Trimester:</span>
                <span className="font-medium">{trimester}</span>
              </div>
              <div className="flex justify-between">
                <span>Days Remaining:</span>
                <span className="font-medium">{daysRemaining} days</span>
              </div>
              <div className="flex justify-between">
                <span>Weeks Remaining:</span>
                <span className="font-medium">{Math.ceil(daysRemaining / 7)} weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Progress:</span>
                <span className="font-medium">{((weeksPregnant / 40) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Pregnancy Milestones</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>1st Trimester:</span>
                <span className={weeksPregnant >= 12 ? 'text-green-600' : 'text-gray-500'}>
                  {weeksPregnant >= 12 ? '✓ Complete' : 'Weeks 1-12'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>2nd Trimester:</span>
                <span className={weeksPregnant >= 26 ? 'text-green-600' : weeksPregnant >= 13 ? 'text-blue-600' : 'text-gray-500'}>
                  {weeksPregnant >= 26 ? '✓ Complete' : weeksPregnant >= 13 ? 'In Progress' : 'Weeks 13-26'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>3rd Trimester:</span>
                <span className={weeksPregnant >= 27 ? 'text-blue-600' : 'text-gray-500'}>
                  {weeksPregnant >= 27 ? 'In Progress' : 'Weeks 27-40'}
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
              onClick={() => navigator.share?.({ title: 'Pregnancy Due Date', text: `Due Date: ${formatDate(dueDate)} (${weeksPregnant} weeks pregnant)` })}
              className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default DueDateCalculator;