import React, { useState } from 'react'
import axios from 'axios'

function App() {

//const url = "https://api.openweathermap.org/data/2.5/weather?q={coventry}&appid={5eb603315ec94991da73aed26cb52efb}" 

return (
<div className ="app">
<div className="container">
<div className="top">
<div className="location">
<p>Coventry</p>
</div>
<div className="temp">
<h1> Temp</h1>
</div>
<div className="descripton">
<p> Clouds</p>
</div>
<div className="bottom">
<div className="feels">
  <p> Temp Feels</p>
</div>
<div className="humididty">
<p> 20</p>
</div>
<div className="wind">
  <p> 12 MPH</p>
</div>
</div>

</div>
</div>
</div>

);

}


export default App;
