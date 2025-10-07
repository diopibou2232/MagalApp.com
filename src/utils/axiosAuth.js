import axios from "axios";

// Base URL de l'API
// - En développement: baseURL relative pour utiliser le proxy Vite (évite CORS)
// - En production: utilise VITE_API_BASE_URL si définie, sinon fallback local
const baseURL = (import.meta && import.meta.env && import.meta.env.DEV)
  ? "/"
  : ((import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) || "http://127.0.0.1:8000");

const axiosAuth = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Intercepteur requête: ajoute le token d'auth si présent
axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAuth;
