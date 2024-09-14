import React, { useState, useEffect } from "react";
import DarkModeToggle from "../services/DarkMode";

const Grid = () => {
  const gridWidth = 600; // Manual width of the grid (in pixels)
  const gridHeight = 420; // Manual height of the grid (in pixels)
  const robotSize = 30; // Size of the robot (in pixels)

  // Initial position of the robot (top-left corner)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Function to handle key press events
  const handleKeyDown = (e) => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      if (e.key === "ArrowUp") {
        newY = Math.max(prev.y - robotSize, 0); // Move up
      } else if (e.key === "ArrowDown") {
        newY = Math.min(prev.y + robotSize, gridHeight - robotSize); // Move down
      } else if (e.key === "ArrowLeft") {
        newX = Math.max(prev.x - robotSize, 0); // Move left
      } else if (e.key === "ArrowRight") {
        newX = Math.min(prev.x + robotSize, gridWidth - robotSize); // Move right
      }

      return { x: newX, y: newY };
    });
  };

  // Attach the keydown event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 transition-all duration-300">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center py-4 mb-8 text-gray-900 dark:text-gray-200">
        Robot - React
      </h1>
      <div className="flex items-start justify-center mt-8">
        {/* Left panel */}
        <div className="w-1/2 p-4">
          {/* Time Input */}
          <div className="mb-12 justify-center flex items-center">
            <label
              htmlFor="time"
              className="text-lg mr-2 text-gray-800 dark:text-gray-300"
            >
              Time
            </label>
            <input
              type="number"
              id="time"
              className="border border-gray-400 dark:border-gray-700 p-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="Enter time"
              style={{ width: "150px" }} // Adjust the width of the input field here
            />
          </div>

          {/* Task Buttons */}
          <div className="mb-12">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600">
                Left
              </button>
              <button className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600">
                Top
              </button>
              <button className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600">
                Right
              </button>
              <button className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600">
                Bottom
              </button>
            </div>
          </div>

          {/* Delete and Start Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <button className="bg-red-500 dark:bg-red-700 text-white dark:text-gray-200 px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-600">
              Delete
            </button>
            <button className="bg-green-500 dark:bg-green-700 text-white dark:text-gray-200 px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-600">
              Start
            </button>
          </div>

          {/* Empty Container */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-600 p-4 h-32 w-3/4 flex justify-center items-center">
              <p className="text-gray-800 dark:text-gray-200">
                Empty Container
              </p>
            </div>
          </div>
        </div>

        {/* Right panel (Grid area) */}
        <div className="w-1/2 p-4">
          <div
            className="border border-black dark:border-gray-300 relative bg-gray-300 dark:bg-gray-600"
            style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}
          >
            {/* Robot */}
            <div
              className="bg-gray-600 dark:bg-gray-200 absolute"
              style={{
                width: `${robotSize}px`,
                height: `${robotSize}px`,
                top: `${position.y}px`,
                left: `${position.x}px`,
                transition: "top 0.2s, left 0.2s",
              }}
            ></div>
          </div>
        </div>
      </div>
      <DarkModeToggle />
    </div>
  );
};

export default Grid;
