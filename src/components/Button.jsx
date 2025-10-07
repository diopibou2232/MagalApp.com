import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
