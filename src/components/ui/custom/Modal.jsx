import LoginPage from "@/LoginPage";
import React from "react";
import { Link } from "react-router-dom";

function Modal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold text-center">You need to log in</h2>
        <p className="text-center mt-4">Please log in to generate your trip plan.</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
          <Link to={'/login'}>
            <button
              onClick={onLogin}
              className="bg-[#7AB9B3] px-4 py-2 rounded-md text-white hover:bg-[#6a9f9c]"
            >
              Log In
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Modal;
