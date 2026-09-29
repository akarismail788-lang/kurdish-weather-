import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enterprise Security Headers (Allowing iframe embedding as per AI Studio runtime)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(self)');
  next();
});

// Initialize GoogleGenAI SDK
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

/**
 * GET /api/weather-news
 * Leverages Gemini API (model: gemini-3.8-flash) to compile real-time daily weather news,
 * agricultural advisories, and climate trends specifically tailored for Kurdistan.
 */
app.get('/api/weather-news', async (req, res) => {
  const city = (req.query.city as string) || 'Erbil';

  // If no Gemini API key configured, return high-fidelity Kurdistan meteorological briefing
  if (!aiClient) {
    return res.json({
      fallback: true,
      message: 'Default curated Kurdistan meteorological data loaded (no GEMINI_API_KEY provided)',
    });
  }

  try {
    const prompt = `You are the chief meteorologist and climate journalist for "Kurdish Weather" (كەشوهەوای کوردی).
Generate an insightful, highly accurate, and engaging daily weather news briefing for Kurdistan (including Erbil, Sulaymaniyah, Duhok, Halabja, Kirkuk, Zakho, Garmian, and the Zagros mountains) in pristine Central Kurdish (Sorani) for today.

Provide the response in strict JSON format with the following schema:
{
  "dateKu": "String (e.g. سێشەممە، ٢٩ی ئەیلوول)",
  "generatedAt": number (Unix timestamp in ms),
  "headlineKu": "String (engaging headline in Kurdish)",
  "generalSummaryKu": "String (2-3 sentences overview of Kurdistan weather)",
  "agriculturalAdvisoryKu": "String (practical advice for Kurdish farmers regarding soil moisture, irrigation, and wind)",
  "waterReservoirStatusKu": "String (status of Dukan, Darbandikhan, and mountain snowpack)",
  "articles": [
    {
      "id": "String (e.g. news_ai_1)",
      "titleKu": "String",
      "summaryKu": "String",
      "contentKu": "String (rich detailed 2-3 paragraphs in Sorani Kurdish)",
      "category": "meteorology" | "agriculture" | "climate" | "dams",
      "categoryLabelKu": "String",
      "authorKu": "String (e.g. دەستەی کەشناسی زیرەکی کوردی)",
      "readTimeMinutes": number,
      "timestamp": number,
      "dateKu": "String",
      "tagsKu": ["String"],
      "sourceKu": "String",
      "isFeatured": boolean,
      "highlightKu": "String",
      "seasonalTipKu": "String",
      "regionsKu": ["String"]
    }
  ]
}
Make sure all text is in natural, elegant Sorani Kurdish.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    }

    throw new Error('Empty response from Gemini');
  } catch (error) {
    console.error('Gemini weather news generation error:', error);
    return res.status(500).json({ error: 'Failed to generate AI weather news', fallback: true });
  }
});

// Setup Vite middleware in dev or serve dist in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Kurdish Weather server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
