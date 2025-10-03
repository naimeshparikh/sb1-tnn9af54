import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Play, Pause, RotateCcw, Clock, AlertCircle } from 'lucide-react';

const ExamTimerTool: React.FC = () => {
  const [duration, setDuration] = useState<number>(60); // minutes
  const [timeLeft, setTimeLeft] = useState<number>(3600); // seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playAlarm();
            return 0;
          }
          
          // Show warning at 5 minutes (300 seconds)
          if (prev === 301) {
            setShowWarning(true);
            playWarningSound();
          }
          
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const playAlarm = () => {
    // Create a simple beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const playWarningSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 600;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsFinished(false);
    setShowWarning(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setShowWarning(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalSeconds = duration * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const getTimeColor = () => {
    if (isFinished) return 'text-red-600';
    if (timeLeft <= 300) return 'text-orange-600'; // 5 minutes warning
    if (timeLeft <= 600) return 'text-yellow-600'; // 10 minutes warning
    return 'text-green-600';
  };

  const seo = {
    title: 'Exam Timer - Test Timer Online with Countdown Clock',
    description: 'Free online exam timer and test countdown clock for students. Set your test duration and get audio alerts at key intervals. Perfect study timer for online exams.',
    keywords: 'exam timer, test timer online, countdown timer for exam, study timer, online exam stopwatch, test countdown clock',
    canonical: 'https://quickncalc.com/exam-timer/',
  };

  const relatedTools = [
    { name: 'Grade Calculator', path: '/grade', description: 'Calculate final grades with weights' },
    { name: 'GPA Calculator', path: '/gpa', description: 'Calculate your GPA' },
    { name: 'Percentage Calculator', path: '/percentage', description: 'Calculate percentages' },
    { name: 'Age Calculator', path: '/age', description: 'Calculate exact age' },
  ];

  const faqs = [
    {
      question: 'How does the exam timer work?',
      answer: 'Set your desired exam duration, click start, and the timer will count down. You\'ll get visual and audio warnings at 5 minutes remaining, and an alarm when time is up.',
    },
    {
      question: 'Can I pause and resume the timer?',
      answer: 'Yes! You can pause the timer at any time and resume when ready. This is useful if you need to take a break or handle interruptions during your exam.',
    },
    {
      question: 'What happens when time runs out?',
      answer: 'When the timer reaches zero, you\'ll see a visual alert and hear an audio alarm (if your browser supports it). The timer will display "Time\'s Up!" in red.',
    },
    {
      question: 'Can I use this for different types of tests?',
      answer: 'Absolutely! This timer works for any timed activity - exams, quizzes, standardized tests, practice tests, study sessions, or any situation where you need a countdown timer.',
    },
  ];

  const commonDurations = [15, 30, 45, 60, 90, 120, 180];

  return (
    <CalculatorLayout
      seo={seo}
      title="Exam Timer - Online Test Timer"
      description="Keep track of your test time with this free exam timer and countdown clock. Perfect for online exams, this test timer provides visual progress tracking and audio alerts to help you manage your exam time effectively. Use this study timer for practice tests, quizzes, or any timed assessment."
      relatedTools={relatedTools}
      faqs={faqs}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="60"
                min="1"
                max="600"
                disabled={isRunning}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {commonDurations.map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins)}
                    disabled={isRunning}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Timer</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  <Pause className="h-5 w-5" />
                  <span>Pause Timer</span>
                </button>
              )}
              
              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Timer Features
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Visual countdown display</li>
                <li>• Audio alerts at 5 minutes remaining</li>
                <li>• Alarm sound when time expires</li>
                <li>• Pause and resume functionality</li>
                <li>• Progress bar visualization</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`text-center p-8 rounded-lg border-2 ${
              isFinished ? 'bg-red-50 border-red-200' : 
              showWarning ? 'bg-orange-50 border-orange-200' : 
              'bg-green-50 border-green-200'
            }`}>
              <div className={`text-6xl font-mono font-bold mb-4 ${getTimeColor()}`}>
                {isFinished ? "TIME'S UP!" : formatTime(timeLeft)}
              </div>
              
              {isFinished && (
                <div className="flex justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600 animate-pulse" />
                </div>
              )}
              
              {showWarning && !isFinished && (
                <div className="text-orange-600 font-semibold mb-2">
                  ⚠️ 5 Minutes Remaining!
                </div>
              )}
              
              <div className="text-lg text-gray-600">
                {isRunning ? 'Timer Running' : 
                 isFinished ? 'Exam Complete' : 
                 'Timer Ready'}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Progress</h4>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    isFinished ? 'bg-red-500' : 
                    showWarning ? 'bg-orange-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Started</span>
                <span>{getProgressPercentage().toFixed(1)}% Complete</span>
                <span>Finish</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Timer Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Duration:</span>
                  <span className="font-medium">{duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Elapsed:</span>
                  <span className="font-medium">{formatTime((duration * 60) - timeLeft)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Remaining:</span>
                  <span className={`font-medium ${getTimeColor()}`}>{formatTime(timeLeft)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium ${
                    isFinished ? 'text-red-600' : 
                    isRunning ? 'text-green-600' : 
                    'text-gray-600'
                  }`}>
                    {isFinished ? 'Finished' : isRunning ? 'Running' : 'Stopped'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default ExamTimerTool;