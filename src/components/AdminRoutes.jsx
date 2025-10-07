import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// --- CORRECTION : AJOUT DES IMPORTS NÉCESSAIRES ---
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminRoutes() {
  const location = useLocation();

  // Étape 1 : Vérifier si un utilisateur est connecté
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Étape 2 : Vérifier si l'utilisateur connecté est un admin
  try {
    const user = JSON.parse(userStr);
    if (user && user.role === 'admin') {
      // Si c'est un admin, afficher la page demandée
      return <Outlet />;
    }
  } catch (error) {
    console.error("Erreur de parsing de l'utilisateur:", error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Étape 3 : Si l'utilisateur est connecté mais N'EST PAS admin, le rediriger
  // La fonction toast() est maintenant définie et fonctionnera correctement.
  toast.warn("Vous n'avez pas l'autorisation d'accéder à cette page.");
  return <Navigate to="/" replace />;
}