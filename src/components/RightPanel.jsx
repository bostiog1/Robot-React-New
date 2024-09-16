import React from "react";

const RightPanel = ({ position, homePosition, gridWidth, gridHeight, robotSize, checkLimit, isGameFinished, congratsMessage, restartGame }) => {
  return (
    <div className="w-1/2 flex flex-col items-center justify-center">
      <div className="border border-black" style={{ width: gridWidth, height: gridHeight, position: "relative", backgroundColor: "lightgray" }}>
        <div style={{
          position: "absolute", top: homePosition.y, left: homePosition.x, width: robotSize, height: robotSize,
          backgroundColor: "green", borderRadius: "50%"
        }}></div>
        <div style={{
          position: "absolute", top: position.y, left: position.x, width: robotSize, height: robotSize,
          backgroundColor: "blue", borderRadius: "50%"
        }}></div>
      </div>

      {isGameFinished && (
        <div className="mt-4 p-4 bg-yellow-200 text-yellow-800 rounded">
          <p>{congratsMessage}</p>
          <button onClick={restartGame} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Restart Game</button>
        </div>
      )}

      {checkLimit && <p className="mt-2 text-red-500">{checkLimit}</p>}
    </div>
  );
};

export default RightPanel;
