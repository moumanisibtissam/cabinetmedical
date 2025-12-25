import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    prenom: "",
    nom: "",
    birthDate: "",
    telephone: "",
    bloodGroup: "",
    allergies: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Erreur chargement patients:", err));
  }, []);

  const calculateAge = (birthDate) => {
    if (!birthDate) return "—";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleEditClick = (p) => {
    setEditingId(p.id);
    setEditForm({
      prenom: p.prenom ?? "",
      nom: p.nom ?? "",
      birthDate: p.birthDate ?? "",
      telephone: p.telephone ?? "",
      bloodGroup: p.bloodGroup ?? "",
      allergies: p.allergies ?? "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const handleEditSave = async (id) => {
    await fetch(`http://localhost:4000/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setPatients((list) =>
      list.map((p) => (p.id === id ? { ...p, ...editForm } : p))
    );
    setEditingId(null);
  };

  const handleEditCancel = () => setEditingId(null);

  const handleDelete = async (id) => {
    const ok = window.confirm("Voulez-vous vraiment supprimer ce patient ?");
    if (!ok) return;
    await fetch(`http://localhost:4000/patients/${id}`, { method: "DELETE" });
    setPatients((list) => list.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-gray-500">Manage your patient directory</p>
        </div>
        <Link
          to="/patients/ajouter"
          className="bg-[#006d77] text-white px-4 py-2 rounded-lg hover:bg-[#005f66]"
        >
          + Add Patient
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {patients.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No patients found. Add your first patient to get started.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-400 uppercase">
                <th className="pb-3">Dossier </th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Age</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Blood Group</th>
                <th className="pb-3">Allergies</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-mono text-[#006d77] font-bold">
                    {p.dossierNum}
                  </td>

                  <td className="py-4">
                    {editingId === p.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="prenom"
                          value={editForm.prenom}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded"
                          placeholder="Prénom"
                        />
                        <input
                          type="text"
                          name="nom"
                          value={editForm.nom}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded"
                          placeholder="Nom"
                        />
                      </div>
                    ) : (
                      <>
                        {p.prenom} {p.nom}
                      </>
                    )}
                  </td>

                  <td className="py-4">
                    {editingId === p.id ? (
                      <input
                        type="date"
                        name="birthDate"
                        value={editForm.birthDate}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      `${calculateAge(p.birthDate)} years`
                    )}
                  </td>

                  <td className="py-4">
                    {editingId === p.id ? (
                      <input
                        type="text"
                        name="telephone"
                        value={editForm.telephone}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                        placeholder="Téléphone"
                      />
                    ) : (
                      p.telephone || "—"
                    )}
                  </td>

                  <td className="py-4">
                    {editingId === p.id ? (
                      <select
                        name="bloodGroup"
                        value={editForm.bloodGroup}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">Sélectionner</option>
                        <option value="A+">A+</option>
                        <option value="A−">A−</option>
                        <option value="B+">B+</option>
                        <option value="B−">B−</option>
                        <option value="AB+">AB+</option>
                        <option value="AB−">AB−</option>
                        <option value="O+">O+</option>
                        <option value="O−">O−</option>
                      </select>
                    ) : (
                      p.bloodGroup || "—"
                    )}
                  </td>

                  <td className="py-4">
                    {editingId === p.id ? (
                      <input
                        type="text"
                        name="allergies"
                        value={editForm.allergies}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                        placeholder="Allergies"
                      />
                    ) : (
                      p.allergies || "—"
                    )}
                  </td>

                  <td className="py-4 flex justify-between items-center">
                    {editingId === p.id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(p.id)}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 border border-green-300 rounded hover:bg-green-200"
                        >
                          Enregistrer
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border rounded hover:bg-gray-200"
                        >
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/patients/${p.id}`}
                          className="text-[#006d77] font-semibold hover:underline"
                        >
                          Voir dossier
                        </Link>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 border border-red-300 rounded hover:bg-red-200"
                          >
                            Supprimer
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}