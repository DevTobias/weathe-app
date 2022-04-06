export type LocationDetailProps = {
  locationName: string;
};

export type LocationDetailQuery = {
  location: {
    icon: string;
    date: string;
    temperature: string;
    description: string;
    probabilityRain: number;
    windSpeed: number;
    currentTemperature: number;
  };
};

export type ForecastQuery = {
  locationForecast: {
    icon: string;
    time: string;
    temperature: string;
    probabilityRain: number;
  }[];
};
