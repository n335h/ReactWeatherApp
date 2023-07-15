import React from 'react';
import sun from '../../assets/sun.png';
import moon from '../../assets/moon.png';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="ThemeToggle">
      <label className="switch">
        <div className="toggleSwitch">
          <input
            type="checkbox"
            className="Theme"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <span className="slider round"></span>
        </div>
      </label>
      <div className="toggleText">
        {theme === 'dark' ? (
          <img id="themeicon" className="sun" src={sun} alt="" />
        ) : (
          <img id="themeicon" className="moon" src={moon} alt="" />
        )}
      </div>
    </div>
  );
}

export default ThemeToggle;
