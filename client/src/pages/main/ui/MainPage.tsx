import { type FC, useEffect, useMemo } from "react";

import { Theme, themeByCondition } from "../model/types";
import { useWeather } from "@/features/weather/model/useWeather";
import { DEFAULT_CITY } from "@/shared/lib/constants/default.constants";

import { WeatherForm } from "./WeatherForm";
import { WeatherCard } from "./WeatherCard";

export const MainPage: FC = () => {
  const { weather, status, error, search } = useWeather();

  const theme = useMemo<Theme>(() => {
    if (weather?.condition && themeByCondition[weather.condition]) {
      return themeByCondition[weather.condition];
    }

    return "neutral";
  }, [weather]);

  useEffect(() => {
    search(DEFAULT_CITY);
  }, [search]);

  return (
    <div className={`app ${theme}`}>
      <div className="backdrop" />

      <div className="container">
        <header className="header">
          <h1>Weather app</h1>
        </header>

        <WeatherForm status={status} error={error} onSearch={search} />

        {weather && <WeatherCard {...weather} />}
      </div>
    </div>
  );
};
