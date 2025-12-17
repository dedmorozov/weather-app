import { FormEvent, useState } from "react";

import { Status } from "@/shared/types/status";

type FormProps = {
  status: Status;
  error: string | null;
  onSearch: (city: string) => Promise<void>;
};

export const WeatherForm = ({ status, error, onSearch }: FormProps) => {
  const [cityInput, setCityInput] = useState<string>("");
  const suggestions = [
    "Kyiv",
    "Palma de Mallorca",
    "New York",
    "Antarctica",
    "Loha",
  ];

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(cityInput);
  };

  const handleSuggestionClick = (city: string) => {
    setCityInput(city);
    onSearch(city);
  };

  return (
    <section className="weather-form">
      <form onSubmit={onSubmit}>
        <label className="input-label" htmlFor="city">
          City
        </label>

        <div className="input-row">
          <input
            id="city"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Kyiv, Lisbon, Miami..."
          />

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "Search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </form>

      <div className="weather-form__suggestions suggestions">
        <p className="suggestions__text">
          Try searching other cities to see weather conditions:
        </p>
        <ul className="suggestions__list">
          {suggestions.map((city) => (
            <li key={city} className="suggestions__list-item">
              <button
                type="button"
                onClick={() => handleSuggestionClick(city)}
                disabled={status === "loading"}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
