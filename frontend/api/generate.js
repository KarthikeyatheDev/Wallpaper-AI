// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { InferenceClient } from "@huggingface/inference";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const systemPrompt = `
// masterpiece, best quality, ultra detailed, illustration,
// clean line art, sharp outlines, vibrant colors,
// realistic style, highly detailed face and eyes,
// perfect anatomy, smooth shading, soft lighting,
// no realism, no 3d, 2d style
// `;

// // ✅ Initialize HF client
// const client = new InferenceClient(process.env.HF_TOKEN);
// app.get("/test", async (req, res) => {
//   const r = await fetch("https://huggingface.co/api/whoami-v2", {
//     headers: {
//       Authorization: `Bearer ${process.env.HF_TOKEN}`,
//     },
//   });

//   const data = await r.json();
//   res.json(data);
// });
// app.post("/generate", async (req, res) => {
//   try {
//     const { prompt, wallpaperType } = req.body;
//     const finalPrompt = `${systemPrompt}, ${prompt}`;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     // ✅ Set dimensions based on type
//     const type = String(wallpaperType || '').toLowerCase();
//     const dimensionsByType = {
//       desktop: { width: 1024, height: 576 },
//       mobile: { width: 576, height: 1024 },
//     };

//     const { width, height } = dimensionsByType[type] ?? { width: 1024, height: 1024 };
//     console.log("Generating:", { prompt, wallpaperType: type, width, height });

//     const image = await client.textToImage({
//       model: "stabilityai/stable-diffusion-xl-base-1.0",
//       provider:"hf-inference",
//       inputs: prompt,
//       parameters: {
//             width: wallpaperType === "desktop" ? 1024 : 576,
//             height: wallpaperType === "desktop" ? 576 : 1024,
//       },
//     });

//     const buffer = Buffer.from(await image.arrayBuffer());
//     const base64Image = buffer.toString("base64");

//     res.json({
//       base64Image,
//       mimeType: "image/png",
//     });

//   } catch (error) {
//     console.error("HF ERROR:", error);

//     res.status(500).json({
//       error: error?.message || "Image generation failed",
//     });
//   }
// });
// app.get("/", (req, res) => {
//   res.send("✅ Wallpaper Generator Backend Running");
// });

// app.listen(3000, () => {
//   console.log("🚀 Backend running on http://localhost:3000");
// });
import { InferenceClient } from "@huggingface/inference";

const systemPrompt = `
masterpiece, best quality, ultra detailed, illustration,
clean line art, sharp outlines, vibrant colors,
studio style, highly detailed face and eyes,
perfect anatomy, smooth shading, soft lighting,
no realism, no 3d, 2d style
`;

const client = new InferenceClient(process.env.HF_TOKEN);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt, wallpaperType } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const type = String(wallpaperType || "").toLowerCase();

    const dimensionsByType = {
      desktop: { width: 1024, height: 576 },
      mobile: { width: 576, height: 1024 },
    };

    const { width, height } =
      dimensionsByType[type] ?? { width: 1024, height: 1024 };

    const finalPrompt = `${systemPrompt}, ${prompt}`;

    const image = await client.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      provider: "hf-inference",
      inputs: finalPrompt,
      parameters: { width, height },
    });

    const buffer = Buffer.from(await image.arrayBuffer());

    res.setHeader("Content-Type", "image/png");
    res.send(buffer);

  } catch (error) {
    console.error("HF ERROR:", error);

    res.status(500).json({
      error: error?.message || "Image generation failed",
    });
  }
}