import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  // Initialize state with localStorage value or default to false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true" || false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode); // Save the preference in localStorage
  }, [darkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed w-10 h-10 bottom-10 right-10 bg-neutral-900 dark:bg-white 
      rounded-full text-white dark:text-black font-semibold flex items-center justify-center shadow-lg transition-transform duration-300 transform hover:scale-110"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
  
};

export default DarkModeToggle;
