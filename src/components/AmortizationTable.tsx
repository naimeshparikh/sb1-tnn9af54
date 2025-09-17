import React from 'react';

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
  const generateAmortizationSchedule = (): AmortizationEntry[] => {
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
  };

  const schedule = generateAmortizationSchedule();
  const yearlySchedule = schedule.filter((entry, index) => (index + 1) % 12 === 0 || index === schedule.length - 1);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Amortization Schedule (Yearly Summary)</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {yearlySchedule.map((entry, index) => (
              <tr key={entry.month} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 text-sm text-gray-900">{Math.ceil(entry.month / 12)}</td>
                <td className="px-3 py-2 text-sm text-gray-900">
                  {currencySymbol}{entry.payment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
                <td className="px-3 py-2 text-sm text-green-600">
                  {currencySymbol}{entry.principal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
                <td className="px-3 py-2 text-sm text-red-600">
                  {currencySymbol}{entry.interest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900">
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