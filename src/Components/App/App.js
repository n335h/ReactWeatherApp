import React, {
	useState,
	useEffect,
} from 'react';

// styles
import './lightMode.css';
import './darkMode.css';

// components
import ThemeToggle from '../ThemeToggle';
import Search from '../../Components/search';
import WeatherData from '../../Components/weatherData';
import Footer from '../../Components/footer';
import Header from '../../Components/header';

import { useWeatherApi } from './api';

// App component
function App() {
	const [data, setData] = useState({});
	const [location, setLocation] = useState('');
	const [description, setDescription] =
		useState('');
	const [forecastData, setForecastData] =
		useState([]);
	const [searchPerformed, setSearchPerformed] =
		useState(false);
	const [theme, setTheme] = useState('light'); //sets the theme to light mode

	const { fetchData } = useWeatherApi();

	// function to toggle the theme
	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	// function to search for the location
	const searchLocation = async () => {
		try {
			const { currentWeather, forecastWeather } =
				await fetchData(location);

			setData(currentWeather);
			setDescription(
				currentWeather.weather[0].description
			);
			setForecastData(forecastWeather);
			setSearchPerformed(true);
		} catch (error) {
			// Handle error, maybe show a user-friendly message
		}
	};
	return (
		<div
			className={`app ${
				theme === 'light'
					? 'lightMode'
					: 'darkMode'
			}`}>
			<ThemeToggle
				theme={theme}
				toggleTheme={toggleTheme}
			/>
			<Header />
			<Search
				location={location}
				setLocation={setLocation}
				searchLocation={searchLocation}
			/>

			{searchPerformed && (
				<WeatherData
					data={data}
					description={description}
					forecastData={forecastData}
				/>
			)}

			<Footer />
		</div>
	);
}

export default App;
