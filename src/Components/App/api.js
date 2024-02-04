// api.js
import axios from 'axios';

const API_KEY = '57a034c92e9e4ba3b3d66b3b8af80d87'

export const useWeatherApi = () => {
	const fetchData = async (location) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
		const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;

		try {
			const [currentWeather, forecastWeather] =
				await axios.all([
					axios.get(url),
					axios.get(forecastUrl),
				]);

			return {
				currentWeather: currentWeather.data,
				forecastWeather:
					forecastWeather.data.list.slice(0, 5),
			};
		} catch (error) {
			console.error(
				'Error fetching weather data:',
				error
			);
			throw error; // Re-throw the error so the caller can handle it
		}
	};

	return { fetchData };
};
