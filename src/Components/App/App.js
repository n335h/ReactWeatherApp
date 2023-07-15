import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lightMode.css';
import './darkMode.css';
import ThemeToggle from '../ThemeToggle';
import weatherApp from '../../assets/weatherApp.png';
import ghLogo from '../../assets/ghLogo.png';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const API_KEY = '57a034c92e9e4ba3b3d66b3b8af80d87';

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

  const [searchPerformed, setSearchPerformed] = useState(false); // tracks if a search has been performed

  useEffect(() => {
    //changes the theme of the page
    document.body.className = theme; //sets the body of the page to the theme
  }, [theme]);

  const searchLocation = () => {
    axios
      .all([axios.get(url), axios.get(forecastUrl)])
      .then(
        axios.spread((currentWeather, forecastWeather) => {
          setData(currentWeather.data);
          setDescription(currentWeather.data.weather[0].description);
          setForecastData(forecastWeather.data.list.slice(0, 5));
          setSearchPerformed(true); // update the searchPerformed state
        })
      )
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };
  console.log(data);
  console.log(forecastData);

  return (
    <div
      className={`app ${
        theme === 'light' ? 'lightMode' : 'darkMode'
      }`}
    >
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="logoHead">
        <img className="logo" src={weatherApp} alt="" />
        <h1 className="title"> Weather Api</h1>
      </div>
      <div className="search">
        <input
          className="searchBar"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              searchLocation();
            }
          }}
          placeholder="Enter Location"
          type="text"
        />
        {/* <img
          className="searchIcon"
          src="https://img.icons8.com/ios/50/000000/search--v1.png"
          alt=""
        /> */}
        <button onClick={searchLocation}>Search</button>
      </div>

      {searchPerformed && ( // only render the container if search has been performed
        <div className="container">
          <div className="top">
            <div className="location">
              <span className="city">{data.name}</span>{' '}
              <span className="country">{data.sys?.country}</span>
            </div>
            <div className="temp">
              {data.main ? (
                <h1>
                  {data.main.temp}
                  <sup className="degrees">&deg;</sup>
                </h1>
              ) : null}
            </div>

            <div className="minmax">
              {data.main ? (
                <p>
                  {' '}
                  Min {data.main.temp_min}&deg; / Max{' '}
                  {data.main.temp_max}&deg;
                </p>
              ) : null}
            </div>
            <div className="description">
              {description && (
                <div>
                  {data.weather[0]?.icon && (
                    <img
                      className="weatherIcon"
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                      alt={data.weather[0].description}
                    />
                  )}
                  <p>{description}</p>
                </div>
              )}
              {/* <div className="SunRiseSet">
        {data.sys ? <p> Sunrise {data.sys.sunrise} / Sunset {data.sys.sunset}</p>: null}
      </div> */}
            </div>

            <div className="forecast">
              <div className="upcoming">
                {forecastData.map((forecast, index) => (
                  <div className="day" key={index}>
                    <p className="dayName">
                      {new Intl.DateTimeFormat(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(forecast.dt_txt))}
                    </p>

                    {forecast.weather[0]?.icon && (
                      <img
                        className="weatherIcon"
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        alt={forecast.weather[0].description}
                      />
                    )}
                    <p className="temp">{forecast.main.temp}&deg;C</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {' '}
              <img
                src="https://img.icons8.com/ios-filled/50/thermometer.png"
                alt=""
              />
              {data.main ? (
                <p className="bold">{data.main.feels_like}&deg;C</p>
              ) : null}
              <p className="bottomSmall"> Temp Feels Like</p>
            </div>
            <div className="humidity">
              {' '}
              <img
                src="https://img.icons8.com/ios/50/000000/humidity.png"
                alt=""
              />
              {data.main ? (
                <p className="bold">{data.main.humidity} % </p>
              ) : null}
              <p className="bottomSmall"> Humidity</p>
            </div>
            <div className="wind">
              {' '}
              <img
                src="https://img.icons8.com/ios/50/000000/wind.png"
                alt=""
              />
              {data.wind ? (
                <p className="bold">{data.wind.speed} MPH </p>
              ) : null}
              <p className="bottomSmall"> Wind Speed</p>
            </div>
            <div className="pressure">
              {' '}
              <img
                src="https://img.icons8.com/ios/50/000000/pressure.png"
                alt=""
              />
              {data.main ? (
                <p className="bold">{data.main.pressure} PSI </p>
              ) : null}
              <p className="bottomSmall"> Pressure</p>
            </div>
          </div>
        </div>
      )}
      <footer className="footer">
        <p> Created by Nicholas Horishny</p>
        <a className='ghLink' href="https://github.com/n335h/ReactWeatherApp">
          <img className="ghlogo" src={ghLogo} alt="" />
        </a>
      </footer>
    </div>
  );
}

export default App;
