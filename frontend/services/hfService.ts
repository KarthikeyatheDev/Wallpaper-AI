import { WallpaperTypeDetails } from "../../constants";
import { WallpaperType } from "../../types";

export const generateWallpaper = async (prompt: string, wallpaperType: string) => {
  const response = await fetch("http://localhost:3000/generate", {
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

  const data = await response.json();

  console.log("SERVICE RESPONSE:", data); // 🔍 debug

  // ✅ IMPORTANT: match backend keys
  return {
    base64Image: data.base64Image,
    mimeType: data.mimeType || "image/png",
  };
};