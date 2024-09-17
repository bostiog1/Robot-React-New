const TaskControls = ({ sec, setSec, press, auto, isRunning, remove,checkInput }) => {
  return (
    <div className="mb-8">
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
          value={sec}
          onChange={(e) => setSec(Number(e.target.value))}
          className="border border-gray-400 dark:border-gray-700 p-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          placeholder="Enter time"
          style={{ width: "150px" }}
        />
      </div>

      {/* Task Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => press("Left")}
          className="bg-gray-500 dark:bg-gray-700 text-white p-4 rounded hover:bg-gray-600"
        >
          Left
        </button>
        <button
          onClick={() => press("Up")}
          className="bg-gray-500 dark:bg-gray-700 text-white p-4 rounded hover:bg-gray-600"
        >
          Up
        </button>
        <button
          onClick={() => press("Right")}
          className="bg-gray-500 dark:bg-gray-700 text-white p-4 rounded hover:bg-gray-600"
        >
          Right
        </button>
        <button
          onClick={() => press("Down")}
          className="bg-gray-500 dark:bg-gray-700 text-white p-4 rounded hover:bg-gray-600"
        >
          Down
        </button>
      </div>
      <p className="text-red-500 mb-4 mt-4 text-center">{checkInput}</p>

      {/* Delete and Start Buttons */}
      <div className="flex justify-center space-x-4 mb-6 mt-6">
        <button
          onClick={remove}
          className="bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={auto}
          disabled={isRunning}
          className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {isRunning ? "Running..." : "Start"}
        </button>
      </div>
    </div>
  );
};

export default TaskControls;
