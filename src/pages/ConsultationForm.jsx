import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ConsultationForm() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    date: new Date().toISOString().split("T")[0],
    reason: "",
    diagnosis: "",
    prescription: "",
    fee: "",
    paymentMode: "Cash",
    status: "En attente",
  });

  const [selectedPatient, setSelectedPatient] = useState(null);

  // 🔹 Charger les patients depuis JSON Server
  useEffect(() => {
    fetch("http://localhost:4000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
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

    const newConsultation = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    await fetch("http://localhost:4000/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newConsultation),
    });

    navigate("/consultations");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-500 mb-4 flex items-center gap-2"
      >
        ← Back to Consultation 
      </button>
      <h1 className="text-2xl font-bold mb-4">Nouvelle Consultation</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        {/* Patient */}
        <div>
          <label className="block font-semibold mb-1">Patient *</label>
          {patients.length === 0 ? (
            <p className="text-sm text-red-500">
              Aucun patient disponible. Veuillez en ajouter un d’abord.
            </p>
          ) : (
            <select
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Sélectionnez un patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.prenom} {p.nom} - {p.dossierNum}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Info patient sélectionné */}
        {selectedPatient && (
          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border">
            <p><strong>Dossier #:</strong> {selectedPatient.dossierNum}</p>
            <p><strong>Âge:</strong> {calculateAge(selectedPatient.birthDate)} ans</p>
            <p><strong>Téléphone:</strong> {selectedPatient.telephone}</p>
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

        {/* Motif */}
        <div>
          <label className="block font-semibold mb-1">Motif *</label>
          <input
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Diagnostic */}
        <div>
          <label className="block font-semibold mb-1">Diagnostic *</label>
          <textarea
            name="diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            required
            rows={2}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Ordonnance */}
        <div>
          <label className="block font-semibold mb-1">Ordonnance</label>
          <textarea
            name="prescription"
            value={form.prescription}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Tarif */}
        <div>
          <label className="block font-semibold mb-1">Tarif (DH) *</label>
          <input
            type="number"
            name="fee"
            value={form.fee}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Mode de paiement */}
        <div>
          <label className="block font-semibold mb-1">Mode de Paiement *</label>
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="Cash">Cash</option>
            <option value="Card">Carte</option>
            <option value="Bank Transfer">Virement</option>
            <option value="Insurance">Assurance</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/consultations")}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#006d77] text-white hover:bg-[#005f66]"
            disabled={patients.length === 0}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}