import React from "react";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <label className="switch">
      <input type="checkbox" className="Theme" checked={theme === "dark"} onChange={toggleTheme} />
      <span className="slider round"></span>
      {theme === "light" }
    </label>
  );
}

export default ThemeToggle;