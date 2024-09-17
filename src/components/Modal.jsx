import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    // Close modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
        <div
          ref={modalRef}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50 max-w-md w-full text-center"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            How to Play Robot-Home
          </h2>
          <p className="text-gray-800 dark:text-gray-300 mb-4">
            Your goal is to guide the robot to the green home block. Use the
            arrow buttons for manual control, or utilize the input fields to set
            up tasks with specific wait times for automated movements. For a
            more engaging experience, try setting up a sequence of tasks and
            watch the robot follow them to reach its home!
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
