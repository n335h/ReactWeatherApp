import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lightMode.css';
import './darkMode.css';
import ThemeToggle from '../ThemeToggle';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const API_KEY = '57a034c92e9e4ba3b3d66b3b8af80d87';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

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

  useEffect(() => {
    //changes the theme of the page
    document.body.className = theme; //sets the body of the page to the theme
  }, [theme]);

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      setDescription(response.data.weather[0].description);
      console.log(response.data);
    });
  };

  return (
    <div
      className={`app ${
        theme === 'light' ? 'lightMode' : 'darkMode'
      }`}
    >
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="search">
        <input 
        className='searchBar'
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
    </div>
  );
}

export default App;
