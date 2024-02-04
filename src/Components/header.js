import React from 'react';
import weatherApp from '../assets/weatherApp.png';

const Header = () => (
	<div className='logoHead animate-pop-in'>
		<img
			className='logo animate-pop-in'
			src={weatherApp}
			alt=''
		/>
		<h1 className='title animate-pop-in'>
			Weather Api
		</h1>
	</div>
);

export default Header;
