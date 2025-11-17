import React from 'react';

// Dark mode toggle button component
// Props:
// - isDark: boolean current theme
// - setIsDark: function to toggle theme
const DarkModeToggle = ({ isDark, setIsDark }) => {
  return (
    <button
      className="dark-mode-toggle"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;
