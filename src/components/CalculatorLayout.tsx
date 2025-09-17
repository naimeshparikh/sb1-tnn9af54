import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

interface RelatedTool {
  name: string;
  path: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorLayoutProps {
  seo: SEOProps;
  title: string;
  description: string;
  children: React.ReactNode;
  relatedTools: RelatedTool[];
  faqs: FAQItem[];
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  seo,
  title,
  description,
  children,
  relatedTools,
  faqs,
}) => {
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
          {children}
        </div>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="bg-white rounded-lg p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CalculatorLayout;