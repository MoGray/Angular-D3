export interface WeatherData{
    currently: Currently,
    length: number
}

export interface Currently{
    humidity: number;
    temperature: number;
    dewPoint: number;
    windSpeed: number;
    cloudCover: number;
    ozone: number;
}