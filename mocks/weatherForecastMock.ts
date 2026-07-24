import { WeatherForecast } from "@/interfaces/forecast_interfaces";

const MOCK_ICON = 'https://www.gstatic.com/weather/conditions/v1/svg/mostly_clear_night_light.svg'

export const MOCK_WEATHER_FORECAST: WeatherForecast[] = [
    {
        cityName: "Aracaju - SE",
        temp: 24,
        date: "23/07",
        description: "Parcialmente nublado",
        conditionSlug: MOCK_ICON,
        forecast: [
            { date: "23/07", weekday: "Qui", min: 22, max: 29, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "24/07", weekday: "Sex", min: 21, max: 30, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "25/07", weekday: "Sab", min: 22, max: 31, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "26/07", weekday: "Dom", min: 23, max: 30, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" }
        ]
    },
    {
        cityName: "Santos - SP",
        temp: 24,
        date: "23/07",
        description: "Encoberto",
        conditionSlug: MOCK_ICON,
        forecast: [
            { date: "23/07", weekday: "Qui", min: 19, max: 26, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "24/07", weekday: "Sex", min: 20, max: 27, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "25/07", weekday: "Sab", min: 18, max: 24, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "26/07", weekday: "Dom", min: 17, max: 23, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" }
        ]
    },
    {
        cityName: "Xique-Xique - BA",
        temp: 24,
        date: "23/07",
        description: "Ceo limpo",
        conditionSlug: MOCK_ICON,
        forecast: [
            { date: "23/07", weekday: "Qui", min: 20, max: 33, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "24/07", weekday: "Sex", min: 21, max: 34, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "25/07", weekday: "Sab", min: 21, max: 35, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "26/07", weekday: "Dom", min: 22, max: 34, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" }
        ]
    },
    {
        cityName: "Lagarto - SE",
        temp: 24,
        date: "23/07",
        description: "Chuvas isoladas",
        conditionSlug: MOCK_ICON,
        forecast: [
            { date: "23/07", weekday: "Qui", min: 22, max: 28, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "24/07", weekday: "Sex", min: 21, max: 27, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "25/07", weekday: "Sab", min: 22, max: 29, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" },
            { date: "26/07", weekday: "Dom", min: 23, max: 30, moon_phase: "https://img.icons8.com/glyph-neue/1200/moon.jpg" }
        ]
    }
];
