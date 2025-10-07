// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../utils/axiosAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};
//     if (!form.name) {
//       newErrors.name = "Le nom est obligatoire.";
//     }
//     if (!form.email) {
//       newErrors.email = "L'email est obligatoire.";
//     } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
//       newErrors.email = "Format d'email invalide.";
//     }
//     if (!form.password) {
//       newErrors.password = "Le mot de passe est obligatoire.";
//     } else if (form.password.length < 6) {
//       newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
//     }
//     return newErrors;
//   };

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: undefined });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/register", form);
//   toast.success("Inscription réussie !");
//   setForm({ name: "", email: "", password: "" });
//   setTimeout(() => navigate("/", { replace: true }), 1200);
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.errors) {
//         setErrors(err.response.data.errors);
//         toast.error(Object.values(err.response.data.errors).join(" "));
//       } else {
//         toast.error("Erreur lors de l'inscription.");
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md p-6 bg-white rounded shadow">
//         <h2 className="text-xl font-bold mb-4">Inscription</h2>
//         <input
//           name="name"
//           type="text"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Nom *"
//           className="border rounded px-3 py-2"
//           required
//         />
//         {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email *"
//           className="border rounded px-3 py-2"
//           required
//         />
//         {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Mot de passe *"
//           className="border rounded px-3 py-2"
//           required
//         />
//         {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "Inscription..." : "S'inscrire"}
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const toubaImg = "/télécharger.jpeg"; // L'image de la mosquée

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Effacer l'erreur du champ dès que l'utilisateur commence à corriger
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({}); // Réinitialiser les erreurs
    setLoading(true);

    try {
      await axios.post("/api/register", form);
      toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setTimeout(() => navigate("/login"), 2000); // Rediriger vers la page de connexion après un court délai
    } catch (err) {
      if (err.response && err.response.status === 422 && err.response.data.errors) {
        // Gérer les erreurs de validation de Laravel
        const backendErrors = {};
        for (const key in err.response.data.errors) {
            backendErrors[key] = err.response.data.errors[key][0];
        }
        setErrors(backendErrors);
        toast.error("Veuillez corriger les erreurs dans le formulaire.");
      } else {
        toast.error("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen w-full flex bg-gray-100">
        {/* Colonne de Gauche : Le Formulaire */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 animate-fade-in">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Créer un Compte</h1>
            <p className="text-gray-600 mb-8">Rejoignez la communauté Magal App.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Champ Nom */}
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  name="name" type="text" placeholder="Nom complet" value={form.name} 
                  onChange={handleChange} required 
                  className={`w-full border rounded-lg pl-12 pr-4 py-3 focus:outline-none transition ${errors.name ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>

              {/* Champ Email */}
              <div className="relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  name="email" type="email" placeholder="Email" value={form.email} 
                  onChange={handleChange} required 
                  className={`w-full border rounded-lg pl-12 pr-4 py-3 focus:outline-none transition ${errors.email ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                />
                 {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
              </div>

              {/* Champ Mot de passe */}
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  name="password" type="password" placeholder="Mot de passe" value={form.password} 
                  onChange={handleChange} required 
                  className={`w-full border rounded-lg pl-12 pr-4 py-3 focus:outline-none transition ${errors.password ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                />
                 {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
              </div>

              {/* Bouton d'Inscription */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed text-lg" 
                disabled={loading}
              >
                {loading ? "Création du compte..." : "S'inscrire"}
              </button>
            </form>

            {/* Lien vers la page de connexion */}
            <div className="mt-8 text-center text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                Connectez-vous
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
    </>
  );
}