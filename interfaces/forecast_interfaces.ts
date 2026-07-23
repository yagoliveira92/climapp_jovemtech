export interface ForecastDay {
    date: string;
    weekday: string;
    min: number;
    max: number;
    moon_phase: string;
}

export interface WeatherForecast {
    cityName: string;
    temp: number;
    date: string;
    description: string;
    conditionSlug: string;
    forecast: ForecastDay[];
}

export interface CityTileProps {
    cityName: string;
    icon: string;
    temperature: number;
    onTap: () => void;
}