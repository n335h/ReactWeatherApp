import React from 'react';

const WeatherData = ({
	data,
	description,
	forecastData,
}) => (
	// only render the container if search has been performed
	<div className='container'>
		<div className='top'>
			<div className='location'>
				<span className='city'>{data.name}</span>{' '}
				<span className='country'>
					{data.sys?.country}
				</span>
			</div>
			<div className='temp'>
				{data.main ? (
					<h1>
						{data.main.temp}
						<sup className='degrees'>&deg;</sup>
					</h1>
				) : null}
			</div>

			<div className='minmax'>
				{data.main ? (
					<p>
						{' '}
						Min {data.main.temp_min}&deg; / Max{' '}
						{data.main.temp_max}&deg;
					</p>
				) : null}
			</div>
			<div className='description'>
				{description && (
					<div>
						{data.weather[0]?.icon && (
							<img
								className='weatherIcon'
								src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
								alt={data.weather[0].description}
							/>
						)}
						<p>{description}</p>
					</div>
				)}
			</div>

			<div className='forecast'>
				<div className='upcoming'>
					{forecastData.map((forecast, index) => (
						<div
							className='day'
							key={index}>
							<p className='dayName'>
								{new Intl.DateTimeFormat(
									undefined,
									{
										hour: '2-digit',
										minute: '2-digit',
									}
								).format(
									new Date(forecast.dt_txt)
								)}
							</p>

							{forecast.weather[0]?.icon && (
								<img
									className='weatherIcon'
									src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
									alt={
										forecast.weather[0]
											.description
									}
								/>
							)}
							<p className='temp'>
								{forecast.main.temp
									.toFixed(2)
									.slice(0, 2)}
								<span className='forecastDeg'>
									&deg;
								</span>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>

		<div className='bottom'>
			<div className='feels'>
				{' '}
				<img
					src='https://img.icons8.com/ios-filled/50/thermometer.png'
					alt=''
				/>
				{data.main ? (
					<p className='bold'>
						{data.main.feels_like}&deg;C
					</p>
				) : null}
				<p className='bottomSmall'>
					{' '}
					Temp Feels Like
				</p>
			</div>
			<div className='humidity'>
				{' '}
				<img
					src='https://img.icons8.com/ios/50/000000/humidity.png'
					alt=''
				/>
				{data.main ? (
					<p className='bold'>
						{data.main.humidity} %{' '}
					</p>
				) : null}
				<p className='bottomSmall'> Humidity</p>
			</div>
			<div className='wind'>
				{' '}
				<img
					src='https://img.icons8.com/ios/50/000000/wind.png'
					alt=''
				/>
				{data.wind ? (
					<p className='bold'>
						{data.wind.speed} MPH{' '}
					</p>
				) : null}
				<p className='bottomSmall'> Wind Speed</p>
			</div>
			<div className='pressure'>
				{' '}
				<img
					src='https://img.icons8.com/ios/50/000000/pressure.png'
					alt=''
				/>
				{data.main ? (
					<p className='bold'>
						{data.main.pressure} PSI{' '}
					</p>
				) : null}
				<p className='bottomSmall'> Pressure</p>
			</div>
		</div>
	</div>
);

export default WeatherData;
