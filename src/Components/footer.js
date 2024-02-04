import React from 'react';
import ghLogoblk from '../assets/ghLogoblk.png';

const Footer = () => (
	<footer className='footer'>
		<p> Created by Nicholas Horishny</p>
		<a
			className='ghLink'
			href='https://github.com/n335h/ReactWeatherApp'>
			<img
				className='ghlogoblk'
				src={ghLogoblk}
				alt=''
			/>
		</a>
	</footer>
);

export default Footer;
