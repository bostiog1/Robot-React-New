export const getRandomPosition = (gridSize, robotSize) => {
  const maxPos = gridSize / robotSize;
  return Math.floor(Math.random() * maxPos) * robotSize;
};

export const wait = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
