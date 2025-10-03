import React from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Calculator, Heart, Shield, Smartphone } from 'lucide-react';

const AboutPage: React.FC = () => {
  const seo = {
    title: 'About Us - QuicknCalc Free Online Calculators',
    description: 'QuicknCalc provides free online financial and personal calculators designed to simplify everyday planning and decision-making. Free, accurate, and mobile-friendly tools.',
    keywords: 'about QuicknCalc, free calculators, financial calculators, health calculators, education calculators, online tools',
    canonical: 'https://quickncalc.com/about/',
  };

  const relatedTools = [
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
    { name: 'BMI Calculator', path: '/bmi', description: 'Calculate body mass index' },
    { name: 'Grade Calculator', path: '/grade', description: 'Calculate final grades' },
    { name: 'All Calculators', path: '/', description: 'View all available calculators' },
  ];

  const faqs = [
    {
      question: 'What is QuicknCalc?',
      answer: 'QuicknCalc is a free online platform providing calculators for finance, health, and education to help you make informed decisions quickly and easily.',
    },
    {
      question: 'Are the calculators really free?',
      answer: 'Yes, all our calculators are completely free to use. No registration, no hidden fees, no premium features - everything is available to everyone.',
    },
    {
      question: 'How accurate are the calculations?',
      answer: 'Our calculators use industry-standard formulas and are regularly updated. However, results are estimates and should not replace professional advice.',
    },
    {
      question: 'Can I use these calculators on mobile?',
      answer: 'Absolutely! All our calculators are fully responsive and optimized for mobile devices, tablets, and desktops.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="About Us"
      description="Learn about QuicknCalc's mission to provide free, accurate, and mobile-friendly calculators for everyone."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Calculator className="h-16 w-16 text-blue-600" />
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            QuicknCalc provides free online financial and personal calculators designed to simplify everyday planning and decision-making. Our mission is to make tools that are free, accurate, and mobile-friendly so anyone can make smarter choices with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Heart className="h-12 w-12 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Free for Everyone</h3>
            <p className="text-gray-600">
              All our calculators are completely free to use. No registration required, no hidden fees, no premium features.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Accurate Results</h3>
            <p className="text-gray-600">
              We use industry-standard formulas and regularly update our calculators to ensure reliable and precise calculations.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Smartphone className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Mobile-Friendly</h3>
            <p className="text-gray-600">
              All calculators are fully responsive and optimized for mobile devices, tablets, and desktops.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Calculator Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-2">Finance</h4>
              <p className="text-gray-600">
                EMI calculators, mortgage calculators, compound interest, SIP planning, and investment tools to help manage your finances.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-2">Health</h4>
              <p className="text-gray-600">
                BMI calculators, calorie calculators, pregnancy due date, and body fat calculators for health and wellness planning.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-600 mb-2">Education</h4>
              <p className="text-gray-600">
                Grade calculators, GPA calculators, percentage calculators, and exam timers for students and educators.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-yellow-700">
            Our calculators provide estimates based on the information you enter. Results should not be considered as professional financial, medical, or educational advice. Always consult with qualified professionals for important decisions.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default AboutPage;