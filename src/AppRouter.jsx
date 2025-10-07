// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// // Importez vos pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Users from "./pages/Users";
// import Pelerins from "./pages/Pelerins";
// import Horaires from "./pages/Horaires";
// import Points from "./pages/Points";
// import Notifications from "./pages/Notifications";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// // Importez votre nouveau composant Layout
// import Layout from "./components/Layout";

// /**
//  * Ce composant agit comme un gardien.
//  * Il vérifie si l'utilisateur est authentifié.
//  * Si oui, il affiche le contenu protégé (le Layout et les pages).
//  * Sinon, il redirige vers la page de login.
//  */
// function ProtectedRoutes() {
//   const location = useLocation();
//   // La vérification se fait ici, à chaque fois que la route est demandée
//   const isAuthenticated = !!localStorage.getItem("token");

//   if (!isAuthenticated) {
//     // Redirige vers /login en sauvegardant la page de provenance
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Si l'utilisateur est authentifié, on affiche le Layout
//   // Le Layout affichera ensuite la page enfant correspondante (Home, Users, etc.)
//   return <Layout />;
// }

// export default function AppRouter() {
//   return (
//     <Router>
//       <Routes>
//         {/* ROUTE PUBLIQUE: La page de login est en dehors du système protégé */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* ROUTES PROTÉGÉES: Toutes ces routes nécessitent une authentification */}
//         {/* L'élément parent est notre gardien "ProtectedRoutes" */}
//         <Route element={<ProtectedRoutes />}>
//           {/* Ces routes sont les enfants de ProtectedRoutes. */}
//           {/* Elles s'afficheront à l'intérieur du <Outlet /> du composant Layout */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/pelerins" element={<Pelerins />} />
//           <Route path="/horaires" element={<Horaires />} />
//           <Route path="/points" element={<Points />} />
//           <Route path="/notifications" element={<Notifications />} />
//         </Route>

//         {/* Optionnel : une route pour gérer les pages non trouvées (404) */}
//         <Route path="*" element={<h2>Page non trouvée</h2>} />
//       </Routes>
//     </Router>
//   );
// }




import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// ... (tous vos imports de pages)
// import Users from "./pages/Users"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import Pelerins from "./pages/Pelerins";
import Horaires from "./pages/Horaires";
import Points from "./pages/Points";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import TermsOfService from "./pages/TermsOfService";
// ...

import Layout from "./components/Layout";

function ProtectedRoutes() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Layout />;
}

export default function AppRouter() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Toutes les routes protégées sont maintenant ensemble */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* --- CORRECTION ICI --- */}
          {/* On remet /users avec les autres pages */}
          <Route path="/users" element={<Users />} />
          
          <Route path="/pelerins" element={<Pelerins />} />
          <Route path="/horaires" element={<Horaires />} />
          <Route path="/points" element={<Points />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<h2>Page non trouvée</h2>} />
      </Routes>
    </Router>
  ); 
}