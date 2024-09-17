const Robot = ({ position, robotSize }) => {
  return (
    <div
      className="bg-gray-600 dark:bg-gray-200 absolute"
      style={{
        width: `${robotSize}px`,
        height: `${robotSize}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
        transition: "top 0.2s, left 0.2s",
      }}
    />
  );
};

export default Robot;
