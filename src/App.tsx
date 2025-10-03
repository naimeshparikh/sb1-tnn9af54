import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import EmiCalculator from './calculators/EmiCalculator';
import GstVatCalculator from './calculators/GstVatCalculator';
import DiscountCalculator from './calculators/DiscountCalculator';
import SipCalculator from './calculators/SipCalculator';
import PropertyProfitCalculator from './calculators/PropertyProfitCalculator';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import MortgageCalculator from './calculators/MortgageCalculator';
import LoanAffordabilityCalculator from './calculators/LoanAffordabilityCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';
import SavingsGoalCalculator from './calculators/SavingsGoalCalculator';
import CurrencyConverter from './calculators/CurrencyConverter';
import AgeCalculator from './calculators/AgeCalculator';
import DueDateCalculator from './calculators/DueDateCalculator';
import BmiCalculator from './calculators/BmiCalculator';
import CalorieCalculator from './calculators/CalorieCalculator';
import BodyFatCalculator from './calculators/BodyFatCalculator';
import GradeCalculator from './calculators/GradeCalculator';
import GpaCalculator from './calculators/GpaCalculator';
import PercentageCalculator from './calculators/PercentageCalculator';
import WeightedAverageCalculator from './calculators/WeightedAverageCalculator';
import ExamTimerTool from './calculators/ExamTimerTool';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/emi" element={<EmiCalculator />} />
          <Route path="/gst-vat" element={<GstVatCalculator />} />
          <Route path="/discount" element={<DiscountCalculator />} />
          <Route path="/sip" element={<SipCalculator />} />
          <Route path="/property-profit" element={<PropertyProfitCalculator />} />
          <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/mortgage" element={<MortgageCalculator />} />
          <Route path="/loan-affordability" element={<LoanAffordabilityCalculator />} />
          <Route path="/retirement" element={<RetirementCalculator />} />
          <Route path="/savings-goal" element={<SavingsGoalCalculator />} />
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/age" element={<AgeCalculator />} />
          <Route path="/due-date" element={<DueDateCalculator />} />
          <Route path="/bmi" element={<BmiCalculator />} />
          <Route path="/calorie" element={<CalorieCalculator />} />
          <Route path="/body-fat" element={<BodyFatCalculator />} />
          <Route path="/grade" element={<GradeCalculator />} />
          <Route path="/gpa" element={<GpaCalculator />} />
          <Route path="/percentage" element={<PercentageCalculator />} />
          <Route path="/weighted-average" element={<WeightedAverageCalculator />} />
          <Route path="/exam-timer" element={<ExamTimerTool />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;