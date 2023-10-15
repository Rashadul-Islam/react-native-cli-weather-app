export interface Location {
  name: string;
  country: string;
}

export interface WeatherData {
  location: Location;
  current: {
    condition: {
      text: string;
    };
    temp_c: number;
    wind_kph: number;
    humidity: number;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          text: string;
        };
        avgtemp_c: number;
      };
      astro: {
        sunrise: string;
      };
    }[];
  };
}
