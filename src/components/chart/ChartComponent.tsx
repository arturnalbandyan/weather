import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const getDay = (date: string) => {
  const dateObject = new Date(date);
  const month = dateObject.toLocaleString("default", { month: "short" });
  const day = dateObject.getDate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeekAbbreviation = daysOfWeek[dateObject.getUTCDay()];
  const monthDay = month + " " + day;

  return [dayOfWeekAbbreviation, monthDay];
};

const ChartComponent: React.FC = () => {
  const data = useSelector((state: RootState) => state.weather.list);

  const filteredData =
    !!data &&
    data?.list?.filter((item: { dt_txt: string }) =>
      item.dt_txt.includes("12:00:00")
    );

  const timestamps = filteredData?.map((item: { dt_txt: string }) =>
    getDay(item.dt_txt)
  );
  const temperatures = filteredData?.map(
    (item: { main: { temp: string } }) => item.main.temp
  );
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        borderColor: "#3e9eee",
        borderWidth: 5,
        fill: true,
      },
    ],
  };

  return (
    <>
      {!!data && data?.list?.length ? (
        <div>
          <Line width={850} data={chartData} />
        </div>
      ) : null}
    </>
  );
};

export default memo(ChartComponent);
