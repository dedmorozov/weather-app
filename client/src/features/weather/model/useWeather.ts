import { useCallback, useState } from "react";

import type { Status } from "@/shared/types/status";
import type { Weather } from "@/shared/types/weather";

import { fetchWeather } from "./api";

type UseWeatherResult = {
  weather: Weather | null;
  status: Status;
  error: string | null;
  search: (city: string) => Promise<void>;
};

export const useWeather = (): UseWeatherResult => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (city: string) => {
    try {
      setStatus("loading");
      setError(null);

      const data = await fetchWeather(city);

      setWeather(data);
      setStatus("success");
    } catch (err) {
      console.log(err, "useWeather error");
      const message = err instanceof Error ? err.message : "Something went wrong";

      setError(message);
      setStatus("error");
    }
  }, []);

  return { weather, status, error, search };
};
