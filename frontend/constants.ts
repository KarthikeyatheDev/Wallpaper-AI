
import { WallpaperType } from './types';

export const APP_TITLE = "Anime Wallpaper AI";
export const GEMINI_IMAGE_MODEL = 'imagen-3.0-generate-002';

export const PROMPT_PLACEHOLDER = "e.g., samurai overlooking a neon Tokyo, space explorer discovering alien flora, fantasy knight in a mystical forest...";

export const WallpaperTypeDetails = {
  [WallpaperType.MOBILE]: {
    label: "Mobile (576x1024)",
    aspectRatioPrompt: "a vertical 9:16 aspect ratio, perfect for smartphone screens",
    width: 576,
    height: 1024,
  },
  [WallpaperType.DESKTOP]: {
    label: "Desktop (1024x576)",
    aspectRatioPrompt: "a horizontal 16:9 aspect ratio, ideal for widescreen monitors",
    width: 1024,
    height: 576,
  }
};
