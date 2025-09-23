import React, { useMemo } from 'react';

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface AmortizationTableProps {
  loanAmount: number;
  monthlyPayment: number;
  interestRate: number;
  tenure: number;
  currencySymbol: string;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({
  loanAmount,
  monthlyPayment,
  interestRate,
  tenure,
  currencySymbol,
}) => {
  const schedule = useMemo((): AmortizationEntry[] => {
    const schedule: AmortizationEntry[] = [];
    const monthlyRate = interestRate / 100 / 12;
    let remainingBalance = loanAmount;

    for (let month = 1; month <= tenure; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
      });

      if (remainingBalance <= 0) break;
    }

    return schedule;
  }, [loanAmount, monthlyPayment, interestRate, tenure]);
  
  const yearlySchedule = schedule.filter((entry, index) => (index + 1) % 12 === 0 || index === schedule.length - 1);

  return (
    <div className="space-y-6" role="region" aria-labelledby="amortization-title">
      <h4 id="amortization-title" className="text-lg md:text-xl font-semibold text-gray-900">Amortization Schedule (Yearly Summary)</h4>
      
      {/* Loan Balance Chart */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h5 className="text-base font-semibold text-gray-800 mb-3">Loan Balance Over Time</h5>
        <div className="space-y-2">
          {yearlySchedule.map((entry, index) => {
            const balanceWidth = (entry.balance / loanAmount) * 100;
            const year = Math.ceil(entry.month / 12);
            
            return (
              <div key={entry.month} className="flex items-center space-x-2 text-xs md:text-sm">
                <div className="w-8 text-gray-600 flex-shrink-0">Y{year}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="bg-red-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${balanceWidth}%` }}
                  />
                </div>
                <div className="w-20 text-right text-gray-900 font-medium flex-shrink-0 text-xs md:text-sm">
                  {currencySymbol}{entry.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          <span className="inline-flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            Remaining Balance
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-2 md:mx-0">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg calculator-table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-2 md:px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th scope="col" className="px-2 md:px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th scope="col" className="px-2 md:px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
              <th scope="col" className="px-2 md:px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
              <th scope="col" className="px-2 md:px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {yearlySchedule.map((entry, index) => (
              <tr key={entry.month} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-2 md:px-3 py-2 text-xs md:text-sm text-gray-900">{Math.ceil(entry.month / 12)}</td>
                <td className="px-2 md:px-3 py-2 text-xs md:text-sm text-gray-900">
                  {currencySymbol}{entry.payment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
                <td className="px-2 md:px-3 py-2 text-xs md:text-sm text-green-600">
                  {currencySymbol}{entry.principal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
                <td className="px-2 md:px-3 py-2 text-xs md:text-sm text-red-600">
                  {currencySymbol}{entry.interest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
                <td className="px-2 md:px-3 py-2 text-xs md:text-sm text-gray-900">
                  {currencySymbol}{entry.balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmortizationTable;