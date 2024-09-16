import React from "react";

const LeftPanel = ({ sec, setSec, arr, press, remove, auto, isRunning, checkInput }) => {
  const formatOutput = (task, index) => `${index + 1}. You added '${task.text}', wait ${task.sec} seconds.`;

  return (
    <div className="w-1/2 p-4">
      <div className="mb-12 justify-center flex items-center">
        <label htmlFor="time" className="text-lg mr-2 text-gray-800 dark:text-gray-300">Time</label>
        <input
          type="number"
          id="time"
          value={sec}
          onChange={(e) => setSec(Number(e.target.value))}
          className="border border-gray-400 dark:border-gray-700 p-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          placeholder="Enter time"
          style={{ width: "150px" }}
        />
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => press("Left")} className="bg-gray-500 text-white p-4 rounded">Left</button>
          <button onClick={() => press("Up")} className="bg-gray-500 text-white p-4 rounded">Up</button>
          <button onClick={() => press("Right")} className="bg-gray-500 text-white p-4 rounded">Right</button>
          <button onClick={() => press("Down")} className="bg-gray-500 text-white p-4 rounded">Down</button>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={remove} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        <button onClick={auto} disabled={isRunning} className="bg-green-500 text-white px-4 py-2 rounded">
          {isRunning ? "Running..." : "Start"}
        </button>
      </div>

      <p className="text-red-500 mb-4">{checkInput}</p>

      <div className="flex flex-col items-center justify-center w-full">
        <ul className="border bg-gray-300 p-4 w-3/4 h-32 overflow-auto">
          {arr.map((task, index) => (
            <li key={index} className="text-gray-800 dark:text-gray-100">{formatOutput(task, index)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftPanel;
