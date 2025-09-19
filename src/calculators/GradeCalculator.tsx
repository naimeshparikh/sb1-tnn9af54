import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Plus, Trash2 } from 'lucide-react';

interface Assignment {
  id: number;
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

const GradeCalculator: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: 'Assignment 1', score: '85', maxScore: '100', weight: '20' },
    { id: 2, name: 'Midterm Exam', score: '78', maxScore: '100', weight: '30' },
    { id: 3, name: 'Final Exam', score: '92', maxScore: '100', weight: '50' },
  ]);
  const [finalGrade, setFinalGrade] = useState<number>(0);
  const [letterGrade, setLetterGrade] = useState<string>('');
  const [totalWeight, setTotalWeight] = useState<number>(0);

  const calculateGrade = () => {
    let weightedSum = 0;
    let totalWeights = 0;

    assignments.forEach(assignment => {
      const score = parseFloat(assignment.score) || 0;
      const maxScore = parseFloat(assignment.maxScore) || 100;
      const weight = parseFloat(assignment.weight) || 0;
      
      const percentage = (score / maxScore) * 100;
      weightedSum += (percentage * weight);
      totalWeights += weight;
    });

    const grade = totalWeights > 0 ? weightedSum / totalWeights : 0;
    setFinalGrade(grade);
    setTotalWeight(totalWeights);

    // Calculate letter grade
    let letter = '';
    if (grade >= 97) letter = 'A+';
    else if (grade >= 93) letter = 'A';
    else if (grade >= 90) letter = 'A-';
    else if (grade >= 87) letter = 'B+';
    else if (grade >= 83) letter = 'B';
    else if (grade >= 80) letter = 'B-';
    else if (grade >= 77) letter = 'C+';
    else if (grade >= 73) letter = 'C';
    else if (grade >= 70) letter = 'C-';
    else if (grade >= 67) letter = 'D+';
    else if (grade >= 65) letter = 'D';
    else letter = 'F';

    setLetterGrade(letter);
  };

  useEffect(() => {
    calculateGrade();
  }, [assignments]);

  const addAssignment = () => {
    const newId = Math.max(...assignments.map(a => a.id), 0) + 1;
    setAssignments([...assignments, {
      id: newId,
      name: `Assignment ${newId}`,
      score: '',
      maxScore: '100',
      weight: '10'
    }]);
  };

  const removeAssignment = (id: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const seo = {
    title: 'Grade Calculator - Calculate Final Grades with Weights | QuicknCalc',
    description: 'Calculate your final grade with weighted assignments, exams, and projects. Free grade calculator with letter grade conversion and percentage results.',
    keywords: 'grade calculator, final grade calculator, weighted grade calculator, letter grade, GPA calculator, assignment calculator, exam grade',
    canonical: 'https://quickncalc.com/grade/',
  };

  const relatedTools = [
    { name: 'GPA Calculator', path: '/gpa', description: 'Calculate your GPA on 4.0 or 5.0 scale' },
    { name: 'Percentage Calculator', path: '/percentage', description: 'Calculate percentage increase and decrease' },
    { name: 'Weighted Average Calculator', path: '/weighted-average', description: 'Calculate weighted averages' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
  ];

  const faqs = [
    {
      question: 'How do weighted grades work?',
      answer: 'Weighted grades give different assignments different levels of importance. For example, a final exam might be worth 40% while homework is worth 20%. The calculator multiplies each grade by its weight to determine your final grade.',
    },
    {
      question: 'What grading scale does this use?',
      answer: 'This calculator uses the standard US grading scale: A+ (97-100%), A (93-96%), A- (90-92%), B+ (87-89%), B (83-86%), B- (80-82%), C+ (77-79%), C (73-76%), C- (70-72%), D+ (67-69%), D (65-66%), F (below 65%).',
    },
    {
      question: 'What if my weights don\'t add up to 100%?',
      answer: 'The calculator automatically adjusts for weights that don\'t total 100%. It calculates the weighted average based on the proportional weights you\'ve entered.',
    },
    {
      question: 'Can I add more assignments?',
      answer: 'Yes! Click the "Add Assignment" button to add more assignments, exams, or projects. You can customize the name, score, maximum points, and weight for each item.',
    },
  ];

  return (
    <CalculatorLayout
      seo={seo}
      title="Grade Calculator"
      description="Calculate your final grade with weighted assignments, exams, and projects. Enter your scores and weights to see your overall grade percentage and letter grade."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Assignments & Exams</h3>
              <button
                onClick={addAssignment}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Assignment</span>
              </button>
            </div>

            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <input
                      type="text"
                      value={assignment.name}
                      onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                      className="font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                      placeholder="Assignment name"
                    />
                    {assignments.length > 1 && (
                      <button
                        onClick={() => removeAssignment(assignment.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Score</label>
                      <input
                        type="number"
                        value={assignment.score}
                        onChange={(e) => updateAssignment(assignment.id, 'score', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Max Score</label>
                      <input
                        type="number"
                        value={assignment.maxScore}
                        onChange={(e) => updateAssignment(assignment.id, 'maxScore', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Weight (%)</label>
                      <input
                        type="number"
                        value={assignment.weight}
                        onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="20"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    {assignment.score && assignment.maxScore ? 
                      `${((parseFloat(assignment.score) / parseFloat(assignment.maxScore)) * 100).toFixed(1)}%` : 
                      'Enter score to see percentage'
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Grade</h3>
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-blue-600">
                  {finalGrade.toFixed(1)}%
                </div>
                <div className="text-2xl font-semibold text-gray-800">
                  {letterGrade}
                </div>
                <div className="text-sm text-gray-600">
                  Total Weight: {totalWeight}%
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Grade Breakdown</h4>
              <div className="space-y-2 text-sm">
                {assignments.map((assignment) => {
                  const score = parseFloat(assignment.score) || 0;
                  const maxScore = parseFloat(assignment.maxScore) || 100;
                  const weight = parseFloat(assignment.weight) || 0;
                  const percentage = (score / maxScore) * 100;
                  const contribution = (percentage * weight) / totalWeight;
                  
                  return (
                    <div key={assignment.id} className="flex justify-between">
                      <span className="truncate mr-2">{assignment.name}:</span>
                      <span className="font-medium">
                        {percentage.toFixed(1)}% ({contribution.toFixed(1)}% of final)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">📚 Grading Scale</h4>
              <div className="text-sm text-yellow-700 grid grid-cols-2 gap-1">
                <div>A+: 97-100%</div>
                <div>C+: 77-79%</div>
                <div>A: 93-96%</div>
                <div>C: 73-76%</div>
                <div>A-: 90-92%</div>
                <div>C-: 70-72%</div>
                <div>B+: 87-89%</div>
                <div>D+: 67-69%</div>
                <div>B: 83-86%</div>
                <div>D: 65-66%</div>
                <div>B-: 80-82%</div>
                <div>F: Below 65%</div>
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
                onClick={() => navigator.share?.({ title: 'Grade Calculation', text: `Final Grade: ${finalGrade.toFixed(1)}% (${letterGrade})` })}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
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

export default GradeCalculator;