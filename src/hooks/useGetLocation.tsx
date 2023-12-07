import { useDispatch } from "react-redux";
import { getCurrenthWeather, getWeatherList } from "../store/weatherSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useGetLocation = (): void => {
  const dispatch = useDispatch();
  const location = localStorage.getItem("location");
  const { error } = useSelector((state: RootState) => state.weather);

  const unit = "metric";
  if (!location && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "6e025d67a42844859eb76ff483a1d11e";
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              const city = data.results[0].components.city;
              if (!error) {
                dispatch(getCurrenthWeather({ city, unit }) as any);
                dispatch(getWeatherList({ city, unit }) as any);
              }
            } else {
              console.log("City not found");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }
};

export default useGetLocation;
