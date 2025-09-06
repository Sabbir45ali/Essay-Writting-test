import React from 'react';
import { FileText, Download } from 'lucide-react';

const StartScreen = ({ onStart, hasRecords, onDownload, onReset }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mb-8">
        <FileText className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Essay Test?</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          You'll have 30 minutes to write a comprehensive essay on a given topic. 
          Your typing speed, accuracy, and content quality will be evaluated.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={onStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl px-8 py-4 rounded-xl transition-colors font-semibold"
        >
          Start Essay Test
        </button>

        {hasRecords && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Records</span>
            </button>

            <button
              onClick={onReset}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Clear All Records
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartScreen;
