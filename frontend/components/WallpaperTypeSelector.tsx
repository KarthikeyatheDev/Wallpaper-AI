
import React from 'react';
import { WallpaperTypeDetails } from '../constants';
import { WallpaperType } from '../types';

interface WallpaperTypeSelectorProps {
  selectedType: WallpaperType;
  onSelectType: (type: WallpaperType) => void;
  disabled: boolean;
}

const wallpaperTypesToDisplay: WallpaperType[] = [WallpaperType.MOBILE, WallpaperType.DESKTOP];

const WallpaperTypeSelector: React.FC<WallpaperTypeSelectorProps> = ({ selectedType, onSelectType, disabled }) => {
  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3 text-indigo-300">2. Choose Format:</h3>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        {wallpaperTypesToDisplay.map((key) => (
          <button
            key={key}
            onClick={() => onSelectType(key)}
            disabled={disabled}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-400
              ${selectedType === key 
                ? 'bg-pink-500 text-white shadow-lg ring-2 ring-pink-300' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' : ''}
            `}
          >
            {WallpaperTypeDetails[key].label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WallpaperTypeSelector;
