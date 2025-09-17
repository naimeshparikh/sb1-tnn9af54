import React from 'react';

interface YearsMonthsInputProps {
  years: string;
  months: string;
  onYearsChange: (years: string) => void;
  onMonthsChange: (months: string) => void;
  label: string;
  className?: string;
}

const YearsMonthsInput: React.FC<YearsMonthsInputProps> = ({
  years,
  months,
  onYearsChange,
  onMonthsChange,
  label,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2" id={`${label.toLowerCase().replace(/\s+/g, '-')}-label`}>
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <div>
          <label htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}-years`} className="block text-xs text-gray-500 mb-1">Years</label>
          <input
            id={`${label.toLowerCase().replace(/\s+/g, '-')}-years`}
            type="number"
            min="0"
            value={years}
            onChange={(e) => onYearsChange(e.target.value)}
            className="calculator-input"
            placeholder="0"
            aria-describedby={`${label.toLowerCase().replace(/\s+/g, '-')}-total`}
          />
        </div>
        <div>
          <label htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}-months`} className="block text-xs text-gray-500 mb-1">Months</label>
          <input
            id={`${label.toLowerCase().replace(/\s+/g, '-')}-months`}
            type="number"
            min="0"
            max="11"
            value={months}
            onChange={(e) => onMonthsChange(e.target.value)}
            className="calculator-input"
            placeholder="0"
            aria-describedby={`${label.toLowerCase().replace(/\s+/g, '-')}-total`}
          />
        </div>
      </div>
      <div id={`${label.toLowerCase().replace(/\s+/g, '-')}-total`} className="mt-1 text-xs text-gray-500">
        Total: {(parseFloat(years || '0') * 12 + parseFloat(months || '0'))} months
      </div>
    </div>
  );
};

export default YearsMonthsInput;