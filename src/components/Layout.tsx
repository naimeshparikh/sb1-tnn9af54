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
              <Link to="/savings-goal" className="text-gray-600 hover:text-blue-600 transition-colors">Savings</Link>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <li><Link to="/gst-vat" className="hover:text-white transition-colors">GST/VAT Calculator</Link></li>
                <li><Link to="/sip" className="hover:text-white transition-colors">SIP Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Savings</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/savings-goal" className="hover:text-white transition-colors">Savings Goal</Link></li>
                <li><Link to="/currency" className="hover:text-white transition-colors">Currency Converter</Link></li>
                <li><Link to="/age" className="hover:text-white transition-colors">Age Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Health</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/bmi" className="hover:text-white transition-colors">BMI Calculator</Link></li>
                <li><Link to="/calorie" className="hover:text-white transition-colors">Calorie Calculator</Link></li>
                <li><Link to="/due-date" className="hover:text-white transition-colors">Due Date Calculator</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8">
            <p className="text-gray-400 text-sm">
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