import { WallpaperTypeDetails } from "../constants";
import { WallpaperType } from "../types";

export const generateWallpaper = async (prompt: string, wallpaperType: string) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, wallpaperType }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI generation failed: ${errorText}`);
  }

  // ✅ FIX: read as blob instead of JSON
  const blob = await response.blob();

  const imageUrl = URL.createObjectURL(blob);

  return {
    imageUrl,
  };
};