import React from 'react';
import EssayPrompt from './EssayPrompt';
import WritingArea from './WritingArea';

const TestInterface = ({ currentPrompt, userText, onChange, onKeyDown, textAreaRef }) => {
  return (
    <div className="space-y-6">
      <EssayPrompt prompt={currentPrompt} />
      <WritingArea
        userText={userText}
        onChange={onChange}
        onKeyDown={onKeyDown}
        textAreaRef={textAreaRef}
      />
    </div>
  );
};

export default TestInterface;
