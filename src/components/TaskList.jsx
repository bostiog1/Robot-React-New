const TaskList = ({ tasks, formatOutput }) => {
  return (
    <div className="w-full flex justify-center">
      {/* Wrapper to center the TaskList */}
      <ul
        className="flex flex-col justify-center items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-600 p-4 max-w-lg w-full h-32 overflow-auto resize-y"
        style={{ maxHeight: "400px" }}
      >
        {tasks.map((task, index) => (
          <li key={index} className="text-gray-800 dark:text-gray-200 mb-2">
            {formatOutput(task, index)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
