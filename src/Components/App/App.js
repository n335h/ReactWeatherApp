import React, {
	useState,
	useEffect,
} from 'react';
import axios from 'axios';
import './lightMode.css';
import './darkMode.css';
import ThemeToggle from '../ThemeToggle';

import Search from '../../Components/search';
import WeatherData from '../../Components/weatherData';
import Footer from '../../Components/footer';
import Header from '../../Components/header';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
	const [data, setData] = useState({});
	const [location, setLocation] = useState('');
	const [description, setDescription] =
		useState('');
	const [forecastData, setForecastData] =
		useState([]);

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;
	const [theme, setTheme] = useState('light'); //sets the theme to light mode
	const toggleTheme = () => {
		//toggles the theme
		if (theme === 'light') {
			//if the theme is light, then it will change to dark mode
			setTheme('dark'); //sets the theme to dark mode
		} else {
			setTheme('light'); //sets the theme to light mode
		}
		console.log(toggleTheme);
	};

	const [searchPerformed, setSearchPerformed] =
		useState(false); // tracks if a search has been performed

	useEffect(() => {
		//changes the theme of the page
		document.body.className = theme; //sets the body of the page to the theme
	}, [theme]);

	const searchLocation = () => {
		axios
			.all([
				axios.get(url),
				axios.get(forecastUrl),
			])
			.then(
				axios.spread(
					(currentWeather, forecastWeather) => {
						setData(currentWeather.data);
						setDescription(
							currentWeather.data.weather[0]
								.description
						);
						setForecastData(
							forecastWeather.data.list.slice(
								0,
								5
							)
						);
						setSearchPerformed(true); // update the searchPerformed state
					}
				)
			)
			.catch((error) => {
				console.error(
					'Error fetching weather data:',
					error
				);
			});
	};
	console.log(data);
	console.log(forecastData);

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
