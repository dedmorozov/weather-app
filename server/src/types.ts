export type WeatherResponse = {
  city: string;
  country?: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  description?: string;
  condition?: string;
  icon?: string;
  units: 'metric';
};
