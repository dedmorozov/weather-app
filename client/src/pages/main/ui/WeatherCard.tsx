import { formatTemp } from "@/shared/lib/formatTemp";
import { formatTime } from "@/shared/lib/formatTime";
import { Weather } from "@/shared/types/weather";

import { Chip } from "@/shared/ui/chip";

export const WeatherCard = ({
  city,
  country,
  description,
  condition,
  cachedAt,
  icon,
  temperature,
  feelsLike,
  humidity,
  windSpeed,
}: Weather) => {
  const humidityValue = humidity !== undefined ? `${humidity}%` : "—";
  const windValue = windSpeed !== undefined ? `${windSpeed} m/s` : "—";

  return (
    <section className="weather-card">
      <div className="weather-card__info info">
        <div>
          <p className="info__city">
            {city}
            {country ? `, ${country}` : ""}
          </p>

          <p className="info__condition">{description || condition || "—"}</p>

          <p className="info__muted">
            {cachedAt ? formatTime(cachedAt) : "Right now"}
          </p>
        </div>

        {icon && (
          <img
            className="info__icon"
            alt={description || condition || ""}
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          />
        )}
      </div>

      <div className="weather-card__temps temps">
        <div>
          <p className="temps__temp">{formatTemp(temperature)}</p>

          <p className="temps__muted">Feels like {formatTemp(feelsLike)}</p>
        </div>

        <div className="temps__chips">
          <Chip label="Humidity" value={humidityValue} />

          <Chip label="Wind" value={windValue} />
        </div>
      </div>
    </section>
  );
};
