import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./CurrentWeather.module.scss";

interface CurrentWeatherProps {
  unit: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  unit,
}: CurrentWeatherProps) => {
  const { data } = useSelector((state: RootState) => state.weather);
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  return (
    <div className={styles.currentWeather}>
      <div className={styles.title}>
        <h1 className={styles.weatherTitle}>{data?.name || ""}</h1>
        <p>Today</p>
      </div>
      <div className={styles.weatherTemp}>
        <p>
          {Math.floor(data.main.temp)}°{unit === "metric" ? "C" : "F"}
        </p>
        <img src={iconUrl} alt={data.weather[0]} />
      </div>
      <p className={styles.weatherDescription}>{data.weather[0].description}</p>
    </div>
  );
};

export default memo(CurrentWeather);
