import React from 'react';

interface GrowthEntry {
  year: number;
  principal: number;
  interest: number;
  total: number;
}

interface GrowthChartProps {
  principal: number;
  monthlyContribution?: number;
  annualRate: number;
  years: number;
  currencySymbol: string;
  title?: string;
}

const GrowthChart: React.FC<GrowthChartProps> = ({
  principal,
  monthlyContribution = 0,
  annualRate,
  years,
  currencySymbol,
  title = "Investment Growth Over Time",
}) => {
  const generateGrowthData = (): GrowthEntry[] => {
    const data: GrowthEntry[] = [];
    const monthlyRate = annualRate / 100 / 12;
    let currentPrincipal = principal;
    let totalContributions = principal;

    // Add initial year
    data.push({
      year: 0,
      principal: principal,
      interest: 0,
      total: principal,
    });

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        currentPrincipal = currentPrincipal * (1 + monthlyRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }

      const totalInterest = currentPrincipal - totalContributions;
      
      data.push({
        year,
        principal: totalContributions,
        interest: totalInterest,
        total: currentPrincipal,
      });
    }

    return data;
  };

  const growthData = generateGrowthData();
  const maxValue = Math.max(...growthData.map(d => d.total));

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      
      {/* Simple Bar Chart */}
      <div className="space-y-2">
        {growthData.slice(0, Math.min(11, growthData.length)).map((entry, index) => {
          const principalWidth = (entry.principal / maxValue) * 100;
          const interestWidth = (entry.interest / maxValue) * 100;
          
          return (
            <div key={entry.year} className="flex items-center space-x-2 text-sm">
              <div className="w-8 text-gray-600">Y{entry.year}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${principalWidth}%` }}
                />
                <div 
                  className="bg-green-500 h-full absolute top-0 rounded-full"
                  style={{ left: `${principalWidth}%`, width: `${interestWidth}%` }}
                />
              </div>
              <div className="w-20 text-right text-gray-900 font-medium">
                {currencySymbol}{entry.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Principal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Interest/Growth</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {growthData.map((entry, index) => (
              <tr key={entry.year} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 text-sm text-gray-900">{entry.year}</td>
                <td className="px-3 py-2 text-sm text-blue-600">
                  {currencySymbol}{entry.principal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </td>
                <td className="px-3 py-2 text-sm text-green-600">
                  {currencySymbol}{entry.interest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900">
                  {currencySymbol}{entry.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrowthChart;