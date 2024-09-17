const HomeBlock = ({ position, size }) => {
  return (
    <div
      className="bg-green-500 absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    />
  );
};

export default HomeBlock;
