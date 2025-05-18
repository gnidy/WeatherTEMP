import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export interface CounterState {
  result: number
  weatherData: Record<string, any>
  isloading: boolean
}

const initialState: CounterState = {
  result: 0,
  weatherData: {},
  isloading: false,
}

export const FetchWeatherAPI = createAsyncThunk("weatherApi=>fetchWather", async () => {
      const apiKey = 'add api key from openWeather'; // Replace with your OpenWeatherMap API key
      
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${30.033333}&lon=${31.233334}&appid=${apiKey}&units=metric`)
        
      const temp = response.data.main.temp;
      const max = response.data.main.temp_max;
      const min = response.data.main.temp_min;
      const des = response.data.weather[0].description;
      const icon = response.data.weather[0].icon;

    return {temp, max, min, des, icon};
      
  })
  

export const WeatherAPIslice = createSlice({
  name: 'WeatherAPI',
  initialState,
  reducers: {
    ChangeWeatherAPI: (state) => {
      state.result = 1
    },
  },
  extraReducers(builder) {
    builder.addCase(FetchWeatherAPI.pending, (state, action) => {
      state.isloading = true
    }).addCase(FetchWeatherAPI.fulfilled, (state, action) => {
      state.isloading = false
      state.weatherData = action.payload
    }).addCase(FetchWeatherAPI.rejected, (state, action) => {
      state.isloading = false
    })
  }
})

// Action creators are generated for each case reducer function
export const { ChangeWeatherAPI } = WeatherAPIslice.actions

export default WeatherAPIslice.reducer