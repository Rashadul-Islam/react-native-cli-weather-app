import axios from 'axios';
import { apiKey } from '../constans';

interface ForecastParams {
  cityName: string;
  days: string;
}

const forecastEndpoint = (params: ForecastParams) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;

const locationsEndpoint = (cityName: string) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchWeatherForecast = (params: ForecastParams) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchLocations = (cityName: string) => {
  let locationsUrl = locationsEndpoint(cityName);
  return apiCall(locationsUrl);
};
