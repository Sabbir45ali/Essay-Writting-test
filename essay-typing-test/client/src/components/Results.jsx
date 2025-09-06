import React from 'react';
import { Download } from 'lucide-react';

const Results = ({ result, formatTime, onRestart, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Test Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <div className="text-3xl font-bold text-green-600 mb-2">{result.score}</div>
          <div className="text-green-700">Final Score</div>
        </div>

        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <div className="text-3xl font-bold text-blue-600 mb-2">{result.wpm}</div>
          <div className="text-blue-700">Words Per Minute</div>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <div className="text-3xl font-bold text-purple-600 mb-2">{result.wordsTyped}</div>
          <div className="text-purple-700">Words Written</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="font-semibold text-gray-700">Time Taken</div>
          <div className="text-gray-600">{formatTime(result.timeTaken)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="font-semibold text-gray-700">Characters</div>
          <div className="text-gray-600">{result.charactersTyped}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="font-semibold text-red-700">Backspaces</div>
          <div className="text-red-600">{result.backspaceCount}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="font-semibold text-gray-700">Completed</div>
          <div className="text-gray-600">{result.completedAt}</div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onRestart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Take Another Test
        </button>

        <button
          onClick={onDownload}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download All Records</span>
        </button>
      </div>
    </div>
  );
};

export default Results;
