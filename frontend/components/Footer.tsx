
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-gray-500 border-t border-gray-700 mt-12">
      <p>&copy; {new Date().getFullYear()} Anime Wallpaper AI. Powered by Gemini.</p>
      <p className="text-xs mt-1">Generated images are for personal use. Results may vary.</p>
    </footer>
  );
};

export default Footer;
