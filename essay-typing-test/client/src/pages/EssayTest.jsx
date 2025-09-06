import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header.jsx';
import StatisticsBar from '../components/StatisticsBar.jsx';
import StartScreen from '../components/StartScreen.jsx';
import TestInterface from '../components/TestInterface.jsx';
import Results from '../components/Results.jsx';
import RecordsHistory from '../components/RecordsHistory.jsx';
import { formatTime } from '../utils/utils.js';

const essayPrompts = [
  "Technology has revolutionized the way we work and communicate. Discuss the positive and negative impacts of technology on modern society. How can we maximize the benefits while minimizing the drawbacks?",
  "Climate change is one of the most pressing issues of our time. What role should individuals, corporations, and governments play in addressing environmental challenges? Provide specific examples and solutions.",
  "The concept of work-life balance has become increasingly important in today's fast-paced world. Analyze the challenges professionals face in maintaining this balance and suggest practical strategies for improvement.",
  "Artificial Intelligence and automation are changing the job market. Discuss how these technologies might affect employment in the next decade and what steps individuals can take to remain relevant.",
  "Education systems worldwide are adapting to digital transformation. Evaluate the effectiveness of online learning compared to traditional classroom methods. What does the future of education look like?"
];

const EssayTypingTest = ({ user }) => {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [userText, setUserText] = useState('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [startTime, setStartTime] = useState(null);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [testRecords, setTestRecords] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentTestId, setCurrentTestId] = useState(null);

  const textAreaRef = useRef(null);

  // Fetch user reports from backend
  useEffect(() => {
    const fetchTestRecords = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('https://essay-writting-test.onrender.com/api/reports', {
          headers: { 'x-auth-token': token }
        });
        if (res.ok) {
          const data = await res.json();
          setTestRecords(data);
        }
      } catch (err) {
        console.error('Failed to fetch test records', err);
      }
    };
    fetchTestRecords();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTestActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            endTest();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, timeLeft]);

  const startTest = () => {
    const randomPrompt = essayPrompts[Math.floor(Math.random() * essayPrompts.length)];
    const testId = Date.now().toString();

    setCurrentPrompt(randomPrompt);
    setCurrentTestId(testId);
    setUserText('');
    setBackspaceCount(0);
    setIsTestActive(true);
    setShowResults(false);
    setTimeLeft(1800);
    setStartTime(new Date());

    setTimeout(() => {
      textAreaRef.current?.focus();
    }, 100);
  };

  const saveTestRecordToBackend = async (testResult) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('https://essay-writting-test.onrender.com/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(testResult),
      });
      if (!res.ok) {
        console.error('Failed to save test record');
      }
    } catch (err) {
      console.error('Error saving test record', err);
    }
  };

  const endTest = () => {
    if (!isTestActive) return;

    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const wordsTyped = userText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const charactersTyped = userText.length;
    const wpm = Math.round((wordsTyped / (timeTaken / 60)) || 0);

    const baseScore = Math.max(0, (wordsTyped * 2) - (backspaceCount * 0.5));
    const timeBonus = timeLeft > 0 ? Math.floor(timeLeft / 60) : 0;
    const finalScore = Math.round(baseScore + timeBonus);

    const testResult = {
      id: currentTestId,
      prompt: currentPrompt,
      essayText: userText,
      wordsTyped,
      charactersTyped,
      timeTaken,
      timeLeft,
      wpm,
      backspaceCount,
      score: finalScore,
      timestamp: new Date().toISOString(),
      completedAt: endTime.toLocaleString()
    };

    // Save to local state
    const updatedRecords = [...testRecords, testResult];
    setTestRecords(updatedRecords);
    localStorage.setItem('essayTestRecords', JSON.stringify(updatedRecords));

    // Save to backend
    saveTestRecordToBackend(testResult);

    setIsTestActive(false);
    setShowResults(true);
  };

  const handleTextChange = (e) => {
    if (!isTestActive) return;
    setUserText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (!isTestActive) return;
    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }
  };

  const downloadResults = () => {
    const dataStr = JSON.stringify(testRecords, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `essay_test_records_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const resetAll = () => {
    if (window.confirm('Are you sure you want to clear all records? This action cannot be undone.')) {
      setTestRecords([]);
      localStorage.removeItem('essayTestRecords');
      setShowResults(false);
      setIsTestActive(false);
      setUserText('');
      setCurrentPrompt('');
    }
  };

  const currentResult = testRecords.find(record => record.id === currentTestId);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full h-full">
        <Header
          isTestActive={isTestActive}
          timeLeft={timeLeft}
          onEndTest={endTest}
          formatTime={formatTime}
        />

        <StatisticsBar
          userText={userText}
          backspaceCount={backspaceCount}
          testRecords={testRecords}
        />

        {!isTestActive && !showResults && (
          <StartScreen
            onStart={startTest}
            hasRecords={testRecords.length > 0}
            onDownload={downloadResults}
            onReset={resetAll}
          />
        )}

        {isTestActive && (
          <TestInterface
            currentPrompt={currentPrompt}
            userText={userText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            textAreaRef={textAreaRef}
          />
        )}

        {showResults && currentResult && (
          <Results
            result={currentResult}
            formatTime={formatTime}
            onRestart={startTest}
            onDownload={downloadResults}
          />
        )}

        {testRecords.length > 0 && !isTestActive && (
          <RecordsHistory
            testRecords={testRecords}
            formatTime={formatTime}
          />
        )}
      </div>
    </div>
  );
};

export default EssayTypingTest;
