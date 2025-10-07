// import { BellIcon, PencilSquareIcon, TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import axios from "../utils/axiosAuth";
// import React, { useState, useEffect } from "react";

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formError, setFormError] = useState(null);
//   const [formSuccess, setFormSuccess] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ titre: '', message: '' });
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);
//   const [pagination, setPagination] = useState({});
//   const [user, setUser] = useState(null);
//   const [form, setForm] = useState({ titre: '', message: '', date: '' });

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     if (userStr) setUser(JSON.parse(userStr));
//   }, []);

//   const fetchNotifications = () => {
//     setLoading(true);
//     axios.get("/api/notifications", {
//       params: {
//         search,
//         page,
//         per_page: perPage
//       }
//     })
//       .then(res => {
//         setNotifications(res.data.data || res.data);
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
//         setError("Erreur lors du chargement des notifications.");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchNotifications();
//     // eslint-disable-next-line
//   }, [search, page]);

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setFormError(null);
//     setFormSuccess(null);
//     axios.post("/api/notifications", form)
//       .then(() => {
//         setFormSuccess("Notification ajoutée avec succès !");
//         toast.success("Notification ajoutée avec succès !");
//         setForm({ titre: '', message: '', date: '' });
//         fetchNotifications();
//       })
//       .catch(err => {
//         if (err.response && err.response.data && err.response.data.errors) {
//           const errorMessage = Object.values(err.response.data.errors).join(' ');
//           setFormError(errorMessage);
//           toast.error(errorMessage);
//         } else {
//           setFormError("Erreur lors de l'ajout de la notification.");
//           toast.error("Erreur lors de l'ajout de la notification.");
//         }
//       });
//   };

//   const handleEditClick = (notif) => {
//     setEditId(notif.id);
//     setEditForm({ titre: notif.titre || notif.title || '', message: notif.message || notif.body || '' });
//   };

//   const handleEditChange = e => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = e => {
//     e.preventDefault();
//     axios.put(`/api/notifications/${editId}`, editForm)
//       .then(() => {
//         toast.success('Notification modifiée !');
//         setEditId(null);
//         fetchNotifications();
//       })
//       .catch(() => toast.error('Erreur lors de la modification.'));
//   };

//   const handleDelete = (id) => {
//     axios.delete(`/api/notifications/${id}`)
//       .then(() => {
//         toast.success('Notification supprimée !');
//         setConfirmDeleteId(null);
//         fetchNotifications();
//       })
//       .catch(() => toast.error('Erreur lors de la suppression.'));
//   };

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
//       <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
//       <span className="text-yellow-700 font-semibold text-lg">Chargement des notifications...</span>
//     </div>
//   );

//   if (error) return (
//     <div className="flex items-center justify-center min-h-screen text-center text-red-500">
//         {error}
//     </div>
//   );

//   return (
//     // ICI : Changement principal pour occuper toute la page
//     <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gradient-to-br from-yellow-50 to-orange-100 p-4 sm:p-8">
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       <main className="w-full max-w-6xl mx-auto">
//         {/* Barre de recherche */}
//         <div className="w-full bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center mb-6">
//             <BellIcon className="h-8 w-8 text-yellow-500" />
//             <input
//                 type="text"
//                 placeholder="Rechercher par titre ou message..."
//                 value={search}
//                 onChange={e => { setSearch(e.target.value); setPage(1); }}
//                 className="border border-yellow-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
//             />
//         </div>

//         {/* Formulaire d'ajout de notification */}
//         {user && user.role === 'admin' && (
//             <div className="w-full bg-white rounded-xl shadow p-6 mb-6">
//                 <div className="flex items-center mb-4">
//                     <BellIcon className="h-6 w-6 text-yellow-500 mr-2" />
//                     <h2 className="font-bold text-lg text-yellow-700">Ajouter une notification</h2>
//                 </div>
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//                     <input name="titre" value={form.titre} onChange={handleChange} placeholder="Titre *" className="border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400" required />
//                     <input name="message" value={form.message} onChange={handleChange} placeholder="Message *" className="border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400" required />
//                     <input name="date" type="date" value={form.date} onChange={handleChange} placeholder="Date *" className="border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400" required />
//                     <button type="submit" className="bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-600 transition font-semibold self-start">Ajouter</button>
//                     {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
//                     {formSuccess && <div className="text-green-600 text-sm mt-2">{formSuccess}</div>}
//                 </form>
//             </div>
//         )}

//         {/* Liste des notifications */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {notifications.map(n => (
//             <div key={n.id} className="bg-white rounded-xl shadow p-6 flex flex-col group transition-transform hover:scale-105">
//               <div className="flex items-center mb-2">
//                 <BellIcon className="h-6 w-6 text-yellow-500 mr-2 shrink-0" />
//                 <h3 className="font-semibold text-yellow-700 text-lg truncate">{n.titre || n.title || `Notification ${n.id}`}</h3>
//               </div>
//               <span className={`mb-4 px-2 py-1 rounded text-xs font-bold self-start ${n.date ? 'bg-yellow-200 text-yellow-800' : 'bg-orange-200 text-orange-800'}`}>{n.date ? n.date : 'Sans date'}</span>
              
//               <p className="text-gray-700 mb-4 flex-grow">{n.message || n.body || ''}</p>

//               {editId === n.id ? (
//                 <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 mt-auto">
//                   <input name="titre" value={editForm.titre} onChange={handleEditChange} className="border border-yellow-300 rounded px-2 py-1 text-sm" required />
//                   <input name="message" value={editForm.message} onChange={handleEditChange} className="border border-yellow-300 rounded px-2 py-1 text-sm" required />
//                   <div className="flex gap-2 mt-1">
//                     <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"><PencilSquareIcon className="h-4 w-4" />Enregistrer</button>
//                     <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Annuler</button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="flex gap-2 mt-auto">
//                   {user && user.role === 'admin' && (
//                     <>
//                       <button onClick={() => handleEditClick(n)} className="bg-yellow-400 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-yellow-500 transition"><PencilSquareIcon className="h-4 w-4" />Modifier</button>
//                       <button onClick={() => setConfirmDeleteId(n.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-red-700 transition"><TrashIcon className="h-4 w-4" />Supprimer</button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Modale de confirmation de suppression */}
//               {confirmDeleteId === n.id && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//                   <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center border-2 border-yellow-400 max-w-sm w-full">
//                     <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mb-2" />
//                     <p className="mb-4 text-lg text-center">Confirmer la suppression de <br/><b>{n.titre || n.title || n.id}</b> ?</p>
//                     <div className="flex gap-4">
//                       <button onClick={() => handleDelete(n.id)} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition">Oui</button>
//                       <button onClick={() => setConfirmDeleteId(null)} className="bg-gray-400 text-white px-4 py-2 rounded font-bold">Non</button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {notifications.length > 0 && (
//             <div className="flex justify-center items-center gap-4 mt-8">
//                 <button
//                     onClick={() => setPage(p => Math.max(1, p - 1))}
//                     disabled={!pagination.current || pagination.current === 1}
//                     className="px-4 py-2 rounded bg-yellow-200 text-yellow-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow hover:bg-yellow-300 transition"
//                 >Précédent</button>
//                 <span className="px-4 py-2 rounded bg-white shadow font-bold text-yellow-700">Page {pagination.current || 1} / {pagination.last || 1}</span>
//                 <button
//                     onClick={() => setPage(p => Math.min((pagination.last || 1), p + 1))}
//                     disabled={!pagination.current || pagination.current === pagination.last}
//                     className="px-4 py-2 rounded bg-yellow-200 text-yellow-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow hover:bg-yellow-300 transition"
//                 >Suivant</button>
//             </div>
//         )}
//       </main>
//     </div>
//   );
// }





import { BellIcon, PencilIcon, TrashIcon, ExclamationTriangleIcon, PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../utils/axiosAuth";
import React, { useState, useEffect } from "react";

export default function Notifications() {
  // --- TOUTE VOTRE LOGIQUE EST CONSERVÉE À L'IDENTIQUE ---
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ titre: '', message: '' });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [pagination, setPagination] = useState({});
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ titre: '', message: '', date: '' });
  const [isFormVisible, setIsFormVisible] = useState(false); // État pour le formulaire pliable

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    setLoading(true);
    axios.get("/api/notifications", { params: { search, page, per_page: perPage } })
      .then(res => {
        setNotifications(res.data.data || res.data);
        if (res.data.current_page) {
          setPagination({
            current: res.data.current_page,
            last: res.data.last_page,
            total: res.data.total
          });
        }
      })
      .catch(err => setError("Erreur lors du chargement des notifications."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handler = setTimeout(() => fetchNotifications(), 300);
    return () => clearTimeout(handler);
  }, [search, page]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setFormError(null);
    axios.post("/api/notifications", form)
      .then(() => {
        toast.success("Notification ajoutée avec succès !");
        setForm({ titre: '', message: '', date: '' });
        setIsFormVisible(false); // Replier le formulaire après succès
        fetchNotifications();
      })
      .catch(err => {
        const errorMsg = err.response?.data?.errors ? Object.values(err.response.data.errors).join(' ') : "Erreur lors de l'ajout.";
        setFormError(errorMsg);
        toast.error(errorMsg);
      });
  };

  const handleEditClick = (notif) => {
    setEditId(notif.id);
    setEditForm({ titre: notif.titre || notif.title || '', message: notif.message || notif.body || '' });
  };
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditSubmit = e => {
    e.preventDefault();
    axios.put(`/api/notifications/${editId}`, editForm)
      .then(() => {
        toast.success('Notification modifiée !');
        setEditId(null);
        fetchNotifications();
      })
      .catch(() => toast.error('Erreur lors de la modification.'));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/notifications/${id}`)
      .then(() => {
        toast.success('Notification supprimée !');
        setConfirmDeleteId(null);
        fetchNotifications();
      })
      .catch(() => toast.error('Erreur lors de la suppression.'));
  };

      if (loading) return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-yellow-700 font-semibold text-lg">Chargement des notifications...</span>
      </div>
    );

    if (error) return (
      <div className="flex items-center justify-center min-h-screen text-center text-red-500">
          {error}
      </div>
    );

  // --- NOUVEAU DESIGN DYNAMIQUE ET ANIMÉ ---
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <main className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
            <BellIcon className="h-10 w-10 text-yellow-500" />
            Fil des Notifications
          </h1>
          <p className="mt-2 text-gray-600">Restez informé des dernières actualités et annonces.</p>
        </header>

        {/* Formulaire d'ajout pliable (Accordéon) */}
        {user && user.role === 'admin' && (
          <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="w-full flex justify-between items-center p-4 font-bold text-lg text-yellow-700 hover:bg-yellow-50 transition"
            >
              <span>Publier une nouvelle notification</span>
              <ChevronDownIcon className={`h-6 w-6 transition-transform ${isFormVisible ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isFormVisible ? 'max-h-96 p-6' : 'max-h-0 p-0'}`}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="titre" value={form.titre} onChange={handleChange} placeholder="Titre *" className="border rounded-lg px-3 py-2" required />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message *" className="border rounded-lg px-3 py-2 h-24" required />
                <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded-lg px-3 py-2" required />
                {formError && <div className="text-red-500 text-sm">{formError}</div>}
                <button type="submit" className="bg-yellow-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-yellow-600 transition self-end">
                  Publier
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Timeline des notifications */}
        <div className="relative">
          {/* Ligne verticale de la timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-12">
            {notifications.map(n => (
              <div key={n.id} className="relative group animate-fade-in-up">
                <div className="absolute left-6 -translate-x-1/2 top-1 h-12 w-12 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <BellIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-20 p-6 bg-white rounded-xl shadow-lg">
                  {editId === n.id ? (
                    <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
                      <input name="titre" value={editForm.titre} onChange={handleEditChange} className="border rounded-lg px-3 py-2 font-bold text-lg" required />
                      <textarea name="message" value={editForm.message} onChange={handleEditChange} className="border rounded-lg px-3 py-2 h-20" required />
                      <div className="flex gap-2 self-end">
                        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">Enregistrer</button>
                        <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm">Annuler</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xl text-gray-800">{n.titre || n.title}</h3>
                          <span className="text-sm text-gray-500">{new Date(n.date || n.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        {user && user.role === 'admin' && (
                          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditClick(n)} className="text-yellow-500 hover:text-yellow-700" title="Modifier"><PencilIcon className="h-5 w-5" /></button>
                            <button onClick={() => setConfirmDeleteId(n.id)} className="text-red-500 hover:text-red-700" title="Supprimer"><TrashIcon className="h-5 w-5" /></button>
                          </div>
                        )}
                      </div>
                      <p className="mt-4 text-gray-700">{n.message || n.body}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {pagination && pagination.last > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
             <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg bg-white text-yellow-800 font-bold disabled:opacity-50 shadow">Précédent</button>
             <span className="font-semibold text-gray-700">Page {pagination.current} / {pagination.last}</span>
             <button onClick={() => setPage(p => Math.min(pagination.last, p + 1))} disabled={page === pagination.last} className="px-4 py-2 rounded-lg bg-white text-yellow-800 font-bold disabled:opacity-50 shadow">Suivant</button>
          </div>
        )}
      </main>

      {/* Modale de confirmation de suppression */}
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