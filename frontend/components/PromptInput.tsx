
import React from 'react';
import { PROMPT_PLACEHOLDER } from '../constants';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  apiKeyAvailable: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, onSubmit, isLoading, apiKeyAvailable }) => {
  const canSubmit = apiKeyAvailable && prompt.trim().length > 0 && !isLoading;
  return (
    <div className="my-6">
      <label htmlFor="prompt" className="block text-lg font-semibold mb-3 text-indigo-300">
        1. Describe Your Vision:
      </label>
      <textarea
        id="prompt"
        rows={4}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-200 placeholder-gray-400 transition-colors disabled:opacity-60"
        placeholder={PROMPT_PLACEHOLDER}
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={isLoading || !apiKeyAvailable}
      />
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-700"
      >
        {isLoading ? 'Generating...' : '✨ Create Wallpaper ✨'}
      </button>
    </div>
  );
};

export default PromptInput;
