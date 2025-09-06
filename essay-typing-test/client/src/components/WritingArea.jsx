import React from 'react';

const WritingArea = ({ userText, onChange, onKeyDown, textAreaRef }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Your Essay:</h3>
        <span className="text-sm text-gray-500">
          Backspace penalty: -0.5 points each
        </span>
      </div>

      <textarea
        ref={textAreaRef}
        value={userText}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Start typing your essay here..."
        className="w-full h-96 p-4 border-2 border-gray-200 text-black rounded-lg resize-none focus:border-indigo-500 focus:outline-none text-lg leading-relaxed"
      />
    </div>
  );
};

export default WritingArea;
