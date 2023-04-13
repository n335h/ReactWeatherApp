import React, { useState } from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const API_KEY = '57a034c92e9e4ba3b3d66b3b8af80d87'

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`

  

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
      setData(response.data)
      setDescription(response.data.weather[0].description)
      console.log (response.data)
      })
    }
  }
  

  return (
  <div className ="app">

    <div className="search">
    <input 
    value={location}
    onChange={event => setLocation(event.target.value)}
    onKeyPress={searchLocation}
    placeholder='Enter Location'
    type="text"/> 
    </div>


      <div className="container">
      <div className="top">
      <div className="location">
      <span>{data.name}  {data.sys?.country}</span>
        </div>
      <div className="temp">
        {data.main ? <h1>{data.main.temp}&deg;C</h1>: null}
      </div>

      <div className="minmax">
        {data.main ? <p> Min {data.main.temp_min}&deg;C / Max {data.main.temp_max}&deg;C</p>: null}
      </div>
      <div className="description">
          {description && (
            <div>
              {data.weather[0]?.icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt={data.weather[0].description}
                />
              )}
              <p>{description}</p>
            </div>
          )}
        </div>


       
    
        </div>
      <div className="bottom">
      <div className="feels">
        {data.main ?  <p className="bold">{data.main.feels_like}&deg;C</p> : null}
        <p> Temp Feels Like</p>
      </div>
      <div className="humidity">
        {data.main ?  <p className="bold">{data.main.humidity} % </p> : null}
      <p> Humidity</p>
      </div>
      <div className="wind">
        {data.wind ?  <p className="bold">{data.wind.speed} MPH </p> : null}
        <p> Wind Speed</p>
      </div>
      </div>

      </div>
      </div>


  );
} 




  export default App;
