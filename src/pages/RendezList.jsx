import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RendezList() {
  const [rendezVous, setRendezVous] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    heure: "",
    raison: "",
    statut: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/rendezVous")
      .then((res) => res.json())
      .then((data) => setRendezVous(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  const getPatientName = (id) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.prenom} ${patient.nom}` : "—";
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?");
    if (!confirm) return;

    await fetch(`http://localhost:4000/rendezVous/${id}`, { method: "DELETE" });
    setRendezVous(rendezVous.filter((r) => r.id !== id));
  };

  const handleEditClick = (rdv) => {
    setEditingId(rdv.id);
    setEditForm({
      date: rdv.date,
      heure: rdv.heure,
      raison: rdv.raison,
      statut: rdv.statut,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    await fetch(`http://localhost:4000/rendezVous/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    setRendezVous(
      rendezVous.map((r) => (r.id === id ? { ...r, ...editForm } : r))
    );
    setEditingId(null);
  };

  const handleEditCancel = () => setEditingId(null);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Rendez-Vous</h1>
          <p className="text-gray-500">Gestion des rendez-vous</p>
        </div>
        <Link
          to="/rendez-vous/ajouter"
          className="bg-[#006d77] text-white px-4 py-2 rounded-lg hover:bg-[#005f66]"
        >
          + New rendez-vous
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {rendezVous.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Aucun rendez-vous programmé.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-400 uppercase">
                <th className="pb-3">Patient</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Heure</th>
                <th className="pb-3">Motif</th>
                <th className="pb-3">Statut</th>
                
              </tr>
            </thead>

            <tbody>
              {rendezVous.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="py-4">{getPatientName(r.patientId)}</td>

                  <td className="py-4">
                    {editingId === r.id ? (
                      <input
                        type="date"
                        name="date"
                        value={editForm.date}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      r.date
                    )}
                  </td>

                  <td className="py-4">
                    {editingId === r.id ? (
                      <input
                        type="time"
                        name="heure"
                        value={editForm.heure}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      r.heure
                    )}
                  </td>

                  <td className="py-4">
                    {editingId === r.id ? (
                      <select
                        name="raison"
                        value={editForm.raison}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="Consultation">Consultation</option>
                        <option value="Contrôle">Contrôle</option>
                        <option value="Certificat">Certificat</option>
                        <option value="Vaccination">Vaccination</option>
                        <option value="Urgence">Urgence</option>
                      </select>
                    ) : (
                      r.raison
                    )}
                  </td>

                  <td className="py-4">
                    {editingId === r.id ? (
                      <select
                        name="statut"
                        value={editForm.statut}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="Confirmé">Confirmé</option>
                        <option value="En attente">En attente</option>
                        <option value="Honoré">Honoré</option>
                        <option value="Annulé">Annulé</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${r.statut === "Confirmé" ? "bg-green-100 text-green-700"
                          : r.statut === "Annulé" ? "bg-red-100 text-red-700"
                          : r.statut === "Honoré" ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {r.statut}
                      </span>
                    )}
                  </td>

                  {/* ACTIONS ALIGNÉES À DROITE */}
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      {editingId === r.id ? (
                        <>
                          <button
                            onClick={() => handleEditSave(r.id)}
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
                          <button
                            onClick={() => handleEditClick(r)}
                            className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 border border-red-300 rounded hover:bg-red-200"
                          >
                            Annuler
                          </button>
                        </>
                      )}
                    </div>
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
