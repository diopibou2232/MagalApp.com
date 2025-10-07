import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "../utils/axiosAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ password: '', password_confirmation: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Récupère l'utilisateur depuis le localStorage (ou API si besoin)
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    axios.post("http://localhost:8000/api/change-password", form)
      .then(() => {
        toast.success("Mot de passe changé avec succès !");
        setForm({ password: '', password_confirmation: '' });
      })
      .catch(() => {
        toast.error("Erreur lors du changement de mot de passe.");
      })
      .finally(() => setLoading(false));
  };

  if (!user) return <div className="text-center mt-8">Chargement du profil...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card title="Mon profil">
        <div className="mb-4">
          <div><span className="font-semibold">Nom :</span> {user.name}</div>
          <div><span className="font-semibold">Email :</span> {user.email}</div>
          <div><span className="font-semibold">Rôle :</span> {user.role || 'Utilisateur'}</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
          <input name="password" value={form.password} onChange={handleChange} placeholder="Nouveau mot de passe" type="password" className="border rounded px-3 py-2" required />
          <input name="password_confirmation" value={form.password_confirmation} onChange={handleChange} placeholder="Confirmer le mot de passe" type="password" className="border rounded px-3 py-2" required />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition" disabled={loading}>{loading ? 'Changement...' : 'Changer le mot de passe'}</button>
        </form>
      </Card>
    </div>
  );
}
