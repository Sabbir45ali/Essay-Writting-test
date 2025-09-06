import React from 'react';

const EssayPrompt = ({ prompt }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Essay Topic:</h3>
      <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">{prompt}</p>
    </div>
  );
};

export default EssayPrompt;
