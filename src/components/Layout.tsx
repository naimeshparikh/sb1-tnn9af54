import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">QuicknCalc</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/emi" className="text-gray-600 hover:text-blue-600 transition-colors">Finance</Link>
              <Link to="/grade" className="text-gray-600 hover:text-blue-600 transition-colors">Education</Link>
              <Link to="/bmi" className="text-gray-600 hover:text-blue-600 transition-colors">Health</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6" />
                <span className="text-lg font-bold">QuicknCalc</span>
              </div>
              <p className="text-gray-400">Free online calculators for finance, savings, and health planning.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Finance</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/emi" className="hover:text-white transition-colors">EMI Calculator</Link></li>
                <li><Link to="/mortgage" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                <li><Link to="/sip" className="hover:text-white transition-colors">SIP Calculator</Link></li>
                <li><Link to="/retirement" className="hover:text-white transition-colors">Retirement Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Savings</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/savings-goal" className="hover:text-white transition-colors">Savings Goal</Link></li>
                <li><Link to="/currency" className="hover:text-white transition-colors">Currency Converter</Link></li>
                <li><Link to="/compound-interest" className="hover:text-white transition-colors">Compound Interest</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Health</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/bmi" className="hover:text-white transition-colors">BMI Calculator</Link></li>
                <li><Link to="/calorie" className="hover:text-white transition-colors">Calorie Calculator</Link></li>
                <li><Link to="/due-date" className="hover:text-white transition-colors">Due Date Calculator</Link></li>
                <li><Link to="/body-fat" className="hover:text-white transition-colors">Body Fat Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Education</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/grade" className="hover:text-white transition-colors">Grade Calculator</Link></li>
                <li><Link to="/gpa" className="hover:text-white transition-colors">GPA Calculator</Link></li>
                <li><Link to="/percentage" className="hover:text-white transition-colors">Percentage Calculator</Link></li>
                <li><Link to="/exam-timer" className="hover:text-white transition-colors">Exam Timer</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6 text-gray-400 text-sm">
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              © 2025 QuicknCalc. All rights reserved. 
              <span className="block mt-2">
                Disclaimer: Results are estimates and not financial or medical advice. 
                Consult professionals for important decisions.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;