import React from 'react';
import { Suspense, lazy } from 'react';
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
  loading?: boolean;
}

const getCalculatorType = (canonical: string): string => {
  const healthCalculators = ['/bmi', '/calorie', '/body-fat', '/due-date'];
  const educationCalculators = ['/grade', '/gpa', '/exam-timer', '/weighted-average'];
  const financeCalculators = ['/compound-interest', '/mortgage', '/emi', '/sip', '/retirement', '/savings-goal', '/loan-affordability', '/property-profit'];

  const path = canonical.replace('https://quickncalc.com', '').replace(/\/$/, '');

  if (healthCalculators.some(calc => path.includes(calc))) {
    return 'MedicalWebPage';
  } else if (educationCalculators.some(calc => path.includes(calc))) {
    return 'EducationalOccupationalProgram';
  } else if (financeCalculators.some(calc => path.includes(calc))) {
    return 'FinancialProduct';
  }

  return 'WebApplication';
};

const CalculatorSchema: React.FC<{ seo: SEOProps }> = ({ seo }) => {
  const calculatorType = getCalculatorType(seo.canonical);

  const schemaData: any = {
    "@context": "https://schema.org",
    "@type": calculatorType,
    "name": seo.title,
    "url": seo.canonical,
    "applicationCategory": "Calculator",
    "description": seo.description,
    "publisher": {
      "@type": "Organization",
      "name": "QuicknCalc",
      "url": "https://quickncalc.com"
    }
  };

  if (calculatorType === 'WebApplication' || calculatorType === 'SoftwareApplication') {
    schemaData.operatingSystem = "All";
    schemaData.offers = {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

const FAQSchema: React.FC<{ faqs: FAQItem[] }> = ({ faqs }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

// Loading skeleton component
const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    <div className="loading-skeleton h-8 w-3/4"></div>
    <div className="loading-skeleton h-4 w-full"></div>
    <div className="loading-skeleton h-4 w-2/3"></div>
    <div className="loading-skeleton h-32 w-full"></div>
  </div>
);

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  seo,
  title,
  description,
  children,
  relatedTools,
  faqs,
  loading = false,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <CalculatorSchema seo={seo} />
      <FAQSchema faqs={faqs} />

      <div className="space-y-8 min-h-screen">
        {/* Header Section */}
        <header className="text-center space-y-4 py-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">{title}</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">{description}</p>
        </header>

        {/* Main Calculator Section */}
        <main className="calculator-card">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <Suspense fallback={<LoadingSkeleton />}>
              {children}
            </Suspense>
          )}
        </main>

        {/* Related Tools Section */}
        <section className="calculator-card" aria-labelledby="related-tools-heading">
          <h2 id="related-tools-heading" className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {relatedTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Navigate to ${tool.name}`}
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-sm md:text-base text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="calculator-card" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
        </div>
    </>
  );
};

export default CalculatorLayout;