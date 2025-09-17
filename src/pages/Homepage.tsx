import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, PiggyBank, Heart } from 'lucide-react';

const Homepage: React.FC = () => {
  const financeCalculators = [
    { name: 'Loan EMI Calculator', path: '/emi', description: 'Calculate monthly EMI for loans' },
    { name: 'GST / VAT Calculator', path: '/gst-vat', description: 'Calculate GST and VAT on purchases' },
    { name: 'Percentage Discount Calculator', path: '/discount', description: 'Calculate discounts and savings' },
    { name: 'SIP Calculator', path: '/sip', description: 'Plan your SIP investments' },
    { name: 'Investment Property Profit Calculator', path: '/property-profit', description: 'Calculate property investment returns' },
    { name: 'Compound Interest Calculator', path: '/compound-interest', description: 'See how your money grows' },
    { name: 'Mortgage Calculator', path: '/mortgage', description: 'Calculate mortgage payments' },
    { name: 'Loan Affordability Calculator', path: '/loan-affordability', description: 'Check how much you can borrow' },
    { name: 'Retirement Calculator', path: '/retirement', description: 'Plan for your retirement' },
  ];

  const savingsCalculators = [
    { name: 'Savings Goal Calculator', path: '/savings-goal', description: 'Plan to reach your savings goals' },
    { name: 'Currency Converter', path: '/currency', description: 'Convert between currencies' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age and life events' },
  ];

  const healthCalculators = [
    { name: 'Pregnancy Due Date Calculator', path: '/due-date', description: 'Calculate your due date' },
    { name: 'BMI Calculator', path: '/bmi', description: 'Calculate your body mass index' },
    { name: 'Calorie (TDEE) Calculator', path: '/calorie', description: 'Calculate daily calorie needs' },
    { name: 'Body Fat Calculator', path: '/body-fat', description: 'Estimate your body fat percentage' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Welcome to QuicknCalc</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          QuicknCalc provides free, easy-to-use online calculators for your financial, savings, and health planning. 
          Choose from the tools below:
        </p>
      </div>

      {/* Calculator Categories */}
      <div className="grid gap-12">
        {/* Finance Calculators */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Finance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeCalculators.map((calc) => (
              <Link
                key={calc.path}
                to={calc.path}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{calc.name}</h3>
                <p className="text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Savings & General Calculators */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <PiggyBank className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Savings & General</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingsCalculators.map((calc) => (
              <Link
                key={calc.path}
                to={calc.path}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{calc.name}</h3>
                <p className="text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Health & Wellness Calculators */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Health & Wellness</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthCalculators.map((calc) => (
              <Link
                key={calc.path}
                to={calc.path}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{calc.name}</h3>
                <p className="text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Are these calculators free to use?</h3>
            <p className="text-gray-600">
              Yes, all QuicknCalc calculators are completely free to use. No registration or payment required.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do they work worldwide?</h3>
            <p className="text-gray-600">
              Absolutely! Our calculators support multiple currencies and are designed to work globally. 
              Financial calculations adapt to different interest rate systems and tax structures.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate are the calculations?</h3>
            <p className="text-gray-600">
              Our calculators use industry-standard formulas and are regularly updated. However, results are 
              estimates and should not replace professional financial or medical advice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use these calculators on mobile?</h3>
            <p className="text-gray-600">
              Yes! All our calculators are fully responsive and optimized for mobile devices, tablets, and desktops.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;