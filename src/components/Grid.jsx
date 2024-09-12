import React, { useState, useEffect } from 'react';

const Grid = () => {
  const gridWidth = 600;  // Manual width of the grid (in pixels)
  const gridHeight = 420; // Manual height of the grid (in pixels)
  const robotSize = 30;   // Size of the robot (in pixels)

  // Initial position of the robot (top-left corner)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Function to handle key press events
  const handleKeyDown = (e) => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      if (e.key === 'ArrowUp') {
        newY = Math.max(prev.y - robotSize, 0); // Move up
      } else if (e.key === 'ArrowDown') {
        newY = Math.min(prev.y + robotSize, gridHeight - robotSize); // Move down
      } else if (e.key === 'ArrowLeft') {
        newX = Math.max(prev.x - robotSize, 0); // Move left
      } else if (e.key === 'ArrowRight') {
        newX = Math.min(prev.x + robotSize, gridWidth - robotSize); // Move right
      }

      return { x: newX, y: newY };
    });
  };

  // Attach the keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div
        className="border border-black relative"
        style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}
      >
        {/* Robot */}
        <div
          className="bg-black absolute"
          style={{
            width: `${robotSize}px`,
            height: `${robotSize}px`,
            top: `${position.y}px`,
            left: `${position.x}px`,
            transition: 'top 0.2s, left 0.2s',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Grid;
