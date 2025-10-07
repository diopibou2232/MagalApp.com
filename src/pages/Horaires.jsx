// import React, { useState, useEffect } from "react";
// import axios from "../utils/axiosAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

// export default function Horaires() {
//   const [horaires, setHoraires] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({ lieu: '', activite: '', heure: '' });
//   const [formError, setFormError] = useState(null);
//   const [formSuccess, setFormSuccess] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ titre: '', date: '', heure: '' });
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);
//   const [pagination, setPagination] = useState({});
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     if (userStr) setUser(JSON.parse(userStr));
//   }, []);

//   const fetchHoraires = () => {
//     setLoading(true);
//   axios.get("/api/horaires", {
//       params: {
//         search,
//         page,
//         per_page: perPage
//       }
//     })
//       .then(res => {
//         setHoraires(res.data.data || res.data);
//         if (res.data.current_page) {
//           setPagination({
//             current: res.data.current_page,
//             last: res.data.last_page,
//             total: res.data.total
//           });
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         setError("Erreur lors du chargement des horaires.");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchHoraires();
//     // eslint-disable-next-line
//   }, [search, page]);

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setFormError(null);
//     setFormSuccess(null);
//   axios.post("/api/horaires", form)
//       .then(() => {
//         setFormSuccess("Horaire ajouté avec succès !");
//         toast.success("Horaire ajouté avec succès !");
//         setForm({ lieu: '', activite: '', heure: '' });
//         fetchHoraires();
//       })
//       .catch(err => {
//         if (err.response && err.response.data && err.response.data.errors) {
//           setFormError(Object.values(err.response.data.errors).join(' '));
//           toast.error(Object.values(err.response.data.errors).join(' '));
//         } else {
//           setFormError("Erreur lors de l'ajout de l'horaire.");
//           toast.error("Erreur lors de l'ajout de l'horaire.");
//         }
//       });
//   };

//   const handleEditClick = (horaire) => {
//     setEditId(horaire.id);
//     setEditForm({ titre: horaire.titre || horaire.nom || '', date: horaire.date || '', heure: horaire.heure || '' });
//   };

//   const handleEditChange = e => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = e => {
//     e.preventDefault();
//   axios.put(`/api/horaires/${editId}`, editForm)
//       .then(() => {
//         toast.success('Horaire modifié !');
//         setEditId(null);
//         fetchHoraires();
//       })
//       .catch(() => toast.error('Erreur lors de la modification.'));
//   };

//   const handleDelete = (id) => {
//   axios.delete(`/api/horaires/${id}`)
//       .then(() => {
//         toast.success('Horaire supprimé !');
//         setConfirmDeleteId(null);
//         fetchHoraires();
//       })
//       .catch(() => toast.error('Erreur lors de la suppression.'));
//   };

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-[40vh]">
//       <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
//       <span className="text-blue-700">Chargement...</span>
//     </div>
//   );
//   if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

//   return (
//     <div className="flex flex-col items-center min-h-[70vh] w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
//           <input
//             type="text"
//             placeholder="🔍 Rechercher par lieu, activité, heure..."
//             value={search}
//             onChange={e => { setSearch(e.target.value); setPage(1); }}
//             className="border border-blue-200 rounded px-4 py-2 w-full md:w-80 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {user && user.role === 'admin' && (
//             <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-center bg-white rounded-lg shadow px-4 py-3">
//               <input name="lieu" value={form.lieu} onChange={handleChange} placeholder="Lieu *" className="border rounded px-3 py-2" required />
//               <input name="activite" value={form.activite} onChange={handleChange} placeholder="Activité *" className="border rounded px-3 py-2" required />
//               <input name="heure" value={form.heure} onChange={handleChange} placeholder="Heure *" className="border rounded px-3 py-2" required />
//               <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">Ajouter</button>
//               {formError && <div className="text-red-500 text-sm">{formError}</div>}
//               {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
//             </form>
//           )}
//         </div>
//         {/* Timeline verticale */}
//         <div className="relative">
//           <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 rounded-full"></div>
//           <ul className="space-y-8">
//             {horaires.map(h => (
//               <li key={h.id} className="relative flex items-center group">
//                 <div className="z-10 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
//                   <ClockIcon className="w-8 h-8 text-blue-500" />
//                 </div>
//                 <div className="ml-8 flex-1 bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 group-hover:scale-[1.02] transition-transform">
//                   <div>
//                     <div className="text-lg font-bold text-blue-700 mb-1">{h.activite}</div>
//                     <div className="text-sm text-gray-500 mb-1">Lieu : <span className="font-semibold text-blue-600">{h.lieu}</span></div>
//                     <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">{h.heure}</span>
//                   </div>
//                   {editId === h.id ? (
//                     <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 w-full mt-2">
//                       <input name="titre" value={editForm.titre} onChange={handleEditChange} className="border rounded px-2 py-1" required />
//                       <input name="date" value={editForm.date} onChange={handleEditChange} className="border rounded px-2 py-1" />
//                       <input name="heure" value={editForm.heure} onChange={handleEditChange} className="border rounded px-2 py-1" />
//                       <div className="flex gap-2 mt-2">
//                         <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700">Enregistrer</button>
//                         <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded shadow">Annuler</button>
//                       </div>
//                     </form>
//                   ) : (
//                     <div className="flex gap-2 mt-3">
//                       {user && user.role === 'admin' && (
//                         <>
//                           <button onClick={() => handleEditClick(h)} className="bg-yellow-400 text-white px-3 py-1 rounded shadow flex items-center gap-1 hover:bg-yellow-500 transition">
//                             <PencilSquareIcon className="w-4 h-4" /> Modifier
//                           </button>
//                           <button onClick={() => setConfirmDeleteId(h.id)} className="bg-red-600 text-white px-3 py-1 rounded shadow flex items-center gap-1 hover:bg-red-700 transition">
//                             <TrashIcon className="w-4 h-4" /> Supprimer
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   )}
//                   {confirmDeleteId === h.id && (
//                     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//                       <div className="bg-white p-6 rounded shadow flex flex-col items-center">
//                         <p className="mb-4">Confirmer la suppression de <b>{h.activite}</b> ?</p>
//                         <div className="flex gap-4">
//                           <button onClick={() => handleDelete(h.id)} className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700">Oui</button>
//                           <button onClick={() => setConfirmDeleteId(null)} className="bg-gray-400 text-white px-4 py-2 rounded shadow">Non</button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* Pagination stylée */}
//         {pagination && pagination.last > 1 && (
//           <div className="flex justify-center mt-8 gap-2">
//             {[...Array(pagination.last)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-1 rounded-full border ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} shadow hover:bg-blue-700 hover:text-white transition`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "../utils/axiosAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClockIcon, PencilIcon, TrashIcon, PlusIcon, XMarkIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/solid';

// Données statiques pour les heures de prière (vous pourrez les rendre dynamiques plus tard)
const prieresDuJour = [
  { nom: 'Fajr', heure: '05:45' },
  { nom: 'Dhuhr', heure: '13:15' },
  { nom: 'Asr', heure: '16:30' },
  { nom: 'Maghrib', heure: '19:00' },
  { nom: 'Isha', heure: '20:15' },
];

export default function Horaires() {
  const [horaires, setHoraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ lieu: '', activite: '', heure: '' });
  const [formError, setFormError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ lieu: '', activite: '', heure: '' });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [pagination, setPagination] = useState({});
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
    fetchHoraires();
    // eslint-disable-next-line
  }, []);

  const fetchHoraires = () => {
    setLoading(true);
    axios.get("/api/horaires", { params: { search, page, per_page: perPage } })
      .then(res => {
        const sortedHoraires = (res.data.data || res.data || []).sort((a, b) => a.heure.localeCompare(b.heure));
        setHoraires(sortedHoraires);
        if (res.data.current_page) {
          setPagination({
            current: res.data.current_page,
            last: res.data.last_page,
            total: res.data.total
          });
        }
      })
      .catch(err => setError("Erreur lors du chargement des horaires."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handler = setTimeout(() => fetchHoraires(), 300);
    return () => clearTimeout(handler);
  }, [search, page]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/api/horaires", form)
      .then(() => {
        toast.success("Horaire ajouté avec succès !");
        setForm({ lieu: '', activite: '', heure: '' });
        setIsModalOpen(false);
        fetchHoraires();
      })
      .catch(err => {
        const errorMsg = err.response?.data?.errors ? Object.values(err.response.data.errors)[0][0] : "Erreur lors de l'ajout.";
        toast.error(errorMsg);
        setFormError(errorMsg);
      });
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    axios.put(`/api/horaires/${editId}`, editForm)
      .then(() => {
        toast.success('Horaire modifié !');
        setEditId(null);
        fetchHoraires();
      })
      .catch(() => toast.error('Erreur lors de la modification.'));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/horaires/${id}`)
      .then(() => {
        toast.success('Horaire supprimé !');
        setConfirmDeleteId(null);
        fetchHoraires();
      })
      .catch(() => toast.error('Erreur lors de la suppression.'));
  };
  
  const handleEditClick = (horaire) => {
    setEditId(horaire.id);
    setEditForm({ lieu: horaire.lieu, activite: horaire.activite, heure: horaire.heure });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-8 animate-fade-in">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <main className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Programme du Jour</h1>
          <p className="mt-2 text-gray-600">Horaires des prières et calendrier des activités du Magal.</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
            <SunIcon className="w-7 h-7 text-yellow-500" />
            Horaires des Prières
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {prieresDuJour.map(priere => (
              <div key={priere.nom} className="bg-white p-4 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
                <p className="font-semibold text-blue-800">{priere.nom}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{priere.heure}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-3">
                <ClockIcon className="w-7 h-7 text-blue-500" />
                Programme des Activités
            </h2>
            {user && user.role === 'admin' && (
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                <PlusIcon className="h-5 w-5" />
                Ajouter
              </button>
            )}
          </div>
          
          <div className="relative border-l-2 border-blue-200 pl-8 space-y-8">
            {horaires.length > 0 ? horaires.map(h => (
              <div key={h.id} className="relative group animate-fade-in-up">
                <div className="absolute -left-11 top-1 h-8 w-8 bg-white rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                </div>
                <div className="p-5 bg-white rounded-xl shadow-lg">
                  {editId === h.id ? (
                     <form onSubmit={handleEditSubmit} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <input name="heure" type="time" value={editForm.heure} onChange={handleEditChange} className="border rounded-lg px-3 py-2 text-sm" required />
                      <input name="activite" value={editForm.activite} onChange={handleEditChange} className="border rounded-lg px-3 py-2 font-bold flex-grow" required />
                      <input name="lieu" value={editForm.lieu} onChange={handleEditChange} className="border rounded-lg px-3 py-2 text-sm flex-grow" required />
                      <div className="flex gap-2 self-end sm:self-center">
                        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">Enregistrer</button>
                        <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm">Annuler</button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-blue-600 text-lg">{h.heure}</span>
                        <h3 className="font-bold text-xl text-gray-800 mt-1">{h.activite}</h3>
                        <p className="text-sm text-gray-600">Lieu : {h.lieu}</p>
                      </div>
                      {user && user.role === 'admin' && (
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditClick(h)} className="text-yellow-500 hover:text-yellow-700" title="Modifier"><PencilIcon className="h-5 w-5" /></button>
                          <button onClick={() => setConfirmDeleteId(h.id)} className="text-red-500 hover:text-red-700" title="Supprimer"><TrashIcon className="h-5 w-5" /></button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )) : (
                <div className="text-center text-gray-500 py-8">Aucune activité programmée pour le moment.</div>
            )}
          </div>
        </section>

        {pagination && pagination.last > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
             <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg bg-white text-blue-800 font-bold disabled:opacity-50 shadow">Précédent</button>
             <span className="font-semibold text-gray-700">Page {pagination.current} / {pagination.last}</span>
             <button onClick={() => setPage(p => Math.min(pagination.last, p + 1))} disabled={page === pagination.last} className="px-4 py-2 rounded-lg bg-white text-blue-800 font-bold disabled:opacity-50 shadow">Suivant</button>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <header className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">Ajouter un événement</h2>
              <button onClick={() => setIsModalOpen(false)}><XMarkIcon className="h-6 w-6 text-gray-500" /></button>
            </header>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input name="activite" value={form.activite} onChange={handleChange} placeholder="Activité *" className="w-full border rounded-lg px-3 py-2" required />
              <input name="lieu" value={form.lieu} onChange={handleChange} placeholder="Lieu *" className="w-full border rounded-lg px-3 py-2" required />
              <input name="heure" type="time" value={form.heure} onChange={handleChange} placeholder="Heure *" className="w-full border rounded-lg px-3 py-2" required />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-200 font-semibold hover:bg-gray-300">Annuler</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm w-full">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Êtes-vous sûr ?</h3>
            <p className="text-center text-gray-600 mt-2">Cette action est irréversible.</p>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setConfirmDeleteId(null)} className="px-6 py-2 rounded-lg bg-gray-200 font-semibold hover:bg-gray-300">Annuler</button>
              <button onClick={() => handleDelete(confirmDeleteId)} className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
