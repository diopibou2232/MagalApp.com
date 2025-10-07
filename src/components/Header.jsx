import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from '@heroicons/react/24/outline';

import useDarkMode from "../hooks/useDarkMode";

export default function Header({ toggleSidebar }) {
  const [darkMode, setDarkMode] = useDarkMode();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupère l'utilisateur connecté depuis le localStorage (si stocké)
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className={"sticky top-0 z-30 w-full py-4 px-8 flex items-center justify-between shadow " + (darkMode ? "bg-gray-900 text-white" : "bg-blue-700 text-white")}>
      <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded">
        <Bars3Icon className="h-6 w-6" />
      </button>
      <span className="font-bold text-xl text-gray-800 dark:text-white">Magal Application</span>
      {localStorage.getItem("token") && (
        <nav className="flex gap-6">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/about" className="hover:underline">À propos</Link>
          <Link to="/users" className="hover:underline">Utilisateurs</Link>
          <Link to="/pelerins" className="hover:underline">Pelerins</Link>
          <Link to="/horaires" className="hover:underline">Horaires</Link>
          <Link to="/points" className="hover:underline">Points</Link>
          <Link to="/notifications" className="hover:underline">Notifications</Link>
        </nav>
      )}
      <div className="flex items-center gap-4 ml-8">
        {user && <span className="text-sm font-semibold">{user.name}</span>}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-white/20 hover:bg-white/40 text-white border border-white/30 transition-colors duration-200"
          title={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        {localStorage.getItem("token") && (
          <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-200">Déconnexion</button>
        )}
      </div>
    </header>
  );
}
