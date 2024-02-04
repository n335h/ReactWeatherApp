import React from 'react';

const Search = ({
	location,
	setLocation,
	searchLocation,
}) => (
	<div className='search animate-pop-in'>
		<input
			className='searchBar'
			value={location}
			onChange={(event) =>
				setLocation(event.target.value)
			}
			onKeyPress={(event) => {
				if (event.key === 'Enter') {
					searchLocation();
				}
			}}
			placeholder='Enter Location'
			type='text'
		/>
		<button onClick={searchLocation}>
			Search
		</button>
	</div>
);

export default Search;
