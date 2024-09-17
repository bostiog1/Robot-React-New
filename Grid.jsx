// The old code made in only 1 file. I'm gonna keep it here just in case.
/*
import React, { useState, useEffect } from "react";
import DarkModeToggle from "./DarkMode";

const Grid = () => {
  const gridWidth = 600; // Manual width of the grid (in pixels)
  const gridHeight = 420; // Manual height of the grid (in pixels)
  const robotSize = 30; // Size of the robot (in pixels)

  // Initial position of the robot (top-left corner)
  const [position, setPosition] = useState({ x: 270, y: 180 });

  const [arr, setArr] = useState([]); // Stores the task list
  const [sec, setSec] = useState(""); // Time input value
  const [isRunning, setIsRunning] = useState(false); // Manage task running state
  const [checkLimit, setCheckLimit] = useState(""); // Error message
  const [checkInput, setCheckInput] = useState(""); // Error message
  const [isGameFinished, setIsGameFinished] = useState(false); // Track if the game is finished
  const [congratsMessage, setCongratsMessage] = useState(""); // Message when the game is finished

  // Get random positions for the home block
  const getRandomPosition = (gridSize, robotSize) => {
    const maxPos = gridSize / robotSize;
    const randomPos = Math.floor(Math.random() * maxPos) * robotSize;
    return randomPos;
  };

  // Generate a random position for the home block
  const [homePosition, setHomePosition] = useState({
    x: getRandomPosition(gridWidth, robotSize),
    y: getRandomPosition(gridHeight, robotSize),
  });

  // Function to handle key press events (Manual keyboard movement)
  const handleKeyDown = (e) => {
    moveRobot(e.key.replace("Arrow", ""));
  };

  const checkGameOver = (newX, newY) => {
    if (newX === homePosition.x && newY === homePosition.y) {
      setCongratsMessage("🎉 Congratulations! You've reached home! 🏡");
      setIsGameFinished(true); // Stop further movements
    }
  };

  // Move robot based on the direction
  const moveRobot = (direction) => {
    if (!isGameFinished) {
      // Stop movement if the game is finished

      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        let limitMessage = ""; // Message to be displayed when hitting limits

        switch (direction) {
          case "Up":
            if (prev.y - robotSize >= 0) {
              newY = prev.y - robotSize; // Move up
            } else {
              limitMessage = "Stop!! ✋⛔ You've hit the top limit!";
            }
            break;
          case "Down":
            if (prev.y + robotSize <= gridHeight - robotSize) {
              newY = prev.y + robotSize; // Move down
            } else {
              limitMessage = "Stop!! ✋⛔ You've hit the bottom limit!";
            }
            break;
          case "Left":
            if (prev.x - robotSize >= 0) {
              newX = prev.x - robotSize; // Move left
            } else {
              limitMessage = "Stop!! ✋⛔ You've hit the left limit!";
            }
            break;
          case "Right":
            if (prev.x + robotSize <= gridWidth - robotSize) {
              newX = prev.x + robotSize; // Move right
            } else {
              limitMessage = "Stop!! ✋⛔ You've hit the right limit!";
            }
            break;
          default:
            return prev; // No movement
        }

        if (limitMessage) {
          setCheckLimit(limitMessage); // Show limit message
        } else {
          setCheckLimit(""); // Clear the message if no limit is hit
        }

        // Check if the robot has reached the home position
        checkGameOver(newX, newY);

        return { x: newX, y: newY };
      });
    }
  };

  // Attach the keydown event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      moveRobot(e.key.replace("Arrow", ""));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameFinished]);

  // Add task to the task list
  const press = (direction) => {
    if (isGameFinished) return;
    setCheckInput("");

    // Check if the input is not empty and greater than 0
    if (sec && sec > 0) {
      const newTask = { sec, text: direction };
      setArr((prev) => [...prev, newTask]);

      // Reset input after adding task
      setSec("");
    } else {
      setCheckInput("Please input a valid time! 😡");
    }
  };

  // Remove Task (Delete first)
  const remove = () => {
    if (arr.length > 0) {
      setArr((prev) => prev.slice(1));
    }
  };

  // Wait 'n' seconds
  const wait = (seconds) =>
    new Promise((resolve) => setTimeout(resolve, seconds * 1000));

  // Auto Start: Process the task list
  const auto = async () => {
    setIsRunning(true); // Set running state to true

    while (arr.length > 0) {
      const currentTask = arr[0]; // Get the first task in the array
      const { sec, text } = currentTask;

      // Wait for the specified time
      await wait(sec);

      // Move the robot based on the task (left, right, etc.)
      moveRobot(text);

      // Remove the task from the array after it's completed
      arr.shift(); // Remove the first task after it has been executed
    }

    // All tasks completed
    setIsRunning(false); // Set running state back to false after finishing
  };

  // Format output for tasks
  const formatOutput = (task, index) => {
    return `${index + 1}. You added '${task.text}', wait ${task.sec} seconds.`;
  };

  // Restart the game by resetting state
  const restartGame = () => {
    setPosition({ x: 270, y: 180 });
    setHomePosition({
      x: getRandomPosition(gridWidth, robotSize),
      y: getRandomPosition(gridHeight, robotSize),
    });
    setIsGameFinished(false);
    setArr([]); // Reset task list
    setCheckInput(""); // Clear messages
    setCheckLimit(""); // Clear messages
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 transition-all duration-300">
      <h1 className="text-3xl font-bold text-center py-4 mb-8 text-gray-900 dark:text-gray-200">
        Robot - React
      </h1>

      <div className="flex items-start justify-center mt-4">
        <div className="w-1/2 p-4">
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
              value={sec}
              onChange={(e) => {
                // Convert the input value to a number, stripping any leading zeros
                const value = Number(e.target.value);
                setSec(value); // Set the state with the cleaned-up number
              }}
              className="border border-gray-400 dark:border-gray-700 p-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="Enter time"
              style={{ width: "150px" }}
            />
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => press("Left")}
                className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600"
              >
                Left
              </button>
              <button
                onClick={() => press("Up")}
                className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600"
              >
                Top
              </button>
              <button
                onClick={() => press("Right")}
                className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600"
              >
                Right
              </button>
              <button
                onClick={() => press("Down")}
                className="bg-gray-500 dark:bg-gray-700 text-white dark:text-gray-200 p-4 rounded hover:bg-gray-600 dark:hover:bg-gray-600"
              >
                Bottom
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={remove}
              className="bg-red-500 dark:bg-red-700 text-white dark:text-gray-200 px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={auto}
              disabled={isRunning}
              className="bg-green-500 dark:bg-green-700 text-white dark:text-gray-200 px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-600"
            >
              {isRunning ? "Running..." : "Start"}
            </button>
          </div>

          <p className="flex flex-col justify-center items-center text-red-500 mb-4">
            {checkInput}
          </p>

          <div className="flex flex-col items-center justify-center w-full">
            <ul
              className="flex flex-col justify-center items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-600 p-4 w-3/4 h-32 overflow-auto resize-y"
              style={{ maxHeight: "400px" }}
            >
              {arr.map((task, index) => (
                <li
                  key={index}
                  className="text-gray-800 dark:text-gray-200 mb-2"
                >
                  {formatOutput(task, index)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-1/2 p-4 flex flex-col items-center justify-center">
          <div
            className="border border-black dark:border-gray-300 relative bg-gray-300 dark:bg-gray-600"
            style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}
          >
            <div
              className="bg-green-500 absolute"
              style={{
                width: `${robotSize}px`,
                height: `${robotSize}px`,
                top: `${homePosition.y}px`,
                left: `${homePosition.x}px`,
              }}
            ></div>

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

          <p className="flex flex-col justify-center items-center text-red-500 mb-4 mt-8">
            {checkLimit}
          </p>

          {isGameFinished && (
            <div className="text-center mt-4">
              <p className="text-2xl text-green-600 dark:text-green-400">
                {congratsMessage}
              </p>
              <button
                onClick={restartGame}
                className="mt-4 bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition duration-200"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      </div>

      <DarkModeToggle />
    </div>
  );
};

export default Grid;

*/
