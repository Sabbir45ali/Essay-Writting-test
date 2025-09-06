import React from 'react';
import { Clock, FileText } from 'lucide-react'; 
const Header = ({ isTestActive, timeLeft, onEndTest, formatTime }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Essay Writing Test</h1>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Capgemini Style
          </span>
        </div>

        {isTestActive && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
              <span className="font-mono text-lg font-bold text-red-600">
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={onEndTest}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              End Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
