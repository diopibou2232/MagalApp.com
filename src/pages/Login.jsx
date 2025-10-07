// import React, { useState } from "react";
// import axios from "axios";


// export default function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//   const res = await axios.post("/api/login", { email, password });
//       if (res.data && res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         if (res.data.user) {
//           localStorage.setItem("user", JSON.stringify(res.data.user));
//         }
//         if (onLogin) onLogin(res.data.token);
//         window.location.href = "/";
//       } else {
//         setError("Token non reçu.");
//       }
//     } catch (err) {
//       setError("Identifiants invalides ou erreur serveur.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8">
//       <div className="w-full max-w-md mx-auto bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center backdrop-blur">
//         <h2 className="text-3xl font-extrabold mb-6 text-blue-800 drop-shadow">Connexion</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
//           <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
//           <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required className="border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
//           <button type="submit" className="bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-blue-700 transition text-lg" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
//           {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
//         </form>
//         <div className="mt-6 text-xs text-gray-500 text-center">© 2025 Magal App. Tous droits réservés.</div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import axios from "../utils/axiosAuth"; // Assurez-vous d'utiliser votre instance configurée
import { Link, useNavigate } from "react-router-dom"; // useNavigate pour la redirection
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const toubaImg = "/télécharger.jpeg"; // L'image de la mosquée

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook pour la redirection programmatique

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post("/api/login", { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        if (onLogin) onLogin(res.data.token);
        navigate("/"); // Utiliser navigate pour une redirection propre
      } else {
        setError("Token non reçu.");
      }
    } catch (err) {
  if (err.response && err.response.status === 401) {
    setError("L'adresse e-mail ou le mot de passe est incorrect.");
  } else if (err.response && err.response.status === 403) {
    setError("Accès refusé.");
  } else {
    setError("Une erreur est survenue. Veuillez réessayer.");
  }
} finally {
  setLoading(false);
}
};

  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      {/* Colonne de Gauche : Le Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 animate-fade-in">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Bienvenue !</h1>
          <p className="text-gray-600 mb-8">Connectez-vous pour accéder à Magal App.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Champ Email */}
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              />
            </div>
            {/* Champ Mot de passe */}
            <div className="relative">
              <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="Mot de passe" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              />
            </div>

            {/* Affichage de l'erreur */}
            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</div>}

            {/* Bouton de Connexion */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed text-lg" 
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Lien vers la page d'inscription */}
          <div className="mt-8 text-center text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Inscrivez-vous ici
            </Link>
          </div>
        </div>
      </div>

      {/* Colonne de Droite : L'Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${toubaImg})` }}
        >
          {/* Superposition sombre pour le contraste */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full p-12 text-white">
            <h2 className="text-4xl font-bold leading-tight drop-shadow-lg">
                Le guide complet du Grand Magal de Touba.
            </h2>
            <p className="mt-4 text-lg text-gray-200 drop-shadow-md">
                Toutes les informations à portée de main.
            </p>
        </div>
      </div>
    </div>
  );
}