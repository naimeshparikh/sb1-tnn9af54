import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calculator, DollarSign, PiggyBank, Heart, GraduationCap } from 'lucide-react';

const Homepage: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuicknCalc",
    "url": "https://quickncalc.com",
    "logo": "https://quickncalc.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/QuicknCalc",
      "https://www.linkedin.com/company/QuicknCalc",
      "https://twitter.com/QuicknCalc"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QuicknCalc",
    "url": "https://quickncalc.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://quickncalc.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
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

  const educationCalculators = [
    { name: 'Grade Calculator', path: '/grade', description: 'Calculate final grades with assignments and weights' },
    { name: 'GPA Calculator', path: '/gpa', description: 'Calculate your GPA on 4.0 or 5.0 scale' },
    { name: 'Percentage Calculator', path: '/percentage', description: 'Calculate percentage increase, decrease, and more' },
    { name: 'Weighted Average Calculator', path: '/weighted-average', description: 'Calculate weighted averages for any data set' },
    { name: 'Exam Timer Tool', path: '/exam-timer', description: 'Time your exams with countdown and alerts' },
  ];

  return (
    <>
      <Helmet>
        <title>QuicknCalc - Free Online Calculator Tools for Finance, Health & Education</title>
        <meta name="description" content="Free online calculators for finance, health, and education. Calculate EMI, BMI, GPA, compound interest, mortgage payments, and more with QuicknCalc." />
        <link rel="canonical" href="https://quickncalc.com" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Welcome to QuicknCalc</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            QuicknCalc provides free, easy-to-use online calculators for finance, health, and education.
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

        {/* Education & Student Tools */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Education & Student Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationCalculators.map((calc) => (
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
              Absolutely! Our calculators support multiple currencies and grading systems, designed to work globally. 
              Financial and educational calculations adapt to different systems and standards.
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
    </>
  );
};

export default Homepage;