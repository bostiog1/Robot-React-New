const GameOver = ({ message, restart }) => {
  return (
    <div className="text-center mt-4">
      <p className="text-2xl text-green-600 dark:text-green-400">{message}</p>
      <button
        onClick={restart}
        className="mt-4 bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-600"
      >
        Restart
      </button>
    </div>
  );
};

export default GameOver;
