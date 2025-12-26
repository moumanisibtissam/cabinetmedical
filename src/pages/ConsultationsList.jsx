import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, History } from "lucide-react";

export default function ConsultationsList() {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  // Charger les consultations
  useEffect(() => {
    fetch("http://localhost:4000/consultations")
      .then((res) => res.json())
      .then((data) => setConsultations(data))
      .catch((err) => console.error("Erreur consultations:", err));
  }, []);

  // Charger les patients
  useEffect(() => {
    fetch("http://localhost:4000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Erreur patients:", err));
  }, []);

  // Filtrer et trier
  const filteredConsultations = selectedPatient
    ? consultations.filter(
        (c) => String(c?.patientId) === String(selectedPatient)
      )
    : consultations;

  const sortedConsultations = [...filteredConsultations].sort(
    (a, b) =>
      new Date(b?.date ?? 0).getTime() - new Date(a?.date ?? 0).getTime()
  );

  const getPatientConsultationCount = (patientId) =>
    consultations.filter(
      (c) => String(c?.patientId) === String(patientId)
    ).length;

  const getPatientName = (patientId) => {
    const p = patients.find((x) => String(x?.id) === String(patientId));
    return p ? `${p.prenom ?? ""} ${p.nom ?? ""}`.trim() : "Patient inconnu";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Consultations</h1>
          <p className="text-gray-500 mt-2">
            Enregistrez et gérez les consultations
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-[#006d77] text-white px-4 py-2 rounded-lg hover:bg-[#005f66]"
          onClick={() => navigate("/consultations/ajouter")}
        >
          <Plus className="w-4 h-4" />
          Nouvelle Consultation
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-[#006d77]" />
          <label className="text-sm font-medium text-gray-700">
            Filtrer par Historique Patient :
          </label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
          >
            <option value="">Tous les Patients</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.prenom} {patient.nom} (
                {getPatientConsultationCount(patient.id)} consultations)
              </option>
            ))}
          </select>
          {selectedPatient && (
            <button
              className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100"
              onClick={() => setSelectedPatient("")}
            >
              Effacer le filtre
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {sortedConsultations.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {selectedPatient
              ? "Aucune consultation trouvée pour ce patient."
              : "Aucune consultation enregistrée pour le moment. Créez votre première consultation."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {sortedConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {consultation.patientName ||
                      getPatientName(consultation.patientId)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {consultation.date
                      ? new Date(consultation.date).toLocaleDateString()
                      : "Date inconnue"}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    consultation.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {consultation.status || "En attente"}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Motif</p>
                  <p className="text-gray-800">
                    {consultation.reason || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium mb-1">Diagnostic</p>
                  <p className="text-gray-800">
                    {consultation.diagnosis || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium mb-1">
                    Tarif & Paiement
                  </p>
                  <p className="text-gray-800">
                    {consultation.fee ?? "—"} DH -{" "}
                    <span className="font-medium">
                      {consultation.paymentMode || "—"}
                    </span>
                  </p>
                </div>
                {consultation.prescription && (
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Ordonnance</p>
                    <p className="text-gray-800">
                      {consultation.prescription}
                    </p>
                  </div>
                )}
              </div>

              {consultation.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-500 font-medium text-sm mb-1">
                    Notes Additionnelles
                  </p>
                  <p className="text-gray-800 text-sm">{consultation.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}