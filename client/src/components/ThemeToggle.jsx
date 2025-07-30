import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function ThemeToggle({ isDarkTheme, setIsDarkTheme }) {
  return (
    <button onClick={() => setIsDarkTheme(!isDarkTheme)}>
      {isDarkTheme ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;