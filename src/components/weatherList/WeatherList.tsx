import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import styles from "./WeatherList.module.scss";
import ChartComponent from "../chart/ChartComponent";

interface ListContainerProps {
  unit: string;
}

interface ItemProps {
  dt: number;
  dt_txt: string;
  weather: {
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
  };
}

const ListContainer = ({ unit }: ListContainerProps) => {
  const data = useSelector((state: RootState) => state.weather.list);
  const filteredData =
    !!data &&
    data?.list?.filter((item: { dt_txt: string }) =>
      item.dt_txt.includes("12:00:00")
    );

  return (
    <div className={styles.weatherList}>
      {filteredData?.length &&
        filteredData.map((item: ItemProps) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

          return (
            <div key={item.dt} className={styles.weatherListItem}>
              <div className={styles.title}>
                <p>{getDay(item.dt_txt)[1]}</p>
                <p className={styles.day}>{getDay(item.dt_txt)[0]}</p>
              </div>
              <img src={iconUrl} alt={item.weather[0].description} />
              <p className={styles.weatheTemp}>
                {Math.floor(item.main.temp)}°{unit === "metric" ? "C" : "F"}
              </p>
              <p className={styles.weatherDescription}>
                {item.weather[0].description}
              </p>
            </div>
          );
        })}
    </div>
  );
};

const getDay = (date: string) => {
  const dateObject = new Date(date);
  const month = dateObject.toLocaleString("default", { month: "short" });
  const day = dateObject.getDate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeekAbbreviation = daysOfWeek[dateObject.getUTCDay()];
  const monthDay = month + " " + day;

  return [dayOfWeekAbbreviation, monthDay];
};

const WeatherList: React.FC<ListContainerProps> = ({
  unit,
}: ListContainerProps) => {
  return (
    <div className={styles.weatherListContainer}>
      <p className={styles.containerTitle}>10 Day Weather Forecast</p>
      <ListContainer unit={unit} />
      <ChartComponent />
    </div>
  );
};

export default memo(WeatherList);
