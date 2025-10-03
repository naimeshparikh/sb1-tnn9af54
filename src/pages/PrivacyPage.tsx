import React from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Shield, Cookie, Settings, Mail } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const seo = {
    title: 'Privacy Policy - QuicknCalc',
    description: 'QuicknCalc privacy policy explaining how we handle user data, cookies, and third-party advertising. We do not collect personal information directly from users.',
    keywords: 'privacy policy, data protection, cookies, Google AdSense, user privacy, QuicknCalc',
    canonical: 'https://quickncalc.com/privacy/',
  };

  const relatedTools = [
    { name: 'About Us', path: '/about', description: 'Learn more about QuicknCalc' },
    { name: 'Contact Us', path: '/contact', description: 'Get in touch with us' },
    { name: 'All Calculators', path: '/', description: 'View all available calculators' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
  ];

  const faqs = [
    {
      question: 'Do you collect personal information?',
      answer: 'No, QuicknCalc does not collect personal information directly from users. We do not require registration or store personal data.',
    },
    {
      question: 'What are cookies and how are they used?',
      answer: 'Cookies are small text files stored on your device. Third-party ads (like Google AdSense) may use cookies to deliver relevant advertising based on your browsing behavior.',
    },
    {
      question: 'How can I manage cookies?',
      answer: 'You can manage or disable cookies through your browser settings. However, disabling cookies may affect the functionality of some website features.',
    },
    {
      question: 'Will this policy change?',
      answer: 'This privacy policy may be updated without notice as our services evolve. We recommend checking this page periodically for any changes.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Privacy Policy"
      description="Learn how QuicknCalc handles user privacy, data collection, and cookies. We are committed to protecting your privacy."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-green-600" />
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how QuicknCalc handles user data and protects your privacy.
          </p>
          <p className="text-sm text-gray-500">Last updated: January 2025</p>
        </div>

        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-green-800">Data Collection</h3>
            </div>
            <p className="text-green-700 text-lg font-medium mb-2">
              QuicknCalc does not collect personal information directly from users.
            </p>
            <p className="text-green-700">
              We do not require registration, store personal data, or track individual user information. All calculations are performed locally in your browser.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Cookie className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">Third-Party Advertising</h3>
            </div>
            <p className="text-blue-700 mb-3">
              <strong>Third-party ads (such as Google AdSense) may use cookies to deliver relevant advertising.</strong>
            </p>
            <p className="text-blue-700">
              These advertising partners may use cookies and similar technologies to collect information about your visits to this and other websites to provide advertisements about goods and services of interest to you.
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-3 mb-3">
              <Settings className="h-6 w-6 text-orange-600" />
              <h3 className="text-xl font-semibold text-orange-800">Cookie Management</h3>
            </div>
            <p className="text-orange-700 mb-3">
              <strong>Users can manage or disable cookies in their browser settings.</strong>
            </p>
            <div className="space-y-2 text-orange-700">
              <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
              <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
              <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
              <p><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h3>
            <p className="text-gray-700 mb-3">
              Since we do not collect or store personal information, there is minimal risk to your personal data when using our calculators. All calculations are performed locally in your browser.
            </p>
            <p className="text-gray-700">
              We use industry-standard security measures to protect our website and ensure a safe browsing experience.
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Policy Updates</h3>
            <p className="text-yellow-700">
              <strong>This policy may be updated without notice as services evolve.</strong> We recommend checking this page periodically for any changes. Continued use of our website constitutes acceptance of any updates to this privacy policy.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Mail className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">Contact Us</h3>
            </div>
            <p className="text-blue-700">
              If you have any questions about this privacy policy or our data practices, please contact us through our <a href="/contact" className="underline hover:text-blue-800">contact page</a>.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PrivacyPage;