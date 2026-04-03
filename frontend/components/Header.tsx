
import React from 'react';
import { APP_TITLE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 tracking-wider">
          {APP_TITLE}
        </h1>
        <p className="text-center text-indigo-300 mt-1 text-sm sm:text-base">Craft your perfect wallpaper with AI</p>
      </div>
    </header>
  );
};

export default Header;
