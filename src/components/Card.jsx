import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
