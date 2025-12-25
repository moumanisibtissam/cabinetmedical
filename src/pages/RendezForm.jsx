import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RendezForm() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [rendezVous, setRendezVous] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    date: "",
    heure: "",
    raison: "",
    statut: "En attente",
  });

  const [selectedPatient, setSelectedPatient] = useState(null);

  // 🔹 Charger les patients depuis JSON Server
  useEffect(() => {
    fetch("http://localhost:4000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  // 🔹 Charger les rendez-vous pour vérifier les conflits
  useEffect(() => {
    fetch("http://localhost:4000/rendezVous")
      .then((res) => res.json())
      .then((data) => setRendezVous(data));
  }, []);

  // 🔹 Calculer l’âge à partir de birthDate
  const calculateAge = (birthDate) => {
    if (!birthDate) return "—";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "patientId") {
      const patient = patients.find((p) => p.id === parseInt(value));
      setSelectedPatient(patient || null);
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const conflit = rendezVous.some(
      (rdv) => rdv.date === form.date && rdv.heure === form.heure
    );

    if (conflit) {
      alert("⚠️ Un rendez-vous existe déjà à cette date et heure !");
      return;
    }

    await fetch("http://localhost:4000/rendezVous", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/rendez-vous");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Appointment</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        {/* Patient */}
        <div>
          <label className="block font-semibold mb-1">Patient *</label>
          {patients.length === 0 ? (
            <p className="text-sm text-red-500">
              No patients available. Please add a patient first.
            </p>
          ) : (
            <select
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Select a patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.prenom} {p.nom}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Info patient sélectionné */}
        {selectedPatient && (
          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border">
            <p><strong>Dossier #:</strong> {selectedPatient.dossierNum}</p>
            <p><strong>Age:</strong> {calculateAge(selectedPatient.birthDate)} years</p>
            <p><strong>Phone:</strong> {selectedPatient.telephone}</p>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="block font-semibold mb-1">Date *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block font-semibold mb-1">Time *</label>
          <input
            type="time"
            name="heure"
            value={form.heure}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block font-semibold mb-1">Motifs *</label>
          <select
            name="raison"
            value={form.raison}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">Select Motifs</option>
            <option value="Consultation">Consultation</option>
            <option value="Contrôle">Contrôle</option>
            <option value="Certificat">Certificat</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Urgence">Urgence</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold mb-1">Status *</label>
          <select
            name="statut"
            value={form.statut}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="Confirmé">Confirmé</option>
            <option value="En attente">En attente</option>
            <option value="Honoré">Honoré</option>
            <option value="Annulé">Annulé</option>
          </select>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500">
          Note: The system will automatically check for scheduling conflicts before confirming the appointment.
        </p>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/rendez-vous")}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#006d77] text-white hover:bg-[#005f66]"
          >
            Create Appointment
          </button>
        </div>
      </form>
    </div>
  );
}