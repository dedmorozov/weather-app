import type { Weather } from "@/shared/types/weather";

export const fetchWeather = async (city: string): Promise<Weather> => {
  const trimmedCity = city.trim();

  if (!trimmedCity) {
    throw new Error("Enter a city name");
  }

  const response = await fetch(
    `/api/weather?city=${encodeURIComponent(trimmedCity)}`
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Oops, something went wrong");
  }

  const data = await response.json();

  return { ...data, city: data.city || trimmedCity };
};
