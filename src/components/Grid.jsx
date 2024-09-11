import React from 'react';

const Grid = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="border border-black w-96 h-72 flex justify-start items-start relative p-4">
        {/* Robot */}
        <div className="bg-black h-8 w-8 transition duration-200"></div>

        {/* Random */}
        <div className="bg-red-600 h-8 w-8 transition duration-1000 ml-4"></div>
      </div>
    </div>
  );
};

export default Grid;
