import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { TEN_MINUTES } from "./lib.js";
import { WeatherResponse } from "./types.js";

dotenv.config();

type CacheEntry = {
  timestamp: number;
  data: WeatherResponse;
};

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

const cache: Map<string, CacheEntry> = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/weather", async (req: Request, res: Response) => {
  const cityRaw = req.query.city;
  const city = Array.isArray(cityRaw) ? cityRaw[0] : cityRaw;

  if (!city || !city.trim()) {
    return res.status(400).json({ error: "City is required" });
  }

  const normalizedCity = normalizeCity(city);
  const cacheKey = normalizedCity;
  const cached = getCached(cacheKey);

  if (cached) {
    return res.json({
      source: "cache",
      cachedAt: cached.cachedAt,
      ...cached.data,
    });
  }

  if (!API_KEY) {
    return res
      .status(500)
      .json({
        error: "Missing OPENWEATHER_API_KEY env variable on the server",
      });
  }

  try {
    const weather = await fetchWeather(normalizedCity, API_KEY);
    setCached(cacheKey, weather);

    return res.json({ source: "live", cachedAt: Date.now(), ...weather });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Weather fetch failed:", message);
    return res.status(502).json({ error: "Failed to fetch weather data" });
  }
});

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get("*", (_req, res) =>
    res.sendFile(path.join(clientDistPath, "index.html"))
  );
} else {
  app.get("*", (_req, res) =>
    res.json({
      status: "ok",
      message:
        "Client build not found. Run npm run dev (root) or build the client to serve it here.",
    })
  );
}

app.listen(PORT, () => {
  console.log(`Weather server running on port ${PORT}`);
});

const normalizeCity = (value: string): string => value.trim().toLowerCase();

const getCached = (
  key: string
): { cachedAt: number; data: WeatherResponse } | null => {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  const isFresh = Date.now() - entry.timestamp < TEN_MINUTES;
  if (!isFresh) {
    cache.delete(key);
    return null;
  }

  return { cachedAt: entry.timestamp, data: entry.data };
};

const setCached = (key: string, data: WeatherResponse): void => {
  cache.set(key, { timestamp: Date.now(), data });
};

const fetchWeather = async (
  city: string,
  apiKey: string
): Promise<WeatherResponse> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API responded with ${response.status}: ${errorText}`);
  }

  const payload = (await response.json()) as any;

  return {
    city: payload.name,
    country: payload.sys?.country,
    temperature: payload.main?.temp,
    feelsLike: payload.main?.feels_like,
    humidity: payload.main?.humidity,
    windSpeed: payload.wind?.speed,
    description: payload.weather?.[0]?.description,
    condition: payload.weather?.[0]?.main,
    icon: payload.weather?.[0]?.icon,
    units: "metric",
  };
};
