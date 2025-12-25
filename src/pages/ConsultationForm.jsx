import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createConsultation } from "../features/consultationsSlice";

export default function ConsultationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.list || []);

  const [formData, setFormData] = useState({
    patient: "",
    date: new Date().toISOString().split("T")[0],
    reason: "",
    diagnosis: "",
    prescription: "",
    fee: "",
    paymentMode: "Cash",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedPatient = patients.find((p) => p.id.toString() === formData.patient);
    if (!selectedPatient) return;

    const newConsultation = {
      id: Date.now().toString(),
      patientId: formData.patient,
      patientName: `${selectedPatient.prenom} ${selectedPatient.nom}`,
      date: formData.date,
      reason: formData.reason,
      diagnosis: formData.diagnosis,
      prescription: formData.prescription,
      fee: formData.fee,
      paymentMode: formData.paymentMode,
      createdAt: new Date().toISOString(),
    };

    dispatch(createConsultation(newConsultation));
    navigate("/consultations");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-800"
          onClick={() => navigate("/consultations")}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux Consultations
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Nouvelle Consultation</h1>
        <p className="text-gray-500 mt-2">Enregistrez une nouvelle consultation</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl"
      >
        {/* Patient */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient <span className="text-red-500">*</span>
          </label>
          <select
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          >
            <option value="">Sélectionnez un patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.prenom} {patient.nom} - {patient.dossierNum}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          />
        </div>

        {/* Motif */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Motif</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          />
        </div>

        {/* Diagnostic */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Diagnostic</label>
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          />
        </div>

        {/* Ordonnance */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ordonnance</label>
          <textarea
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          />
        </div>

        {/* Tarif */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tarif (DH)</label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          />
        </div>

        {/* Mode de paiement */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mode de Paiement</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          >
            <option value="Cash">Cash</option>
            <option value="Card">Carte</option>
            <option value="Bank Transfer">Virement</option>
            <option value="Insurance">Assurance</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            className="flex-1 bg-[#006d77] text-white py-2 rounded-lg font-bold"
            disabled={patients.length === 0}
          >
            Enregistrer
          </button>
          <button
            type="button"
            className="px-6 border py-2 rounded-lg"
            onClick={() => navigate("/consultations")}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}