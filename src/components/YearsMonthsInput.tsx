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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Years</label>
          <input
            type="number"
            min="0"
            value={years}
            onChange={(e) => onYearsChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Months</label>
          <input
            type="number"
            min="0"
            max="11"
            value={months}
            onChange={(e) => onMonthsChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        Total: {(parseFloat(years || '0') * 12 + parseFloat(months || '0'))} months
      </div>
    </div>
  );
};

export default YearsMonthsInput;