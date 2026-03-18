import React, { useState, useCallback } from 'react';

import Header from './frontend/components/Header';
import Footer from './frontend/components/Footer';
import PromptInput from './frontend/components/PromptInput';
import WallpaperTypeSelector from './frontend/components/WallpaperTypeSelector';
import ImageDisplay from './frontend/components/ImageDisplay';
import LoadingSpinner from './frontend/components/LoadingSpinner';

import { WallpaperType, GeneratedImage } from './types';
import { generateWallpaper as callGenerateWallpaperService } from './frontend/services/hfService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [wallpaperType, setWallpaperType] = useState<WallpaperType>(WallpaperType.DESKTOP);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateWallpaper = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to describe the wallpaper.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const { base64Image, mimeType } = await callGenerateWallpaperService(prompt,wallpaperType);

      const sanitizedPrompt = prompt
        .substring(0, 30)
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_{2,}/g, '_');

      const imageName = `anime_wallpaper_${sanitizedPrompt}_${wallpaperType}.png`;

      setGeneratedImage({
        src: `data:${mimeType};base64,${base64Image}`,
        alt: `Anime wallpaper generated for prompt: ${prompt}`,
        filename: imageName,
      });

    } catch (err) {
      console.error("Generation Error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while generating your wallpaper.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, wallpaperType]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl ring-1 ring-gray-700">

          {/* Error Box */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border bg-red-800/80 text-red-100 border-red-700">
              <h3 className="font-bold text-lg mb-1">Oops! Something went wrong</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            onSubmit={handleGenerateWallpaper}
            isLoading={isLoading}
            apiKeyAvailable={true} // always true now
          />

          <WallpaperTypeSelector
            selectedType={wallpaperType}
            onSelectType={setWallpaperType}
            disabled={isLoading}
          />

          {isLoading && <LoadingSpinner />}

          {generatedImage && !isLoading && (
            <ImageDisplay image={generatedImage} />
          )}

          {!isLoading && !generatedImage && !error && (
            <div className="mt-8 text-center p-6 bg-gray-700/50 rounded-lg border border-gray-600">
              <p className="text-indigo-300 text-xl font-medium">
                Ready to create some magic? ✨
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                Type your dream anime scene, pick a format, and let the AI bring it to life!
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;