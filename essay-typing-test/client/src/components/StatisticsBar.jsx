import React from 'react';
import { Target, AlertCircle, History, FileText } from 'lucide-react';

const StatisticsBar = ({ userText, backspaceCount, testRecords }) => {
  const wordsCount = userText.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-600" />
          <span className="text-sm text-gray-600">Words</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">{wordsCount}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm text-gray-600">Backspaces</span>
        </div>
        <p className="text-2xl font-bold text-red-600">{backspaceCount}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Tests Done</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">{testRecords.length}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-gray-600">Characters</span>
        </div>
        <p className="text-2xl font-bold text-purple-600">{userText.length}</p>
      </div>
    </div>
  );
};

export default StatisticsBar;
