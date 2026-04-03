
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageDisplayProps {
  image: GeneratedImage | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image }) => {
  if (!image) {
    return null;
  }

  return (
    <div className="my-8 p-4 sm:p-6 bg-gray-700/50 rounded-lg shadow-xl ring-1 ring-pink-500/30">
      <h3 className="text-2xl font-semibold mb-6 text-center text-indigo-300">Your Masterpiece Awaits!</h3>
      <div className="flex justify-center mb-6">
        <img 
          src={image.src} 
          alt={image.alt} 
          className="max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[70vh] rounded-md shadow-2xl border-4 border-pink-500 object-contain"
        />
      </div>
      <div className="text-center">
        <a
          href={image.src}
          download={image.filename}
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-400"
        >
          Download Wallpaper
        </a>
      </div>
    </div>
  );
};

export default ImageDisplay;
