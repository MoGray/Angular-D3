export interface WeatherModel {
    currently: CurrentlyWeatherScatterplot
}

export interface CurrentlyWeatherScatterplot {
    apparentTemperature: number,
    humidity: number
}