export type Theme =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "misty"
  | "neutral";

export const themeByCondition: Record<string, Theme> = {
  Clear: "sunny",
  Clouds: "cloudy",
  Rain: "rainy",
  Drizzle: "rainy",
  Thunderstorm: "stormy",
  Snow: "snowy",
  Mist: "misty",
  Fog: "misty",
  Haze: "misty",
};
