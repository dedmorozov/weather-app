export type WeatherSource = "cache" | "live";

export type Weather = {
  city: string;
  country?: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  description?: string;
  condition?: string;
  icon?: string;
  units?: "metric";
  source?: WeatherSource;
  cachedAt?: number;
};

