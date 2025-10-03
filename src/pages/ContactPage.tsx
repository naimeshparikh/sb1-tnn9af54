import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo form - just show confirmation
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const seo = {
    title: 'Contact Us - QuicknCalc',
    description: 'Contact QuicknCalc for feedback, suggestions, or to report issues with our free online calculators. We value your input and strive to improve our tools.',
    keywords: 'contact QuicknCalc, feedback, suggestions, report issues, customer support, calculator help',
    canonical: 'https://quickncalc.com/contact/',
  };

  const relatedTools = [
    { name: 'About Us', path: '/about', description: 'Learn more about QuicknCalc' },
    { name: 'Privacy Policy', path: '/privacy', description: 'Our privacy policy' },
    { name: 'All Calculators', path: '/', description: 'View all available calculators' },
    { name: 'EMI Calculator', path: '/emi', description: 'Calculate loan EMI payments' },
  ];

  const faqs = [
    {
      question: 'How can I report a bug or issue?',
      answer: 'Use the contact form below to describe the issue you encountered. Please include details about which calculator you were using and what happened.',
    },
    {
      question: 'Can you add a new calculator?',
      answer: 'We welcome suggestions for new calculators! Use the form to tell us what type of calculator would be helpful for you.',
    },
    {
      question: 'Do you store the information I submit?',
      answer: 'No, this is a demonstration form only. We do not store or process any information submitted through this form.',
    },
    {
      question: 'How quickly will you respond?',
      answer: 'This is a demo contact form for display purposes. For a real application, response times would typically be 1-2 business days.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Contact Us"
      description="Get in touch with QuicknCalc. We value your feedback and suggestions to help improve our free online calculators."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Mail className="h-16 w-16 text-blue-600" />
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We value your feedback! Please use the form below to share suggestions or report issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-800">Get in Touch</h3>
              </div>
              <p className="text-blue-700 mb-4">
                Whether you have feedback, suggestions for new calculators, or found an issue, we'd love to hear from you.
              </p>
              <div className="space-y-2 text-blue-700">
                <p><strong>Feedback:</strong> Share your thoughts on our calculators</p>
                <p><strong>Suggestions:</strong> Request new calculator types</p>
                <p><strong>Issues:</strong> Report bugs or problems</p>
                <p><strong>General:</strong> Any other questions or comments</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Need Help?</h3>
              <p className="text-yellow-700 mb-3">
                Before contacting us, you might find answers in our calculator FAQs or try our other tools:
              </p>
              <div className="space-y-1 text-yellow-700">
                <p>• Check the FAQ section on each calculator page</p>
                <p>• Browse our <a href="/" className="underline hover:text-yellow-800">complete calculator list</a></p>
                <p>• Read our <a href="/about" className="underline hover:text-yellow-800">About page</a> for more information</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {isSubmitted ? (
              <div className="bg-green-50 p-8 rounded-lg border border-green-200 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">
                  Your message has been received. This is a demonstration form, so no actual data was stored.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Form</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message, feedback, or suggestion..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Note:</strong> This form is for demonstration only and does not store data.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default ContactPage;