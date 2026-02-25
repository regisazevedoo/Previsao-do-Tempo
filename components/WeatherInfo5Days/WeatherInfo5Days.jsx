import { useState } from "react";
import "./WeatherInfo5Days.css";

const WeatherInfo5Days = ({ weather5Days }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  let dailyForecast = {};

  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const nextFiveDays = Object.values(dailyForecast).slice(1, 6);
  const forecast = nextFiveDays[currentIndex];

  function nextDay() {
    setCurrentIndex((prev) =>
      prev === nextFiveDays.length - 1 ? 0 : prev + 1
    );
  }

  function prevDay() {
    setCurrentIndex((prev) =>
      prev === 0 ? nextFiveDays.length - 1 : prev - 1
    );
  }

  function convertDate(forecast) {
    return new Date(forecast.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });
  }


  return (
    <div className="weather-container">
      <h3>Previsão para os próximos 5 dias</h3>

      <div className="slide">
        <p>{convertDate(forecast)}</p>

        <img
          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
          alt=""
        />

        <p>{forecast.weather[0].description}</p>

        <p>
          {Math.round(forecast.main.temp_min)}ºC min |{" "}
          {Math.round(forecast.main.temp_max)}ºC máx
        </p>
      </div>

      <div className="controls">
        <button onClick={prevDay}>◀</button>
        <button onClick={nextDay}>▶</button>
      </div>
    </div>
  );
};

export default WeatherInfo5Days;
