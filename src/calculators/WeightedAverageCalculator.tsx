import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Plus, Trash2 } from 'lucide-react';

interface DataPoint {
  id: number;
  value: string;
  weight: string;
  label: string;
}

const WeightedAverageCalculator: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: 1, value: '85', weight: '30', label: 'Exam 1' },
    { id: 2, value: '92', weight: '40', label: 'Exam 2' },
    { id: 3, value: '78', weight: '30', label: 'Project' },
  ]);
  const [weightedAverage, setWeightedAverage] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [simpleAverage, setSimpleAverage] = useState<number>(0);

  const calculateWeightedAverage = () => {
    let weightedSum = 0;
    let totalWeights = 0;
    let simpleSum = 0;
    let validCount = 0;

    dataPoints.forEach(point => {
      const value = parseFloat(point.value) || 0;
      const weight = parseFloat(point.weight) || 0;
      
      if (point.value && point.weight) {
        weightedSum += value * weight;
        totalWeights += weight;
        simpleSum += value;
        validCount++;
      }
    });

    const weighted = totalWeights > 0 ? weightedSum / totalWeights : 0;
    const simple = validCount > 0 ? simpleSum / validCount : 0;
    
    setWeightedAverage(weighted);
    setTotalWeight(totalWeights);
    setSimpleAverage(simple);
  };

  useEffect(() => {
    calculateWeightedAverage();
  }, [dataPoints]);

  const addDataPoint = () => {
    const newId = Math.max(...dataPoints.map(d => d.id), 0) + 1;
    setDataPoints([...dataPoints, {
      id: newId,
      value: '',
      weight: '10',
      label: `Item ${newId}`
    }]);
  };

  const removeDataPoint = (id: number) => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.filter(d => d.id !== id));
    }
  };

  const updateDataPoint = (id: number, field: keyof DataPoint, value: string) => {
    setDataPoints(dataPoints.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const seo = {
    title: 'Weighted Average Calculator - Calculate Weighted GPA & Exam Scores',
    description: 'Calculate weighted average for grades, GPA, and test scores instantly. Free percentage weight calculator helps you determine weighted averages for any data set.',
    keywords: 'weighted average calculator, calculate weighted average, GPA weighted calculator, exam weight calculator, percentage weight calculator',
    canonical: 'https://quickncalc.com/weighted-average/',
  };

  const relatedTools = [
    { name: 'Grade Calculator', path: '/grade', description: 'Calculate final grades with weights' },
    { name: 'GPA Calculator', path: '/gpa', description: 'Calculate your GPA' },
    { name: 'Percentage Calculator', path: '/percentage', description: 'Calculate percentages' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
  ];

  const faqs = [
    {
      question: 'What is a weighted average?',
      answer: 'A weighted average gives different values different levels of importance (weights). Unlike a simple average, items with higher weights contribute more to the final result. It\'s calculated by multiplying each value by its weight, summing these products, then dividing by the total weights.',
    },
    {
      question: 'When should I use weighted average vs simple average?',
      answer: 'Use weighted average when different data points have different importance levels. For example, if a final exam is worth 50% of your grade and homework is 20%, you need weighted average. Use simple average when all data points are equally important.',
    },
    {
      question: 'Do weights need to add up to 100?',
      answer: 'No, weights don\'t need to total 100. The calculator automatically handles any weight total. However, for percentages (like grades), it\'s common to use weights that add to 100 for easier interpretation.',
    },
    {
      question: 'Can I use this for calculating grades?',
      answer: 'Absolutely! This is perfect for calculating course grades where different assignments have different weights. Enter your scores and their respective weights (like exam 40%, homework 30%, project 30%).',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Weighted Average Calculator"
      description="Easily calculate weighted average for your grades, GPA, or exam scores with this free tool. This weighted GPA calculator helps you determine how different assignments contribute to your final grade. Perfect for students who need to calculate weighted percentages for courses where exams and assignments have different importance levels."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Data Points</h3>
              <button
                onClick={addDataPoint}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-4">
              {dataPoints.map((point) => (
                <div key={point.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <input
                      type="text"
                      value={point.label}
                      onChange={(e) => updateDataPoint(point.id, 'label', e.target.value)}
                      className="font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 flex-1"
                      placeholder="Item name"
                    />
                    {dataPoints.length > 1 && (
                      <button
                        onClick={() => removeDataPoint(point.id)}
                        className="text-red-600 hover:text-red-800 p-1 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Value</label>
                      <input
                        type="number"
                        value={point.value}
                        onChange={(e) => updateDataPoint(point.id, 'value', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="85"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Weight</label>
                      <input
                        type="number"
                        value={point.weight}
                        onChange={(e) => updateDataPoint(point.id, 'weight', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="30"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    Contribution: {point.value && point.weight ? 
                      ((parseFloat(point.value) * parseFloat(point.weight)) / totalWeight * 100).toFixed(1) + '% of total' : 
                      'Enter values to see contribution'
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Weighted Average</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {weightedAverage.toFixed(2)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Simple Average</div>
                    <div className="text-xl font-semibold text-gray-800">
                      {simpleAverage.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Weight</div>
                    <div className="text-xl font-semibold text-gray-800">
                      {totalWeight.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Breakdown</h4>
              <div className="space-y-2 text-sm">
                {dataPoints.map((point) => {
                  const value = parseFloat(point.value) || 0;
                  const weight = parseFloat(point.weight) || 0;
                  const contribution = totalWeight > 0 ? (value * weight) / totalWeight : 0;
                  
                  return (
                    <div key={point.id} className="flex justify-between">
                      <span className="truncate mr-2">{point.label}:</span>
                      <span className="font-medium">
                        {value} × {weight} = {contribution.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Weighted Sum:</span>
                  <span>{(weightedAverage * totalWeight).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Comparison</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div>Weighted Average: {weightedAverage.toFixed(2)}</div>
                <div>Simple Average: {simpleAverage.toFixed(2)}</div>
                <div>Difference: {Math.abs(weightedAverage - simpleAverage).toFixed(2)}</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Print Results
              </button>
              <button
                onClick={() => navigator.share?.({ title: 'Weighted Average', text: `Weighted Average: ${weightedAverage.toFixed(2)}` })}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Share Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default WeightedAverageCalculator;