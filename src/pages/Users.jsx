import React, { useState, useEffect, useCallback } from 'react';
import { UserGroupIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosAuth from '../utils/axiosAuth';

// =====================================================================================
// Sous-composant: Vue complète pour Administrateur
// =====================================================================================
const AdminFullView = ({
  users,
  pagination,
  setPage,
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  openAddModal,
  openEditModal,
  setConfirmDeleteId,
}) => (
  <>
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <UserGroupIcon className="h-8 w-8 text-blue-600" />
          Gestion des Utilisateurs
        </h1>
        <p className="mt-1 text-gray-600">Ajoutez, modifiez et gérez les utilisateurs.</p>
      </div>
      <button
        onClick={openAddModal}
        className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        <PlusIcon className="h-5 w-5" />
        Ajouter un utilisateur
      </button>
    </header>

    <main className="bg-white rounded-xl shadow-lg">
      {/* Barre d'outils: recherche et filtre rôle */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-48 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les rôles</option>
          <option value="admin">Admin</option>
          <option value="user">Utilisateur</option>
        </select>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">Utilisateur</th>
              <th className="px-6 py-3">Rôle</th>
              <th className="px-6 py-3">Date de création</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                    <br />
                    <span className="text-gray-500 font-normal">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-yellow-500 hover:text-yellow-700"
                        title="Modifier"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(user.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Supprimer"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-8">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <p>
          Total: <b>{pagination?.total ?? 0}</b> utilisateurs
        </p>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!pagination?.current || pagination.current === 1}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Précédent
          </button>
          <span>
            Page <b>{pagination?.current ?? 1}</b> / <b>{pagination?.last ?? 1}</b>
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination?.last ?? 1, p + 1))}
            disabled={!pagination?.current || pagination.current === pagination?.last}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </main>
  </>
);

// =====================================================================================
// Sous-composant: Vue lecture seule pour Utilisateur non-admin
// =====================================================================================
const UserReadOnlyView = ({ users, pagination, setPage, search, setSearch }) => (
  <>
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
        <UserGroupIcon className="h-8 w-8 text-blue-600" />
        Liste des Membres
      </h1>
      <p className="mt-1 text-gray-600">Consultez la liste des membres inscrits.</p>
    </header>

    <main className="bg-white rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center text-gray-500 py-8">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && (pagination.last ?? 1) > 1 && (
        <div className="p-4 flex justify-between items-center text-sm text-gray-600">
          <p>
            Total: <b>{pagination?.total ?? users.length}</b> utilisateurs
          </p>
          {/* Vous pouvez ajouter ici des boutons de pagination si nécessaire */}
        </div>
      )}
    </main>
  </>
);

// =====================================================================================
// Composant principal
// =====================================================================================
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [formError, setFormError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '', role: '' });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [pagination, setPagination] = useState({ current: 1, last: 1, total: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);

    const apiUrl = currentUser?.role === 'admin' ? '/api/users' : '/api/users-public';

    axiosAuth
      .get(apiUrl, {
        params: { search, role: roleFilter, page, per_page: perPage },
      })
      .then((res) => {
        // Supporte deux formats: tableau simple ou pagination Laravel
        let list = [];
        let pag = { current: 1, last: 1, total: 0 };

        if (Array.isArray(res.data)) {
          list = res.data;
          pag = { current: 1, last: 1, total: list.length };
        } else if (res.data && Array.isArray(res.data.data)) {
          list = res.data.data;
          pag = {
            current: res.data.current_page ?? 1,
            last: res.data.last_page ?? 1,
            total: res.data.total ?? list.length,
          };
        }

        setUsers(list);
        setPagination(pag);
      })
      .catch((err) => {
        console.error('fetchUsers error:', err);
        setError("Erreur lors du chargement des utilisateurs.");
      })
      .finally(() => setLoading(false));
  }, [currentUser, page, perPage, roleFilter, search]);

  // Lecture du currentUser depuis le localStorage en toute sécurité
  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      }
    } catch (e) {
      console.warn('Utilisateur en localStorage invalide, réinitialisation.');
      localStorage.removeItem('user');
      setCurrentUser(null);
    }
  }, []);

  // Récupération des utilisateurs quand le currentUser est défini ou que les filtres changent
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Soumission formulaire (ajout / édition)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    const apiCall = editId
      ? axiosAuth.put(`/api/users/${editId}`, editForm)
      : axiosAuth.post('/api/users', form);

    apiCall
      .then(() => {
        toast.success(editId ? 'Utilisateur modifié !' : 'Utilisateur ajouté !');
        closeModal();
        fetchUsers();
      })
      .catch((err) => {
        const errorMsg = err?.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(' ')
          : "Erreur lors de l'opération.";
        setFormError(errorMsg);
        toast.error(errorMsg);
      });
  };

  // Suppression utilisateur
  const handleDelete = (id) => {
    axiosAuth
      .delete(`/api/users/${id}`)
      .then(() => {
        toast.success('Utilisateur supprimé !');
        setConfirmDeleteId(null);
        fetchUsers();
      })
      .catch(() => toast.error('Erreur lors de la suppression.'));
  };

  // Gestion modales et formulaires
  const openAddModal = () => {
    setEditId(null);
    setForm({ name: '', email: '', password: '', role: 'user' });
    setFormError(null);
    setIsModalOpen(true);
  };
  const openEditModal = (user) => {
    setEditId(user.id);
    setEditForm({ name: user.name, email: user.email, password: '', role: user.role });
    setFormError(null);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-lg text-gray-700">Chargement des utilisateurs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-600 text-xl">
        {error}
      </div>
    );
  }

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-8 animate-fade-in">
      <ToastContainer position="top-right" autoClose={3000} />

      {isAdmin ? (
        <AdminFullView
          users={users}
          pagination={pagination}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          openAddModal={openAddModal}
          openEditModal={openEditModal}
          setConfirmDeleteId={setConfirmDeleteId}
        />
      ) : (
        <UserReadOnlyView
          users={users}
          pagination={pagination}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      )}

      {/* Modale Ajouter/Modifier */}
      {isAdmin && isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <header className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                {editId ? "Modifier l'utilisateur" : 'Ajouter un utilisateur'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </header>
            <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-4">
              <input
                name="name"
                value={editId ? editForm.name : form.name}
                onChange={editId ? handleEditChange : handleChange}
                placeholder="Nom *"
                className="border rounded-lg px-3 py-2"
                required
              />
              <input
                name="email"
                value={editId ? editForm.email : form.email}
                onChange={editId ? handleEditChange : handleChange}
                placeholder="Email *"
                className="border rounded-lg px-3 py-2"
                required
              />
              <input
                name="password"
                type="password"
                value={editId ? editForm.password : form.password}
                onChange={editId ? handleEditChange : handleChange}
                placeholder={editId ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe *'}
                className="border rounded-lg px-3 py-2"
                required={!editId}
              />
              <select
                name="role"
                value={editId ? editForm.role : form.role}
                onChange={editId ? handleEditChange : handleChange}
                className="border rounded-lg px-3 py-2"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
              </select>
              {formError && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{formError}</div>
              )}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  {editId ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {isAdmin && confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm w-full">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Êtes-vous sûr ?</h3>
            <p className="text-center text-gray-600 mt-2">
              Cette action est irréversible. L'utilisateur sera définitivement supprimé.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
