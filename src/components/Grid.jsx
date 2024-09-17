import React, { useState, useEffect } from "react";
import Robot from "./Robot";
import HomeBlock from "./HomeBlock";
import TaskControls from "./TaskControls";
import TaskList from "./TaskList";
import GameOver from "./GameOver";
import DarkModeToggle from "./DarkMode";
import { getRandomPosition, wait } from "../utils/utils";

const Grid = () => {
  const gridWidth = 600; // Width of the grid (in pixels)
  const gridHeight = 420; // Height of the grid (in pixels)
  const robotSize = 30; // Size of the robot (in pixels)

  const [position, setPosition] = useState({ x: 270, y: 180 }); // Initial position of the robot
  const [arr, setArr] = useState([]); // Task list
  const [sec, setSec] = useState(""); // Time input value
  const [isRunning, setIsRunning] = useState(false); // Manage task running state
  const [checkLimit, setCheckLimit] = useState(""); // Error message for boundary limits
  const [checkInput, setCheckInput] = useState(""); // Error message for input validation
  const [isGameFinished, setIsGameFinished] = useState(false); // Track if the game is finished
  const [congratsMessage, setCongratsMessage] = useState(""); // Congratulations message

  const [homePosition, setHomePosition] = useState({
    x: getRandomPosition(gridWidth, robotSize),
    y: getRandomPosition(gridHeight, robotSize),
  });

  // Check if robot reached the home block
  const checkGameOver = (newX, newY) => {
    if (newX === homePosition.x && newY === homePosition.y) {
      setCongratsMessage("🎉 Congratulations! You've reached home! 🏡");
      setIsGameFinished(true);
    }
  };

  // Move robot based on direction
  const moveRobot = (direction) => {
    if (!isGameFinished) {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        let limitMessage = "";

        switch (direction) {
          case "Up":
            if (prev.y - robotSize >= 0) newY = prev.y - robotSize;
            else limitMessage = "Stop!! ✋⛔ You've hit the top limit!";
            break;
          case "Down":
            if (prev.y + robotSize <= gridHeight - robotSize)
              newY = prev.y + robotSize;
            else limitMessage = "Stop!! ✋⛔ You've hit the bottom limit!";
            break;
          case "Left":
            if (prev.x - robotSize >= 0) newX = prev.x - robotSize;
            else limitMessage = "Stop!! ✋⛔ You've hit the left limit!";
            break;
          case "Right":
            if (prev.x + robotSize <= gridWidth - robotSize)
              newX = prev.x + robotSize;
            else limitMessage = "Stop!! ✋⛔ You've hit the right limit!";
            break;
          default:
            return prev;
        }

        setCheckLimit(limitMessage);

        // Check if the robot has reached the home position
        checkGameOver(newX, newY);

        return { x: newX, y: newY };
      });
    }
  };

  // Handle keypress events
  useEffect(() => {
    const handleKeyDown = (e) => moveRobot(e.key.replace("Arrow", ""));

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameFinished]);

  // Add task to task list
  const press = (direction) => {
    if (isGameFinished) return;
    setCheckInput("");
    if (sec && sec > 0) {
      const newTask = { sec, text: direction };
      setArr((prev) => [...prev, newTask]);
      setSec("");
    } else {
      setCheckInput("Please input a valid time! 😡");
    }
  };

  // Remove first task in the list
  const remove = () => {
    if (arr.length > 0) setArr((prev) => prev.slice(1));
  };

  // Auto-execute tasks from the list
  const auto = async () => {
    setIsRunning(true);
    while (arr.length > 0) {
      const currentTask = arr[0];
      const { sec, text } = currentTask;
      await wait(sec);
      moveRobot(text);
      arr.shift();
    }
    setIsRunning(false);
  };

  // Format output for tasks in the list
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
    setArr([]);
    setCheckInput("");
    setCheckLimit("");
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 transition-all duration-300">
      <h1 className="text-3xl font-bold text-center py-4 mb-8 text-gray-900 dark:text-gray-200">
        Robot - React
      </h1>

      <div className="flex items-start justify-center  mt-4">
        <div className="w-1/2 p-4">
          <TaskControls
            sec={sec}
            setSec={setSec}
            press={press}
            auto={auto}
            isRunning={isRunning}
            remove={remove}
            checkInput={checkInput}
          />
          <TaskList tasks={arr} formatOutput={formatOutput} />
        </div>

        <div className="w-1/2 p-4 flex flex-col items-center justify-center">
          <div
            className="border border-black dark:border-gray-300 relative bg-gray-300 dark:bg-gray-600"
            style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}
          >
            <HomeBlock position={homePosition} size={robotSize} />
            <Robot position={position} robotSize={robotSize} />
          </div>

          <p className="text-red-500 mb-4 mt-8">{checkLimit}</p>

          {isGameFinished && (
            <GameOver message={congratsMessage} restart={restartGame} />
          )}
        </div>
      </div>

      <DarkModeToggle />
    </div>
  );
};

export default Grid;
