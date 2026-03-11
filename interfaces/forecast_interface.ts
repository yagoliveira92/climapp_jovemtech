export interface WeatherForecast {
  cityName: string;
  conditionSlug: string;
  temp: number;
  date: string;
  description: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  weekday: string;
  max: number;
  min: number;
  moon_phase: string;
}

interface CityTileProps {
    cityName: string;
    icon: string;
    temperature: number;
    onTap: () => void;
}