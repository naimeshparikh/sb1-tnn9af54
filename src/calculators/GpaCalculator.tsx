import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Plus, Trash2 } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Mathematics', grade: 'A', credits: '3' },
    { id: 2, name: 'English', grade: 'B+', credits: '3' },
    { id: 3, name: 'Science', grade: 'A-', credits: '4' },
  ]);
  const [gpaScale, setGpaScale] = useState<'4.0' | '5.0'>('4.0');
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);

  const gradePoints = {
    '4.0': {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    },
    '5.0': {
      'A+': 5.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCreds = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[gpaScale][course.grade as keyof typeof gradePoints['4.0']] || 0;
      
      totalPoints += points * credits;
      totalCreds += credits;
    });

    const calculatedGpa = totalCreds > 0 ? totalPoints / totalCreds : 0;
    setGpa(calculatedGpa);
    setTotalCredits(totalCreds);
    setTotalQualityPoints(totalPoints);
  };

  useEffect(() => {
    calculateGpa();
  }, [courses, gpaScale]);

  const addCourse = () => {
    const newId = Math.max(...courses.map(c => c.id), 0) + 1;
    setCourses([...courses, {
      id: newId,
      name: `Course ${newId}`,
      grade: 'A',
      credits: '3'
    }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const seo = {
    title: "GPA Calculator – Calculate College & High School GPA",
    description:
      "Calculate your GPA (Grade Point Average) easily for college or high school. Supports weighted and unweighted GPA systems.",
    keywords:
      "GPA calculator, grade point average calculator, weighted GPA, unweighted GPA, CGPA calculator, college GPA calculator",
    canonical: "https://quickncalc.com/gpa/",
  };
  const relatedTools = [
    { name: 'Grade Calculator', path: '/grade', description: 'Calculate final grades with weights' },
    { name: 'Percentage Calculator', path: '/percentage', description: 'Calculate percentage increase and decrease' },
    { name: 'Weighted Average Calculator', path: '/weighted-average', description: 'Calculate weighted averages' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
  ];

  const faqs = [
    {
      question: 'What\'s the difference between 4.0 and 5.0 GPA scales?',
      answer: 'The 4.0 scale is most common in the US, where A+ and A both equal 4.0. The 5.0 scale gives A+ a value of 5.0, allowing for higher GPAs. Some schools use weighted scales where honors/AP classes get bonus points.',
    },
    {
      question: 'How is GPA calculated?',
      answer: 'GPA is calculated by multiplying each grade\'s point value by the course\'s credit hours, adding all quality points together, then dividing by total credit hours attempted.',
    },
    {
      question: 'What GPA is considered good?',
      answer: 'Generally, 3.0+ is considered good, 3.5+ is very good, and 3.8+ is excellent. However, standards vary by institution and field of study. For competitive programs, higher GPAs are typically required.',
    },
    {
      question: 'Can I calculate cumulative GPA?',
      answer: 'Yes! Add all your courses from multiple semesters with their respective grades and credit hours. The calculator will compute your overall cumulative GPA across all terms.',
    },
  ];

  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

  return (
    <CalculatorLayout
      seo={seo}
      title="GPA Calculator"
      description="Calculate your Grade Point Average (GPA) on 4.0 or 5.0 scale. Enter your course grades and credit hours to get your semester or cumulative GPA."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Scale:</label>
                  <select
                    value={gpaScale}
                    onChange={(e) => setGpaScale(e.target.value as '4.0' | '5.0')}
                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="4.0">4.0</option>
                    <option value="5.0">5.0</option>
                  </select>
                </div>
                <button
                  onClick={addCourse}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Course</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 flex-1"
                      placeholder="Course name"
                    />
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="text-red-600 hover:text-red-800 p-1 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Credit Hours</label>
                      <input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="3"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    Grade Points: {gradePoints[gpaScale][course.grade as keyof typeof gradePoints['4.0']] || 0} × {course.credits || 0} credits = {((gradePoints[gpaScale][course.grade as keyof typeof gradePoints['4.0']] || 0) * (parseFloat(course.credits) || 0)).toFixed(2)} quality points
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">GPA Results</h3>
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-green-600">
                  {gpa.toFixed(2)}
                </div>
                <div className="text-lg text-gray-800">
                  GPA on {gpaScale} Scale
                </div>
                <div className="text-sm text-gray-600">
                  {totalCredits} Total Credit Hours
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">GPA Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Quality Points:</span>
                  <span className="font-medium">{totalQualityPoints.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Credit Hours:</span>
                  <span className="font-medium">{totalCredits}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>GPA:</span>
                  <span className="font-medium">{gpa.toFixed(3)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📊 GPA Scale ({gpaScale})</h4>
              <div className="text-sm text-blue-700 grid grid-cols-2 gap-1">
                {Object.entries(gradePoints[gpaScale]).map(([grade, points]) => (
                  <div key={grade} className="flex justify-between">
                    <span>{grade}:</span>
                    <span>{points.toFixed(1)}</span>
                  </div>
                ))}
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
                onClick={() => navigator.share?.({ title: 'GPA Calculation', text: `GPA: ${gpa.toFixed(2)} on ${gpaScale} scale` })}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
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

export default GpaCalculator;