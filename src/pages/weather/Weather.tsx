import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import CurrentWeather from "../../components/currentWeather/CurrentWeather";
import WeatherList from "../../components/weatherList/WeatherList";
import {
  getCurrenthWeather,
  getWeatherList,
  setSearchTerm,
} from "../../store/weatherSlice";
import { RootState } from "../../store/store";
import useGetLocation from "../../hooks/useGetLocation";
import styles from "./Weather.module.scss";

interface SearchContainerProps {
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchContainer = ({
  handleSearch,
  inputValue,
  handleInputChange,
}: SearchContainerProps) => (
  <div className={styles.searchContainer}>
    <form onSubmit={handleSearch} className={styles.formContainer}>
      <input
        type="search"
        id="cityInput"
        name="cityInput"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.searchInput}
        placeholder="Enter city name..."
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  </div>
);

const Weather: React.FC = () => {
  useGetLocation();
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("metric");
  const { list, data, loading, error, searchTerm } = useSelector(
    (state: RootState) => state.weather
  );
  const [inputValue, setInputValue] = useState("");
  const request = (location: string) => {
    dispatch(getCurrenthWeather({ city: location, unit }) as any);
    dispatch(getWeatherList({ city: location, unit }) as any);
  };
  useEffect(() => {
    const location = localStorage.getItem("location");
    if (location) {
      request(location);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      request(searchTerm);
    }
  }, [dispatch, searchTerm, unit]);

  useEffect(() => {
    const location = localStorage.getItem("location");
    if (location) {
      request(location);
    }
  }, [unit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const toggleUnit = (unit: string) => {
    setUnit(unit);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchTerm(inputValue));
  };

  const CheckboxContainer = () => (
    <div className={styles.checkboxContainer}>
      <label>
        <input
          type="checkbox"
          onChange={() => toggleUnit("metric")}
          checked={unit === "metric"}
        />
        <div className={styles.customCheckbox}></div>
        Celsius
      </label>
      <label>
        <input
          type="checkbox"
          onChange={() => toggleUnit("imperial")}
          checked={unit === "imperial"}
        />
        <div className={styles.customCheckbox}></div>
        Fahrenheit
      </label>
    </div>
  );

  return (
    <main className={styles.weatherContainer}>
      <SearchContainer
        handleSearch={handleSearch}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
      {loading === "pending" && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <ClipLoader size={50} color={"#2196f3"} loading={true} />
          </div>
        </div>
      )}
      {loading === "failed" && (
        <div className={styles.loadingText}>{error}</div>
      )}

      {!!list && !!data && loading === "succeeded" ? (
        <>
          <CheckboxContainer />
          <CurrentWeather unit={unit} />
          <WeatherList unit={unit} />
        </>
      ) : null}
    </main>
  );
};

export default Weather;
