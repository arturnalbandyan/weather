import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../Api";

interface WeatherState {
  data: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  list: any;
  unit: string;
}

const initialState: WeatherState = {
  data: null,
  loading: "idle",
  error: null,
  searchTerm: "",
  list: [],
  unit: "metric",
};

export const getCurrenthWeather = createAsyncThunk(
  "weather/getCurrenthWeather",
  async ({ city, unit }: { city: string; unit: string }) => {
    try {
      const response = await Api.getCurrentWeatherData({ city, unit });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data.message;
      } 
    }
  }
);

export const getWeatherList = createAsyncThunk(
  "weather/getWeatherList",
  async ({ city, unit }: { city: string; unit: string }) => {
    try {
      const response = await Api.getWeatherListData({ city, unit });
      if (response.data) {
        localStorage.setItem("location", city);
        localStorage.setItem("unit", unit);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data.message;
      } 
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrenthWeather.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCurrenthWeather.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCurrenthWeather.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      })
      .addCase(getWeatherList.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getWeatherList.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.list = action.payload;
      })
      .addCase(getWeatherList.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { setSearchTerm } = weatherSlice.actions;

export default weatherSlice.reducer;
