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

  const handleSubmit = async (e) => {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-800"
          onClick={() => navigate("/consultations")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Consultations
        </button>
        <h1 className="text-3xl font-bold text-gray-800">New Consultation</h1>
        <p className="text-gray-500 mt-2">Record a new consultation</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient */}
          <div className="md:col-span-2">
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
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.prenom} {patient.nom} - {patient.dossierNum}
                </option>
              ))}
            </select>
            {patients.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No patients available. Please add a patient first.
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motif <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
              placeholder="Motif de la consultation..."
            />
          </div>

          {/* Diagnostic */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnostic <span className="text-red-500">*</span>
            </label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77] resize-none"
              placeholder="Enter your diagnosis..."
            />
          </div>

          {/* Ordonnance */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordonnance (Prescription)
            </label>
            <textarea
              name="prescription"
              value={formData.prescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77] resize-none"
              placeholder="List medications and dosages..."
            />
          </div>

          {/* Tarif */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarif (Fee) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
              placeholder="Amount in DH..."
            />
          </div>

          {/* Mode de Paiement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mode de Paiement <span className="text-red-500">*</span>
            </label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Insurance">Insurance</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            className="flex-1 bg-[#006d77] text-white py-2 rounded-lg font-bold"
            disabled={patients.length === 0}
          >
            Save Consultation
          </button>
          <button
            type="button"
            className="px-6 border py-2 rounded-lg"
            onClick={() => navigate("/consultations")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
