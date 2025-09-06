import React from 'react';

const RecordsHistory = ({ testRecords, formatTime }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Test History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Score</th>
              <th className="text-left p-2">WPM</th>
              <th className="text-left p-2">Words</th>
              <th className="text-left p-2">Backspaces</th>
              <th className="text-left p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {testRecords.slice(-10).reverse().map((record) => (
              <tr key={record.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{new Date(record.timestamp).toLocaleDateString()}</td>
                <td className="p-2 font-semibold text-green-600">{record.score}</td>
                <td className="p-2">{record.wpm}</td>
                <td className="p-2">{record.wordsTyped}</td>
                <td className="p-2 text-red-600">{record.backspaceCount}</td>
                <td className="p-2">{formatTime(record.timeTaken)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordsHistory;
