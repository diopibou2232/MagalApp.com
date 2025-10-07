// import React, { useState, useEffect } from "react";
// import axios from "../utils/axiosAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MapPinIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

// export default function Points() {
//   const [points, setPoints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({ nom: '', description: '' });
//   const [formError, setFormError] = useState(null);
//   const [formSuccess, setFormSuccess] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ nom: '', description: '' });
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

//   const fetchPoints = () => {
//     setLoading(true);
//   axios.get("/api/points", {
//       params: {
//         search,
//         page,
//         per_page: perPage
//       }
//     })
//       .then(res => {
//         setPoints(res.data.data || res.data);
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
//         setError("Erreur lors du chargement des points.");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchPoints();
//     // eslint-disable-next-line
//   }, [search, page]);

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setFormError(null);
//     setFormSuccess(null);
//   axios.post("/api/points", form)
//       .then(() => {
//         setFormSuccess("Point ajouté avec succès !");
//         toast.success("Point ajouté avec succès !");
//         setForm({ nom: '', description: '' });
//         fetchPoints();
//       })
//       .catch(err => {
//         if (err.response && err.response.data && err.response.data.errors) {
//           setFormError(Object.values(err.response.data.errors).join(' '));
//           toast.error(Object.values(err.response.data.errors).join(' '));
//         } else {
//           setFormError("Erreur lors de l'ajout du point.");
//           toast.error("Erreur lors de l'ajout du point.");
//         }
//       });
//   };

//   const handleEditClick = (point) => {
//     setEditId(point.id);
//     setEditForm({ nom: point.nom || point.name, description: point.description || '' });
//   };

//   const handleEditChange = e => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = e => {
//     e.preventDefault();
//   axios.put(`/api/points/${editId}`, editForm)
//       .then(() => {
//         toast.success('Point modifié !');
//         setEditId(null);
//         fetchPoints();
//       })
//       .catch(() => toast.error('Erreur lors de la modification.'));
//   };

//   const handleDelete = (id) => {
//   axios.delete(`/api/points/${id}`)
//       .then(() => {
//         toast.success('Point supprimé !');
//         setConfirmDeleteId(null);
//         fetchPoints();
//       })
//       .catch(() => toast.error('Erreur lors de la suppression.'));
//   };

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-[40vh]">
//       <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
//       <span className="text-green-700">Chargement...</span>
//     </div>
//   );
//   if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

//   return (
//     <div className="flex flex-col items-center min-h-[70vh] w-full bg-gradient-to-br from-green-50 via-white to-green-100 py-8">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="w-full max-w-4xl mx-auto">
//         <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
//           <input
//             type="text"
//             placeholder="🔍 Rechercher par nom ou description..."
//             value={search}
//             onChange={e => { setSearch(e.target.value); setPage(1); }}
//             className="border border-green-200 rounded px-4 py-2 w-full md:w-80 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           {user && user.role === 'admin' && (
//             <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-center bg-white rounded-lg shadow px-4 py-3">
//               <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom *" className="border rounded px-3 py-2" required />
//               <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-3 py-2" />
//               <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition">Ajouter</button>
//               {formError && <div className="text-red-600 text-sm">{formError}</div>}
//               {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
//             </form>
//           )}
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {points.map(p => (
//             <div key={p.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative group hover:scale-[1.03] transition-transform">
//               <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 shadow">
//                 <MapPinIcon className="w-10 h-10 text-green-500" />
//               </div>
//               <div className="text-lg font-bold text-green-700 mb-1">{p.nom || p.name}</div>
//               <div className="text-sm text-gray-500 mb-1">{p.description}</div>
//               {editId === p.id ? (
//                 <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 w-full mt-2">
//                   <input name="nom" value={editForm.nom} onChange={handleEditChange} className="border rounded px-2 py-1" required />
//                   <input name="description" value={editForm.description} onChange={handleEditChange} className="border rounded px-2 py-1" />
//                   <div className="flex gap-2 mt-2">
//                     <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700">Enregistrer</button>
//                     <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded shadow">Annuler</button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="flex gap-2 mt-3">
//                   {user && user.role === 'admin' && (
//                     <>
//                       <button onClick={() => handleEditClick(p)} className="bg-yellow-400 text-white px-3 py-1 rounded shadow flex items-center gap-1 hover:bg-yellow-500 transition">
//                         <PencilSquareIcon className="w-4 h-4" /> Modifier
//                       </button>
//                       <button onClick={() => setConfirmDeleteId(p.id)} className="bg-red-600 text-white px-3 py-1 rounded shadow flex items-center gap-1 hover:bg-red-700 transition">
//                         <TrashIcon className="w-4 h-4" /> Supprimer
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//               {confirmDeleteId === p.id && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//                   <div className="bg-white p-6 rounded shadow flex flex-col items-center">
//                     <p className="mb-4">Confirmer la suppression de <b>{p.nom || p.name}</b> ?</p>
//                     <div className="flex gap-4">
//                       <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700">Oui</button>
//                       <button onClick={() => setConfirmDeleteId(null)} className="bg-gray-400 text-white px-4 py-2 rounded shadow">Non</button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         {/* Pagination stylée */}
//         {pagination && pagination.last > 1 && (
//           <div className="flex justify-center mt-8 gap-2">
//             {[...Array(pagination.last)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-1 rounded-full border ${page === i + 1 ? 'bg-green-600 text-white' : 'bg-white text-green-600'} shadow hover:bg-green-700 hover:text-white transition`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//   </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "../utils/axiosAuth"; // Assurez-vous que cet import est bien vers votre fichier configuré
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapPinIcon, PencilSquareIcon, TrashIcon, PlusIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function Points() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // LOGIQUE MISE À JOUR : L'état du formulaire inclut maintenant latitude et longitude
  const [form, setForm] = useState({ nom: '', description: '', latitude: '', longitude: '' });
  
  const [formError, setFormError] = useState(null);
  const [editId, setEditId] = useState(null);
  
  // LOGIQUE MISE À JOUR : L'état d'édition inclut aussi latitude et longitude
  const [editForm, setEditForm] = useState({ nom: '', description: '', latitude: '', longitude: '' });
  
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
    // fetchPoints sera appelé par le useEffect ci-dessous
  }, []);

  const fetchPoints = () => {
    setLoading(true);
    axios.get("/api/points", { params: { search, page, per_page: perPage } })
      .then(res => {
        setPoints(res.data.data || res.data);
        if (res.data.current_page) {
          setPagination({
            current: res.data.current_page,
            last: res.data.last_page,
            total: res.data.total
          });
        }
      })
      .catch(err => setError("Erreur lors du chargement des points."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handler = setTimeout(() => fetchPoints(), 300);
    return () => clearTimeout(handler);
  }, [search, page]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setFormError(null);
    axios.post("/api/points", form)
      .then(() => {
        toast.success("Point ajouté avec succès !");
        // LOGIQUE MISE À JOUR : Réinitialiser tous les champs
        setForm({ nom: '', description: '', latitude: '', longitude: '' });
        setIsModalOpen(false);
        fetchPoints();
      })
      .catch(err => {
        // LOGIQUE MISE À JOUR : Afficher l'erreur exacte de Laravel
        if (err.response && err.response.data && err.response.data.errors) {
            const firstError = Object.values(err.response.data.errors)[0][0];
            setFormError(firstError);
            toast.error(firstError);
        } else {
            const errorMsg = "Erreur lors de l'ajout du point.";
            setFormError(errorMsg);
            toast.error(errorMsg);
        }
      });
  };

  const handleEditClick = (point) => {
    setEditId(point.id);
    // LOGIQUE MISE À JOUR : Pré-remplir tous les champs, y compris les coordonnées
    setEditForm({ 
        nom: point.nom || point.name, 
        description: point.description || '',
        latitude: point.latitude || '',
        longitude: point.longitude || ''
    });
  };

  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditSubmit = e => {
    e.preventDefault();
    axios.put(`/api/points/${editId}`, editForm)
      .then(() => {
        toast.success('Point modifié !');
        setEditId(null);
        fetchPoints();
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
            const firstError = Object.values(err.response.data.errors)[0][0];
            toast.error(firstError);
        } else {
            toast.error('Erreur lors de la modification.');
        }
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/points/${id}`)
      .then(() => {
        toast.success('Point supprimé !');
        setConfirmDeleteId(null);
        fetchPoints();
      })
      .catch(() => toast.error('Erreur lors de la suppression.'));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-8 animate-fade-in">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <main className="w-full max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <MapPinIcon className="h-8 w-8 text-green-600" />
              Points d'Intérêt
            </h1>
            <p className="mt-1 text-gray-600">Gérez les lieux importants du Magal.</p>
          </div>
          {user && user.role === 'admin' && (
            <button onClick={() => setIsModalOpen(true)} className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition">
              <PlusIcon className="h-5 w-5" />
              Ajouter un point
            </button>
          )}
        </header>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="space-y-2 p-4">
            {points.length > 0 ? points.map(p => (
              <div key={p.id} className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
                {editId === p.id ? (
                  <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 animate-fade-in">
                    <input name="nom" value={editForm.nom} onChange={handleEditChange} className="border rounded-lg px-3 py-2 text-base" required />
                    <input name="description" value={editForm.description} onChange={handleEditChange} className="border rounded-lg px-3 py-2 text-sm" />
                    {/* DESIGN MIS À JOUR : Ajout des champs de coordonnées dans le formulaire d'édition */}
                    <div className="grid grid-cols-2 gap-2">
                        <input name="latitude" value={editForm.latitude} onChange={handleEditChange} placeholder="Latitude *" className="border rounded-lg px-3 py-2 text-sm" required />
                        <input name="longitude" value={editForm.longitude} onChange={handleEditChange} placeholder="Longitude *" className="border rounded-lg px-3 py-2 text-sm" required />
                    </div>
                    <div className="flex gap-2 self-end">
                      <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold">Enregistrer</button>
                      <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm font-semibold">Annuler</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-center">
                  <div>
                      <h3 className="font-bold text-gray-800">{p.nom || p.name}</h3>
                      <p className="text-sm text-gray-600">{p.description}</p>
                      {/* Affichage des coordonnées pour l'admin */}
                      {/* <p className="text-xs text-gray-400 mt-1">{`Lat: ${p.latitude || 'N/A'}, Lon: ${p.longitude || 'N/A'}`}</p> */}
                    </div>
                    {user && user.role === 'admin' && (
                      <div className="flex gap-4">
                        <button onClick={() => handleEditClick(p)} className="text-yellow-500 hover:text-yellow-700" title="Modifier">
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => setConfirmDeleteId(p.id)} className="text-red-500 hover:text-red-700" title="Supprimer">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )) : (
              <div className="text-center text-gray-500 p-8">Aucun point d'intérêt trouvé.</div>
            )}
          </div>
        </div>

        {pagination && pagination.last > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white text-green-700 font-bold disabled:opacity-50 shadow"
            >Précédent</button>
            <span className="font-semibold text-gray-700">Page {pagination.current} / {pagination.last}</span>
            <button
                onClick={() => setPage(p => Math.min(pagination.last, p + 1))}
                disabled={page === pagination.last}
                className="px-4 py-2 rounded-lg bg-white text-green-700 font-bold disabled:opacity-50 shadow"
            >Suivant</button>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <header className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">Ajouter un nouveau point</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="h-6 w-6" /></button>
            </header>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom *" className="border rounded-lg px-3 py-2" required />
              <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded-lg px-3 py-2" />
              {/* DESIGN MIS À JOUR : Ajout des champs de coordonnées dans la modale d'ajout */}
              <div className="grid grid-cols-2 gap-4">
                {/* <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude *" className="border rounded-lg px-3 py-2" required />
                <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude *" className="border rounded-lg px-3 py-2" required /> */}
              </div>
              {formError && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{formError}</div>}
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold">Annuler</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">Ajouter</button>
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
            <p className="text-center text-gray-600 mt-2">Cette action est irréversible. Le point sera définitivement supprimé.</p>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setConfirmDeleteId(null)} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold">Annuler</button>
              <button onClick={() => handleDelete(confirmDeleteId)} className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}