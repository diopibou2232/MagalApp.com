// import React, { useState, useEffect } from "react";
// import axios from "../utils/axiosAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { UserIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

// export default function Pelerins() {
//   const [pelerins, setPelerins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
//   const [formError, setFormError] = useState(null);
//   const [formSuccess, setFormSuccess] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
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

//   const fetchPelerins = () => {
//     setLoading(true);
//   axios.get("/api/pelerins", {
//       params: {
//         search,
//         page,
//         per_page: perPage
//       }
//     })
//       .then(res => {
//         const arr = Array.isArray(res.data.data) ? res.data.data : (res.data.data || res.data || []);
//         setPelerins(arr);
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
//         setError("Erreur lors du chargement des pelerins.");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchPelerins();
//     // eslint-disable-next-line
//   }, [search, page]);

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setFormError(null);
//     setFormSuccess(null);
//   axios.post("/api/pelerins", form)
//       .then(() => {
//         setFormSuccess("Pèlerin ajouté avec succès !");
//         setForm({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
//         fetchPelerins();
//       })
//       .catch(err => {
//         if (err.response && err.response.data && err.response.data.errors) {
//           setFormError(Object.values(err.response.data.errors).join(' '));
//         } else {
//           setFormError("Erreur lors de l'ajout du pèlerin.");
//         }
//       });
//   };

//   const handleEditClick = (pelerin) => {
//     setEditId(pelerin.id);
//     setEditForm({
//       nom: pelerin.nom || '',
//       prenom: pelerin.prenom || '',
//       email: pelerin.email || '',
//       telephone: pelerin.telephone || '',
//       ville: pelerin.ville || ''
//     });
//   };

//   const handleEditChange = e => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = e => {
//     e.preventDefault();
//   axios.put(`/api/pelerins/${editId}`, editForm)
//       .then(() => {
//         toast.success('Pèlerin modifié !');
//         setEditId(null);
//         fetchPelerins();
//       })
//       .catch(() => toast.error('Erreur lors de la modification.'));
//   };

//   const handleDelete = (id) => {
//   axios.delete(`/api/pelerins/${id}`)
//       .then(() => {
//         toast.success('Pèlerin supprimé !');
//         setConfirmDeleteId(null);
//         fetchPelerins();
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
//       <div className="w-full max-w-4xl mx-auto">
//         <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
//           <input
//             type="text"
//             placeholder="🔍 Rechercher par nom, email, téléphone..."
//             value={search}
//             onChange={e => { setSearch(e.target.value); setPage(1); }}
//             className="border border-blue-200 rounded px-4 py-2 w-full md:w-80 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {user && user.role === 'admin' && (
//             <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-center bg-white rounded-lg shadow px-4 py-3">
//               <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom *" className="border rounded px-3 py-2" required />
//               <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" className="border rounded px-3 py-2" />
//               <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2" type="email" />
//               <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Téléphone *" className="border rounded px-3 py-2" required />
//               <input name="ville" value={form.ville} onChange={handleChange} placeholder="Ville" className="border rounded px-3 py-2" />
//               <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">Ajouter</button>
//               {formError && <div className="text-red-500 text-sm">{formError}</div>}
//               {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
//             </form>
//           )}
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pelerins.map(p => (
//             <div key={p.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative group hover:scale-[1.03] transition-transform">
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow">
//                 <UserIcon className="w-10 h-10 text-blue-500" />
//               </div>
//               <div className="text-lg font-bold text-blue-700 mb-1">{p.nom || p.name} {p.prenom}</div>
//               <div className="text-sm text-gray-500 mb-1">{p.email}</div>
//               <div className="text-sm text-gray-500 mb-1">{p.telephone}</div>
//               {p.ville && <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">{p.ville}</span>}
//               {editId === p.id ? (
//                 <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 w-full mt-2">
//                   <input name="nom" value={editForm.nom} onChange={handleEditChange} className="border rounded px-2 py-1" required />
//                   <input name="prenom" value={editForm.prenom} onChange={handleEditChange} className="border rounded px-2 py-1" />
//                   <input name="email" value={editForm.email} onChange={handleEditChange} className="border rounded px-2 py-1" type="email" />
//                   <input name="telephone" value={editForm.telephone} onChange={handleEditChange} className="border rounded px-2 py-1" required />
//                   <input name="ville" value={editForm.ville} onChange={handleEditChange} className="border rounded px-2 py-1" />
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
import axios from "../utils/axiosAuth"; // Assurez-vous que cet import est bien vers votre fichier configuré
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserGroupIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function Pelerins() {
  // --- TOUTE VOTRE LOGIQUE EST CONSERVÉE À L'IDENTIQUE ---
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
  const [formError, setFormError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
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
    fetchPelerins();
  }, []);

  const fetchPelerins = () => {
    setLoading(true);
    axios.get("/api/pelerins", { params: { search, page, per_page: perPage } })
      .then(res => {
        setPelerins(res.data.data || res.data || []);
        if (res.data.current_page) {
          setPagination({
            current: res.data.current_page,
            last: res.data.last_page,
            total: res.data.total
          });
        }
      })
      .catch(err => setError("Erreur lors du chargement des pèlerins."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handler = setTimeout(() => fetchPelerins(), 300);
    return () => clearTimeout(handler);
  }, [search, page]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleFormSubmit = e => {
    e.preventDefault();
    setFormError(null);
    const apiCall = editId 
      ? axios.put(`/api/pelerins/${editId}`, editForm)
      : axios.post("/api/pelerins", form);
    
    apiCall
      .then(() => {
        toast.success(editId ? "Pèlerin modifié !" : "Pèlerin inscrit !");
        closeModal();
        fetchPelerins();
      })
      .catch(err => {
        const errorMsg = err.response?.data?.errors ? Object.values(err.response.data.errors)[0][0] : "Une erreur est survenue.";
        setFormError(errorMsg);
        toast.error(errorMsg);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/pelerins/${id}`)
      .then(() => {
        toast.success('Pèlerin supprimé !');
        setConfirmDeleteId(null);
        fetchPelerins();
      })
      .catch(() => toast.error('Erreur lors de la suppression.'));
  };

  const openAddModal = () => {
    setEditId(null);
    setForm({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
    setFormError(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (pelerin) => {
    setEditId(pelerin.id);
    setEditForm({ ...pelerin });
    setFormError(null);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  // --- NOUVEAU DESIGN DYNAMIQUE ET ANIMÉ ---
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-8 animate-fade-in">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <main className="w-full max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
              Gestion des Pèlerins
            </h1>
            <p className="mt-1 text-gray-600">Inscrivez, modifiez et consultez la liste des pèlerins.</p>
          </div>
          {user && user.role === 'admin' && (
            <button onClick={openAddModal} className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
              <PlusIcon className="h-5 w-5" />
              Inscrire un Pèlerin
            </button>
          )}
        </header>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Rechercher un pèlerin..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3">Nom Complet</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Ville</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pelerins.map(p => (
                  <tr key={p.id} className="bg-white border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{p.nom} {p.prenom}</td>
                    <td className="px-6 py-4">{p.email}<br/><span className="text-gray-500">{p.telephone}</span></td>
                    <td className="px-6 py-4">{p.ville}</td>
                    <td className="px-6 py-4 text-right">
                      {user && user.role === 'admin' && (
                        <div className="flex justify-end gap-4">
                          <button onClick={() => openEditModal(p)} className="text-yellow-500 hover:text-yellow-700" title="Modifier">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => setConfirmDeleteId(p.id)} className="text-red-500 hover:text-red-700" title="Supprimer">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <p>Total: <b>{pagination.total || 0}</b> pèlerins</p>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Précédent</button>
                  <span>Page <b>{pagination.current || 1}</b> / <b>{pagination.last || 1}</b></span>
                  <button onClick={() => setPage(p => Math.min(pagination.last, p + 1))} disabled={page === pagination.last} className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Suivant</button>
              </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <header className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">{editId ? "Modifier le Pèlerin" : "Inscrire un nouveau Pèlerin"}</h2>
              <button onClick={closeModal}><XMarkIcon className="h-6 w-6 text-gray-500" /></button>
            </header>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="nom" value={editId ? editForm.nom : form.nom} onChange={editId ? handleEditChange : handleChange} placeholder="Nom *" className="w-full border rounded-lg px-3 py-2" required />
                <input name="prenom" value={editId ? editForm.prenom : form.prenom} onChange={editId ? handleEditChange : handleChange} placeholder="Prénom" className="w-full border rounded-lg px-3 py-2" />
                <input name="email" value={editId ? editForm.email : form.email} onChange={editId ? handleEditChange : handleChange} placeholder="Email" type="email" className="w-full border rounded-lg px-3 py-2" />
                <input name="telephone" value={editId ? editForm.telephone : form.telephone} onChange={editId ? handleEditChange : handleChange} placeholder="Téléphone *" className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <input name="ville" value={editId ? editForm.ville : form.ville} onChange={editId ? handleEditChange : handleChange} placeholder="Ville" className="w-full border rounded-lg px-3 py-2" />
              {formError && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{formError}</div>}
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-200 font-semibold hover:bg-gray-300">Annuler</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">{editId ? "Enregistrer" : "Inscrire"}</button>
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